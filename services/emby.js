const got = require('got');
const { logTaskEvent } = require('../utils/logUtils');
const ConfigService = require('./ConfigService');
// emby接口
class EmbyService {
    constructor() {
        this.embyUrl = ConfigService.getConfigValue('emby.serverUrl');
        this.embyApiKey = ConfigService.getConfigValue('emby.apiKey');
    }

    async notify(embyId, name) {
        logTaskEvent(`执行Emby通知: ${name}`);
        // 如果存在embyId 则直接通知, 不存在则根据名称搜索
        if (embyId) {
            await this.refreshItemById(embyId);
            return embyId;
        } else {
            const result = await this.searchItemsByName(name);
            logTaskEvent(`Emby搜索结果: ${ JSON.stringify(result)}`);
            if (result && result.Items && result.Items.length > 0) {
                await this.refreshItemById(result.Items[0].Id);
                return result.Items[0].Id
            }else{
                logTaskEvent(`Emby未搜索到电影/剧集: ${name}, 执行全库扫描`);
                await this.refreshAllLibraries();
                return null;
            }
        }
    }


    // 1. /emby/Items 根据名称搜索
    async searchItemsByName(name) {
        name = this._cleanMediaName(name);
        const url = `${this.embyUrl}/emby/Items`;
        const params = {
            SearchTerm: name,
            IncludeItemTypes: 'Movie,Series',
            Recursive: true,
            Fields: "Name",
        }
        const response = await this.request(url, {
            method: 'GET',
            searchParams: params,
        })
        return response;
    }

    // 2. /emby/Items/{ID}/Refresh 刷新指定ID的剧集/电影
    async refreshItemById(id) {
        const url = `${this.embyUrl}/emby/Items/${id}/Refresh`;
        await this.request(url, {
            method: 'POST',
        })
        return true;
    }

    // 3. 刷新所有库
    async refreshAllLibraries() {
        const url = `${this.embyUrl}/emby/Library/Refresh`;
        await this.request(url, {
            method: 'POST',
        })
        return true;
    }

    // 统一请求接口
    async request(url, options) {
        try {
            const headers = {
                'Authorization': 'MediaBrowser Token="' + this.embyApiKey + '"',
            }
            const response = await got(url, {
                method: options.method,
                headers: headers,
                responseType: 'json',
                searchParams: options?.searchParams,
                form: options?.form,
                json: options?.json,
                throwHttpErrors: false // 禁用自动抛出HTTP错误
            });

            if (response.statusCode === 401) {
                logTaskEvent(`Emby认证失败: API Key无效`);
                return null;
            } else if (response.statusCode < 200 || response.statusCode >= 300) {
                logTaskEvent(`Emby接口请求失败: 状态码 ${response.statusCode}`);
                return null;
            }
            return response.body;
        } catch (error) {
            logTaskEvent(`Emby接口请求异常: ${error.message}`);
            return null;
        }
    }

    // 处理媒体名称，去除年份、清晰度等信息
    _cleanMediaName(name) {
        return name
            // 移除括号内的年份，如：沙尘暴 (2025)
            .replace(/\s*[\(\[【］\[]?\d{4}[\)\]】］\]]?\s*/g, '')
            // 移除清晰度标识，如：4K、1080P、720P等
            .replace(/\s*[0-9]+[Kk](?![a-zA-Z])/g, '')
            .replace(/\s*[0-9]+[Pp](?![a-zA-Z])/g, '')
            // 移除其他常见标识，如：HDR、HEVC等
            .replace(/\s*(HDR|HEVC|H265|H264|X265|X264|REMUX)\s*/gi, '')
            // 移除额外的空格
            .trim();
    }

}
module.exports = { EmbyService };