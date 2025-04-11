const got = require('got');
const MessageService = require('./MessageService');

class BarkService extends MessageService {
    /**
     * 检查服务是否启用
     * @returns {boolean}
     */
    checkEnabled() {
        return !!(this.config.serverUrl && this.config.key);
    }

    /**
     * 实际发送消息
     * @param {string} message - 要发送的消息内容
     * @returns {Promise<boolean>} - 发送结果
     */
    async _send(message) {
        try {
            const url = `${this.config.serverUrl}/${this.config.key}`;
            const msg = await this.convertToMarkdown(message)
            const data = {
                title: "天翼云盘更新",
                body: msg
            };
            const resp = await got.post(url, {
                json: data
            }).json();
            return true;
        } catch (error) {
            console.error('Bark消息推送异常:', error);
            return false;
        }
    }
}

module.exports = BarkService;