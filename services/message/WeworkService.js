const got = require('got');
const MessageService = require('./MessageService');

class WeworkService extends MessageService {
    /**
     * 检查服务是否启用
     * @returns {boolean}
     */
    checkEnabled() {
        return !!this.config.webhook;
    }

    /**
     * 实际发送消息
     * @param {string} message - 要发送的消息内容
     * @returns {Promise<boolean>} - 发送结果
     */
    async _send(message) {
        const msg = await this.convertToMarkdown(message)
        try {
            await got.post(this.config.webhook, {
                json: {
                    msgtype: 'text',
                    text: {
                        content: `【天翼自动追更】\n\n${msg}`,
                    }
                }
            }).json();
            return true;
        } catch (error) {
            console.error('企业微信消息推送异常:', error);
            return false;
        }
    }
}

module.exports = WeworkService;