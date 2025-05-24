#觉得不错麻烦点个star谢谢

import time
import random
import re
import sys
import os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from dotenv import load_dotenv

# 加载环境变量
load_dotenv(dotenv_path='.env.local', verbose=True)
# 加启动配置
chrome_options = webdriver.ChromeOptions()
# 打开chrome浏览器
# 此步骤很重要，设置为开发者模式，防止被各大网站识别出来使用了Selenium
# chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])#禁止打印日志
chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])#跟上面只能选一个
# chrome_options.add_argument('--start-maximized')#最大化
chrome_options.add_argument('--incognito')#无痕隐身模式
chrome_options.add_argument("disable-cache")#禁用缓存
chrome_options.add_argument('disable-infobars')
chrome_options.add_argument('log-level=3')#INFO = 0 WARNING = 1 LOG_ERROR = 2 LOG_FATAL = 3 default is 0
# chrome_options.add_argument('--headless')  # 浏览器不提供可视化页面. linux下如果系统不支持可视化不加这条会启动失败
chrome_options.add_argument('user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"')

try:
    if sys.platform == 'win32' or sys.platform == 'cygwin':
        driver = webdriver.Chrome(ChromeDriverManager().install())
        # driver = webdriver.Chrome(options=chrome_options, executable_path=r'D:/driver/chromedriver.exe')
    else:
        driver = webdriver.Chrome(options=chrome_options, executable_path=r'./chromedriver')
except:
    print('报错了!请检查你的环境是否安装谷歌Chrome浏览器！或者驱动【chromedriver.exe】版本是否和Chrome浏览器版本一致！\n驱动更新链接：http://npm.taobao.org/mirrors/chromedriver/')

username = os.environ['ql_username'] #用户名
password = os.environ['ql_password'] #密码
address = os.environ['ql_address'] #登陆地址：https：//xxxx：xxxx/
#ck形式，默认是形式一，有需要的自己注释掉形式一使用形式二

##形式一：ck.txt文件中一行一个ck
with open('./rewrite/ck.txt', encoding='utf-8', mode = 'r') as fp:
    temp = fp.read().splitlines()
ck = []
for i in temp:
    ck.append(str(i).replace("b'","").replace("'",""))

'''
##形式二：ck1&ck2&ck3的形式
data = '这里填ck1&ck2的形式'
ck = data.split('&')
'''

driver.get(address)
time.sleep(2)

driver.find_element_by_xpath('//*[@id="username"]').send_keys(f'{username}\n')
time.sleep(0.3)
driver.find_element_by_xpath('//*[@id="password"]').send_keys(f'{password}')
time.sleep(0.5)
driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/form/div[3]/button').click()
time.sleep(5)
driver.get(f'{address}env')
time.sleep(2)

for item in ck:
    itemArr = item.split(' ')
    print(itemArr)
    driver.find_element_by_xpath('//*[@id="root"]/div/section/div/main/div/div[1]/div/div/span/div/div[3]/button').click()

    time.sleep(0.6)
    driver.find_element_by_xpath('//*[@id="env_modal_name"]').send_keys("JD_COOKIE")
    driver.find_element_by_xpath('//*[@id="env_modal_value"]').send_keys(f"{itemArr[1]}")
    driver.find_element_by_xpath('//*[@id="env_modal_remarks"]').send_keys(itemArr[0])
    driver.find_element_by_xpath('/html/body/div[2]//button[2]').click()
    time.sleep(0.5)

# driver.close()
print('运行成功了')


