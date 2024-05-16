import { exec } from 'child_process'
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

export default function update() {
  spinner.start()
  exec('npm install limvue-cli@latest -g', (error) => {
    if (!error) {
      console.log(chalk.green('更新成功'))
    } else {
      console.log(chalk.red(error))
    }
  })
}
