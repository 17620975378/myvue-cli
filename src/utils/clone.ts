import { SimpleGit, simpleGit, SimpleGitOptions } from 'simple-git'
import createLogger from 'progress-estimator'
import chalk from 'chalk'
import { log } from './log'
// import figlet from 'figlet'

// 设置进度条
const logger = createLogger({
  spinner: {
    interval: 300,
    frames: ['⠋', '⠋', '⠋', '⠋', '⠋', '⠋', '⠋'].map((item) => {
      return chalk.blue(item)
    }),
  },
})
// Partial 类型修饰符，表示这个对象中的属性是可选的
const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), //要运行命令的工作目录
  binary: 'git',
  maxConcurrentProcesses: 6,
}

// const goodPrinter = async () => {
//   const message = await figlet(
//     '欢迎使用 limvue-cli 脚手架',
//     function (err, data) {
//       if (err) {
//         log.error(String(err))
//         return
//       }
//       console.log(data)
//     }
//   )
//   console.log(chalk.rgb(40, 156, 193).visible(message))
// }

export const clone = async (
  pjName: string,
  url: string,
  options: string[]
): Promise<any> => {
  const git: SimpleGit = simpleGit(gitOptions)
  try {
    await logger(git.clone(url, pjName, options), '代码下载中: ', {
      estimate: 8000,
    })
    console.log()
    console.log(chalk.blueBright('=================================='))
    console.log(chalk.blueBright('=====欢迎使用limvue-cli脚手架====='))
    console.log(chalk.blueBright('=================================='))
    console.log()
    // goodPrinter()
    log.success(`项目创建成功: ${chalk.blueBright(pjName)}`)
    log.success('请执行以下命令启动项目:')
    log.info(` cd ${chalk.blueBright(pjName)}`)
    log.info(` ${chalk.yellow('pnpm')} install`)
    log.info(` ${chalk.yellow('pnpm')} run dev`)
  } catch (err: any) {
    log.error('下载失败')
    log.error(String(err))
  }
}
