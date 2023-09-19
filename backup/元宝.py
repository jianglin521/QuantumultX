"""
@Qim出品 仅供学习交流，请在下载后的24小时内完全删除 请勿将任何内容用于商业或非法目的，否则后果自负。
星空阅读_V1.1  入口：http://mr1694245841257.uznmvev.cn/coin/index.html?mid=CS5WX5RSP
抓包http://u.cocozx.cn/api/ox/info取出un token参数
export xktoken=un@token
多账号用'===='隔开 例 账号1====账号2
cron：23 7-23/2 * * *
"""

# ox=星空  coin=元宝  user=花花

money_Withdrawal = 1  # 提现开关 1开启 0关闭
max_concurrency = 1  # 并发线程数
# key = ""  # key为企业微信webhook机器人后面的 key

# 检测文章列表
biz_list = ['Mzg2Mzk3Mjk5NQ==']

import json
import os
import random
import re
import threading
import time
from multiprocessing import Pool
from multiprocessing.pool import ThreadPool
import requests

from dotenv import load_dotenv
# 加载环境变量
load_dotenv(dotenv_path='.env.local', verbose=True)

key = os.getenv('wxkey') # 企业微信key
lock = threading.Lock()

def process_account(account, index):
    values = account.split('@')
    un, token = values[0], values[1]

    print(f"\n=======开始执行账号{index}=======")

    url = "http://u.cocozx.cn/api/coin/info"

    headers = {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.41(0x1800292d) NetType/WIFI Language/zh_CN",

    }

    data = {
        "code": "XG7QUVEEH",
        "un": un,
        "token": token,
        "pageSize": 20
    }

    response = requests.post(url, json=data, headers=headers).json()
    if response['code'] == 0:
        uid = response['result']['uid']
        moneyCurrent = response['result']['moneyCurrent']
        dayCount = response['result']['dayCount']
        print(f"[{uid}]---元子余额:{moneyCurrent}\n今日有效阅读------{dayCount}篇")
        url = "http://u.cocozx.cn/api/coin/getReadHost"
        response = requests.post(url, json=data, headers=headers).json()
        if response['code'] == 0:
            host = response.get('result').get('host')
            print(f"阅读链接:{host}")

            print(f"{'-' * 40}")

            for i in range(30):
                url = "http://u.cocozx.cn/api/coin/read"
                response = requests.post(url, json=data, headers=headers).json()
                if response['code'] == 0:
                    status = response.get('result').get('status')
                    if status == 10:
                        link = response['result']['url']
                        mid = link.split('&mid=')[1].split('&')[0]
                        biz = link.split('__biz=')[1].split('&')[0]
                        print(f"获取文章成功---{mid} 来源[{biz}]")
                        if biz in biz_list:
                            four_digit_number = random.randint(1000, 9999)
                            print(f"发现目标[{biz}] 疑似检测文章！！！")
                            link = response['result']['url']
                            url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=' + key

                            messages = [
                                f"元宝阅读 账号{index}-出现检测文章！！！{four_digit_number}\n{link}\n请在60s内点击链接完成阅读",
                            ]

                            for message in messages:
                                data_bot = {
                                    "msgtype": "text",
                                    "text": {
                                        "content": message
                                    }
                                }
                                headers_bot = {'Content-Type': 'application/json'}
                                response = requests.post(url, headers=headers_bot, data=json.dumps(data_bot))
                                print("以将该文章推送至微信请在60s内点击链接完成阅读--60s后继续运行")
                                # time.sleep(60)
                                for item in range(60):
                                    print(f'等待过检测文章还剩-{59-item}秒')
                                    time.sleep(1)
                                url = "http://u.cocozx.cn/api/coin/submit"
                                response = requests.post(url, json=data, headers=headers).json()

                                if response.get('code') == 0:
                                    result = response.get('result')
                                    print(f'第{i + 1}次阅读检测文章成功---获得{result.get("val")}元子')
                                    progress = result.get('progress')
                                    if progress > 0:
                                        print(f'本轮剩余{progress}篇文章，继续阅读')
                                        print('-' * 50)
                                        time.sleep(2)
                                    else:
                                        print('阅读已完成')
                                        print('-' * 50)
                                        break
                                else:
                                    print('提交任务异常')

                        else:
                            sleep = random.randint(9, 11)
                            print(f"本次模拟阅读{sleep}秒")
                            time.sleep(sleep)
                            url = "http://u.cocozx.cn/api/coin/submit"
                            response = requests.post(url, json=data, headers=headers).json()

                            if response.get('code') == 0:
                                result = response.get('result')
                                print(f'第{i + 1}次阅读成功---获得{result.get("val")}元子')
                                progress = result.get('progress')
                                if progress > 0:
                                    print(f'本轮剩余{progress}篇文章，继续阅读')
                                    print('-' * 50)
                                    time.sleep(2)
                                else:
                                    print('阅读已完成')
                                    print('-' * 50)
                                    break
                            else:
                                print('提交任务异常')
                    elif status == 30:
                        print(f'未知情况{response}')
                    elif status == 50 or status == 80:
                        print('您的阅读暂时失效，请明天再来')
                        break
                    else:
                        print('本次推荐文章已全部读完')
                        break
                else:
                    print(f"获取文章失败{response}")
                    break

            if money_Withdrawal == 1:
                url = "http://u.cocozx.cn/api/coin/info"
                response = requests.post(url, json=data, headers=headers).json()
                if response['code'] == 0:
                    txm = 0
                    moneyCurrent = response['result']['moneyCurrent']
                    moneyCurrent = int(moneyCurrent)
                    if moneyCurrent < 3000:
                        print('没有达到提现标准')
                    elif 3000 <= moneyCurrent < 10000:
                        txm = 3000
                    elif 10000 <= moneyCurrent < 50000:
                        txm = 10000
                    elif 50000 <= moneyCurrent < 100000:
                        txm = 50000
                    else:
                        txm = 100000
                    url = "http://u.cocozx.cn/api/coin/wdmoney"
                    data = {"val": txm, "un": un, "token": token, "pageSize": 20}
                    response = requests.post(url, json=data, headers=headers).json()
                    print(f"提现结果:{response}")
            elif money_Withdrawal == 0:
                print(f"{'-' * 30}\n不执行提现")
        else:
            print(f"{response}")

    else:
        print(f"获取账号信息失败{response}")
        exit()


if __name__ == "__main__":
    accounts = os.getenv('xktoken')
    if accounts is None:
        print('你没有填入xktoken，咋运行？')
    else:
        response = requests.get('https://netcut.cn/p/e9a1ac26ab3e543b')
        note_content_list = re.findall(r'"note_content":"(.*?)"', response.text)
        formatted_note_content_list = [note.replace('\\n', '\n').replace('\\/', '/') for note in note_content_list]
        for note in formatted_note_content_list:
            print(note)
        accounts_list = os.environ.get('xktoken').split('====')
        num_of_accounts = len(accounts_list)
        print(f"获取到 {num_of_accounts} 个账号")
        with Pool(processes=num_of_accounts) as pool:
            thread_pool = ThreadPool(max_concurrency)
            thread_pool.starmap(process_account, [(account, i) for i, account in enumerate(accounts_list, start=1)])