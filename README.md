# EasiNote - boethiah

**使用前端技术创建一个跨平台的 [EasiNote](www.seewo.com/products/software/easinote.html) 课件播放客户端**

这是一个**预研**性质的项目，我们只想探索出一条构建跨平台应用的实践之路。

目前已经兼容的平台：
* Windows(Electron)
* OSX(Electron)
* Web(node.js)
* iOS(PhoneGap)

## 构建方法

你需要首先确保本地计算机已安装了 [Git](https://git-scm.com) 和 [Node.js](https://nodejs.org/en/download/) (包括 [npm](http://npmjs.com))。

然后执行以下命令来下载并构建 boethiah。

```bash
# Clone this repository
git clone https://github.com/cyoooo7/boethiah.git
# Go into the repository
cd boethiah
# Install dependencies and run the app
npm install
# Run build script by gulp
gulp build
# Go into the server directory
cd server
# Run build script by gulp
node bin/www
```

然后使用你感兴趣的平台来使用 boethiah。

### Web端
使用浏览器(推荐 Chrome)访问 http://localhost:3000/

### Windows或OSX端
你需要先安装 [Electron-prebuild](https://github.com/electron-userland/electron-prebuilt)
```bash
# Install electron-prebuilt golobally
npm install -g electron-prebuilt
# Run
electron bin/electron
```

### iOS端
你需要先安装 [PhoneGap desktop app](http://phonegap.com/)，然后使用 PhoneGap desktop app 托管 bin/phonegap 目录。
然后在 iOS 设备上安装 PhoneGap 应用，并通过应用连接 PhoneGap desktop app（具体步骤可参考 [PhoneGap Get Started](http://phonegap.com/getstarted/)）。


#### License [BSD License](LICENSE.md)
