/*
9.16  Tom

软件：  水果消消乐（安卓）    
下载地址：https://wwr.lanzoui.com/iNoc9u2ptlc 密码:5402

收益：  0.3起   秒到秒到！！！！！

跑完任务会自动提现

用小黄鸟抓包   找到headers里的token复制下来

*/



const $ = new Env('水果消消乐');
let status;

status = (status = ($.getval("sgxxlstatus") || "1")) > 1 ? `${status}` : "";

const sgxxlurlArr = [], sgxxlhdArr = [], sgxxlbodyArr = [], sgxxlcount = ''

let sgxxlurl = $.getdata('sgxxlurl')
let sgxxlhd = $.getdata('sgxxlhd')
let sgxxlbody = `game_type=2&package_code=com.yile.jianxianll2&platform_code=lt&time=1613879667&version=1&os=1&sign=267276958a5dd7e807ed8078b67ef865`

//在这里填写你的token
let token = ``

!(async () => {
    if (token != 0) {

        console.log(`\n\n开始【水果消消乐${$.index}】`)
        await qphb()//你要执行的版块  
        await $.wait(1000)//你要延迟的时间  1000=1秒

    } else {

        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`);

        for (let i = 0; i < sgxxlhdArr.length; i++) {

            if (sgxxlhdArr[i]) {

                sgxxlurl = sgxxlurlArr[i];
                sgxxlhd = sgxxlhdArr[i];
                sgxxlbody = sgxxlbodyArr[i];

                $.index = i + 1;
                



            }
        }
    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//获取ck  
function sgxxlck() {
    if ($request.url.indexOf("getLuckyBag") > -1) {
        const sgxxlurl = $request.url
        if (sgxxlurl) $.setdata(sgxxlurl, `sgxxlurl${status}`)
        $.log(sgxxlurl)

        const sgxxlhd = JSON.stringify($request.headers)
        if (sgxxlhd) $.setdata(sgxxlhd, `sgxxlhd${status}`)
        $.log(sgxxlhd)

        const sgxxlbody = $request.body
        if (sgxxlbody) $.setdata(sgxxlbody, `sgxxlbody${status}`)
        $.log(sgxxlbody)

        $.msg($.name, "", `水果消消乐${status}获取headers成功`)

    }
}




//气泡红包
function qphb(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.hcdxg.hnlantu.cn/game/luckybag/getLuckyBag`,
            headers: {"Host": "api.hcdxg.hnlantu.cn",
                "Accept": "*/*",
                "Accept-Encoding": "deflate, gzip",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; EVR-AN00 Build/HUAWEIEVR-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.2883.95 Mobile Safari/537.36 EgretNative",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "token": `${token}`,
                "Content-Length": "131"},
            body: sgxxlbody,
            
        }

        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 20000) {
                 
                 console.log(`观看气泡视频：获得红包券${data.data.reward}\n`)
                 await $.wait(30000)
                 await qphb()

                } else {

                 console.log(`观看气泡视频：${data.msg}\n`)
                 await txid()

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//提现id
function txid(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.hcdxg.hnlantu.cn/activity/cashOut/getList`,
            headers: {"Host": "api.hcdxg.hnlantu.cn",
            "Accept": "*/*",
            "Accept-Encoding": "deflate, gzip",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; EVR-AN00 Build/HUAWEIEVR-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.2883.95 Mobile Safari/537.36 EgretNative",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "token": `${token}`,
            "Content-Length": "131"},
            body: sgxxlbody,
            
        }

        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 20000) {

                 if(data.data.user_redpack >= 3000){
                   console.log(`检测当前余额可提现，即将开始自动提现`)
                   
                 if(data.data.redpack[0].done_times == 0 && data.data.user_redpack >= 3000){
                     txuid = data.data.redpack[0].id
                     console.log(`提现金额：${data.data.redpack[0].money}    ${data.data.redpack[0].info}`)
                     await tx()
                 }
                 if(data.data.redpack[1].done_times == 0 && data.data.user_redpack >= 3000){
                    txuid = data.data.redpack[1].id
                    console.log(`提现金额：${data.data.redpack[1].money}    ${data.data.redpack[1].info}`)
                    await tx()
                }
                if(data.data.redpack[2].done_times == 0 && data.data.user_redpack >= 3000){
                    txuid = data.data.redpack[2].id
                    console.log(`提现金额：${data.data.redpack[2].money}    ${data.data.redpack[2].info}`)
                    await tx()
                }
                if(data.data.redpack[3].done_times == 0 && data.data.user_redpack >= 5000){
                    txuid = data.data.redpack[3].id
                    console.log(`提现金额：${data.data.redpack[3].money}    ${data.data.redpack[3].info}`)
                    await tx()
                }
                if(data.data.redpack[4].done_times == 0 && data.data.user_redpack >= 5000){
                    txuid = data.data.redpack[4].id
                    console.log(`提现金额：${data.data.redpack[4].money}    ${data.data.redpack[4].info}`)
                    await tx()
                }
                if(data.data.redpack[5].done_times == 0 && data.data.user_redpack >= 5000){
                    txuid = data.data.redpack[5].id
                    console.log(`提现金额：${data.data.redpack[5].money}    ${data.data.redpack[5].info}`)
                    await tx()
                }

                 }
                } else {

                 console.log(`获取提现id：${data.msg}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//提现
function tx(timeout = 0) {
    return new Promise((resolve) => {
        txbody = sgxxlbody.replace(/os=1&/g,`id=${txuid}&`)
        let url = {
            url: `https://api.hcdxg.hnlantu.cn/activity/cashOut/exchange`,
            headers: {"Host": "api.hcdxg.hnlantu.cn",
            "Accept": "*/*",
            "Accept-Encoding": "deflate, gzip",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; EVR-AN00 Build/HUAWEIEVR-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.2883.95 Mobile Safari/537.36 EgretNative",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "token": `${token}`,
            "Content-Length": "131"},
            body: txbody,
            
        }

        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 20000) {
                 
                 console.log(`提现成功，将继续执行提现任务\n`)
                 await $.wait(30000)
                 await txid()

                } else {

                 console.log(`提现失败\n`)
                 

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}





//env模块    不要动  
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }