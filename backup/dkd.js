/*
TG: https://t.me/tom_ww
2021-10-19 --AngelEver
 软件app名称：多看点(目前只写了一部分，一天1-2元，后续会抓紧写)
脚本地址：https://raw.githubusercontent.com/AngelEver/AutoCodeRepository/main/AngelEver_Water_dkd.js
 青龙面板：
 dkdck可以进去app点“我的”，找请求下的body
 dkdheader大部分请求都有的header
 多账号@分隔
 example:
 export dkdck='params=fTDrU1pt2u2nNuvL2xxxxx%2F%0A@params=fTDrU1pt2u2nNuvL2m0xxxxxE%2BgD%2F%0A'
 export dkdheaders='eyJvcyI6Ik9uZVBsdXMixxxxx6IuWkmueci@eyJvcyI6Ik9uZVBsdXMixxxxx6IuWkmueci'
 拉脚本新增任务命令(每天一次，持续更新，时间不限)：ql raw https://raw.githubusercontent.com/AngelEver/AutoCodeRepository/main/AngelEver_Water_dkd.js
 
 v2p:
  1.暂时不支持自动抓包，需要手动抓上面的两个key，很简单！
  2.抓好存一下然后添加一下task就可以执行了。
  3.多账号@分隔
  
  脚本执行定时全都一致，一小时一次或者两小时一次

  dkdck：
  抓包的url(大多数包都有这个body) ，举个例子
  https://dkd-api.dysdk.com/video/red_countdown
  找到的body不会太长，大概长度在70-80个字符左右，如果body里面带有斜杠/，请去  http://www.jsons.cn/urlencode/  网站进行一下 UrlEncode编码

  dkdheader：
  抓包的url(大多数包都有这个header) ，举个例子
  https://dkd-api.dysdk.com/video/red_countdown，点进去请求头headerInfo的值复制出来即可，一般是ey开头
  
  另：1.这个脚本目前只写了获取百分之四十的金币，后续的会抓紧继续写出来。
     2.有其它毛也可以喊我写。
 */


const $ = new Env('多看点');

let dkdck= $.isNode() ? (process.env.dkdck ? process.env.dkdck : "") : ($.getdata('dkdck') ? $.getdata('dkdck') : "");
let dkdckArr = []
let dkdcks = ""

let dkdheader= $.isNode() ? (process.env.dkdheader ? process.env.dkdheader : "") : ($.getdata('dkdheader') ? $.getdata('dkdheader') : "");
let  dkdheaderArr= []
let dkdheaders = ""



if (!dkdck) {
    console.log(`空的呀兄弟\n`)
    $.done()
}
else if (dkdck.indexOf("@") == -1 && dkdck.indexOf("@") == -1) {
    dkdckArr.push(dkdck)
}
else if (dkdck.indexOf("@") > -1) {
    dkdcks = dkdck.split("@")
}
else if (process.env.dkdck && process.env.dkdck.indexOf('@') > -1) {
    dkdckArr = process.env.dkdck.split('@');
    console.log(`您选择的是用"@"隔开\n`)
}
else {
    dkdcks = [process.env.dkdck]
};
Object.keys(dkdcks).forEach((item) => {
    if (dkdcks[item]) {
    dkdckArr.push(dkdcks[item])
}
})

if (!dkdheader) {
    console.log(`空的呀兄弟\n`)
    $.done()
}
else if (dkdheader.indexOf("@") == -1 && dkdheader.indexOf("@") == -1) {
    dkdheaderArr.push(dkdck)
}
else if (dkdheader.indexOf("@") > -1) {
    dkdheaders = dkdheader.split("@")
}
else if (process.env.dkdheader && process.env.dkdheader.indexOf('@') > -1) {
    dkdheaderArr = process.env.dkdheader.split('@');
    console.log(`您选择的是用"@"隔开\n`)
}
else {
    dkdheaders = [process.env.dkdheader]
};
Object.keys(dkdheaders).forEach((item) => {
    if (dkdheaders[item]) {
    dkdheaderArr.push(dkdheaders[item])
}
})

var commonHeader = {}
var body=''

function toType( obj ) {
    if ( obj == null ) {
        return obj + "";
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
    class2type[ toString.call( obj ) ] || "object" :
        typeof obj;
}

function createPositionalPseudo( fn ) {
    return markFunction( function( argument ) {
        argument = +argument;
        return markFunction( function( seed, matches ) {
            var j,
                matchIndexes = fn( [], seed.length, argument ),
                i = matchIndexes.length;

            // Match elements found at the specified indexes
            while ( i-- ) {
                if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
                    seed[ j ] = !( matches[ j ] = seed[ j ] );
                }
            }
        } );
    } );
}

function testContext( context ) {
    return context && typeof context.getElementsByTagName !== "undefined" && context;
}

function stripAndCollapse( value ) {
    var tokens = value.match( rnothtmlwhite ) || [];
    return tokens.join( " " );
}

function getClass( elem ) {
    return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
    if ( Array.isArray( value ) ) {
        return value;
    }
    if ( typeof value === "string" ) {
        return value.match( rnothtmlwhite ) || [];
    }
    return [];
}

function buildParams( prefix, obj, traditional, add ) {
    var name;

    if ( Array.isArray( obj ) ) {

        // Serialize array item.
        jQuery.each( obj, function( i, v ) {
            if ( traditional || rbracket.test( prefix ) ) {

                // Treat each array item as a scalar.
                add( prefix, v );

            } else {

                // Item is non-scalar (array or object), encode its numeric index.
                buildParams(
                    prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                    v,
                    traditional,
                    add
                );
            }
        } );

    } else if ( !traditional && toType( obj ) === "object" ) {

        // Serialize object item.
        for ( name in obj ) {
            buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
        }

    } else {

        // Serialize scalar item.
        add( prefix, obj );
    }
}

function addToPrefiltersOrTransports( structure ) {

    // dataTypeExpression is optional and defaults to "*"
    return function( dataTypeExpression, func ) {

        if ( typeof dataTypeExpression !== "string" ) {
            func = dataTypeExpression;
            dataTypeExpression = "*";
        }

        var dataType,
            i = 0,
            dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

        if ( isFunction( func ) ) {

            // For each dataType in the dataTypeExpression
            while ( ( dataType = dataTypes[ i++ ] ) ) {

                // Prepend if requested
                if ( dataType[ 0 ] === "+" ) {
                    dataType = dataType.slice( 1 ) || "*";
                    ( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

                    // Otherwise append
                } else {
                    ( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
                }
            }
        }
    };
}

function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

    var inspected = {},
        seekingTransport = ( structure === transports );

    function inspect( dataType ) {
        var selected;
        inspected[ dataType ] = true;
        jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
            var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
            if ( typeof dataTypeOrTransport === "string" &&
                !seekingTransport && !inspected[ dataTypeOrTransport ] ) {

                options.dataTypes.unshift( dataTypeOrTransport );
                inspect( dataTypeOrTransport );
                return false;
            } else if ( seekingTransport ) {
                return !( selected = dataTypeOrTransport );
            }
        } );
        return selected;
    }

    return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

!(async () => {
    if (typeof $request !== "undefined") {
    console.log('1111')
    $.done()
} else {
    for (let k = 0; k < dkdckArr.length; k++) {
        console.log(`--------第 ${k + 1} 个账号收益查询中--------\n`)
        body=dkdckArr[k];
        var header=dkdheaderArr[k];
        commonHeader = {
            "Host": "dkd-api.dysdk.com",
            'Content-Type': 'application/x-www-form-urlencoded',
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept": "*/*",
            "Accept-Language": "zh-cn",
            "User-Agent": "okhttp/3.12.10",
            'headerInfo':header
        }
        await information()
        await welfare()
        await cashIndex()
        await sign()
        await signDouble()
        await red_getaward()
        await award()
        await box_award()
        await box_extra()
        await refresh()
        await start()
        await extra_get()
        await extra_time()
        await extra_again()
        await card()
        await cardDouble()
        await taskawardVideo()
        var arr = ["1", "2", "3", "11", "16", "12", "21", "22", "23"];
        let num="1";
        for (var i = 0; i < arr.length; i++) {
            num = arr[i];
            await taskaward(num);
            await taskawardDouble(num);
            await $.wait(4000);
        }
        await $.wait(30000);
        console.log("\n\n")
    }

}
})()
    .catch((e) => $.logErr(e))
.finally(() => $.done())

function ajaxExtend( target, src ) {
    var key, deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};

    for ( key in src ) {
        if ( src[ key ] !== undefined ) {
            ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
        }
    }
    if ( deep ) {
        jQuery.extend( true, target, deep );
    }

    return target;
}


function information(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/user/index',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                console.log('\n当前用户名称为:'+result.data.nickname)
            console.log('\n当前账号金币总额为:'+result.data.cash)
    console.log('\n今日获取金币为:'+result.data.today_gold)
} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function ajaxHandleResponses( s, jqXHR, responses ) {

    var ct, type, finalDataType, firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;

    // Remove auto dataType and get content-type in the process
    while ( dataTypes[ 0 ] === "*" ) {
        dataTypes.shift();
        if ( ct === undefined ) {
            ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
        }
    }

    // Check if we're dealing with a known content-type
    if ( ct ) {
        for ( type in contents ) {
            if ( contents[ type ] && contents[ type ].test( ct ) ) {
                dataTypes.unshift( type );
                break;
            }
        }
    }

    // Check to see if we have a response for the expected dataType
    if ( dataTypes[ 0 ] in responses ) {
        finalDataType = dataTypes[ 0 ];
    } else {

        // Try convertible dataTypes
        for ( type in responses ) {
            if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
                finalDataType = type;
                break;
            }
            if ( !firstDataType ) {
                firstDataType = type;
            }
        }

        // Or just use first one
        finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if ( finalDataType ) {
        if ( finalDataType !== dataTypes[ 0 ] ) {
            dataTypes.unshift( finalDataType );
        }
        return responses[ finalDataType ];
    }
}



function ajaxConvert( s, response, jqXHR, isSuccess ) {
    var conv2, current, conv, tmp, prev,
        converters = {},

    // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice();

    // Create converters map with lowercased keys
    if ( dataTypes[ 1 ] ) {
        for ( conv in s.converters ) {
            converters[ conv.toLowerCase() ] = s.converters[ conv ];
        }
    }

    current = dataTypes.shift();

    // Convert to each sequential dataType
    while ( current ) {

        if ( s.responseFields[ current ] ) {
            jqXHR[ s.responseFields[ current ] ] = response;
        }

        // Apply the dataFilter if provided
        if ( !prev && isSuccess && s.dataFilter ) {
            response = s.dataFilter( response, s.dataType );
        }

        prev = current;
        current = dataTypes.shift();

        if ( current ) {

            // There's only work to do if current dataType is non-auto
            if ( current === "*" ) {

                current = prev;

                // Convert response if prev dataType is non-auto and differs from current
            } else if ( prev !== "*" && prev !== current ) {

                // Seek a direct converter
                conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                // If none found, seek a pair
                if ( !conv ) {
                    for ( conv2 in converters ) {

                        // If conv2 outputs current
                        tmp = conv2.split( " " );
                        if ( tmp[ 1 ] === current ) {

                            // If prev can be converted to accepted input
                            conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                converters[ "* " + tmp[ 0 ] ];
                            if ( conv ) {

                                // Condense equivalence converters
                                if ( conv === true ) {
                                    conv = converters[ conv2 ];

                                    // Otherwise, insert the intermediate dataType
                                } else if ( converters[ conv2 ] !== true ) {
                                    current = tmp[ 0 ];
                                    dataTypes.unshift( tmp[ 1 ] );
                                }
                                break;
                            }
                        }
                    }
                }

                // Apply converter (if not an equivalence)
                if ( conv !== true ) {

                    // Unless errors are allowed to bubble, catch and return them
                    if ( conv && s.throws ) {
                        response = conv( response );
                    } else {
                        try {
                            response = conv( response );
                        } catch ( e ) {
                            return {
                                state: "parsererror",
                                error: conv ? e : "No conversion from " + prev + " to " + current
                            };
                        }
                    }
                }
            }
        }
    }

    return { state: "success", data: response };
}

function welfare(timeout = 0) {
    return new Promise((resolve) => {
   
            let url = {
                url: 'http://dkd-api.dysdk.com/welfare/index',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                let taskList=result.data.DataTask.list;
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].id == 22) {//await finish_task('1');
            if(taskList[i].comp_times==3){console.log('三次广告已经完成')}else { console.log('doTask')}
        }
    }
    let redList=result.data.DataRed.list;
    for (var i = 0; i < redList.length; i++) {
        if (redList[i].num == 9) {
            if(redList[i].status==0){console.log('翻卡已经完成')}else {console.log('doTask')}
        }
    }
} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function cashIndex(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/cash/index',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                let DataLimitList=result.data.DataLimit.list;
    for (var i = 0; i < DataLimitList.length; i++) {
        if (DataLimitList[i].id == 2) {
            if(DataLimitList[i].comp_times==5){console.log('五次广告已经完成(活动可能过期,以页面为准)')}else {console.log('五次广告未完成,去做')}
        }
    }
} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function sign(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/cash/sign',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){console.log('\n执行签到任务,奖励金币为:'+result.data.sign_award)}else {console.log('\n签到任务已完成')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function signDouble(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/cash/sign_double',
                headers: commonHeader,
                body: 'adType=2&num=0&task_id=0&red_level=0&id=0&type=0&uuid=&tid=0&'+body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){console.log('\n执行双倍签到任务,奖励金币为:'+result.data.award)}else {console.log('\n双倍签到任务已完成')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function red_getaward(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/video/red_getaward',
                headers: commonHeader,
                body: 'adType=2&'+body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){console.log('\n执行周期自动领任务,奖励金币为:'+result.data.award)}else {console.log('\n不满足领取条件')}
} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function award(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/read/award',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){if(result.data.award== undefined){console.log('\n小说阅读奖励任务已完成')}else {console.log('\n执行小说阅读奖励任务,奖励金币为:'+result.data.award)}}else {console.log('\n小说阅读奖励任务已完成')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function box_award(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/red/box_award',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){console.log('\n执行视频宝箱任务,奖励金币为:'+result.data.award)}else {console.log('\n未满足领取时长')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function box_extra(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/red/box_extra',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){console.log('\n执行视频宝箱翻倍任务,奖励金币为:'+result.data.award)}else {console.log('\n未满足领取时长')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function refresh(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/lotto/index?'+body,
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){console.log('\n执行转盘抽奖刷新,剩余抽奖次数为:'+result.data.times)}else {console.log('\n转盘抽奖刷新失败')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function start(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/lotto/start',
                headers: commonHeader,
                body: 'adType=2&'+body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){console.log('\n执行转盘抽奖任务,本次抽奖奖励为:'+result.data.award)}else {console.log('\n转盘抽奖失败,次数不足')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function extra_get(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/video/extra_get',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){if(result.data.award== undefined){console.log('\n阅读时段奖励,明日再来')}else {console.log('\n阅读时段奖励,奖励金币为:'+result.data.award)}}else {console.log('\n阅读时段奖励,观看时间不足')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function extra_time(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/video/extra_time',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){if(result.data.award== undefined){console.log('\n阅读额外奖励,明日再来')}else {console.log('\n阅读额外奖励,奖励金币为:'+result.data.award)}}else {console.log('\n阅读额外奖励,观看时间不足')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function extra_again(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/video/extra_again?'+'adType=2&red_level=0&id=0&type=0&uuid=&tid=0&'+body,
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){if(result.data.award== undefined){console.log('\n阅读额外再次奖励,明日再来')}else {console.log('\n阅读额外再次奖励,奖励金币为:'+result.data.award)}}else {console.log('\n阅读额外再次奖励,先领取时段奖励再来')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function card(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/welfare/card',
                headers: commonHeader,
                body: body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){if(result.data.award== undefined){console.log('\n执行打卡任务,打卡时间还未到')}else {console.log('\n执行打卡任务,本次奖励为:'+result.data.award)}}else {console.log('\n执行打卡任务,今日打卡次数上限')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}


function cardDouble(timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/welfare/card_double',
                headers: commonHeader,
                body:'adType=2&num=2&task_id=2&red_level=2&id=2&type=2&uuid=&tid=2&'+ body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if(result.status_code==200){if(result.data.award== undefined){console.log('\n执行打卡领翻倍任务,打卡时间还未到')}else {console.log('\n执行打卡任务,本次奖励为:'+result.data.award)}}else {console.log('\n执行打卡双倍任务,重复领取')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function taskawardVideo(timeout = 0) {
    return new Promise((resolve) => {
            let num=3;
    let url = {
        url: 'http://dkd-api.dysdk.com/cash/taskaward',
        headers: commonHeader,
        body:"adType=2&num="+num+"&task_id="+num+"&red_level="+num+"&id="+num+"&type="+num+"&uuid=&tid="+num+"&"+body,
    }
    $.post(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.status_code==200){if(result.data.award== undefined){console.log('\n执行专属视频观看任务,没领到')}else {console.log('\n执行专属视频观看任务,本次奖励为:'+result.data.award)}}else {console.log('\n执行专属视频观看任务,今日已领完，明天再来!')}

} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function taskaward(num,timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/cash/taskaward',
                headers: commonHeader,
                body:"extra=&task_id="+num+"&"+body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                console.log(result)
        } catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function taskawardDouble(num,timeout = 0) {
    return new Promise((resolve) => {
            let url = {
                url: 'http://dkd-api.dysdk.com/cash/taskaward_double',
                headers: commonHeader,
                body:"adType=2&num="+num+"&task_id="+num+"&red_level="+num+"&id="+num+"&type="+num+"&uuid=&tid="+num+"&"+body,
            }
            $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)

            } catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function finish_task(ciphertext,timeout = 0) {
    return new Promise((resolve) => {
            console.log('1111')
    let url = {
        url: 'http://dkd-api.dysdk.com/task/finish_task',
        headers: commonHeader,
        body: ciphertext,
    }
    $.post(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            console.log(result)
        if(result.status_code==200){if(result.data.award== undefined){console.log('\n执行看图任务成功')}else {console.log('\n执行看图任务成功')}}else {console.log('\n看图失败')}
} catch (e) {
    } finally {
        resolve()
    }
},timeout)
})
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}


