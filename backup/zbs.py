"""
@Qim出品 仅供学习交流，请在下载后的24小时内完全删除 请勿将任何内容用于商业或非法目的，否则后果自负。
植白说官方商城_V1.2  签到 牛奶活动

抓https://www.kozbs.com/demo/取出X-Dts-Token

export zbstoken=X-Dts-Token
多账号用'===='隔开 例 账号1====账号2
corn：0 0 8 * * ?
"""

import os

import requests

from dotenv import load_dotenv
# 加载环境变量
load_dotenv(dotenv_path='.env.local', verbose=True)

accounts = os.getenv('zbstoken')
response = requests.get('https://gitee.com/shallow-a/qim9898/raw/master/label.txt').text
print(response)
if accounts is None:
    print('你没有填入zbstoken，咋运行？')
else:
    accounts_list = os.environ.get('zbstoken').split('====')
    num_of_accounts = len(accounts_list)
    print(f"获取到 {num_of_accounts} 个账号")
    for i, account in enumerate(accounts_list, start=1):
        values = account.split('@')
        zbstoken = values[0]
        print(f"\n=======开始执行账号{i}=======")
        url = 'https://www.kozbs.com/demo/wx/home/signDay'
        headers = {
            'X-DTS-Token': zbstoken,
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.39 (0x18002733) NetType/WIFI Language/zh_CN',
        }
        response = requests.get(url, headers=headers)
        response.code = response.json()
        if response.code['errno'] == 0:
            signCount = response.code['data']['signCount']
            integral = response.code['data']['integral']
            print(f"签到成功----{signCount}\n积分余额----{integral}")
        else:
            print('请求失败')
        for i in range(3):
            url = 'https://www.kozbs.com/demo/wx/user/addIntegralByShare'
            response = requests.get(url, headers=headers)
            response.code = response.json()
            if response.code['errno'] == 0:
                print(f"第{i + 1}分享---成功")
            else:
                print('请求失败')
