const { HttpsProxyAgent } = require('https-proxy-agent');
const { HttpProxyAgent } = require('http-proxy-agent');
const got = require('got');
const MessageService = require('./MessageService');

class TelegramService extends MessageService {
    /**
     * 检查服务是否启用
     * @returns {boolean}
     */
    checkEnabled() {
        return !!(this.config.botToken && this.config.chatId);
    }
    /**
     * 配置代理信息
     */
    _proxy() {
        let proxy = ''
         // 处理代理配置
         if (this.config.proxy) {
            const { type = 'http', host, port, username, password } = this.config.proxy;
            if (host && port) {
                let proxyUrl = `${type}://${host}:${port}`;
                if (username && password) {
                    proxyUrl = `${type}://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}`;
                }
                proxy = proxyUrl;
            }
        }
        return !proxy?{}:{
            http: new HttpProxyAgent(proxy),
            https: new HttpsProxyAgent(proxy)
        }
    }


    /**
     * 实际发送消息
     * @param {string} message - 要发送的消息内容
     * @returns {Promise<boolean>} - 发送结果
     */
    async _send(message) {
        try {
            const msg = await this.convertToMarkdown(message)
            const requestOptions = {
                json: {
                    chat_id: this.config.chatId,
                    text: msg,
                    parse_mode: 'Markdown'
                },
                timeout: {
                    request: 5000
                },
                agent: this._proxy()
            };

            let apiUrl = 'https://api.telegram.org';
            if (this.config.cfProxyDomain) {
                requestOptions.proxy = false;
                apiUrl = this.config.cfProxyDomain;
            }

            await got.post(`${apiUrl}/bot${this.config.botToken}/sendMessage`, requestOptions).json();
            return true;
        } catch (error) {
            console.error('Telegram消息推送异常:', error);
            return false;
        }
    }
}

module.exports = TelegramService;