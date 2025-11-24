let h = $request.headers;

// 伪装成 YouTube 最新版本（随便改成超大版本）
h["User-Agent"] = "com.google.ios.youtube/999.0.0 (iPhone; iOS 18.0)";

// 同时伪装 YouTube Client Version（新版验证用）
h["X-YouTube-Client-Version"] = "999.0.0";

$done({ headers: h });
