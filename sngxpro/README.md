## 少年歌行
~~https://raw.githubusercontent.com/sngxpro/QuanX/master/task/AllinOne.json~~
https://raw.githubusercontent.com/Youthsongs/QuanX/master/task/AllinOne.json

https://raw.githubusercontent.com/Youthsongs/QuanX/master/sngx2021.conf

## v2p-ios
https://raw.githubusercontent.com/Youthsongs/QuanX/master/V2pTaskSub/sngxprov2p.json

https://raw.githubusercontent.com/ziye888/JavaScript/main/elev2p.json

## v2p-安卓
https://ghproxy.com/https://raw.githubusercontent.com/Youthsongs/QuanX/master/V2pTaskSub/v2pAndroid.json

https://ghproxy.com/https://raw.githubusercontent.com/Youthsongs/QuanX/master/Android/rewrite/getcookie.conf

## 全网各大佬boxjs地址查询对照 2021.3.22
https://raw.githubusercontent.com/baibaikk/lxk0301/main/lxk0301.boxjs.json

https://raw.githubusercontent.com/toulanboy/scripts/master/toulanboy.boxjs.json

https://raw.githubusercontent.com/Sunert/Scripts/master/Task/sunert.boxjs.json

https://raw.githubusercontent.com/zZPiglet/Task/master/zZPiglet.boxjs.json

https://raw.githubusercontent.com/chavyleung/scripts/master/box/chavy.boxjs.json

https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/box.js.json

https://raw.githubusercontent.com/NobyDa/Script/master/NobyDa_BoxJs.json

https://raw.githubusercontent.com/whyour/hundun/master/quanx/whyour.boxjs.json

https://raw.githubusercontent.com/photonmang/quantumultX/master/photonmang.boxjs.json

https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/ZhiYi-N.boxjs.json

https://raw.githubusercontent.com/CenBoMin/GithubSync/main/cenbomin.box.json

https://raw.githubusercontent.com/DD-D1/2020scripts/master/box/dd.signboxjs.js

https://raw.githubusercontent.com/age174/-/main/feizao.box.json

https://raw.githubusercontent.com/6Svip120apk69/gitee_q8qsTAUA_cThxc1RBVUE/main/Task/ziye.boxjs.json

https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/evilbutcher.boxjs.json

https://raw.githubusercontent.com/ztxtop/x/main/ztxtop.boxjs.json

#京东会员卡
https://raw.githubusercontent.com/anker1209/Scriptable/main/Jd_unbindCard.conf

## 红包 

软件名：红包     一天3~5元   cron设置每10分钟一次

食用方法：首页看一个视频，等待获取红包即可  

签到没有写，就写了看视频，想要提现1元需要签到5天
/////////////////////////////////////////////////////////////////////////////
撸了不一定有，不撸肯定没有！
TG频道 https://t.me/tom_ww     

boxjs地址 ： https://raw.githubusercontent.com/xl2101200/-/main/tom.box.json  
/////////////////////////////////////////////////////////////////////////////
v2p配置

【REWRITE】
匹配链接（正则表达式） https://hbapi.qudianyue.com/video
对应重写目标   https://raw.githubusercontent.com/xl2101200/-/main/hbsp.js
【MITM】  
hbapi.qudianyue.com


## 安装hello-world
```sh
# 安装
docker pull hello-world
# 查看版本、大小
docker image ls
# 运行
docker run hello-world
# 查看运行服务
docker container ls
# 删除镜像
docker image rm hello-world
```

## 青龙常用环境变量备份表，方便随时查询
https://mp.weixin.qq.com/s/rti_XyXzwaxrm0uqed68Jg

### 环境变量
#自定义
#ql repo命令拉取脚本时需要拉取的文件后缀，直接写文件后缀名即可
RepoFileExtensions="js"

#server酱
#export PUSH_KEY=""

#Telegram
export TG_BOT_TOKEN=""
export TG_USER_ID=""

#每日签到提供3种通知方式,默认2
NotifyBeanSign="1"

##东东萌宠关闭推送。填写false为不关闭推送，true为关闭推送
export PET_NOTIFY_CONTROL="true"

##京东农场关闭推送。填写false为不关闭推送，true为关闭推送
export FRUIT_NOTIFY_CONTROL="true"

##京东领现金关闭推送。填写false为不关闭推送，true为关闭推送
export CASH_NOTIFY_CONTROL="true"

##京东摇钱树关闭推送。填写false为不关闭推送，true为关闭推送
export MONEYTREE_NOTIFY_CONTROL="true"

##京东点点券关闭推送。填写false为不关闭推送，true为关闭推送
export DDQ_NOTIFY_CONTROL="true"

##宠汪汪兑换京豆关闭推送。填写false为不关闭推送，true为关闭推送
export JDZZ_NOTIFY_CONTROL="true"

##宠汪汪赛跑获胜后是否推送通知。填false为不推送通知消息,true为推送通知消息
export JOY_RUN_NOTIFY="false"

##京东领现金红包兑换京豆开关。false为不换,true为换(花费2元红包兑换200京豆，一周可换四次)，默认为false
export CASH_EXCHANGE="true"

##宠汪汪喂食数量。可以填的数字0,10,20,40,80,其他数字不可.
export JOY_FEED_COUNT="40"

##宠汪汪赛跑自己账号内部互助。输入true为开启内部互助
export JOY_RUN_HELP_MYSELF="true"

##宠汪汪积分兑换多少京豆。目前可填值为20或者500,脚本默认0,0表示不兑换京豆
export JD_JOY_REWARD_NAME="500"

##东东超市兑换京豆数量。目前可输入值为20或者1000，或者其他商品的名称,例如碧浪洗衣凝珠
export MARKET_COIN_TO_BEANS="1000"

##疯狂的JOY循环助力开关。true表示循环助力,false表示不循环助力，默认不开启循环助力。
export JDJOY_HELPSELF="true"

##疯狂的JOY京豆兑换。0表示不换,其他按可兑换数填写。目前最小2000。
export JDJOY_APPLYJDBEAN="2000"

### 账号互助
name_js=(
  JDHelloWorld_jd_scripts_jd_fruit
  JDHelloWorld_jd_scripts_jd_pet
  JDHelloWorld_jd_scripts_jd_plantBean
  JDHelloWorld_jd_scripts_jd_dreamFactory
  JDHelloWorld_jd_scripts_jd_jdfactory
  JDHelloWorld_jd_scripts_jd_jdzz
  JDHelloWorld_jd_scripts_jd_crazy_joy
  JDHelloWorld_jd_scripts_jd_jxnc
  JDHelloWorld_jd_scripts_jd_bookshop
  JDHelloWorld_jd_scripts_jd_cash
  JDHelloWorld_jd_scripts_jd_sgmh
  JDHelloWorld_jd_scripts_jd_cfd
  JDHelloWorld_jd_scripts_jd_health
)

<!-- name_js=(
  jd_fruit
  jd_pet
  jd_plantBean
  jd_dreamFactory
  jd_jdfactory
  jd_jdzz
  jd_crazy_joy
  jd_jxnc
  jd_bookshop
  jd_cash
  jd_sgmh
  jd_cfd
  jd_health
) -->

##自动按顺序进行账号间互助（选填） 设置为 true 时，将直接导入code最新日志来进行互助
AutoHelpOther="true"

##定义 jcode 脚本导出的互助码模板样式（选填）
HelpType="1"

## 青龙拉取常用京东脚本库，公众号少年歌行pro整理
6月6日新增了 【Ariszy（Zhiyi-N）】库

【lxk0301】
~~ql repo https://github.com/chinnkarahoi/jd_scripts.git "jd_|jx_|getJDCookie" "activity|backUp" "^jd[^_]|USER"~~
~~ql repo https://ghproxy.com/https://github.com/panghu999/jd_scripts.git "jd_|jx_|getJDCookie" "activity|backUp" "^jd[^_]|USER"~~

【JDHelloWorld】
ql repo https://github.com/JDHelloWorld/jd_scripts "jd_|jx_|getJDCookie" "activity|backUp" "^jd[^_]|USER"

【大佬修复脚本仓库】
ql repo https://github.com/photonmang/quantumultX.git "JDscripts"

【龙珠】
ql repo https://github.com/longzhuzhu/nianyu.git "qx" “main”

【混沌】
ql repo https://github.com/whyour/hundun.git "quanx" "tokens|caiyun|didi|donate|fold|Env"

【passerby-b】（需要配合专用ck文件）
ql repo https://github.com/passerby-b/JDDJ.git "jddj_" "scf_test_event" "jddj_cookie"

【温某某】
~~ql repo https://github.com/Wenmoux/scripts.git "jd"~~
ql repo https://github.com/Wenmoux/scripts.git "jd" "" "" "wen"

【柠檬（胖虎）】
ql repo https://github.com/panghu999/panghu.git "jd_"

【zoopanda（动物园）】
ql repo https://github.com/zooPanda/zoo.git "zoo"

【Ariszy（Zhiyi-N）】

ql repo https://github.com/Ariszy/Private-Script.git "JD"

【ddo（hyzaw）】

ql repo https://github.com/hyzaw/scripts.git "ddo_"

【翻翻乐提现单文件】
~~ql raw https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_ffl.js~~

【star261】
ql repo https://github.com/star261/jd.git "scripts" "code" 























