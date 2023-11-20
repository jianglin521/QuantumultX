oo0o ='''
cron: 30 */30 8-22 * * *
new Env('f可乐阅读');
活动入口：https://rk1115131229-1322350692.cos.ap-nanjing.myqcloud.com/index.html?upuid=123182
使用方法：
1.入口,WX打开：https://rk1115131229-1322350692.cos.ap-nanjing.myqcloud.com/index.html?upuid=123182
'''#line:7
'''
https://en0327225203-1316423829.cos.ap-nanjing.myqcloud.com/index.html?upuid=123182
若链接微信无法打开，请复制到浏览器复制新链接打开
User_Agent参数使用抓包时账号对应的User_Agent,否则可能出现运行异常
2.打开活动入口，抓包的任意接口cookie参数
3.青龙配置文件，添加本脚本环境变量
填写变量参数时为方便填写可以随意换行
单账户：export klydconfig="[{'name':'备注名','cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx','key':'xxxxxxx','uids':'xxxxxxx','User_Agent':'xxxxx'}]"
多账户：export klydconfig="[
{'name':'备注名','cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx','key':'xxxxxxx','uids':'xxxxxxx','User_Agent':'xxxxx'},
{'name':'备注名','cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx','key':'xxxxxxx','uids':'xxxxxxx','User_Agent':'xxxxx'},
{'name':'备注名','cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx','key':'xxxxxxx','uids':'xxxxxxx','User_Agent':'xxxxx'}
]"
参数说明：
name:备注名随意填写
cookie:打开活动入口，抓包的任意接口headers中的cookie参数
key：每个账号的推送标准，每个账号全阅读只需要一个key,多个账号需要多个key,key永不过期。
为了防止恶意调用key接口，限制每个ip每天只能获取一个key。手机开飞行模式10s左右可以变更ip重新获取key
通过浏览器打开链接获取:http://175.24.153.42:8882/getkey
uids:wxpusher的参数，当一个微信关注了一个wxpusher的推送应用后，会在推送管理后台(https://wxpusher.zjiecode.com/admin/main)的'用户管理-->用户列表'中显示
用户在推送页面点击’我的-->我的UID‘也可以获取
User-Agent:抓包任意接口在headers中看到
4.青龙环境变量菜单，添加本脚wxpusher环境变量(不需要重复添加)
建议使用方式二
方式一：青龙添加环境变量参数 ：
名称 ：push_config
参数 ：{"printf":0,"threadingf":1,"threadingt":3,"appToken":"xxxx"}
方式二：配置文件添加
export push_config="{'printf':0,'threadingf':1,'threadingt':3,'appToken':'xxxx'}"
参数说明：
printf:0是不打印调试日志，1是打印调试日志
threadingf:并行运行账号参数 1并行执行，0顺序执行，并行执行优点，能够并行跑所以账号，加快完成时间，缺点日志打印混乱。
threadingt:并行运行时每个账号的间隔时间默认3s
appToken 这个是填wxpusher的appToken,找不到自己百度

5.本地电脑python运行
在本脚本最下方代码if __name__ == '__main__':下填写
例如
loc_push_config={"printf":0,"threadingf":1,"threadingt":3,"appToken":"xxxx"}
loc_klydconfig=[
{'name':'备注名','cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx','key':'xxxxxxx','uids':'xxxxxxx','User_Agent':'xxxxx'},
{'name':'备注名','cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx','key':'xxxxxxx','uids':'xxxxxxx','User_Agent':'xxxxx'},
{'name':'备注名','cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx','key':'xxxxxxx','uids':'xxxxxxx','User_Agent':'xxxxx'}
]
6.在本脚本最下方代码if __name__ == '__main__':下配置UA变量
User-Agent参数可以抓包任意接口在headers中看到
定时运行每半个小时一次
'''#line:55
import requests #line:56
import re #line:57
import random #line:58
import os #line:59
import threading #line:60
import json #line:61
import hashlib #line:62
import time #line:63
from urllib .parse import urlparse ,parse_qs #line:64
checkDict ={'oneischeck':['第一篇文章','过检测'],}#line:67
def getmsg ():#line:68
    O000OOO0OO0OOO0O0 ='v1.4f'#line:69
    OOO0O0OO00O00OO0O =''#line:70
    try :#line:71
        OO0OO0000O00O0OOO ='http://175.24.153.42:8881/getmsg'#line:72
        O00OOO0OO000O0OO0 ={'type':'zhyd'}#line:73
        OOO0O0OO00O00OO0O =requests .get (OO0OO0000O00O0OOO ,params =O00OOO0OO000O0OO0 )#line:74
        O0O000OO0OO000000 =OOO0O0OO00O00OO0O .json ()#line:75
        O0O0OO000OOOO0OO0 =O0O000OO0OO000000 .get ('version')#line:76
        OO00OOOO0OOO0000O =O0O000OO0OO000000 .get ('gdict')#line:77
        OO0O00O0O00000000 =O0O000OO0OO000000 .get ('gmmsg')#line:78
        print ('系统公告:',OO0O00O0O00000000 )#line:79
        print (f'最新版本{O0O0OO000OOOO0OO0},当前版本{O000OOO0OO0OOO0O0}')#line:80
        print (f'系统的公众号字典{len(OO00OOOO0OOO0000O)}个:{OO00OOOO0OOO0000O}')#line:81
        print (f'本脚本公众号字典{len(checkDict.values())}个:{list(checkDict.keys())}')#line:82
        print ('='*50 )#line:83
    except Exception as OO0OO0OOOOO0O0000 :#line:84
        print (OOO0O0OO00O00OO0O .text )#line:85
        print (OO0OO0OOOOO0O0000 )#line:86
        print ('公告服务器异常')#line:87
def push (O0OO0000O00O0OO0O ,O00O00O0O00OOO000 ,O0O00O00OOOOOOOOO ,OO000O00000OO0OO0 ,OOOO000OOO0000OO0 ,OO0OOO000O0O00000 ):#line:88
    O0O000OOOOO0000OO ='''
<body onload="window.location.href='http://175.24.153.42:8882/lookwxarticle?key=KEY&type=TYPE&wxurl=LINK'">
<p>TEXT</p><br>
<p><a href="http://175.24.153.42:8882/lookstatus?key=KEY&type=TYPE">查看状态</a></p><br>
</body>
    '''#line:94
    OO00000000O0O0OOO =O0O000OOOOO0000OO .replace ('TITTLE',O0OO0000O00O0OO0O ).replace ('LINK',O00O00O0O00OOO000 ).replace ('TEXT',O0O00O00OOOOOOOOO ).replace ('TYPE',OO000O00000OO0OO0 ).replace ('KEY',OO0OOO000O0O00000 )#line:96
    OO0000OOO000O0OO0 ={"appToken":appToken ,"content":OO00000000O0O0OOO ,"summary":O0OO0000O00O0OO0O ,"contentType":2 ,"uids":[OOOO000OOO0000OO0 ]}#line:103
    OO0O00O00OOO0O000 ='http://wxpusher.zjiecode.com/api/send/message'#line:104
    try :#line:105
        OOOOO00OO00000O00 =requests .post (url =OO0O00O00OOO0O000 ,json =OO0000OOO000O0OO0 ).text #line:106
        print ('推送结果：',OOOOO00OO00000O00 )#line:107
        return True #line:108
    except Exception as O0OOOO0OOOO0OO00O :#line:109
        print ('推送失败！')#line:110
        print ('推送结果：',O0OOOO0OOOO0OO00O )#line:111
        return False #line:112
def getinfo (OOO0OO0OO0O0O0O0O ):#line:113
    try :#line:114
        OOO0OOO000OO0O0OO =requests .get (OOO0OO0OO0O0O0O0O )#line:115
        O0000OO0O0000OO00 =re .sub ('\s','',OOO0OOO000OO0O0OO .text )#line:117
        O00OO0OO0O00O00OO =re .findall ('varbiz="(.*?)"\|\|',O0000OO0O0000OO00 )#line:118
        if O00OO0OO0O00O00OO !=[]:#line:119
            O00OO0OO0O00O00OO =O00OO0OO0O00O00OO [0 ]#line:120
        if O00OO0OO0O00O00OO ==''or O00OO0OO0O00O00OO ==[]:#line:121
            if '__biz'in OOO0OO0OO0O0O0O0O :#line:122
                O00OO0OO0O00O00OO =re .findall ('__biz=(.*?)&',OOO0OO0OO0O0O0O0O )#line:123
                if O00OO0OO0O00O00OO !=[]:#line:124
                    O00OO0OO0O00O00OO =O00OO0OO0O00O00OO [0 ]#line:125
        OO0000O000O0O0OOO =re .findall ('varnickname=htmlDecode\("(.*?)"\);',O0000OO0O0000OO00 )#line:126
        if OO0000O000O0O0OOO !=[]:#line:127
            OO0000O000O0O0OOO =OO0000O000O0O0OOO [0 ]#line:128
        O0OO00OOO0OOO0OO0 =re .findall ('varuser_name="(.*?)";',O0000OO0O0000OO00 )#line:129
        if O0OO00OOO0OOO0OO0 !=[]:#line:130
            O0OO00OOO0OOO0OO0 =O0OO00OOO0OOO0OO0 [0 ]#line:131
        O000OOO00O0000O0O =re .findall ("varmsg_title='(.*?)'\.html\(",O0000OO0O0000OO00 )#line:132
        if O000OOO00O0000O0O !=[]:#line:133
            O000OOO00O0000O0O =O000OOO00O0000O0O [0 ]#line:134
        O0O00O0OOO00000OO =f'公众号唯一标识：{O00OO0OO0O00O00OO}|文章:{O000OOO00O0000O0O}|作者:{OO0000O000O0O0OOO}|账号:{O0OO00OOO0OOO0OO0}'#line:135
        print (O0O00O0OOO00000OO )#line:136
        return OO0000O000O0O0OOO ,O0OO00OOO0OOO0OO0 ,O000OOO00O0000O0O ,O0O00O0OOO00000OO ,O00OO0OO0O00O00OO #line:137
    except Exception as O0OOO0000O0O0O00O :#line:138
        print (O0OOO0000O0O0O00O )#line:139
        print ('异常')#line:140
        return False #line:141
class WXYD :#line:142
    def __init__ (OO00OO00O0OOOO00O ,OOO000OO0O000OOOO ):#line:143
        OO00OO00O0OOOO00O .name =OOO000OO0O000OOOO ['name']#line:144
        OO00OO00O0OOOO00O .key =OOO000OO0O000OOOO ['key']#line:145
        OO00OO00O0OOOO00O .uids =OOO000OO0O000OOOO ['uids']#line:146
        OO00OO00O0OOOO00O .User_Agent =OOO000OO0O000OOOO ['User_Agent']#line:147
        OO00OO00O0OOOO00O .headers ={'Accept':'application/json, text/plain, */*','User-Agent':OO00OO00O0OOOO00O .User_Agent ,'Referer':'http://ab1115072245.c0722451115.ww1112001.cn/new?upuid=','Accept-Encoding':'gzip, deflate','Accept-Language':'zh-CN,zh;q=0.9','Cookie':OOO000OO0O000OOOO ['cookie'],}#line:155
    def printjson (O00O00O0000OOO0OO ,O00000OOOOOO0O00O ):#line:156
        if printf ==0 :#line:157
            return False #line:158
        print (O00O00O0000OOO0OO .name ,O00000OOOOOO0O00O )#line:159
    def setstatus (O0OOOO0000O0OOOO0 ):#line:160
        try :#line:161
            OO0OOOO0OO000OO00 ='http://175.24.153.42:8882/setstatus'#line:162
            O000OO00000O0O0O0 ={'key':O0OOOO0000O0OOOO0 .key ,'type':'zhyd','val':'1','ven':oo0o }#line:163
            OOO00OO0OO0OOO000 =requests .get (OO0OOOO0OO000OO00 ,params =O000OO00000O0O0O0 ,timeout =10 )#line:164
            print (O0OOOO0000O0OOOO0 .name ,OOO00OO0OO0OOO000 .text )#line:165
            if '无效'in OOO00OO0OO0OOO000 .text :#line:166
                exit (0 )#line:167
        except Exception as O0O0OO0OOO00O0O0O :#line:168
            print (O0OOOO0000O0OOOO0 .name ,'设置状态异常')#line:169
            print (O0OOOO0000O0OOOO0 .name ,O0O0OO0OOO00O0O0O )#line:170
    def getstatus (O00O00OOO0OOOO0O0 ):#line:172
        try :#line:173
            OO000O0O0OOO00O0O ='http://175.24.153.42:8882/getstatus'#line:174
            OO0000OO000O000O0 ={'key':O00O00OOO0OOOO0O0 .key ,'type':'zhyd'}#line:175
            O00000OO000OOO0OO =requests .get (OO000O0O0OOO00O0O ,params =OO0000OO000O000O0 ,timeout =3 )#line:176
            return O00000OO000OOO0OO .text #line:177
        except Exception as O00000OOO0O0OO0OO :#line:178
            print (O00O00OOO0OOOO0O0 .name ,'查询状态异常',O00000OOO0O0OO0OO )#line:179
            return False #line:180
    def tuijian (OOO00OOOO0000O000 ):#line:181
        O0OO00000OO0O00OO ='http://ab1115131510.c1315101115.ww1112001.cn/tuijian'#line:182
        OOOOO0OOOO00OOO0O =requests .get (O0OO00000OO0O00OO ,headers =OOO00OOOO0000O000 .headers )#line:183
        try :#line:184
            OO0OO0000OOO0000O =OOOOO0OOOO00OOO0O .json ()#line:185
            if OO0OO0000OOO0000O .get ('code')==0 :#line:186
                O00OOO0OO00OO0O0O =OO0OO0000OOO0000O ['data']['user']['username']#line:187
                O00OO0O00OO00000O =float (OO0OO0000OOO0000O ['data']['user']['score'])/100 #line:188
                print (OOO00OOOO0000O000 .name ,f'{O00OOO0OO00OO0O0O}:当前剩余{O00OO0O00OO00000O}元')#line:189
                return True #line:190
            else :#line:191
                print (OOO00OOOO0000O000 .name ,OO0OO0000OOO0000O )#line:192
                print (OOO00OOOO0000O000 .name ,'账号异常0,ck可能失效')#line:193
                return False #line:194
        except Exception as OOOOO0OO0000O000O :#line:195
            print (OOO00OOOO0000O000 .name ,OOOOO0OO0000O000O )#line:196
            print (OOO00OOOO0000O000 .name ,'账号异常1，ck可能失效')#line:197
            return False #line:198
    def get_read_url (OO00O000O00000OO0 ):#line:199
        O0000OOO0O00OOOOO =f'http://ab1115072245.c0722451115.ww1112001.cn/new/get_read_url'#line:200
        OOOO0OOO0OO0O0O0O =requests .get (O0000OOO0O00OOOOO ,headers =OO00O000O00000OO0 .headers )#line:201
        O0O0O0000000O000O =OOOO0OOO0OO0O0O0O .json ()#line:202
        O0O00O000OOOOOO0O =O0O0O0000000O000O .get ('jump')#line:204
        OOO0OOO0OO00O0000 =parse_qs (urlparse (O0O00O000OOOOOO0O ).query )#line:205
        O000O0000O00OO0O0 =urlparse (O0O00O000OOOOOO0O ).netloc #line:206
        O00O0000O00OO00O0 =OOO0OOO0OO00O0000 .get ('iu')[0 ]#line:207
        O0000OOO0O000OOOO ={'Host':O000O0000O00OO0O0 ,'User-Agent':OO00O000O00000OO0 .User_Agent ,'X-Requested-With':'XMLHttpRequest','Accept':'*/*','Referer':O0O00O000OOOOOO0O ,'Accept-Encoding':'gzip, deflate','Accept-Language':'zh-CN,zh;q=0.9',}#line:217
        OOOO0OOO0OO0O0O0O =requests .get (O0O00O000OOOOOO0O ,headers =O0000OOO0O000OOOO )#line:218
        O0000OOO0O000OOOO .update ({'Cookie':f'PHPSESSID={OOOO0OOO0OO0O0O0O.cookies.get("PHPSESSID")}'})#line:219
        return O00O0000O00OO00O0 ,O000O0000O00OO0O0 ,O0000OOO0O000OOOO #line:220
    def do_read (O0OOOOOOO00OOO0O0 ):#line:222
        O00OOOOO0OOO00OO0 =O0OOOOOOO00OOO0O0 .get_read_url ()#line:223
        O0OOOOOOO00OOO0O0 .jkey =''#line:224
        OOOO0O0000O00O00O =0 #line:225
        while True :#line:226
            O0OOOOOOO00OOO0O0 .tuijian ()#line:227
            OO0OOO00O00OOOO00 =f'?for=&zs=&pageshow&r={round(random.uniform(0, 1), 17)}&iu={O00OOOOO0OOO00OO0[0]}{O0OOOOOOO00OOO0O0.jkey}'#line:228
            O0OO0OO00O0O00O0O =f'http://{O00OOOOO0OOO00OO0[1]}/tuijian/do_read{OO0OOO00O00OOOO00}'#line:229
            O0OOOOOOO00OOO0O0 .printjson (O0OO0OO00O0O00O0O )#line:230
            OO0O0000OOO00OOOO =requests .get (O0OO0OO00O0O00O0O ,headers =O00OOOOO0OOO00OO0 [2 ])#line:231
            print (O0OOOOOOO00OOO0O0 .name ,'-'*50 )#line:233
            OOO0OO00O000000O0 =OO0O0000OOO00OOOO .json ()#line:234
            if OOO0OO00O000000O0 .get ('msg'):#line:235
                print (O0OOOOOOO00OOO0O0 .name ,'弹出msg',OOO0OO00O000000O0 .get ('msg'))#line:236
            OO0000O0OOOO000O0 =OOO0OO00O000000O0 .get ('url')#line:237
            if OO0000O0OOOO000O0 =='close':#line:238
                print (O0OOOOOOO00OOO0O0 .name ,f'阅读结果：{OOO0OO00O000000O0.get("success_msg")}')#line:239
                return True #line:240
            if 'weixin'in OO0000O0OOOO000O0 :#line:241
                print (O0OOOOOOO00OOO0O0 .name ,f'上一篇阅读结果：{OOO0OO00O000000O0.get("success_msg","开始阅读或者异常")}')#line:242
                OOOOO0OO0000O0OOO =OOO0OO00O000000O0 .get ('jkey')#line:243
                O0OOOOOOO00OOO0O0 .jkey =f'&jkey={OOOOO0OO0000O0OOO}'#line:244
                OOO0O0O00OO0OOOOO =getinfo (OO0000O0OOOO000O0 )#line:245
                if OOOO0O0000O00O00O ==0 :#line:246
                    O0O0O0OOOO0O0O0OO =list (OOO0O0O00OO0OOOOO )#line:247
                    O0O0O0OOOO0O0O0OO [4 ]='oneischeck'#line:248
                    if O0OOOOOOO00OOO0O0 .testCheck (O0O0O0OOOO0O0O0OO ,OO0000O0OOOO000O0 )==False :#line:249
                        return False #line:250
                    OOOO0O0000O00O00O =1 #line:251
                if O0OOOOOOO00OOO0O0 .testCheck (OOO0O0O00OO0OOOOO ,OO0000O0OOOO000O0 )==False :#line:252
                    return False #line:253
                O0O0OO00OOO000000 =random .randint (6 ,9 )#line:254
                print (O0OOOOOOO00OOO0O0 .name ,f'本次模拟读{O0O0OO00OOO000000}秒')#line:255
                time .sleep (O0O0OO00OOO000000 )#line:256
            else :#line:257
                print (O0OOOOOOO00OOO0O0 .name ,'未知结果')#line:258
                print (O0OOOOOOO00OOO0O0 .name ,OOO0OO00O000000O0 )#line:259
                break #line:260
    def testCheck (O000O0O00O000O000 ,OO0O00O0O00OOO0OO ,OOO0OOOOO0O0OO00O ):#line:261
        if OO0O00O0O00OOO0OO [4 ]==[]:#line:262
            print (O000O0O00O000O000 .name ,'这个链接没有获取到微信号id',OOO0OOOOO0O0OO00O )#line:263
            return True #line:264
        if checkDict .get (OO0O00O0O00OOO0OO [4 ])!=None :#line:265
            O000O0O00O000O000 .setstatus ()#line:266
            for O0O00OOO00O0OO0O0 in range (60 ):#line:267
                if O0O00OOO00O0OO0O0 %30 ==0 :#line:268
                    push (f'可乐阅读过检测:{O000O0O00O000O000.name}',OOO0OOOOO0O0OO00O ,OO0O00O0O00OOO0OO [3 ],'zhyd',O000O0O00O000O000 .uids ,O000O0O00O000O000 .key )#line:269
                O00OOO00000OOO0OO =O000O0O00O000O000 .getstatus ()#line:270
                if O00OOO00000OOO0OO =='0':#line:271
                    print (O000O0O00O000O000 .name ,'过检测文章已经阅读')#line:272
                    return True #line:273
                elif O00OOO00000OOO0OO =='1':#line:274
                    print (O000O0O00O000O000 .name ,f'正在等待过检测文章阅读结果{O0O00OOO00O0OO0O0}秒。。。')#line:275
                    time .sleep (1 )#line:276
                else :#line:277
                    print (O000O0O00O000O000 .name ,O00OOO00000OOO0OO )#line:278
                    print (O000O0O00O000O000 .name ,'服务器异常')#line:279
                    return False #line:280
            print (O000O0O00O000O000 .name ,'过检测超时中止脚本防止黑号')#line:281
            return False #line:282
        else :#line:283
            return True #line:284
    def withdrawal (O0O0OOOOO0O0OOO0O ):#line:285
        OO00O000OO0OO0O00 ='http://ab1115072245.c0722451115.ww1112001.cn/withdrawal'#line:286
        OO00OOOOO0OOO00O0 =requests .get (OO00O000OO0OO0O00 ,headers =O0O0OOOOO0O0OOO0O .headers )#line:287
        O0OOOO00O0OO0000O =OO00OOOOO0OOO00O0 .json ()#line:288
        time .sleep (3 )#line:289
        if O0OOOO00O0OO0000O .get ('code')==0 :#line:290
            OO0O0OOO0OOOOO0O0 =int (float (O0OOOO00O0OO0000O ['data']['user']['score']))#line:291
            if OO0O0OOO0OOOOO0O0 >=2000 :#line:292
                OO0O0OOO0OOOOO0O0 =2000 #line:293
            O0O000O0OOOOO0O00 =O0O0OOOOO0O0OOO0O .headers .copy ()#line:294
            O0O000O0OOOOO0O00 .update ({'Content-Type':'application/x-www-form-urlencoded'})#line:295
            OO00O000OO0OO0O00 ='http://ab1116084433.c0844331116.ww1112004.cn/withdrawal/doWithdraw'#line:296
            OOO0OO0OOO00OO0OO =f'amount={OO0O0OOO0OOOOO0O0}&type=wx'#line:297
            OO00OOOOO0OOO00O0 =requests .post (OO00O000OO0OO0O00 ,headers =O0O000O0OOOOO0O00 ,data =OOO0OO0OOO00OO0OO )#line:298
            print (O0O0OOOOO0O0OOO0O .name ,'提现结果',OO00OOOOO0OOO00O0 .text )#line:299
        else :#line:300
            print (O0O0OOOOO0O0OOO0O .name ,O0OOOO00O0OO0000O )#line:301
    def run (OOOOOOO00O0000O00 ):#line:302
        if hashlib .md5 (oo0o .encode ()).hexdigest ()!='e00d9b235da07e11c89608f0fc8c8e36':OOOOOOO00O0000O00 .setstatus ()#line:303
        if OOOOOOO00O0000O00 .tuijian ():#line:304
            OOOOOOO00O0000O00 .do_read ()#line:305
            time .sleep (2 )#line:306
            OOOOOOO00O0000O00 .withdrawal ()#line:307
def getEnv (O0OOOO00OO00OOOO0 ):#line:308
    O000O0000OOO00O00 =os .getenv (O0OOOO00OO00OOOO0 )#line:309
    if O000O0000OOO00O00 ==None :#line:310
        print (f'{O0OOOO00OO00OOOO0}青龙变量里没有获取到，使用本地参数')#line:311
        return False #line:312
    try :#line:313
        O000O0000OOO00O00 =json .loads (O000O0000OOO00O00 .replace ("'",'"').replace ("\n","").replace (" ","").replace ("\t",""))#line:314
        return O000O0000OOO00O00 #line:315
    except Exception as OOO0000OO0O00000O :#line:316
        print ('错误:',OOO0000OO0O00000O )#line:317
        print ('你填写的变量是:',O000O0000OOO00O00 )#line:318
        print ('请检查变量参数是否填写正确')#line:319
        print (f'{O0OOOO00OO00OOOO0}使用本地参数')#line:320
if __name__ =='__main__':#line:321
    # from dotenv import load_dotenv
    # # 加载环境变量
    # load_dotenv(dotenv_path='.env.local', verbose=True)

    loc_push_config = {"printf": 1, "threadingf": 0, "appToken": "AT_9xxxxxC"}
    loc_klydconfig = [
        {'name': '备注名','cookie': 'PHPSESSID=hcexxxxud; udtauth3=c2b68e9','key': '4e9b9xxxx', 'uids': 'UIDxxxxcQ', 'User_Agent': 'xxxxx'},
        # {'name': '备注名', 'cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx'},
        # {'name': '备注名', 'cookie': 'PHPSESSID=xxxx; udtauth3=a267Rxxxxx'}
    ]
    # --------------------------------------------------------
    push_config = getEnv('push_config')
    if push_config == False: push_config = loc_push_config
    print(push_config)
    klydconfig = getEnv('klydconfig')
    if klydconfig == False: klydconfig = loc_klydconfig
    print(klydconfig)
    printf = push_config.get('printf', 0)  # 打印调试日志0不打印，1打印，若运行异常请打开调试
    appToken = push_config['appToken']  # 这个是填wxpusher的appToken
    threadingf = push_config.get('threadingf', 1)
    getmsg()
    if threadingf == 1:
        tl = []
        for cg in klydconfig:
            print('*' * 50)
            print(f'开始执行{cg["name"]}')
            api = WXYD(cg)
            t = threading.Thread(target=api.run, args=())
            tl.append(t)
            t.start()
            threadingt = push_config.get('threadingt', 3)
            time.sleep(threadingt)
        for t in tl:
            t.join()
    elif threadingf == 0:
        for cg in klydconfig:
            print('*' * 50)
            print(f'开始执行{cg["name"]}')
            api = WXYD(cg)
            api.run()
            print(f'{cg["name"]}执行完毕')
            time.sleep(3)
    else:
        print('请确定推送变量中threadingf参数是否正确')
    print('全部账号执行完成')
    time.sleep(15)
