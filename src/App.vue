<template>
  <div id="app" :class="{ pb: $route.meta.showTabbar }">
    <!-- 使用 transition 包裹 router-view -->
    <keep-alive include="company,question,find,my">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar
      v-model="active"
      active-color="#E40137"
      inactive-color="#B4B4BD"
      route
      v-show="$route.meta.showTabbar"
    >
      <van-tabbar-item name="company" to="/company">
        <span>公司</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="question" to="/question" icon="search">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_st_nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="find" to="/find" icon="friends-o">
        <span>发现</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_fx_nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my" to="/my" icon="setting-o">
        <span>我的</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_wode_nor"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
// 导入 vuex赋值函数
import { mapActions } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      active: 'find'
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 合并到methods中
    ...mapActions(['getUserInfo'])
  }
}
</script>

<style lang="less">
#app {
  &.pb {
    padding-bottom: 50px;
  }
  .van-tabbar-item__icon {
    i {
      font-size: 28px;
    }
  }
  .van-tabbar-item__text {
    span {
      font-size: 10px;
    }
  }
  // transition切换的效果 淡入 淡出
  // .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  // .fade-enter,
  .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
