# Mypage
猜数字小游戏 🎮
最后更新：2025年03月18日

项目概述
基于纯HTML/CSS/JavaScript实现的经典猜数字游戏，包含完整的交互逻辑与响应式布局设计。用户需在1-100范围内猜测随机生成的数字，系统实时反馈猜测结果并记录尝试次数。

功能特性
​核心机制

自动生成随机目标数 Math.random()实现
输入有效性验证（非数字/超出范围提示）
实时尝试次数统计
​交互设计

动态反馈提示（📉太小/📈太大/🎉成功）
输入后自动聚焦与清空
成功时禁用输入框的防误触机制
​视觉呈现

现代化扁平化UI设计
自适应设备屏幕的弹性布局（Flexbox）
按钮悬停动画与输入框焦点效果
文件结构
bash
.
├── index.html    # 主程序文件
├── README.md     # 本文档
└── img/          # 图片资源目录（如需）
使用指南
​快速启动

# 直接浏览器打开
open index.html
​自定义设置
修改script标签内的参数实现功能扩展：

javascript
// 调整数字范围（当前1-100）
const MAX_NUMBER = 150;
let targetNumber = Math.floor(Math.random() * MAX_NUMBER) + 1;
​开发工具
支持所有主流编辑器（VS Code、WebStorm等），推荐安装以下插件：

Live Server（实时预览）
Prettier（代码格式化）
ESLint（语法检查）
技术实现
技术栈	应用场景	代码示例
​HTML5	游戏结构搭建	<div class="game-container">
​CSS3	响应式布局与动画效果	transition: background 0.3s
​ES6	游戏逻辑控制	const checkGuess = () => {...}
扩展建议
参考网页模板的组件设计思路，可添加以下功能：

📊 历史猜测记录面板
⏱️ 倒计时挑战模式
🌐 多语言支持（仿照模板的<select>语言切换组件）
故障排除
若遇到样式异常：

检查CSS文件路径是否为绝对路径 /css/style.css
清除浏览器缓存 Ctrl+Shift+R
确认浏览器支持ES6语法
贡献指南
欢迎通过Issue提交改进建议或PR贡献代码，请遵循：

新功能开发创建独立分支
修改涉及UI时需同步更新截图
重大变更需更新测试用例
