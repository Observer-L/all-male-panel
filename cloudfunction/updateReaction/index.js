// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID, APPID, UNIONID} = cloud.getWXContext()
  const reaction = {}
  reaction[event.reaction] = _.inc(1)
  return await db.collection('panels')
    .doc(event.pid)
    .update({
      data: {
        reaction
      }
    })
}
