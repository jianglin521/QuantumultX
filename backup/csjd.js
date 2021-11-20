/*
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
项目注册地址:http://cs.clrcle.cn/api/webapp/register.html?code=ECY5A1
可以0撸 可以投资  可以推广
三种收益叠加
每天看广告0撸三个节点
一个节点等于一块钱
每天分红节点的2%
提现门槛：满10元即可提现
csjdPhone:手机号#密码
export csjdPhone='手机号#密码'
boxjs地址:https://raw.fastgit.org/byxiaopeng/myscripts/main/byxiaopeng.boxjs.json
*/

// [task_local]
//#创视节点
// 9 10 * * * https://raw.fastgit.org/byxiaopeng/myscripts/main/csjd.js, tag=创视节点, enabled=true
const $ = new Env('创视节点APP');
let status;
status = (status = ($.getval("csjdstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let csjdPhoneArr = []
let csjdPhone = $.isNode() ? (process.env.csjdPhone ? process.env.csjdPhone : "") : ($.getdata('csjdPhone') ? $.getdata('csjdPhone') : "")
let csjdPhones = ""
let DD = RT(30000, 50000);
let tz = ($.getval('tz') || '1');
$.message = ''
let host=`http://cs.clrcle.cn`
//
!(async () => {
  if (typeof $request !== "undefined") {
    // csjdck()
  } else {
    if (!$.isNode()) {
      csjdPhoneArr.push($.getdata('csjdPhone'))
      let csjdcount = ($.getval('csjdcount') || '1');
      for (let i = 2; i <= csjdcount; i++) {
        csjdPhoneArr.push($.getdata(`csjdPhone${i}`))
      }
      console.log(`-------------共${csjdPhoneArr.length}个账号-------------\n`)
      for (let i = 0; i < csjdPhoneArr.length; i++) {
        if (csjdPhoneArr[i]) {
          csjdPhone = csjdPhoneArr[i];
          $.index = i + 1;
          console.log(`\n开始【创视节点账户 ${$.index}】`)
          zhanghu = csjdPhone.split('#')
          user = zhanghu[0]
          mima = zhanghu[1]
          await uid()
          await $.wait(3000)
          await login()//登录
        }
      }
    } else {
      if (process.env.csjdPhone && process.env.csjdPhone.indexOf('@') > -1) {
        csjdPhoneArr = process.env.csjdPhone.split('@');
        console.log(`您选择的是用"@"隔开\n`)
      } else {
        csjdPhones = [process.env.csjdPhone]
      };
      Object.keys(csjdPhones).forEach((item) => {
        if (csjdPhones[item]) {
          csjdPhoneArr.push(csjdPhones[item])
        }
      })
      console.log(`共${csjdPhoneArr.length}个账号`)
      for (let k = 0; k < csjdPhoneArr.length; k++) {
        $.message = ""
        csjdPhone = csjdPhoneArr[k]
        $.index = k + 1;
        console.log(`\n开始【创视节点账户 ${$.index}】`)
        zhanghu = csjdPhone.split('#')
        user = zhanghu[0]
        mima = zhanghu[1]
        await uid()
        await $.wait(3000)
        await login()//登录获取token
      }
    }
  }
  message()
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//随机生成32位字母和数字
function uid() {
  $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  maxPos = $chars.length;
  pwd = '';
  for (i = 0; i < 32; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  verifyId = pwd
}
//登录
function login(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/app/authentication/login`,
      headers: {
        "Authorization": "",
        "Connection":"keep-alive",
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent":"Nokia X7(Android/9) (com.vision.creativevision/1.0.7) Weex/0.26.0 1080x2034",
    },
      body: `loginName=${user}&password=${mima}&verifyId=${verifyId}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.code == 0) {
          console.log(`\n【登录状态】: ${result.msg}`)
          token = result.data
          await $.wait(3000)
          await info()//昨天个人信息
          await $.wait(3000)
          await hasIncome()//领取分成
          await $.wait(3000)
          await personalDetails()//今天账户信息
        } else {
          console.log(`\n【登录状态】: ${result.msg}`)
        }
      } catch (e) {
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//账户信息
function info(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/app/api/customer_ext/personalDetails`,
      headers: {
        "Authorization": token,
        "Connection":"keep-alive",
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent":"Nokia X7(Android/9) (com.vision.creativevision/1.0.7) Weex/0.26.0 1080x2034",
    },
    }
    $.get(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.code == 0) {
          $.log(`\n【欢迎吊毛用户】：${result.data.nickName}`)
          $.log(`\n【昨天账户节点】：${result.data.customerNode}`)
          $.message += `\n【欢迎吊毛用户】：${result.data.nickName}`
          $.message += `\n【昨天账户节点】：${result.data.customerNode}`
          if (result.data.advertDayCount == 3) {
            $.log(`\n【任务状态】：今日已完成任务`)
            $.message += `\n【任务状态】：今日已完成任务`
          } else {
            $.log(`【任务状态】：还有3条视频广告未观看`)
            await addAdvertDayCount()
          }
        } else {
          console.log(`\n【账户信息】: ${result.msg}`)
        }
      } catch (e) {
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//看广告
function addAdvertDayCount(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/app/api/customer_ext/addAdvertDayCount`,
      headers: {
        "Authorization": token,
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": "Nokia X7(Android/9) (com.vision.creativevision/1.0.7) Weex/0.26.0 1080x2034",
      },
      body: `verifyId=`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.msg == '操作成功') {
          $.log(`\n【开始看广告信息】`)
          await $.wait(DD)
          await addAdvertDayCount()
        } else {
          console.log(`\n【全部广告观看完成】`)
          $.message += `\n【全部广告观看完成】`
        }
      } catch (e) {
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//分成金额
function hasIncome(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/app/api/income/hasIncome`,
      headers: {
        "Authorization": token,
        "Connection":"keep-alive",
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent":"Nokia X7(Android/9) (com.vision.creativevision/1.0.7) Weex/0.26.0 1080x2034",
    },
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.code == 0) {
          $.log(`\n【分成金额】：${result.data}`)
          $.message += `\n【分成金额】：${result.data}`
          await $.wait(5000)
          await receiveIncome()
        } else {
          console.log(`\n【分成金额获取失败】`)
          $.message += `\n【分成金额获取失败】`
        }
      } catch (e) {
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//领取分成
function receiveIncome(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/app/api/income/receiveIncome`,
      headers: {
        "Authorization": token,
        "Connection":"keep-alive",
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent":"Nokia X7(Android/9) (com.vision.creativevision/1.0.7) Weex/0.26.0 1080x2034",
    },
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.code == 0) {
          $.log(`【领取分成成功】`)
          $.message += `【领取分成成功】`
          await $.wait(5000)
        } else {
          console.log(`\n【领取分成失败】：${result.msg}`)
          $.message += `\n【领取分成失败】：${result.msg}`
        }
      } catch (e) {
      } finally {
        resolve()
      }
    }, timeout)
  })
}


//账户信息2
function personalDetails(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/app/api/customer_ext/personalDetails`,
      headers: {
        "Authorization": token,
        "Connection":"keep-alive",
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent":"Nokia X7(Android/9) (com.vision.creativevision/1.0.7) Weex/0.26.0 1080x2034",
    },
    }
    $.get(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.code == 0) {
          $.log(`\n【今天账户节点】：${result.data.customerNode}`)
          $.message += `\n【今天账户节点】：${result.data.customerNode}`
        } else {
          console.log(`\n【账户信息】: ${result.msg}`)
        }
      } catch (e) {
      } finally {
        resolve()
      }
    }, timeout)
  })
}

function RT(X, Y) {
  do rt = Math.floor(Math.random() * Y);
  while (rt < X)
  return rt;
}

function message() {
  if (tz == 1) { $.msg($.name, "", $.message) }
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
