const WeworkService = require('./WeworkService');
const TelegramService = require('./TelegramService');
const WxPusherService = require('./WxPusherService');
const BarkService = require('./BarkService');

class MessageManager {
    constructor() {
        this.services = [];
    }

    /**
     * 初始化消息服务
     * @param {Object} config - 配置对象
     */
    initialize(config) {
        // 清空现有服务
        this.services = [];

        // 企业微信配置
        if (config.wework?.enabled) {
            const weworkService = new WeworkService({
                webhook: config.wework.webhook
            });
            weworkService.initialize();
            this.services.push(weworkService);
        }

        // Telegram配置
        if (config.telegram?.enabled) {
            const telegramService = new TelegramService({
                botToken: config.telegram.botToken,
                chatId: config.telegram.chatId,
                proxy: config.telegram.proxy,
                cfProxyDomain: config.telegram.cfProxyDomain
            });
            telegramService.initialize();
            this.services.push(telegramService);
        }

        // WxPusher配置
        if (config.wxpusher?.enabled) {
            const wxPusherService = new WxPusherService({
                spt: config.wxpusher.spt
            });
            wxPusherService.initialize();
            this.services.push(wxPusherService);
        }

        // Bark配置
        if (config.bark?.enabled) {
            const barkService = new BarkService({
                serverUrl: config.bark.serverUrl,
                key: config.bark.key
            });
            barkService.initialize();
            this.services.push(barkService);
        }
    }

    /**
     * 发送消息到所有已启用的服务
     * @param {string} message - 要发送的消息内容
     * @returns {Promise<Array<boolean>>} - 各个服务的发送结果
     */
    async sendMessage(message) {
        const results = await Promise.all(
            this.services.map(service => service.sendMessage(message))
        );
        return results;
    }
}

module.exports = new MessageManager();