

"""可乐设置"""
kl_config={
    'max_workers': 5,  # 线程数量设置,设置为5，即最多有5个任务同时进行

    'txbz': 5000,  # 设置提现标准,不低于3000，平台3000起提,设置为8000，即为8毛起提

    'sendable': 1,  # 企业微信推送开关,1为开，0为关开启后必须设置qwbotkey才能运行

    'pushable': 0,  # wxpusher推送开关,1为开，0为关,开启后必须设置pushconfig才能运行

    'delay_time': 30,  # 并发延迟设置,设置为30即每隔30秒新增一个号做任务，直到数量达到max_workers

    'blacklist':[], # 提现黑名单设置,黑名单中的账号不自动提现，填入ck中的name,['name1','name2']。

    'klck':[
        {'name':'账号1','ck':'PHPSESSID=7nhpbphb5ssmdnhjg3h65uk2kr; udtauth3=c21aGCSRmfw9NcWbEH8meocJqswYo%2Bi0uihYphBipX%2BubOcsaG0q%2BjK8aY9n3PTuWdnbXwM0UJQrecXdOGnOLywZx0wkg7f31Qb0HFhEIX%2FYnQ88cMi3LhLdhkIQZGNUvuOnfMRrrk6Q1GyW67Y%2FsLh33vQJhszzk%2BnfW9BU5Yg'},
        {'name':'账号2','ck':'PHPSESSID=5s6k7ma8u73blut13s2j053ubl; udtauth3=eb9fz5HUhggK6kiOynUGn9Ty3Qv%2B1OU4xNGww63YlEEBA7p04IiZXcWmRx0PWTXg4w809cc0Ae8%2BY1TmZLaJ10tyGDyfYx4%2FlQN7643dm%2BmBUvG1wiJde6Zmc7G1974obpxufQ%2Fc2bjX7ytRkLOAo7zqzVdfzpWJN60LSol1Yww'},
        {'name':'账号3','ck':'PHPSESSID=to8epfaeg5f4ktst2hd18esaq0; udtauth3=8967cQBVPWiKl0xpUeR5%2F117FALvdSUIO3BGOdL%2FQrByTos8nRQjLFKf%2BfSjEHjYAgJAsHBBtokygU%2FQiZYn1ER7TYhdsbNStjgoB0tsq8%2BRgFySouuNPxc3ijsYYolt4MAtCl3O0tI%2FJZ4SosxqaCM3vl6aZra8wQDbAauFjQQ'},
        {'name':'账号4','ck':'PHPSESSID=kbpj7kas9r5pv2dc89rruh0pqg; udtauth3=ba70AsEbbq%2BcV34qotKHZbyDGgsWWPelOW%2FqxM90kgcwG0%2BUuycf7QqiSQ%2BDu9%2BGIdP2F0qFP20SrbYOphEsTJgKJODzJ1Kiud9chctNmHHk4LJMLYVRqyJlWm6Rrau4nICUdWHNwnU8I%2FupFiJTVGWkGCO%2BZDlEQ6RuL2P9%2Fxk'}
    ], # ck设置，优先从环境变量中获取，[{'name':'德华','ck':'抓包的ck值'},{'name':'彦祖','ck':'抓包的ck值','uid':'UID_xxx'}]name值随意，方便自己辨认即可。uid是wxpusher一对一通知专属设置，其它情况不要填
}
"""可乐设置完毕"""

"""企业微信设置"""
qwbotkey='b8192657-506a-449e-9caa-bf538785e924'  # 脚本优先从环境变量获取，没有获取到再从此处获取。已实装脚本：钢镚、每天赚

"""wxpusher设置"""
pushconfig = {"appToken":"","topicids":[]} 
"""脚本优先从环境变量获取，没有获取到再从此处获取，"topicids":["123456"],一对一推送无需设置toppicids"""

