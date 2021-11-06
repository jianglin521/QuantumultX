#!/usr/bin/env python3
'''
cron: 0 18 * * *
new Env('测试脚本');
'''
import os
user = os.environ.get('MI_USER')
passwd = os.environ.get('MI_PWD')
step = os.environ.get('STEP')
print(user)