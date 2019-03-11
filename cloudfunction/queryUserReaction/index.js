// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID, APPID, UNIONID} = cloud.getWXContext()
  return await db.collection('user_reaction')
    .where({
      _openid: _.eq(OPENID),
      pid: _.eq(event.pid)
    })
    .get()
}
