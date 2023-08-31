"""
@Qim出品 仅供学习交流，请在下载后的24小时内完全删除 请勿将任何内容用于商业或非法目的，否则后果自负。
微信阅读_V1.51   入口：http://2477726.aeidm.p0w87d3xn9gp.cloud/?p=2477726
阅读文章抓出cookie（找不到搜索Cookie关键词） 建议手动阅读5篇左右再使用脚本，不然100%黑！！！2小时一次
8/18_update 修复bug
8/22_update  增加推送检测文章   将多个账号检测文章推送至目标微信，手动点击链接完成检测阅读
8/29_update  更新检测文章逻辑 优化日志 （别问为什么优化日志，因为我看够了所以想换）
key为企业微信webhook机器人后面的 key
export ydtoken=cookie@key
多账号用'===='隔开 例 账号1====账号2
cron：23 7-23/3 * * *
"""

import random
import hashlib
import json
import os
import re
import time
import requests
from dotenv import load_dotenv

# 加载环境变量
load_dotenv(dotenv_path='.env.local', verbose=True)

response = requests.get('https://netcut.cn/p/e9a1ac26ab3e543b')
note_content_list = re.findall(r'"note_content":"(.*?)"', response.text)
formatted_note_content_list = [note.replace('\\n', '\n').replace('\\/', '/') for note in note_content_list]
for note in formatted_note_content_list:
    print(note)

# 获取 xwytoken 环境变量值
accounts = os.getenv('ydtoken')

# 检查 xwytoken 是否存在
if accounts is None:
    print('你没有填入ydtoken，咋运行？')
else:
    # 获取环境变量的值，并按指定字符串分割成多个账号的参数组合
    accounts_list = os.environ.get('ydtoken').split('====')

    # 输出有几个账号
    num_of_accounts = len(accounts_list)
    print(f"获取到 {num_of_accounts} 个账号")

    # 遍历所有账号
    for index, account in enumerate(accounts_list, start=1):
        # 按@符号分割当前账号的不同参数
        values = account.split('@')
        cookie, key = values[0], values[1]
        # 输出当前正在执行的账号
        print(f"\n=======开始执行账号{index}=======")
        current_time = str(int(time.time()))

        # 计算 sign
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
        response = requests.get(url, headers=headers, json=data).json()
        share_link = response['data']['share_link'][0]
        p_value = share_link.split('=')[1].split('&')[0]

        url = "http://2477726.neavbkz.jweiyshi.r0ffky3twj.cloud/read/info"

        response = requests.get(url, headers=headers, json=data).json()

        if response['code'] == 0:
            remain = response['data']['remain']
            read = response['data']['read']
            print(f"ID:{p_value}-----钢镚余额:{remain}\n今日阅读量::{read}\n推广链接:{share_link}")
        else:
            print(response['message'])

        print("============开始执行阅读文章============")
        for i in range(30):
            biz_list = ['MzkyMzI5NjgxMA==', 'MzkzMzI5NjQ3MA==', 'Mzg5NTU4MzEyNQ==', 'Mzg3NzY5Nzg0NQ==',
                        'MzU5OTgxNjg1Mg==', 'Mzg4OTY5Njg4Mw==', 'MzI1ODcwNTgzNA==']
            # 计算 sign
            sign_str = f'key=4fck9x4dqa6linkman3ho9b1quarto49x0yp706qi5185o&time={current_time}'
            sha256_hash = hashlib.sha256(sign_str.encode())
            sign = sha256_hash.hexdigest()
            url = "http://2477726.9o.10r8cvn6b1.cloud/read/task"

            try:
                response = requests.get(url, headers=headers, json=data, timeout=7).json()
            except requests.Timeout:
                print("请求超时，尝试重新发送请求...")
                response = requests.get(url, headers=headers, json=data, timeout=7).json()
            if response['code'] == 1:
                print(response['message'])
                break
            else:
                try:
                    mid = response['data']['link'].split('&mid=')[1].split('&')[0]
                    biz = response['data']['link'].split('__biz=')[1].split('&')[0]

                    print(f"获取文章成功---{mid} 来源[{biz}]")


                    if biz in biz_list:
                        print(f"发现目标[{biz}] 疑似检测文章！！！")
                        link = response['data']['link']
                        url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=' + key

                        messages = [
                            f"账号{index}-出现检测文章！！！\n{link}\n请在60s内点击链接完成阅读",
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
                            time.sleep(60)
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
                            if response['code'] == 0:
                                gain = response['data']['gain']
                                print(f"第{i+1}次阅读检测文章成功---获得钢镚[{gain}]")
                                print(f"--------------------------------")
                            else:
                                print(f"过检测失败，请尝试重新运行")
                                break
                    else:
                        sleep = random.randint(8, 11)
                        print(f"本次模拟阅读{sleep}秒")
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
                        if response['code'] == 0:
                            gain = response['data']['gain']
                            print(f"第{i+1}次阅读文章成功---获得钢镚[{gain}]")
                            print(f"--------------------------------")
                        else:
                            print(f"阅读文章失败{response}")
                            break
                except KeyError:
                    print(f"获取文章失败,错误未知{response}")
                    break
        print(f"============开始微信提现============")
        url = "http://2477726.84.8agakd6cqn.cloud/withdraw/wechat"

        response = requests.get(url, headers=headers, json=data).json()
        if response['code'] == 0:
            print(response['message'])
        elif response['code'] == 1:
            print(response['message'])
        else:
            print(f"错误未知{response}")
