import fetch from '../utils/http'

/**
 * 获取验证码
 * @param {} params
 */
export function getCode (data) {
  return fetch({
    url: '/au/code',
    method: 'post',
    data
  })
}

/**
 * 用户登录
 * @param {} params
 */
export function login (data) {
  return fetch({
    url: '/au/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {} params
 */
export function info () {
  return fetch({
    url: '/au/info',
    method: 'get',
    // 需要携带token
    token: 'token'
  })
}

/**
 * 修改用户信息
 * @param {} params
 */
export function edit (data) {
  return fetch({
    url: '/au/edit',
    method: 'post',
    // 需要携带token
    token: 'token',
    data
  })
}

/**
 * 文件上传
 * @param {} params
 */
export function uploadAvatar (avatar) {
  const _data = new FormData()
  _data.append('files', avatar)
  return fetch({
    url: '/upload',
    method: 'post',
    // 需要携带token
    token: 'token',
    data: _data
  })
}
/**
 * 企业列表数据
 * @param {} params
 */
export function companyList (params) {
  return fetch({
    url: '/companies/list',
    method: 'get',
    params
  })
}

/**
 * 企业列表数据
 * @param {} params
 */
export function companyDetail (id) {
  return fetch({
    url: `/companies/${id}`,
    method: 'get'
  })
}
/**
 * 企业评论数据
 * @param {} params
 */
export function companyComments (data) {
  const { id, limit, start } = data
  return fetch({
    url: `/companies/${id}/comments`,
    method: 'get',
    params: {
      limit,
      start
    }
  })
}
/**
 * 企业职位数据
 * @param {} params
 */
export function companyPositions (data) {
  const { id, limit, start, city, experience, salary, type } = data
  return fetch({
    url: `/companies/${id}/positions`,
    method: 'get',
    params: {
      limit,
      start,
      city,
      experience,
      salary,
      type
    }
  })
}

/**
 * 添加评论数据
 * @param {} params
 */
export function addComment (data) {
  return fetch({
    url: '/comments',
    method: 'post',
    token: 'token',
    data
  })
}
/**
 * 获取职位筛选条件
 * @param {} params
 */
export function positionFilters (id) {
  return fetch({
    url: `/companies/${id}/positionFilters`,
    method: 'get'
  })
}
/**
 * 获取职位详情
 * @param {} params
 */
export function positionDetail (id) {
  return fetch({
    url: `/positions/${id}`,
    method: 'get'
  })
}
/**
 * 获取面试技巧
 * @param {} params
 */
export function articlesTechnic (params) {
  return fetch({
    url: '/articles/technic',
    method: 'get',
    params
  })
}
/**
 * 获取分享的面经
 * @param {} params
 */
export function articlesShare (params) {
  return fetch({
    url: '/articles/share',
    method: 'get',
    params
  })
}
/**
 * 面试技巧详情
 * @param {} params
 */
export function articlesTechnicDetail (id) {
  return fetch({
    url: `/articles/technic/${id}`,
    method: 'get'
  })
}
/**
 * 面试技巧热搜
 * @param {} params
 */
export function articlesTechnicTopSearch () {
  return fetch({
    url: '/articles/technicTopSearch',
    method: 'get'
  })
}
/**
 * 面经 分享
 * @param {} params
 */
export function articlesShareDetail (id) {
  return fetch({
    url: `/articles/share/${id}`,
    method: 'get'
  })
}
/**
 * 面经分享热搜
 * @param {} params
 */
export function articlesShareTopSearch () {
  return fetch({
    url: '/articles/shareTopSearch',
    method: 'get'
  })
}
/**
 * 文章评论接口
 * @param {} params
 */
export function articleComments (params) {
  const { id, limit, start } = params
  return fetch({
    url: `/articles/comments/${id}`,
    method: 'get',
    params: {
      limit,
      start
    }
  })
}

/**
 * 发表文章评论接口
 * @param {} data
 */
export function publishComment (data) {
  return fetch({
    url: '/articles/comments',
    method: 'post',
    token: 'token',
    data
  })
}

/**
 * 点赞文章接口
 * @param {} data
 */
export function starArticle (data) {
  return fetch({
    url: '/articles/star',
    method: 'post',
    token: 'token',
    data
  })
}
/**
 * 点赞文章评论接口
 * @param {} data
 */
export function starArticleComment (data) {
  return fetch({
    url: '/article-comments/star',
    method: 'post',
    token: 'token',
    data
  })
}
/**
 * 收藏文章接口
 * @param {} data
 */
export function collectArticle (data) {
  return fetch({
    url: '/articles/collect',
    method: 'post',
    token: 'token',
    data
  })
}

/**
 * 分享文章图片接口
 * @param {} data
 */
export function shareImg (data) {
  return fetch({
    url: '/articles/shareImg',
    method: 'post',
    token: 'token',
    data
  })
}

/**
 * 热门统计数据接口
 * @param {} data
 */
export function topChartData () {
  return fetch({
    url: '/chart-data/hot',
    method: 'get'
  })
}
/**
 * 统计数据索引
 * @param {} data
 */
export function chartIndexes () {
  return fetch({
    url: '/chart-data/indexes',
    method: 'get'
  })
}
/**
 * 统计数据获取
 * @param {} data
 */
export function chartStatistics (params) {
  return fetch({
    url: '/chart-data/statistics',
    method: 'get',
    params
  })
}
/**
 * 面试题筛选条件获取
 * @param {} data
 */
export function questionFilters (id) {
  return fetch({
    url: `/questions/companyFilters/${id}`,
    method: 'get',
    token: 'token'
  })
}
/**
 * 获取面试题数据
 * @param {} data
 */
export function companyQuestion (params) {
  const { id, position, difficulty } = params
  return fetch({
    url: `/questions/company/${id}`,
    method: 'get',
    params: {
      position,
      difficulty
    },
    token: 'token'
  })
}
/**
 * 提交面试题
 * @param {} data
 */
export function submitQuestion (data) {
  return fetch({
    url: '/questions/submit',
    method: 'post',
    data,
    token: 'token'
  })
}
/**
 * 面试题详情
 * @param {} data
 */
export function questionDetail (id) {
  return fetch({
    url: `/questions/${id}`,
    method: 'get',
    token: 'token'
  })
}
/**
 * 收藏面试题
 * @param {} data
 */
export function collectQuestion (data) {
  return fetch({
    url: '/questions/collect',
    method: 'post',
    token: 'token',
    data
  })
}
/**
 * 模拟面试筛选条件
 * @param {} data
 */
export function interFilters () {
  return fetch({
    url: '/interview/filters',
    token: 'token',
    method: 'get'
  })
}
/**
 * 获取模拟面试面试题数据
 * @param {} data
 */
export function interviewQuestions (params) {
  return fetch({
    url: '/interview/questions',
    method: 'get',
    token: 'token',
    params
  })
}
