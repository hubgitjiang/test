import Vue from 'vue'
import VueRouter from 'vue-router'
const company = () => import('../views/company')
const question = () => import('../views/question')
const find = () => import('../views/find')
const my = () => import('../views/my')
const search = () => import('../views/search')
const experienceAdd = () => import('../views/find/experienceAdd.vue')
const chart = () => import('../views/chart')
const info = () => import('../views/userInfo')
const message = () => import('../views/my/message.vue')
const companyDetail = () => import('../views/companyDetail')
const companyPosition = () => import('../views/companyPosition')
const positionDetail = () => import('../views/positionDetail')
const interview = () => import('../views/interview/')
// const answerSheet = () => import('../views/answerSheet')
const login = () => import('../views/login')
const editInfo = () => import('../views/editInfo')
const technicDetail = () => import('../views/technicDetail')
const technicList = () => import('../views/technicList')
const shareDetail = () => import('../views/shareDetail')
const shareList = () => import('../views/shareList')

Vue.use(VueRouter)

const routes = [
  {
    path: '/company',
    component: company,
    meta: {
      showTabbar: true
    }
  },
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/companyDetail/:id',
    component: companyDetail
  },
  {
    path: '/companyPosition/:id',
    component: companyPosition
  },
  {
    path: '/positionDetail/:id',
    component: positionDetail
  },
  {
    path: '/question',
    component: question,
    meta: {
      showTabbar: true
    }
  },
  {
    path: '/interview',
    component: interview
  },
  // {
  //   path: '/answerSheet',
  //   component: answerSheet
  // },
  {
    path: '/find',
    component: find,
    meta: {
      showTabbar: true
    }
  },
  {
    path: '/search/:tag',
    component: search
  },
  {
    path: '/experienceAdd',
    component: experienceAdd
  },
  {
    path: '/chart',
    component: chart
  },
  {
    path: '/my',
    component: my,
    meta: {
      showTabbar: true
    }
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/info',
    component: info
  },
  {
    path: '/message',
    component: message
  },
  {
    path: '/editInfo',
    component: editInfo
  },
  {
    // 文章详情
    path: '/technicDetail/:id',
    component: technicDetail
  },
  {
    // 文章列表
    path: '/technicList',
    component: technicList
  },
  {
    // 文章列表
    path: '/shareList',
    component: shareList
  },
  {
    // 面经分享详情
    path: '/shareDetail/:id',
    component: shareDetail
  }
]

// 处理路由异常
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 跳转到登录页逻辑
VueRouter.prototype.toLogin = function (fromPath) {
  if (fromPath) {
    return this.push(`/login?_redirect=${fromPath}`)
  }
  this.push(`/login?_redirect=${this.currentRoute.fullPath}`)
}
const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // 如果token存在 尝试获取一下用户信息
  // 添加window的滚动获取
  from.meta.scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop || 0
  next()
})
// 路由后置守卫
router.afterEach((to, from) => {
  // 如果发现路由元中有该路由的信息就跳到相应的位置
  if (to.query.isScroll) {
    setTimeout(() => {
      window.scrollTo(0, to.meta.scrollTop || 0)
    }, 0)
  } else {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }
  // } else {
  // if (to.meta.scrollTop) {
  //   console.log('to.meta.scrollTop:', to.meta.scrollTop)
  //   setTimeout(() => {
  //     window.scrollTo(0, to.meta.scrollTop)
  //   }, 300)
  // } else {
  // setTimeout(() => {
  //   window.scrollTo(0, 0)
  // }, 300)
  // }
  // }
})

export default router
