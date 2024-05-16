import { Command } from 'commander'
import { version } from '../package.json'
import create from './command/create'

const program = new Command('myvue')
program.version(version, '-v, --version')

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (dirName) => {
    // 添加create方法
    await create(dirName)
  })

program.parse() //解析命令行参数和选项
