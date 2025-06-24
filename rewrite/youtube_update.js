const url = $request.url;
if (!url.includes('/youtubei/v1/browse')) $done({});

let body = $response.body;
try {
  let json = JSON.parse(body);
  
  // 删除强制升级弹框
  const cleanForceUpgrade = (data) => {
    if (!data || typeof data !== 'object') return;
    
    // 删除顶级弹框
    if (data.forceUpgradePromptRenderer) {
      delete data.forceUpgradePromptRenderer;
    }
    
    // 深度遍历删除嵌套结构
    for (let key in data) {
      if (key === 'contents' && Array.isArray(data[key])) {
        data[key] = data[key].filter(item => 
          !item?.itemSectionRenderer?.contents?.[0]?.infoPanelContainerRenderer?.infoPanelContentRenderer?.forceUpgradePromptRenderer
        );
      } else if (typeof data[key] === 'object') {
        cleanForceUpgrade(data[key]);
      }
    }
  };
  
  // 处理不同位置的弹框
  cleanForceUpgrade(json.contents);
  cleanForceUpgrade(json.alerts); // 顶部警告条
  cleanForceUpgrade(json.responseContext); // 响应上下文
  
  // 特殊处理2025年新结构
  if (json.frame) {
    json.frame = json.frame.filter(f => 
      !f?.banner?.forceUpgradeBannerRenderer
    );
  }
  
  $done({ body: JSON.stringify(json) });
} catch (e) {
  console.log(`YouTube防升级脚本错误: ${e}`);
  $done({ body });
}