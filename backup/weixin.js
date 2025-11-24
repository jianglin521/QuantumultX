let body = $response.body;

if (body) {
  body = body.replace(
    "</script>",
    "setTimeout(()=>window.history.back(),3000);</script>"
  );
}

$done({ body });
