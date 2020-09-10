<template>
  <div class="experience-detail-container">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.go(-1)">
      <template #left>
        <i class="iconfont iconbtn_nav_back"></i>
      </template>
    </van-nav-bar>
    <!-- 顶部 -->
    <van-skeleton title avatar v-if="!detail.author" :row="50" />
    <div class="top-box">
      <div class="title">
        {{ detail.title }}
      </div>
      <div class="info-box">
        <img :src="detail.author && detail.author.avatar" alt="" />
        <div class="name-box">
          <span class="name">{{
            detail.author && detail.author.nickname
          }}</span>
          <span class="time">{{ detail.created_at | formatTime }}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="experience-content" v-html="detail.content"></div>
    <!-- 评论 -->
    <div class="comment-box">
      <!-- 顶部评论 -->
      <div class="title">评论 <span class="num">68</span></div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 每一项 -->
        <commentItem
          @reComment="reComment(item)"
          v-for="item in list"
          :key="item.id"
          :item="item"
        />
      </van-list>
    </div>
    <!-- 底部盒子 -->
    <div class="bottom-box">
      <div class="input" @click="showComment">我来补充两句</div>
      <div
        class="shoucang"
        @click="collect"
        :class="{ actived: collectArticles.includes(id) }"
      >
        <i
          class="iconfont iconbtn_shoucang_nor"
          :class="{ actived: collectArticles.includes(id) }"
        ></i>
        {{ detail.collect }}
      </div>
      <div
        class="star"
        :class="{ actived: starArticles.includes(id) }"
        @click="star"
      >
        <i
          class="iconfont iconbtn_dianzan_small_nor"
          :class="{ actived: starArticles.includes(id) }"
        ></i>
        {{ detail.star }}
      </div>
      <div class="share" @click="shareArticle">
        <i class="iconfont iconbtn_share"></i>
        {{ detail.share || 0 }}
      </div>
    </div>
    <!-- 底部回复弹出层 -->
    <van-popup
      class="input-pop"
      v-model="show"
      position="bottom"
      :style="{ height: '24%' }"
    >
      <van-field
        autosize
        type="textarea"
        autofocus
        v-model.trim="inputValue"
        :placeholder="placeholder"
        rows="4"
      />
      <span :class="{ disabled: !inputValue.trim() }" @click="publishComment"
        >发送</span
      >
    </van-popup>
    <!-- 分享弹出层 -->
    <sharePop v-model="showShare" :detail="detail" />
  </div>
</template>

<script>
import {
  articlesShareDetail,
  articleComments,
  publishComment,
  starArticle,
  collectArticle,
  shareImg
} from '../../api/api'
import { mapGetters, mapMutations } from 'vuex'
import commentItem from './commentItem'
import sharePop from './sharePop'
export default {
  name: 'share-detail',
  components: {
    commentItem,
    sharePop
  },
  async created () {
    this.$toast.loading()
    const detailRes = await articlesShareDetail(this.id)
    // 处理头像
    if (detailRes.data.author.avatar) {
      detailRes.data.author.avatar =
        process.env.VUE_APP_URL + detailRes.data.author.avatar
    }
    this.detail = detailRes.data
    this.$toast.clear()
  },
  computed: {
    ...mapGetters(['starArticles', 'collectArticles'])
  },
  methods: {
    ...mapMutations(['SETSTARARTICLES', 'SETCOLLECTARTICLES']),
    // 滚动加载数据的方法
    async onLoad () {
      // 开启loading
      this.loading = true
      const articleRes = await articleComments({
        id: this.$route.params.id,
        limit: this.limit,
        start: this.start
      })
      articleRes.data.list.forEach(v => {
        if (v.author.avatar) {
          v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
        }
      })
      // 保存数据
      this.list.push(...articleRes.data.list)
      // 总数
      this.total = articleRes.data.total
      // 累加索引
      this.start += this.limit
      // 结束loading
      this.loading = false
      // 完结判断
      if (this.start >= this.total) {
        this.finished = true
      }
    },
    // 发布评论
    async publishComment () {
      // 非空判断
      if (!this.inputValue) return
      // 处理提交的数据
      const data = {}
      data.content = this.inputValue
      if (this.parentComment) {
        data.parent = this.parentComment.id
      } else {
        data.article = this.$route.params.id
      }

      // 调用接口
      const publishRes = await publishComment(data)

      // 添加到数组后面
      // 根据不同的情境添加到对应的地方
      if (this.parentComment) {
        // 添加到回复评论的内部
        this.parentComment.children_comments.push(publishRes.data)
      } else {
        // 处理头像
        publishRes.data.author.avatar =
          process.env.VUE_APP_URL + publishRes.data.author.avatar
        this.list.unshift(publishRes.data)
      }
      // 隐藏
      this.show = false
      // 清空
      this.resetInput()
    },
    // 正常回复评论
    showComment () {
      this.placeholder = '我来补充两句'
      this.show = true
    },
    // 回复评论
    reComment (item) {
      this.placeholder = '回复: ' + item.author.nickname
      this.show = true
      // 保存的回复评论id
      this.parentComment = item
    },
    // 清空输入区域
    resetInput () {
      this.inputValue = ''
      this.placeholder = '我来补充两句'
    },
    // 点赞
    async star () {
      const starRes = await starArticle({
        article: this.$route.params.id
      })
      // 修改vuex中的数据
      this.SETSTARARTICLES(starRes.data.list)
      this.detail.star = starRes.data.num
      this.$toast.success('点赞成功')
    },
    // 收藏
    async collect () {
      const collectRes = await collectArticle({
        id: this.$route.params.id
      })
      // 修改vuex中的数据
      this.SETCOLLECTARTICLES(collectRes.data.list)
      this.detail.collect = collectRes.data.num
      this.$toast.success('成功')
    },
    // 生成分享文章的图片
    async shareArticle () {
      // 滚到顶部
      window.scrollTo(0, 0)
      this.showShare = true
      const shareRes = await shareImg({ id: this.id })
      this.detail.share = shareRes.data.share
    }
  },
  data () {
    return {
      show: false,
      showShare: false,
      placeholder: '我来补充两句',
      list: [],
      // 分页
      limit: 5,
      start: 0,
      total: 0,
      loading: false,
      finished: false,
      // 详情
      detail: {
        star: 0,
        collect: 0
      },
      // 回复的评论
      parentComment: undefined,
      // 输入框绑定的数据
      inputValue: '',
      // 文章id
      id: parseInt(this.$route.params.id)
    }
  }
}
</script>

<style lang="less">
.experience-detail-container {
  padding-bottom: 85px;
  .van-nav-bar__left {
    padding-left: 0;
  }
  .iconbtn_nav_back {
    font-size: 44px;
  }
  .top-box {
    background-color: white;
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .info-box {
    margin-top: 15px;
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .name-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .name {
        font-size: 12px;
        font-weight: 600;
        color: #545671;
      }
      .time {
        font-size: 12px;
        color: #b4b4bd;
      }
    }
    .zan-box {
      span {
        color: #b4b4bd;
        font-size: 12px;
      }
      .iconfont {
        color: #b4b4bd;
        font-size: 24px;
      }
    }
  }
  .experience-content {
    padding: 15px;
    font-size: 16px;
    color: #181a39;
    background-color: white;
    img {
      width: 100%;
      display: block;
    }
  }
  .comment-box {
    margin-top: 10px;
    background-color: white;
    padding: 26px 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
      position: relative;
      span {
        color: #b4b4bd;
        font-size: 12px;
        position: absolute;
        left: 40px;
        top: -5px;
      }
    }
  }
  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 85px;
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px 0;
    background-color: white;
    width: 100%;
    justify-content: space-between;
    .input {
      height: 34px;
      background: #f7f4f5;
      border-radius: 4px;
      flex: 1;
      font-size: 14px;
      margin-top: 10px;
      color: #b4b4bd;
      margin-right: 24px;
      line-height: 34px;
      padding-left: 6px;
    }
    div:not(.input) {
      font-size: 12px;
      color: #b4b4bd;
      i {
        display: block;
        font-size: 28px;
      }
    }
    .shoucang {
      margin-right: 24px;
      text-align: center;
      &.actived {
        color: #e40137;
      }
    }
    .star {
      margin-right: 24px;
      text-align: center;
      &.actived {
        color: #e40137;
      }
    }
    .share {
      text-align: center;
    }
  }
  .input-pop {
    padding: 25px 15px 0;
    overflow: hidden;
    // 弹出层
    .van-cell::after {
      border-bottom: none;
    }
    .van-field {
      height: 99px;
      width: 100%;
      background: #f7f4f5;
      border-radius: 4px;
    }
    span {
      font-size: 16px;

      float: right;
      margin-top: 11px;
      color: #e40137;
      &.disabled {
        color: #b4b4bd;
      }
    }
  }
}
</style>
