let b = $response.body;

try {
    b = b
        // 强制客户端版本为超高版本
        .replace(/"clientVersion":"[^"]+"/g, '"clientVersion":"999.99.99"')

        // 去掉最低版本限制
        .replace(/"minimumVersion":"[^"]+"/g, '"minimumVersion":"0.0.0"')

        // 移除更新 URL
        .replace(/"updateUrl":"[^"]+"/g, '"updateUrl":""')

        // 移除更新提示（部分版本）
        .replace(/"update":{"show":true/g, '"update":{"show":false')
        .replace(/"update":\{[^}]+\}/g, '"update":{}');
} catch(e){}

$done({ body: b });

