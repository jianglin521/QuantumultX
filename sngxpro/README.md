### 环境变量

# 自定义

# ql repo命令拉取脚本时需要拉取的文件后缀，直接写文件后缀名即可

RepoFileExtensions="js"

# server酱

# export PUSH_KEY=""

# Telegram

export TG_BOT_TOKEN=""
export TG_USER_ID=""

# 每日签到提供3种通知方式,默认2

NotifyBeanSign="1"

## 东东萌宠关闭推送。填写false为不关闭推送，true为关闭推送

export PET_NOTIFY_CONTROL="true"

## 京东农场关闭推送。填写false为不关闭推送，true为关闭推送

export FRUIT_NOTIFY_CONTROL="true"

## 京东领现金关闭推送。填写false为不关闭推送，true为关闭推送

export CASH_NOTIFY_CONTROL="true"

## 京东摇钱树关闭推送。填写false为不关闭推送，true为关闭推送

export MONEYTREE_NOTIFY_CONTROL="true"

## 京东点点券关闭推送。填写false为不关闭推送，true为关闭推送

export DDQ_NOTIFY_CONTROL="true"

## 宠汪汪兑换京豆关闭推送。填写false为不关闭推送，true为关闭推送

export JDZZ_NOTIFY_CONTROL="true"

## 宠汪汪赛跑获胜后是否推送通知。填false为不推送通知消息,true为推送通知消息

export JOY_RUN_NOTIFY="false"

## 京东领现金红包兑换京豆开关。false为不换,true为换(花费2元红包兑换200京豆，一周可换四次)，默认为false

export CASH_EXCHANGE="true"

## 宠汪汪喂食数量。可以填的数字0,10,20,40,80,其他数字不可

export JOY_FEED_COUNT="40"

## 宠汪汪赛跑自己账号内部互助。输入true为开启内部互助

export JOY_RUN_HELP_MYSELF="true"

## 宠汪汪积分兑换多少京豆。目前可填值为20或者500,脚本默认0,0表示不兑换京豆

export JD_JOY_REWARD_NAME="500"

## 东东超市兑换京豆数量。目前可输入值为20或者1000，或者其他商品的名称,例如碧浪洗衣凝珠

export MARKET_COIN_TO_BEANS="1000"

## 疯狂的JOY循环助力开关。true表示循环助力,false表示不循环助力，默认不开启循环助力

export JDJOY_HELPSELF="true"

## 疯狂的JOY京豆兑换。0表示不换,其他按可兑换数填写。目前最小2000

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

## 自动按顺序进行账号间互助（选填） 设置为 true 时，将直接导入code最新日志来进行互助

AutoHelpOther="true"

## 定义 jcode 脚本导出的互助码模板样式（选填）

HelpType="1"

## 参数含义

```shell
  #拉取一个库
  ql repo <repourl> <path> <blacklist> <dependence> <branch>
  #“库地址”“拉哪些”“不拉哪些”“依赖文件”“分支”

  #拉取单个文键
  ql raw <fileurl>
```

```shell
#smiek2121
ql repo https://github.com/smiek2121/scripts.git "gua_opencard"


ql repo https://api.mtr.pub/smiek2121/scripts.git "jd_|gua_" "" "ZooFaker_Necklace.js|JDJRValidator_Pure.js|sign_graphics_validate.js|cleancart_activity.js|jdCookie.js|sendNotify.js"

ql repo https://github.com/jianglin521/QuantumultX.git "ql"

ql repo https://github.com/leafTheFish/DeathNote.git "zqkd_"
```

# 依赖安装

则说明ql面板缺少依赖'form-data'

可以链接服务器后，输入以下命令

```shell
  docker exec -it qinglong bash
  cd scripts
  npm install form-data
  pip3 install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
```

```shell
## 一键安装依赖
docker exec -it qinglong2 bash

curl -fsSL https://ghproxy.com/https://raw.githubusercontent.com/shufflewzc/QLDependency/main/Shell/QLOneKeyDependency.sh | sh
```

## 苹果降级插件

AppStore++ 和 AppAdmin 是 2 款应用降级插件，可以在 App Store 中把应用降级到自己想要的版本。在 iOS 11 或者更早的系统上，我们使用 AppAdmin，在 iOS 12 上使用 AppStore++，该插件支持 A12 设备。

## 中青阅读

<https://github.com/PoetryU/Scientist/tree/master/Scripts/Youth>

## 青龙自动化

<https://github.com/spiritLHL/qinglong_auto_tools.git>

## 修改容器启动方式

docker container update --restart=no qinglong

## find查找文件
>
> 将当前目录及其子目录下所有文件后缀为 `test.md` 的文件列出来:

```shell
find . -name "test.md"
```

## 添加环境变量

```shell
npm install dotenv --save
```

```js
require('dotenv').config()
```

## 添加定时任务

### 用户级任务

```shell
crontab -e
10 18  * * 1-5 /bin/sh /home/projects/JD-Script/run.sh OpenCard  > /home/projects/log/log1.txt 2>&1 &
0 20 * * *  cd /home/projects/QuantumultX && git pull > /home/projects/log/log2.txt 2>&1 &
30 0 * * *  bash /docker/backup/backup.sh > /home/projects/log/log3.txt 2>&1 &
30 1 * * * cd /home/projects/vuepress && npm run deploy2 > /home/projects/log/log4.txt 2>&1 &
```

## sillyGirl

```shell
#停止
ps -A|grep sillyGirl ## 显示进程号
kill -9 xxxxxx ## 杀掉进程
#运行
nohup ./sillyGirl

#一键安装脚本
s=sillyGirl;a=arm64;if [[ $(uname -a | grep "x86_64") != "" ]];then a=amd64;fi ;if [ ! -d $s ];then mkdir $s;fi ;cd $s;wget https://mirror.ghproxy.com/https://github.com/cdle/${s}/releases/download/main/${s}_linux_$a -O $s && chmod 777 $s;pkill -9 $s;$(pwd)/$s
```

## shellClash

[教程地址](https://juewuy.github.io/zai-linux-xi-tong-an-zhuang-ji-shi-yong-shellclash-de-jiao-cheng/
)

```shell
#By github
export url='https://raw.githubusercontent.com/juewuy/ShellClash/master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
#By jsdelivrCDN
export url='https://cdn.jsdelivr.net/gh/juewuy/ShellClash@master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

## 重启docker服务

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## clash自定义规则

- DOMAIN-SUFFIX,google.com.hk,🚀 节点选择
- DOMAIN-SUFFIX,google.com,🚀 节点选择
- DOMAIN-SUFFIX,youtube.com,🚀 节点选择
- DOMAIN-SUFFIX,paoluz.link,🚀 节点选择

## linux安装node

[教程地址](https://skyao.gitbooks.io/learning-gitbook/content/installation/nodejs.html)

```shell
tar xvf node-v16.13.1-linux-x64.tar.xz
```

## nas-tools

<https://github.com/jxxghp/nas-tools>

## 羊毛

https://github.com/qianmo8/au01