import process from 'child_process'
import ora from 'ora'
import chalk from 'chalk'

const spinner = ora({
  text: '正在更新...',
  spinner: {
    interval: 300,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
      chalk.blue(item)
    ),
  },
})

export function update() {
  spinner.start()
  process.exec('npm install limvue-cli@latest -g', (error) => {
    // 更新成功后，重新执行命令
    spinner.stop()
    if (!error) {
      console.log(chalk.green('更新成功'))
    } else {
      console.log(chalk.red(error))
    }
  })
}
