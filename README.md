# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### content.js 解决ant design样式对目标页面的污染问题
造成这个问题的原因是，Ant Design的reset样式是直接针对标签，并没有限定在某个外层 样式里，因此造成了污染。同时，Ant Design的样式也很有可能被目标页面的样式污染。 
ant design官网有相关解释，见 https://ant.design/docs/react/customize-theme

大概意思就是Ant Design的目的就是一整套解决方案，并不是为了插入到某个网站中使用 因此直接修改了全局样式。 
官网也给出了口t日U匕上的讨论帖，总之最后的结论是：没有最有效的解决方案。 
我也尝试了很多方式，想以最优雅的方式解决，但均失败（GitHub上都讨论几年了）。 
但是问题还是得解决，最终使用了很山寨的办法，虽然不优雅，但是从时间成本和使用效果 来说，性价比还是很高的。

简单来说，分为以下三个步骤： 
1单独引用Ant Design组件的is和css，这样就可以避免加载Ant Design的全局reset样式。 2把Ant Design的全局reset样式copy一份出来，给每个样式前面加上一个父级样式来降级为非全局 样式。Content script全局引入这个样式文件。 3. content开发的组件最外层加上步骤2的父级样式，这样就把Ant Design的reset样式应用在自己的 组件上了。 
这种方式有效解决了Ant Designt目标页面的污染问题，但是还存在被目标页面样式污染的 问题。 
针对这一问题，需要在步骤2新copy的reset样式中再给出现问题的组件打上补丁，一般都是 行距、字号、颜色的污染，所以随用随加就可以了。 
虽然Ant Design官方会持续更新，但全局reset样式一般官方也很少改变，毕竟这部分的改 变对Ant Design自身也是全范围的影响。所以这个变通的山寨方法可以使用。 
下面具体说明如何操作。 

1. 抽离antd全局reset样式
打开node_modules/antd/dist/antd.css 
这里是全部的antd样式。新起一个用于降级的className（比如CRX-antd-diy)，把antd.c-ss中html, body的样式改为CRX-antd-diy，即用CRX-antd-diy代替T全局页面级样式。然 后，对其它样式前都加上”C尺X-antd-diy"，这样就起到了保护作用。当然，还有一些’‘动画 样式“以及”antd动态插入机制导致无法加上CRX-antd-diy的样式“，这部分样式只能发现问 题的时候再随时补充上。 
本Dem。已将此工作完成，抽离的antd-diy.css可在本dem。的Git日。匕上找到，解决了目前开 发中遇到的样式污染问题。随着后续使用，还会随时更新。 
抽离出来的文件，放到src/content目录下： 
2. content/index.js 引入抽离的antd-diy样式
一是引入antd-diy.css, 二是在最外层组件加上CRX-antd-diy样式
3. 单独引用ant design组件的js和css
不用
```
import {Button} from 'antd'
```
采用
```
import Button from 'antd/es/button'
import 'antd/es/button/style/index.css'
```
避免引入ant design的原全局样式