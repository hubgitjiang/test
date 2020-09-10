import Vue from 'vue'
import Vuex from 'vuex'
// 接口
import { info } from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: '',
    // 面试题数据
    questionList: []
  },
  mutations: {
    /**
     * 修改用户信息
     * @param {*} state
     * @param {*} userInfo
     */
    SETUSERINFO (state, userInfo) {
      state.userInfo = userInfo
    },
    /**
     * 修改点赞文章
     * @param {*} state
     * @param {*} userInfo
     */
    SETSTARARTICLES (state, starArticles) {
      state.userInfo.starArticles = starArticles
    },
    /**
     * 修改点赞评论
     * @param {*} state
     * @param {*} userInfo
     */
    SETSTARARTICLECOMMENTS (state, starComments) {
      state.userInfo.starComments = starComments
    },
    /**
     * 修改收藏文章
     * @param {*} state
     * @param {*} userInfo
     */
    SETCOLLECTARTICLES (state, collectArticles) {
      state.userInfo.collectArticles = collectArticles
    },
    // 修改收藏的面试题
    SETCOLLECTQUESTIONS (state, collectQuestions) {
      // 保存试题
      state.userInfo.collectQuestions = collectQuestions
    },
    // 设置面试题
    SETQUESTION (state, questionList) {
      // 保存面试题
      state.questionList = questionList
    },
    // 清空面试题
    CLEARQUESTION (state) {
      state.questionList = []
    }
  },
  getters: {
    // 获取点赞的文章
    starArticles (state) {
      if (state.userInfo) {
        return state.userInfo.starArticles
      }
      return []
    },
    // 获取点赞评论
    starComments (state) {
      if (state.userInfo) {
        return state.userInfo.starComments
      }
      return []
    },
    // 获取收藏文章
    collectArticles (state) {
      if (state.userInfo) {
        return state.userInfo.collectArticles
      }
      return []
    },
    // 获取收藏面试题
    collectQuestions (state) {
      if (state.userInfo) {
        return state.userInfo.collectQuestions
      }
      return []
    },
    // 获取面试题
    getQuestion (state) {
      return function (questionId) {
        return state.questions[questionId]
      }
    }
  },

  actions: {
    async getUserInfo (content, isForce) {
      if (!content.state.userInfo || isForce) {
        const userRes = await info()
        // 获取用户信息
        const userInfo = userRes.data
        userInfo.avatar = process.env.VUE_APP_URL + userInfo.avatar
        content.commit('SETUSERINFO', userInfo)
      }
    }
  },
  modules: {}
})
