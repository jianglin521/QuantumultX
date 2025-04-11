const fs = require('fs').promises;
const path = require('path');
const ConfigService = require('./ConfigService');
const { logTaskEvent } = require('../utils/logUtils');

class StrmService {
    constructor() {
        this.baseDir = path.join(__dirname + '../../../strm');
        // 从环境变量获取 PUID 和 PGID，默认值设为 0
        this.puid = process.env.PUID || 0;
        this.pgid = process.env.PGID || 0;
    }

    /**
     * 生成 STRM 文件
     * @param {Array} files - 文件列表，每个文件对象需包含 name 属性
     * @param {boolean} overwrite - 是否覆盖已存在的文件
     * @returns {Promise<Array>} - 返回生成的文件列表
     */
    async generate(task, files, overwrite = false) {
        logTaskEvent(`开始生成STRM文件, 总文件数: ${files.length}`);
        const results = [];
        let success = 0;
        let failed = 0;
        let skipped = 0;
        try {
            // 确保基础目录存在
            await fs.mkdir(this.baseDir, { recursive: true });
            // 设置基础目录权限
            await fs.chown(this.baseDir, parseInt(this.puid), parseInt(this.pgid));
            await fs.chmod(this.baseDir, 0o775);

            // mediaSuffixs转为小写
            const mediaSuffixs = ConfigService.getConfigValue('task.mediaSuffix').split(';').map(suffix => suffix.toLowerCase())
            for (const file of files) {
                // 检查文件是否是媒体文件
                if (!this._checkFileSuffix(file, mediaSuffixs)) {
                    logTaskEvent(`文件不是媒体文件，跳过: ${file.name}`);
                    skipped++
                    continue;
                }
                const taskName = task.realFolderName.substring(task.realFolderName.indexOf('/') + 1)
                try {
                    const fileName = file.name;
                    const parsedPath = path.parse(fileName);
                    const dirPath = parsedPath.dir;
                    const fileNameWithoutExt = parsedPath.name;
                    
                    // 构建完整的目标目录路径
                    const targetDir = path.join(this.baseDir,task.account.localStrmPrefix, taskName, dirPath);
                    // 确保目标目录存在
                    await fs.mkdir(targetDir, { recursive: true });
                    // 设置目录权限
                    await fs.chown(targetDir, parseInt(this.puid), parseInt(this.pgid));
                    await fs.chmod(targetDir, 0o775);
                    const strmPath = path.join(targetDir, `${fileNameWithoutExt}.strm`);

                    // 检查文件是否存在
                    try {
                        await fs.access(strmPath);
                        if (!overwrite) {
                            logTaskEvent(`STRM文件已存在，跳过: ${strmPath}`);
                            skipped++
                            continue;
                        }
                    } catch (err) {
                        // 文件不存在，继续处理
                    }

                    // 生成STRM文件内容
                    const content = path.join(task.account.cloudStrmPrefix,taskName,fileName);
                    await fs.writeFile(strmPath, content, 'utf8');
                    // 设置文件权限
                    await fs.chown(strmPath, parseInt(this.puid), parseInt(this.pgid));
                    await fs.chmod(strmPath, 0o664);
                    results.push({
                        originalFile: fileName,
                        strmFile: `${fileNameWithoutExt}.strm`,
                        path: strmPath
                    });
                    logTaskEvent(`生成STRM文件成功: ${strmPath}`);
                    success++
                } catch (error) {
                    logTaskEvent(`生成STRM文件失败: ${file.name}, 错误: ${error.message}`);
                    failed++
                }
            }
        } catch (error) {
            logTaskEvent(`生成STRM文件失败: ${error.message}`);
            failed++
        }
        // 记录文件总数, 成功数, 失败数, 跳过数
        const message = `🎉生成STRM文件完成, 总文件数: ${files.length}, 成功数: ${success}, 失败数: ${failed}, 跳过数: ${skipped}`
        logTaskEvent(message);
        return message;
    }

    /**
     * 删除STRM文件
     * @param {string} fileName - 原始文件名
     * @returns {Promise<void>}
     */
    async delete(fileName) {
        const parsedPath = path.parse(fileName);
        const dirPath = parsedPath.dir;
        const fileNameWithoutExt = parsedPath.name;
        const strmPath = path.join(this.baseDir, dirPath, `${fileNameWithoutExt}.strm`);
        
        try {
            await fs.unlink(strmPath);
            logTaskEvent(`删除STRM文件成功: ${strmPath}`);
            
            // 尝试删除空目录
            const targetDir = path.join(this.baseDir, dirPath);
            const files = await fs.readdir(targetDir);
            if (files.length === 0) {
                await fs.rmdir(targetDir);
                logTaskEvent(`删除空目录: ${targetDir}`);
            }
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw new Error(`删除STRM文件失败: ${error.message}`);
            }
        }
    }
    // 删除目录
    async deleteDir(dirPath) {
        try {
            const targetDir = path.join(this.baseDir, dirPath);
            await fs.rm(targetDir, { recursive: true });
            logTaskEvent(`删除STRM目录成功: ${targetDir}`);

            // 检查并删除空的父目录
            const parentDir = path.dirname(targetDir);
            try {
                const files = await fs.readdir(parentDir);
                if (files.length === 0) {
                    await fs.rm(parentDir, { recursive: true });
                    logTaskEvent(`删除空目录: ${parentDir}`);
                }
            } catch (err) {
                
            }
        } catch (error) {
            logTaskEvent(`删除STRM目录失败: ${error.message}`);
        }
    }
    //检查文件是否是媒体文件
    _checkFileSuffix(file, mediaSuffixs) {
         // 获取文件后缀
         const fileExt = '.' + file.name.split('.').pop().toLowerCase();
         return mediaSuffixs.includes(fileExt)
    }
}

module.exports = { StrmService };