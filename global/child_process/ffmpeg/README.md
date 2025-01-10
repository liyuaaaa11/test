## ffmpeg 跨平台多媒体处理工具
<p> 作用：用于处理音频、视频和多媒体流；对视频转码和剪辑、音频提取和合并、流媒体传输等操作。</p>

1. 安装ffmpeg
  安装brew  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  安装时报错：unable to access 'https://github.com/Homebrew/brew/': LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 
Failed during: /usr/bin/git remote set-head origin --auto
原因：macos系统安全升级后禁止直接执行远程脚本，添加git全局配置
git config --global http.sslBackend "openssl"
git config --global http.proxy "socksS://127.0.0.1:6666"
撤销gitconfig配置：
git config --global --unset http.sslBackend
git config --global --unset http.proxy
// 抽空研究大文件上传
