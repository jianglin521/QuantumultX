/**
 * 消息推送服务接口基类
 */
class MessageService {
    constructor(config) {
        this.config = config;
        this.enabled = false;
    }

    /**
     * 初始化服务
     */
    initialize() {
        this.enabled = this.checkEnabled();
    }

    /**
     * 检查服务是否启用
     * @returns {boolean}
     */
    checkEnabled() {
        return false;
    }

    /**
     * 发送消息
     * @param {string} message - 要发送的消息内容
     * @returns {Promise<boolean>} - 发送结果
     */
    async sendMessage(message) {
        if (!this.enabled) {
            return false;
        }
        return await this._send(message);
    }

    /**
     * 实际发送消息的方法，需要被子类实现
     * @param {string} message - 要发送的消息内容
     * @returns {Promise<boolean>} - 发送结果
     */
    async _send(message) {
        throw new Error('_send method must be implemented by subclass');
    }

    /**
     * 转换消息为标准的markdown格式
     * @param {string} message - 要转换的消息内容
     * @returns {string} - 转换后的消息内容
     */
    async convertToMarkdown(message) {
        return message
                // 加粗标题
                .replace(/^(.*?)\/.*更新\d+集/gm, '✅《$1》已更新')
                // 移除 HTML 标签并转换为 Telegram 代码格式
                .replace(/<font color="warning">/g, '')
                .replace(/<\/font>/g, '')
                // 替换引用格式为列表项（确保在新行开始）
                .replace(/>s*/g, '└── 🎞️');
    }

}

module.exports = MessageService;