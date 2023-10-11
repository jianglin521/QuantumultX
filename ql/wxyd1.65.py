"""
@Qim出品 仅供学习交流，请在下载后的24小时内完全删除 请勿将任何内容用于商业或非法目的，否则后果自负。
钢镚阅读阅读_V1.65   入口：http://2477726.ulbn.sgzzlb.81rblqe6rl.cloud/?p=2477726
阅读文章抓出cookie（找不到搜索gfsessionid关键词）
export ydtoken=cookie
多账号用'===='隔开 例 账号1====账号2
cron：23 7-23/2 * * *
"""

# money_Withdrawal = 1  # 提现开关 1开启 0关闭
max_concurrency = 3  # 并发线程数
# key = ""        #key为企业微信webhook机器人后面的 key

import hashlib
import json
import os
import random
import threading
import time
import datetime
from multiprocessing import Pool
from multiprocessing.pool import ThreadPool

import requests

from dotenv import load_dotenv
# 加载环境变量
load_dotenv(dotenv_path='.env.local', verbose=True)

key = os.getenv('wxkey') # 企业微信key
lock = threading.Lock()

def process_account(account, i):
    values = account.split('@')
    cookie = values[0]

    print(f"\n=======开始执行账号{i}=======")
    current_time = str(int(time.time()))

    sign_str = f'key=4fck9x4dqa6linkman3ho9b1quarto49x0yp706qi5185o&time={current_time}'
    sha256_hash = hashlib.sha256(sign_str.encode())
    sign = sha256_hash.hexdigest()
    url = "http://2477726.neavbkz.jweiyshi.r0ffky3twj.cloud/share"
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 9; V1923A Build/PQ3B.190801.06161913; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Safari/537.36 MMWEBID/5635 MicroMessenger/8.0.40.2420(0x28002837) WeChat/arm64 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64",
        "Cookie": cookie
    }

    data = {
        "time": current_time,
        "sign": sign
    }

    with lock:
        response = requests.get(url, headers=headers, json=data).json()
        share_link = response['data']['share_link'][0]
        p_value = share_link.split('=')[1].split('&')[0]

        url = "http://2477726.neavbkz.jweiyshi.r0ffky3twj.cloud/read/info"


        try:
            response = requests.get(url, headers=headers, json=data, timeout=7).json()
        except requests.Timeout:
            print("请求超时，尝试重新发送请求...")
            response = requests.get(url, headers=headers, json=data, timeout=7).json()
        except Exception as e:
            print('设置状态异常')
            print(e)

        if response['code'] == 0:
            remain = response['data']['remain']
            read = response['data']['read']
            print(f"账号{i}-ID:{p_value}-----钢镚余额:{remain}\n今日阅读量::{read}\n推广链接:{share_link}")
        else:
            print(response['message'])

    print("============开始执行阅读文章============")

    for j in range(30):
        biz_list = ['MzkyMzI5NjgxMA==', 'MzkzMzI5NjQ3MA==', 'Mzg5NTU4MzEyNQ==', 'Mzg3NzY5Nzg0NQ==',
                    'MzU5OTgxNjg1Mg==', 'Mzg4OTY5Njg4Mw==', 'MzI1ODcwNTgzNA==', 'Mzg2NDY5NzU0Mw==']
        # 计算 sign
        sign_str = f'key=4fck9x4dqa6linkman3ho9b1quarto49x0yp706qi5185o&time={current_time}'
        sha256_hash = hashlib.sha256(sign_str.encode())
        sign = sha256_hash.hexdigest()
        url = "http://2477726.9o.10r8cvn6b1.cloud/read/task"

        try:
            response = requests.get(url, headers=headers, json=data, timeout=10).json()
        except requests.Timeout:
            print("请求超时，尝试重新发送请求...")
            response = requests.get(url, headers=headers, json=data, timeout=10).json()
        except Exception as e:
            print(e)
            print("状态异常，尝试重新发送请求...")
            response = requests.get(url, headers=headers, json=data, timeout=7).json()
        if response['code'] == 1:
            print(response['message'])
            break
        else:
            try:
                mid = response['data']['link'].split('&mid=')[1].split('&')[0]
                biz = response['data']['link'].split('__biz=')[1].split('&')[0]

                # print(f"账号{i}-[{p_value}]获取文章成功---{mid} 来源[{biz}]")

                if biz in biz_list:
                    four_digit_number = random.randint(1000, 9999)
                    print(f"账号{i}-发现目标[{biz}] 疑似检测文章！！！")
                    link = response['data']['link']
                    url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=' + key

                    messages = [
                        f"微信阅读 账号{i}-出现检测文章！！！{four_digit_number}\n{link}\n请在60s内点击链接完成阅读",
                    ]

                    for message in messages:
                        data = {
                            "msgtype": "text",
                            "text": {
                                "content": message
                            }
                        }
                        headers = {'Content-Type': 'application/json'}
                        response = requests.post(url, headers=headers, data=json.dumps(data))
                        print("以将该文章推送至微信请在60s内点击链接完成阅读--60s后继续运行")
                        # time.sleep(60)
                        for item in range(60):
                            print(f'账号{i}-等待过检测文章还剩-{59-item}秒')
                            time.sleep(1)
                        url = "http://2477726.9o.10r8cvn6b1.cloud/read/finish"
                        headers = {
                            "User-Agent": "Mozilla/5.0 (Linux; Android 9; V1923A Build/PQ3B.190801.06161913; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Safari/537.36 MMWEBID/5635 MicroMessenger/8.0.40.2420(0x28002837) WeChat/arm64 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64",
                            "Cookie": cookie
                        }
                        data = {
                            "time": current_time,
                            "sign": sign
                        }
                        try:
                            response = requests.get(url, headers=headers, data=data, timeout=7).json()
                        except requests.Timeout:
                            print("请求超时，尝试重新发送请求...")
                            response = requests.get(url, headers=headers, data=data, timeout=7).json()
                        except Exception as e:
                            print('设置状态异常')
                            print(e)
                        if response['code'] == 0:
                            gain = response['data']['gain']
                            print(f"第{j + 1}次阅读检测文章成功---获得钢镚[{gain}]")
                            print(f"--------------------------------")
                        else:
                            print(f"过检测失败，请尝试重新运行")
                            break
                else:
                    sleep = random.randint(8, 11)
                    # print(f"账号{i}-本次模拟阅读{sleep}秒")
                    time.sleep(sleep)
                    url = "http://2477726.9o.10r8cvn6b1.cloud/read/finish"
                    headers = {
                        "User-Agent": "Mozilla/5.0 (Linux; Android 9; V1923A Build/PQ3B.190801.06161913; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Safari/537.36 MMWEBID/5635 MicroMessenger/8.0.40.2420(0x28002837) WeChat/arm64 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64",
                        "Cookie": cookie
                    }
                    data = {
                        "time": current_time,
                        "sign": sign
                    }
                    try:
                        response = requests.get(url, headers=headers, data=data, timeout=7).json()
                    except requests.Timeout:
                        print("请求超时，尝试重新发送请求...")
                        response = requests.get(url, headers=headers, data=data, timeout=7).json()
                    except Exception as e:
                        print('设置状态异常')
                        print(e)
                    if response['code'] == 0:
                        gain = response['data']['gain']
                        print(f"账号{i}-第{j + 1}次阅读文章成功---获得钢镚[{gain}]-{sleep}秒")
                        print(f"--------------------------------")
                    else:
                        print(f"阅读文章失败{response}")
            except KeyError:
                print(f"获取文章失败,错误未知{response}")
                break
    
    now = datetime.datetime.now()
    if now.hour > 20:
        print(f"============开始微信提现============")
        url = "http://2477726.84.8agakd6cqn.cloud/withdraw/wechat"

        response = requests.get(url, headers=headers, json=data).json()
        if response['code'] == 0:
            print(response['message'])
        elif response['code'] == 1:
            print(response['message'])
        else:
            print(f"错误未知{response}")
    else:
        print(f"{'-' * 30}\n不执行提现")

if __name__ == "__main__":
    accounts = os.getenv('ydtoken')
    # response = requests.get('https://gitee.com/shallow-a/qim9898/raw/master/label.txt').text
    # print(response)
    if accounts is None:
        print('你没有填入ydtoken，咋运行？')
    else:
        accounts_list = os.environ.get('ydtoken').split('====')
        num_of_accounts = len(accounts_list)
        print(f"获取到 {num_of_accounts} 个账号")
        with Pool(processes=num_of_accounts) as pool:
            thread_pool = ThreadPool(max_concurrency)
            thread_pool.starmap(process_account, [(account, i) for i, account in enumerate(accounts_list, start=1)])