# -*- coding: utf-8 -*-
# config
"""
new Env('xiaoym参数设置');
如需启用此处设置，需将文件重命名为config.py
"""

"""自定义ua"""
ua_list = ['Mozilla/5.0 (Linux; Android 11; PEDM00 Build/RKQ1.201105.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110005 MMWEBSDK/20230805 MMWEBID/5457 MicroMessenger/8.0.42.2460(0x28002A58) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64'] # ['ua1','ua2']微信浏览器ua，至少配置一个，否则部分脚本无法运行，手机端电脑端均可

"""企业微信设置"""
qwbotkey='b8192657-506a-449e-9caa-bf538785e924'  # 脚本优先从环境变量获取，没有获取到再从此处获取。已实装脚本：钢镚、每天赚

"""wxpusher设置"""
pushconfig = {"appToken":"","topicids":[]} 
"""脚本优先从环境变量获取，没有获取到再从此处获取，"topicids":["123456"],一对一推送无需设置toppicids。已实装脚本：钢镚、每天赚"""

"""元宝智慧星空内部互助设置"""
invite_info = {'name':'','code':''}  # 仓库脚本无需理会，收费项目专用

"""傻狗设置"""
sg_config={
    'max_workers': 3,  # 线程数量设置,设置为5，即最多有5个任务同时进行

    'txbz': 0.3,  # 设置提现标准,0.3 5 10 20 共四档，单位元

    'sendable': 1,  # 企业微信推送开关,1为开，0为关开启后必须设置qwbotkey才能运行

    'pushable': 0,  # wxpusher推送开关,1为开，0为关,开启后必须设置pushconfig才能运行

    'delay_time': 30,  # 并发延迟设置,设置为30即每隔30秒新增一个号做任务，直到数量达到max_workers

    'blacklist':[], # 提现黑名单设置,黑名单中的账号不自动提现，填入ck中的name,['name1','name2']。
    'shuffle':0,
    'sgck':[
       {'name':'账号1','sid':'02b5fcbc87ef5de6fde6202d7b7cccbadb6a1d0110503024329045fa48a9ac52b18bbe7d3f85de2b7cd8bb39613172b67f4bb85af48552ef1cbbff4614947ac1'},
    #    {'name':'账号2','sid':'9a62b9b7cfa0d9793d38a6e94851ccab6bd5afaf601138118e719c048260aa9676c3263ba38b449e5bd5859a781ea02b6b6a6995dad674cd829955b2042845ad'}
       {'name':'账号3','sid':'fa5a63e862002f4b99e2195de97b12471b3f20424dd10ea5f179ad9182bead03948ee78e3e384b0149aafb4d96a8b3f4af3790664be246bdaf214cdb750a38cf'}
    #    {'name':'账号4','sid':'f2bdbca2a99baec784cdf30228a5b7bdedd1b044ae14cad4e9b06836091cf87fb1bdd951f4fa8456597646f436133176fe1ea633e42da28e52401f3226204229'}
    ], # ck设置，优先从环境变量中获取，[{'name':'德华','sid':'xxxxx'},{'name':'彦祖','sid':'xxxxx','uid':'xx'}]name值随意，方便自己辨认即可。uid是wxpusher一对一通知专属设置，其它情况不要填
}
"""傻狗设置完毕"""

"""鱼儿设置"""
yu_config = {
        'max_workers': 5,  # 线程数量设置 设置为5，即最多有5个任务同时进行

        'txbz': 1,  # 设置提现标准 单位：元

        'sendable': 1,  # 企业微信推送开关 1开0关

        'pushable': 0,  # wxpusher推送开关 1开0关

        'delay_time': 30,  # 并发延迟设置 设置为20即每隔20秒新增一个号做任务，直到数量达到max_workers

        'blacklist':[], # 提现黑名单设置,黑名单中的账号不自动提现，填入ck中的name,['name1','name2']。

        'yuck':[
            {'name':'账号1','ck':'PHPSESSID=edrn0om737fmockm74r7ksvsju'},
            {'name':'账号2','ck':'PHPSESSID=1nhgreedngvkqbs2cdild3lo65'},
            {'name':'账号3','ck':'PHPSESSID=5rrkr73ret4g41kqop3h6f0vt4'},
            {'name':'账号4','ck':'PHPSESSID=6qn67ipem9g5glon4ms6b0v4jd'},
        ], # ck设置，优先从环境变量中获取，[{'name':'德华','ck':'抓包的ck值'},{'name':'彦祖','ck':'抓包的ck值','uid':'UID_xxx'}]name值随意，方便自己辨认即可。uid是wxpusher一对一通知专属设置，其它情况不要填
        'check_whitelist': ['中建二局','台州人大','漳州市龙文区妇幼保健院','贵州消防', '卓越集团', '宁夏禁毒']
    }
"""鱼儿设置完毕"""

"""可乐设置"""
kl_config={
    'max_workers': 5,  # 线程数量设置,设置为5，即最多有5个任务同时进行

    'txbz': 10000,  # 设置提现标准,不低于3000，平台3000起提,设置为8000，即为8毛起提

    'sendable': 1,  # 企业微信推送开关,1为开，0为关开启后必须设置qwbotkey才能运行

    'pushable': 0,  # wxpusher推送开关,1为开，0为关,开启后必须设置pushconfig才能运行

    'delay_time': 30,  # 并发延迟设置,设置为30即每隔30秒新增一个号做任务，直到数量达到max_workers

    'blacklist':[], # 提现黑名单设置,黑名单中的账号不自动提现，填入ck中的name,['name1','name2']。

    'klck':[
        {'name':'账号1','ck':'PHPSESSID=rc4g9s9t1u6pcuiiushg33q8sr; udtauth3=04465NDAKoyPsen7SLiRl3lS%2BDh4%2FkWj%2BlbrLHMf5jMEjH7aguzzBMggTguFfy3cDnxs%2F4ihwWZvgGLR0QpVZxvGWbXsAtHl59nG%2BUCIedPxCX77nlxyOyhCevdnybI1cmXJpxexo3xezjipeI9o%2BRQJ%2BRs3TYYRTAPAEi4Khf4'},
        {'name':'账号2','ck':'PHPSESSID=6degs2jqnrhlhib2h7kdrcvnuf; udtauth3=a6d83RnuHBYL7nDszCcYfpSXowIUE%2FRH1vDdVc7ReitEPvOm0bSxVr2XqyXpv4g6mtBxa4cbsor7ahP5qJ%2FZ1sWHCQFdRRT2aqH8%2FBDdWKh6o9XQbPLtWHq3cLnEhT%2B6B6ky92WcK5Sex8wV303DAPMk9usgjDLX2n5YLMdOLSI'},
        {'name':'账号3','ck':'PHPSESSID=c2o87mrjkq14a4kmfd66rrk08l; udtauth3=84f9v4RDuZwZcGUCOHl2y3uAfXXyaEFaY9mNl6J2lLQBoDWinwxvKYQwii71TLpGDA3albQwWU5lyipNL%2B4WIXvsxsgEclP11XoGDaK4vWhetTplNx6k474isbKNf7lY5L3c9VLGGeCoKSB%2F%2FJ0vLQf5jrdeEHZ6RkdgRCTGSTA'},
        {'name':'账号4','ck':'PHPSESSID=f0k04ufm04r5l0m1ta6l7auimu; udtauth3=5298RUlzquoAiSJy%2FT64Bidep%2FC1OMc9eFOaOMCRBbvTFy6xswITg8wmfYsYd56VHyHod9szWCukFJwI4w1BuEpRcYO%2F2UImpOLs%2FZoIJLUkpPOEmhM3tNFwBAyHvb09HdORGBVsogF52AEXj9lAJti0VRu7cJMfgWX%2Fqzew%2Bk0'}
    ], # ck设置，优先从环境变量中获取，[{'name':'德华','ck':'抓包的ck值'},{'name':'彦祖','ck':'抓包的ck值','uid':'UID_xxx'}]name值随意，方便自己辨认即可。uid是wxpusher一对一通知专属设置，其它情况不要填
    'check_whitelist': ['中建二局','台州人大','漳州市龙文区妇幼保健院','贵州消防', '卓越集团', '宁夏禁毒']
}
"""可乐设置完毕"""

"""点点赚设置"""
ddz_config={
    'max_workers': 5,  # 线程数量设置,设置为5，即最多有5个任务同时进行

    'txbz': 10000,  # 设置提现标准,不低于3000，平台3000起提,设置为8000，即为8毛起提

    'sendable': 1,  # 企业微信推送开关,1为开，0为关开启后必须设置qwbotkey才能运行

    'pushable': 0,  # wxpusher推送开关,1为开，0为关,开启后必须设置pushconfig才能运行

    'delay_time': 30,  # 并发延迟设置,设置为30即每隔30秒新增一个号做任务，直到数量达到max_workers

    'whitelist':['账号1','账号2','账号3','账号4'], # 提现白名单设置,白名单中的账号自动提现，填入ck中的name,['name1','name2']。

    'zfb_account': '', #支付宝账号
    
    'zfb_name': '', #支付宝名字

    'ddzck':[
        {'name':'账号1','PHPSESSID':'420b8b0291044230af456c391dd4df57'},
        {'name':'账号2','PHPSESSID':'087855a53d4b8430346332046d5bd0ee'},
        # {'name':'账号3','PHPSESSID':'579ef690cf696e505d6a2d6235ac48af'},
        # {'name':'账号4','PHPSESSID':'708e6a4de4b27efc941e3a8f2ba4ad73'}
    ], # ck设置，优先从环境变量中获取，[{'name':'xxx','PHPSESSID':'xxx'},{'name':'xxx','PHPSESSID':'xxx','uid':'UID_xxxxx'}]name值随意，方便自己辨认即可。PHPSESSID是抓包数据。uid是wxpusher一对一通知专属设置，其它情况不要填
}
"""点点赚设置完毕"""

"""钢镚设置"""
czgm_config = {
    'printf': 1,  # 实时日志开关,1为开，0为关

    'debug': 1,  # debug模式开关,1为开,0为关

    'max_workers': 4,  # 线程数量设置,设置为5，即最多有5个任务同时进行

    'txbz': 10000,  # 设置提现标准,不低于3000，平台3000起提,设置为8000，即为8毛起提

    'sendable': 1,  # 企业微信推送开关,1为开，0为关开启后必须设置qwbotkey才能运行

    'pushable': 0,  # wxpusher推送开关,1为开，0为关,开启后必须设置pushconfig才能运行

    'delay_time': 30,  # 并发延迟设置,设置为30即每隔30秒新增一个号做任务，直到数量达到max_workers

    'upload': 1,  # 上传检测号信息到服务器设置，1为上传，相应地也可以从云端获取检测号字典；0为不上传， 相应地也不能从云端获取检测号字典

    'blacklist':[], # 提现黑名单设置,黑名单中的账号不进行自动提现，填入ck中的name,['name1','name2']。

    'czgmck':[
        # {'name':'账号1','ck':'gfsessionid=o-0fIvztYfY87ew1FWCwx8ajS6Vg'},
        {'name':'账号2','ck':'gfsessionid=o-0fIv70UF8z5NlS4As5c-eiqpZU'},
        # {'name':'账号3','ck':'gfsessionid=o-0fIv7nisvKpxJpd1h3WrWeOMgQ'},
        # {'name':'账号4','ck':'gfsessionid=o-0fIv8MkoMRq9eqkp9YbP5rYyhk'},
        # {'name':'账号5','ck':'gfsessionid=o-0fIv7GaPu37DyHJWXK758eLX_g'},
        # {'name':'账号6','ck':'gfsessionid=o-0fIvzzst-YwnBGFmGZ8xyB-ITQ'}
     ], # ck设置，[{'name':'xxx','ck':'gfsessionid=xxx'},{'name':'xxx','ck':'gfsessionid=xxx','uid':'UID_xxxxx'}]name值随意，方便自己辨认即可。ck是抓包数据。uid是wxpusher一对一通知专属设置，其它情况不要填
}

"""每天赚设置"""
mtz_config = {
    'debug': 0,  # debug模式开关 1为开，打印调试日志；0为关，不打印

    'max_workers': 2,  # 因为没有服务器验证是否点击链接的机制，建议线程设置为2.线程数量设置 设置为5，即最多有5个任务同时进行

    'txbz': 1000,  # 设置提现标准 不低于3000，平台标准为3000 设置为8000，即为8毛起提

    'sendable': 1,  # 企业微信推送开关 1开0关

    'pushable': 0,  # wxpusher推送开关 1开0关

    'delay_time': 40,  # 并发延迟设置 设置为20即每隔20秒新增一个号做任务，直到数量达到max_workers
    
    'blacklist':[],  # 黑名单中的账号不进行自动提现，填入ck中的name,['name1','name2']，未实名的辅助号专用，可到一定金额再实名提现
    
    'total_num': 5,  # 设置单轮任务最小数量"""设置为18即本轮数量小于18不继续阅读"""

    'mtzv2ck':'', #ck设置，建议填到环境变量或配置文件,多账号用&连接或创建多条变量。name=xxx;ck=share:xxxx&name=xxx;ck=share:xxxx;uid=UID_xxxx，微信和wxpusher群发不用填uid
}
"""智慧元宝设置"""
aio_config = {
    'printf': 1,  # 实时日志开关 1为开，0为关

    'debug': 0,  # debug模式开关 1为开，打印调试日志；0为关，不打印

    'max_workers': 5,  # 线程数量设置 设置为5，即最多有5个任务同时进行

    'txbz': 10000,  # 设置提现标准 不低于3000，平台标准为3000 设置为8000，即为8毛起提

    'sendable': 1,  # 企业微信推送开关 1开0关

    'pushable': 1,  # wxpusher推送开关 1开0关

    'delay_time': 20,  # 并发延迟设置 设置为20即每隔20秒新增一个号做任务，直到数量达到max_workers

    'upload': 0,  # 上传检测号信息到服务器设置，1为上传，可以从云端获取检测号字典；0为不上传， 相应地也不能从云端获取检测号字典
    
    'blacklist':[],  # 黑名单中的账号不进行自动提现，填入ck中的name,['name1','name2']，未实名的辅助号专用，可到一定金额再实名提现

    'ybck':[], # 元宝ck，
    # 'zhck':[], # 智慧ck，
    # 'xkck':[], # 星空ck，
}
"""ck格式：[{'un': 'xxxx', 'token': 'xxxxx','name':'彦祖','uid':'UID_xxx'},] 。uid是wxpusher一对一推送专属，其它无需配置。多账号添加大括号，注意不要漏逗号"""


"""人人帮设置"""
rrb_config = {
    'max_workers': 5,  # 线程数量设置 设置为5，即最多有5个任务同时进行

    'txbz': 10000,  # 设置提现标准 不低于5000，平台标准为5000 设置为5000，即为5毛起提

    'sendable': 1,  # 企业微信推送开关 1开0关

    'pushable': 1,  # wxpusher推送开关 1开0关

    'delay_time': 20,  # 并发延迟设置 设置为20即每隔20秒新增一个号做任务，直到数量达到max_workers

    'rrbck':'', # ck设置，[{'un': 'xxxx', 'token': 'xxxxx','name':'彦祖','uid':'UID_xxx'},] 。uid是wxpusher一对一推送专属，其它无需配置。多账号添加大括号，注意不要漏逗号
}
"""花花设置"""
hh_config = {
    'printf': 1,  # 实时日志开关 1为开，0为关

    'debug': 0,  # debug模式开关 1为开，打印调试日志；0为关，不打印

    'max_workers': 5,  # 线程数量设置 设置为5，即最多有5个任务同时进行

    'txbz': 5000,  # 设置提现标准 不低于3000，平台标准为3000

    'sendable': 1,  # 企业微信推送开关 1开0关

    'pushable': 1,  # wxpusher推送开关 1开0关

    'delay_time': 20,  # 并发延迟设置 设置为20即每隔20秒新增一个号做任务，直到数量达到max_workers

    'upload': 0,  # 上传检测号信息到服务器设置，1为上传，相应地也可以从云端获取检测号字典；0为不上传， 相应地也不能从云端获取检测号字典


    # 'hhck':'', # 花花ck，[{'un': 'xxxx', 'token': 'xxxxx','name':'彦祖','uid':'UID_xxx'},] 。uid是wxpusher一对一推送专属，其它无需配置。多账号添加大括号，注意不要漏逗号
}
