// 通知触发的 JS，在 webUI->SETTING 中进行添加
// 功能:
//   - 过滤通知
//   - 自定义个性化通知
//   - 其他 JS 能做的事
//
// 通过通知触发的 JS 默认带有三个变量 $title$, $body$, $url$（v3.4.5 之后可使用 $env.title/$env.body/$env.url 读取）
// 通过通知触发的 JS 除 $feed.push 函数不可用之外（防止循环调用），其他默认参数/环境变量都可以直接使用
// （具体查看: https://github.com/elecV2/elecV2P-dei/blob/master/docs/04-JS.md）
const axios = require("axios");
const DD_BOT_TOKEN = "";
const DD_BOT_SECRET = "";
const timeout = 15000; //超时时间(单位毫秒)
const container_name = '容器1'

if ($env.title && $env.body) {
  console.log('脚本获取到的通知内容:', $env.title, $env.body, $env.url)
  ddBotNotify($env.title, $env.body, $env.url)
  // 简单过滤
  if (/重要/.test($env.title)) {
    // 使用 $enable$ 强制发送通知 
    $feed.bark('$enable$【重要通知】 ' + $env.title, $env.body, $env.url)
  } else if (/userid/.test($env.title)) {
    $feed.cust('$enable$特别通知 - ' + $env.title, $env.body, $env.url)
  } else if (/测试/.test($env.title)) {
    $message.success(`一条网页消息 -来自通知触发的 JS\n【标题】 ${$env.title} 【内容】 ${$env.body}\n${$env.url}`, 0)
  }

  if (/elecV2P/.test($env.body)) {
    // 对通知内容进行修改
    $env.body = $env.body.replace('elecV2P', 'https://github.com/elecV2/elecV2P')
    // 然后通过自定义通知发送
    ddBotNotify($env.title, $env.body, $env.url)
  }
} else {
  console.log('没有 $env.title', '该 JS 应该由通知自动触发执行')
}

function ddBotNotify(title, body, url, num) {
  console.log(title, body, url, num, '---------------')
  return new Promise(async (resolve) => {
    const options = {
      method: 'post',
      url: `https://oapi.dingtalk.com/robot/send?access_token=${DD_BOT_TOKEN}`,
      data: {
        "msgtype": "text",
        "text": {
          "content": `${container_name}-${title}\n${body}\n${url}`
        }
      },
      headers: {
        'Content-Type': 'application/json'
      },
      timeout
    }
    if (DD_BOT_TOKEN && DD_BOT_SECRET) {
      const crypto = require('crypto');
      const dateNow = Date.now();
      const hmac = crypto.createHmac('sha256', DD_BOT_SECRET);
      hmac.update(`${dateNow}\n${DD_BOT_SECRET}`);
      const result = encodeURIComponent(hmac.digest('base64'));
      options.url = `${options.url}&timestamp=${dateNow}&sign=${result}`;
      const { data } = await axios(options)
      if (data.errcode === 0) {
        console.log('钉钉发送通知消息成功🎉。\n')
      } else {
        console.log(`${data.errmsg}\n`)
      }
    } else {
      console.log('您未提供钉钉机器人推送所需的DD_BOT_TOKEN或者DD_BOT_SECRET，取消钉钉推送消息通知🚫\n');
      resolve()
    }
  })
}

