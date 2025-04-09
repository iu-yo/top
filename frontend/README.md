# 🏭 设备台账管理系统

[![GitHub license](https://img.shields.io/github/license/iu-yo/github.io)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0-blue)](https://nodejs.org/)
[![GitHub last commit](https://img.shields.io/github/last-commit/iu-yo/github.io)](https://github.com/iu-yo/github.io/commits/main)

基于Node.js和MySQL的设备资产管理系统，支持实时数据同步和可视化展示。

## ✨ 功能特性
- 每10分钟自动同步SQLPub数据库数据
- 响应式前端界面（Bootstrap 5）
- 设备状态可视化标记（运行中/维护中/已报废）
- 多条件搜索与筛选

## 🚀 快速开始
### 前置要求
- Node.js 16+
- MySQL 5.7+ 或 SQLPub云数据库

### 安装步骤
```bash
# 克隆仓库（使用新地址）
git clone https://github.com/iu-yo/github.io.git

# 进入项目目录
cd github.io

# 安装依赖
npm install

# 配置数据库连接
cp .env.example .env
# 编辑.env文件填写你的数据库信息

# 启动服务
node server.js