import path from 'path'
import fs from 'fs-extra'
import { input, select } from '@inquirer/prompts'
import { clone } from '../utils/clone'
import { log } from '../utils/log'

export interface templateInfo {
  name: string // 项目名称
  description: string //项目描述
  downloadUrl: string // 项目下载地址
  branch: string //项目分支
}

export const templates: Map<string, templateInfo> = new Map([
  [
    'template-vue3-ts-A',
    {
      name: 'admin-pro-template',
      description: '基于vue3+typescript+vite的模板',
      downloadUrl: 'https://github.com/17620975378/admin-pro-template.git',
      branch: 'master',
    },
  ],
  [
    'template-vue3-ts-B',
    {
      name: 'admin-pro-template',
      description: '基于vue3+typescript+vite的模板',
      downloadUrl: 'https://gitee.com/giteenimo/admin-pro-vue3-ts.git',
      branch: 'dev3',
    },
  ],
])

export default async function cretae(projectName: string) {
  if (!projectName) {
    projectName = await input({
      message: '请输入项目名称',
    })
  }
  // 将templates处理成select需要的对象格式
  const templateList = Array.from(templates).map(
    (item: [string, templateInfo]) => {
      const [name, info] = item
      return {
        name,
        value: name,
        description: info.description,
      }
    }
  )

  // 如果文件夹存在，则提示是否覆盖
  // 获取项目路径
  const filePath = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(filePath)) {
    log.info(` ${projectName}文件夹已存在!`)
    const isCover = await select({
      message: '是否覆盖原文件:',
      choices: [
        { name: '是', value: true },
        { name: '否', value: false },
      ],
    })
    if (isCover) {
      // await fs.promises.rm(filePath, { recursive: true })  // recursive: true 递归删除文件目录
      await fs.remove(filePath)
    } else {
      return
    }
  }

  // 选择模版
  const selectTemplateName = await select({
    message: '请选择需要初始化的模版',
    choices: templateList,
  })

  // 下载模版
  // 从 templates Map 中获取模板信息(tempalte是map对象，获取方式是get)
  const getRepInfo = templates.get(selectTemplateName)
  if (getRepInfo) {
    await clone(projectName, getRepInfo.downloadUrl, [
      '-b',
      `${getRepInfo.branch}`,
    ])
  } else {
    console.log(`${selectTemplateName}模版不存在`)
  }
}
