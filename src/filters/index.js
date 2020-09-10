import Vue from 'vue'
import moment from 'moment'
const genderMap = {
  0: '未知',
  1: '男孩子',
  2: '女孩子'
}
// 性别处理
Vue.filter('formatGender', v => {
  return genderMap[v]
})

// 日期处理
Vue.filter('formatTime', v => {
  return moment(v).format('YYYY.MM.DD')
})
