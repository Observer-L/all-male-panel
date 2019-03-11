import {DEBUG, cats, host} from '../config'
import Mock from 'mockjs'
const Random = Mock.Random

export default function http(data = '', cb, method = 'get', header = {}) {
  if (!DEBUG) {
    wx.request({
      url: host + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { 'Content-Type': 'application/json' },
      success(res) {
        cb(res)
      }
    })
  } else {
    // 模拟数据
    const res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'panels|1-10': [{
        '_id|+1': 1,
        'img': Random.image('200x400'),
        'cat|1': cats,
        'title': '@title(3,6)',
        'place': '@county(true)',
        'date': '@date(yyyy-MM-dd)'
      }]
    })
    cb(res)
  }
}
