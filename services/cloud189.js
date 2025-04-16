const { CloudClient, FileTokenStore } = require('cloud189-sdk');
const { logTaskEvent } = require('../utils/logUtils');
const crypto = require('crypto');
const got = require('got');
class Cloud189Service {
    static instances = new Map();

    static getInstance(account) {
        const key = account.username;
        if (!this.instances.has(key)) {
            this.instances.set(key, new Cloud189Service(account));
        }
        return this.instances.get(key);
    }

    constructor(account) {
        const _options = {
            username: account.username,
            password: account.password,
            token: new FileTokenStore(`data/${account.username}.json`)
        }
        if (!account.password && account.cookies) {
            _options.ssonCookie = account.cookies
            _options.password = null   
        }
        this.client = new CloudClient(_options);
       
    }

    // 封装统一请求
    async request(action, body) {
        body.headers = {'Accept': 'application/json;charset=UTF-8'}
        try {
            const noCache = Math.random().toString()
            return await this.client.request('https://cloud.189.cn' + action+'?noCach='+noCache, body).json();
        }catch (error) {
            if (error instanceof got.HTTPError) {
                const responseBody = JSON.parse(error.response.body);
                if (responseBody.res_code === "ShareAuditWaiting") {
                    return responseBody;
                }
                if (responseBody.res_code === "FileAlreadyExists") {
                    return {
                        res_code: "FileAlreadyExists",
                        res_msg: "文件已存在"
                    }
                }
                logTaskEvent('请求天翼云盘接口失败:' + error.response.body);
            }else if (error instanceof got.TimeoutError) {
                logTaskEvent('请求天翼云盘接口失败: 请求超时, 请检查是否能访问天翼云盘');
            }else if(error instanceof got.RequestError) {
                logTaskEvent('请求天翼云盘接口异常: ' + error.message);
            }else{
                logTaskEvent('其他异常:' + error.message)
            }
            return null
        }
    }
    
    async getUserSizeInfo() {
        try {
            return await this.client.getUserSizeInfo()    
        }catch(error) {
            if (error instanceof got.HTTPError) {
                const responseBody = error.response.body;
                logTaskEvent('请求天翼云盘接口失败:'+ responseBody);
            }else if (error instanceof got.TimeoutError) {
                logTaskEvent('请求天翼云盘接口失败: 请求超时, 请检查是否能访问天翼云盘');
            }else if(error instanceof got.RequestError) {
                logTaskEvent('请求天翼云盘接口异常: ' + error.message);
            } else {
                // 捕获其他类型的错误
                logTaskEvent('获取用户空间信息失败:' +  error.message);
            }
            return null
        }
    
    }
    // 解析分享链接获取文件信息
    async getShareInfo(shareCode) {
        return await this.request('/api/open/share/getShareInfoByCodeV2.action' , {
            method: 'GET',
            searchParams: { shareCode }
        })
    }

    // 获取分享目录下的文件列表
    async listShareDir(shareId, fileId, shareMode, accessCode, isFolder = true) {
        return await this.request('/api/open/share/listShareDir.action', {
            method: 'GET',
            searchParams: {
                shareId,
                isFolder: isFolder,
                fileId: fileId,
                orderBy: 'lastOpTime',
                descending: true,
                shareMode: shareMode,
                pageNum: 1,
                pageSize: 1000,
                accessCode
            }
        })
    }

    // 递归获取所有文件列表
    async getShareFiles(shareId, fileId, shareMode, accessCode, isFolder = true) {
        const result = await this.listShareDir(shareId, fileId, shareMode, accessCode, isFolder);
        if (!result || !result.fileListAO.fileList) {
            return [];
        }
        return result.fileListAO.fileList;
    }

    // 搜索个人网盘文件
    async searchFiles(filename) {
        return await this.request('/api/open/share/getShareInfoByCodeV2.action' , {
            method: 'GET',
            searchParams: { 
                folderId: '-11',
                pageSize: '1000',
                pageNum: '1',
                recursive: 1,
                mediaType: 0,
                filename
             }
        })
    }

    // 获取个人网盘文件列表
    async listFiles(folderId) {
        return await this.request('/api/open/file/listFiles.action' , {
            method: 'GET',
            searchParams: { 
                folderId,
                mediaType: 0,
                orderBy: 'lastOpTime',
                descending: true,
                pageNum: 1,
                pageSize: 1000
             }
        })
    }

    // 创建批量执行任务
    async createBatchTask(batchTaskDto) {
        logTaskEvent("创建批量任务")
        logTaskEvent(`batchTaskDto: ${batchTaskDto.toString()}`)
        return await this.request('/api/open/batch/createBatchTask.action', {
            method: 'POST',
            form: batchTaskDto
        })
    }
    // 查询转存任务状态
    async checkTaskStatus(taskId, type = "SHARE_SAVE") {
        const params = {taskId, type}
        return await this.request('/api/open/batch/checkBatchTask.action', {
            method: 'POST',
            form: params,
        })
    }

    // 获取目录树节点
    async getFolderNodes(folderId = '-11') {
        return await this.request('/api/portal/getObjectFolderNodes.action' , {
            method: 'POST',
            form: {
                id: folderId,
                orderBy: 1,
                order: 'ASC'
            },
        })
    }

    // 新建目录
    async createFolder(folderName, parentFolderId) {
        return await this.request('/api/open/file/createFolder.action' , {
            method: 'POST',
            form: {
                parentFolderId: parentFolderId,
                folderName: folderName
            },
        })
    }

     // 验证分享链接访问码
     async checkAccessCode(shareCode, accessCode) {
        return await this.request('/api/open/share/checkAccessCode.action' , {
            method: 'GET',
            searchParams: {
                shareCode,
                accessCode,
                uuid: crypto.randomUUID()
            },
        })
    }
    // 获取冲突的文件 
    async getConflictTaskInfo(taskId) {
        return await this.request('/api/open/batch/getConflictTaskInfo.action' , {
            method: 'POST',
            json: {
                taskId,
                type: 'SHARE_SAVE'
            },
        })
    }

    // 处理冲突 taskInfos: [{"fileId":"","fileName":"","isConflict":1,"isFolder":0,"dealWay":1}]
    async manageBatchTask(taskId,targetFolderId, taskInfos) {
        return await this.request('/api/open/batch/manageBatchTask.action' , {
            method: 'POST',
            json: {
                taskId,
                type: 'SHARE_SAVE',
                targetFolderId,
                taskInfos
            },
        })
    }

    // 重命名文件
    async renameFile(fileId, destFileName) { 
        const response = await this.request('/api/open/file/renameFile.action', {
            method: 'POST',
            form: {
                fileId,
                destFileName
            },
        })
        return response
    }
    // 获取家庭信息
    async getFamilyInfo() {
        const familyList = await this.client.getFamilyList()
        if (!familyList || !familyList.familyInfoResp) {
            return null
        }
        const resp = familyList.familyInfoResp
        for (const family of resp) {
            if (family.userRole == 1) {
                return family
            }
        }
        return null
    }
}

module.exports = { Cloud189Service };