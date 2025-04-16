const { StrmService } = require('./strm');
const { EmbyService } = require('./emby');
const { logTaskEvent } = require('../utils/logUtils');
const ConfigService = require('./ConfigService');

class TaskEventHandler {
    constructor(messageUtil) {
        this.messageUtil = messageUtil;
    }

    async handle(taskCompleteEventDto) {
        logTaskEvent(`================触发事件================`);
        try {
            const task = taskCompleteEventDto.task;
            // 执行重命名操作
            await taskCompleteEventDto.taskService.autoRename(taskCompleteEventDto.cloud189, task);
            
            if (ConfigService.getConfigValue('strm.enable')) {
                const strmService = new StrmService();
                const message = await strmService.generate(task, taskCompleteEventDto.fileList, taskCompleteEventDto.overwriteStrm);
                this.messageUtil.sendMessage(message);
            }

            if (ConfigService.getConfigValue('emby.enable')) {
                const embyService = new EmbyService();
                await embyService.notify(task);
            }
        } catch (error) {
            console.error(error);
            logTaskEvent(`任务完成后处理失败: ${error.message}`);
        }
        logTaskEvent(`================事件处理完成================`);
    }
}

module.exports = { TaskEventHandler };