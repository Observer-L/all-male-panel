// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID, APPID, UNIONID} = cloud.getWXContext()
  if (event.init) {
    return await
      db.collection('user_reaction')
        .add({
          data: {
            _openid: OPENID,
            pid: event.pid,
            reaction: event.reaction
          }
        })
  } else {
    return await
      db.collection('user_reaction')
        .where({
          _openid: _.eq(OPENID),
          pid: _.eq(event.pid)
        })
        .update({
          data: {
            reaction: event.reaction
          }
        })
  }
}
