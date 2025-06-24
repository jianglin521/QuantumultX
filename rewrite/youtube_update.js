let body = $response.body;
try {
  let json = JSON.parse(body);
  
  // 删除强制升级提示
  delete json.contents?.twoColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.infoPanelContainerRenderer?.infoPanelContentRenderer;
  
  // 删除顶部警告条
  if (json.header?.messageRenderer) {
    json.header.messageRenderer = null;
  }
  
  $done({ body: JSON.stringify(json) });
} catch (e) {
  $done({ body });
}