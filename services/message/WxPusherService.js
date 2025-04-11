const got = require('got');
const MessageService = require('./MessageService');

class WxPusherService extends MessageService {
    /**
     * 检查服务是否启用
     * @returns {boolean}
     */
    checkEnabled() {
        return !!this.config.spt;
    }

    /**
     * 实际发送消息
     * @param {string} message - 要发送的消息内容
     * @returns {Promise<boolean>} - 发送结果
     */
    async _send(message) {
        try {
            const url = "https://wxpusher.zjiecode.com/api/send/message/simple-push";
            const msg = await this.convertToMarkdown(message)
            const data = {
                summary: "天翼云盘更新",
                content: msg,
                content_type: 3,
                spt: this.config.spt
            };
            const resp = await got.post(url, {
                json: data
            }).json();
            return true;
        } catch (error) {
            console.error('WxPusher消息推送异常:', error);
            return false;
        }
    }
}

module.exports = WxPusherService;