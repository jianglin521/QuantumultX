/*
软件名称:成语全套 
更新时间：2021-11-25 @肥皂
脚本说明：成语全套
需要多个游戏玩的就用v2p玩。我自己的v2p用不了boxjs，不知道抽什么疯，就没写boxjs
如果你要玩成语大学士，就在容器1添加脚本，专门抓成语大学士的数据。
如果要玩成语大师，就在容器2添加脚本，专门抓成语大师的数据。以此类推。。。。

因为没写boxjs，需要多开的，自己在v2p里面添加变量。

v2p找到 jsmanage  - store/cookie 常量列表
在key填写 cyqtstatus  type选择string   内容的话抓第几个账号就填几  （这是控制抓第几个账号的）

在key填写 cyqtcount  type选择string   内容的话运行几个号就填几  （这是控制运行几个账号的）

自动提现的话你提现哪个金额就抓哪个包

 cron自己设置
[rewrite_local]
#成语全套重写
//红包和提现（自行抓取）
.+/redpacket//f/.+ url script-request-body cyqt.js
//（视频数据包）
.+/reward_video/reward/ url script-request-body cyqt.js
[MITM]
hostname = r1.nullpointerexception.cn,api-access.pangolin-sdk-toutiao.com
*/
const $ = new Env('成语全套');
let status;
status = (status = ($.getval("cyqtstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const cyqthdArr = [],cyqtbodyArr = [],cyqttxhdArr = [],cyqttxbodyArr = [],cyqtspbodyArr = [],cyqtcount = ''
let cyqthd = $.getdata('cyqthd')
let cyqtbody = $.getdata('cyqtbody')
let cyqttxhd = $.getdata('cyqttxhd')
let cyqttxbody = $.getdata('cyqttxbody')
let cyqtspbody = $.getdata('cyqtspbody')
const sphd = {
'Accept' : `*/*`,
'Accept-Encoding' : `gzip, deflate, br`,
'Connection' : `keep-alive`,
'Content-Type' : `application/json`,
'Host' : `api-access.pangolin-sdk-toutiao.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
'Accept-Language' : `zh-Hans-CN;q=1`
};
!(async () => {
  if (typeof $request !== "undefined") {
    await cyqtck()
   
  } else {
    cyqthdArr.push($.getdata('cyqthd'))
    cyqtbodyArr.push($.getdata('cyqtbody'))
    cyqttxhdArr.push($.getdata('cyqttxhd'))
    cyqttxbodyArr.push($.getdata('cyqttxbody'))     
    cyqtspbodyArr.push($.getdata('cyqtspbody'))
    let cyqtcount = ($.getval('cyqtcount') || '1');
  for (let i = 2; i <= cyqtcount; i++) {
    cyqthdArr.push($.getdata(`cyqthd${i}`))
    cyqtbodyArr.push($.getdata(`cyqtbody${i}`))
   cyqttxhdArr.push($.getdata(`cyqttxhd${i}`))
    cyqttxbodyArr.push($.getdata(`cyqttxbody${i}`))
    cyqtspbodyArr.push($.getdata(`cyqtspbody${i}`))
  }
    console.log(`------------- 共${cyqthdArr.length}个账号-------------\n`)
      for (let i = 0; i < cyqthdArr.length; i++) {
        if (cyqthdArr[i]) {
          cyqthd = cyqthdArr[i];
          cyqtbody = cyqtbodyArr[i];
          cyqttxhd = cyqttxhdArr[i];
          cyqttxbody = cyqttxbodyArr[i];
          cyqtspbody = cyqtspbodyArr[i];
          $.index = i + 1;
          console.log(`\n开始【成语全套${$.index}】`)
   
    
         await cyqtsp();
         

    
    
  }
}}

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//数据获取


function cyqtck() {
   if ($request.url.indexOf("ad/divid") > -1) {
 
  const cyqthd = JSON.stringify($request.headers)
        if(cyqthd)    $.setdata(cyqthd,`cyqthd${status}`)
$.log(cyqthd)
const cyqtbody = $request.body
        if(cyqtbody)    $.setdata(cyqtbody,`cyqtbody${status}`)
$.log(cyqtbody)
   $.msg($.name,"",'成语全套'+`${status}` +'红包数据获取成功！')
  }else if($request.url.indexOf("wechat/cash") > -1) {
 
  const cyqttxhd = JSON.stringify($request.headers)
        if(cyqttxhd)    $.setdata(cyqttxhd,`cyqttxhd${status}`)
$.log(cyqttxhd)
const cyqttxbody = $request.body
        if(cyqttxbody)    $.setdata(cyqttxbody,`cyqttxbody${status}`)
$.log(cyqttxbody)
   $.msg($.name,"",'成语全套'+`${status}` +'提现数据获取成功！')
  }else if ($request.url.indexOf("reward_video/reward/") > -1) {
 
const cyqtspbody = $request.body
        if(cyqtspbody)    $.setdata(cyqtspbody,`cyqtspbody${status}`)
$.log(cyqtspbody)
   $.msg($.name,"",'成语全套'+`${status}` +'视频数据获取成功！')
  }
}

//红包
function cyqthb(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://r1.nullpointerexception.cn/redpacket//f/ad/divident',
        headers : JSON.parse(cyqthd),
        body : cyqtbody,
}
      $.post(url, async (err, resp, data) => {
        try {
    //const result = JSON.parse(data)
        if(resp.statusCode == 200){
  $.log(`\n成语全套:成功领取红包`)
await $.wait(5000)
   await cyqttxhb();
} else {

        $.log(`\n成语全套:领取失败${data}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//提现
function cyqttx(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://r1.nullpointerexception.cn/redpacket//f/wechat/cash',
        headers : JSON.parse(cyqttxhd),
        body : cyqttxbody,
}
      $.post(url, async (err, resp, data) => {
        try {
    //const result = JSON.parse(data)
        if(resp.statusCode == 200){
} else {
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function cyqtsp(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/',
        headers : sphd,
        body : cyqtspbody,
}
      $.post(url, async (err, resp, data) => {
        try {
    const result = JSON.parse(data)
        if(result.cypher == 3){
  $.log(`\n成语全套视频观看成功`)
    await $.wait(5000)
   await cyqthb();
    
} else {

        $.log(`\n成语全套视频观看失败:${data}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
