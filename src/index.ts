import { Command } from 'commander'
import { version } from '../package.json'
import create from './command/create'
import update from './command/update'

const program = new Command('limvue')
program.version(version, '-v, --version')

program
  .command('update')
  .description('更新脚手架 limvue-cli')
  .action(async () => {
    // 添加update方法
    await update()
  })

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (dirName) => {
    // 添加create方法
    await create(dirName)
  })

program.parse() //解析命令行参数和选项
