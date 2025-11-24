let body = $response.body;
try {
    body = body.replace(/"clientVersion":"[^"]+"/g, '"clientVersion":"999.99.99"');
} catch (e) {}
$done({ body });
