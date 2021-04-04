const { promisify } = require('util')
const ora = require('ora')
const { spawn } = require('child_process')

const download = promisify(require('download-git-repo'))

const _spawn = async (...args) => {
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => resolve())
  })
}

/**
 * @param {string} repo 资源地址
 * @param {string} desc 下载到哪
 */
module.exports.clone = async (repo, desc) => {
  let process = ora(`clonning from ${repo}`)
  process.start()
  await download(repo, desc)
  process.succeed()
  // // 自动安装依赖
  process = ora('installing dependencies')
  process.start()
  await _spawn('npm', ['install'], { cwd: `./${desc}` })
  process.succeed()
  // 启动
  await _spawn('npm', ['run', 'server'], { cwd: `./${desc}` })
}