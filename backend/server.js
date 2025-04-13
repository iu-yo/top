Access-Control-Allow-Origin
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const mysql = require('mysql2/promise); // ✅ 统一使用 Promise 版本
const app = express();

// ================== CORS 配置 ==================
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
    ? '*' 
    : '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// ================== 数据库配置 ==================
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// 创建全局连接池 ✅
const pool = mysql.createPool(dbConfig);

// ================== 测试数据库连接 ==================
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Connected to the database as id ' + connection.threadId);
    return 'Connected'; // 返回成功信息
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw new Error('Database connection failed'); // 抛出错误
  } finally {
    if (connection) connection.release();
    // 注意：不要关闭 pool，因为后续还要用
  }
}

testConnection();

// ================== 业务逻辑 ==================
let latestDevices = [];

// 定时任务（调整为每10分钟）
cron.schedule('*/0.5 * * * *', () => { // ✅ 修正为每1分钟
  fetchDevicesFromSQLPub();
});

// 获取设备数据
async function fetchDevicesFromSQLPub() {
  try {
    const [rows] = await pool.query('SELECT * FROM `高新设备台账`'); // ✅ 直接使用 pool
    latestDevices = rows;
    console.log(`数据更新成功，共 ${rows.length} 条记录`);
  } catch (error) {
    console.error('数据库查询失败:', error);
  }
}

// ================== API 路由 ==================
app.get('/api/devices', (_, res) => {
  res.json(latestDevices);
});

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ================== 启动服务 ==================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  fetchDevicesFromSQLPub(); // 启动时立即获取一次数据
});
