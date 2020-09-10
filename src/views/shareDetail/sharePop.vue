<template>
  <van-popup :value="value" @input="$emit('input', !value)">
    <div ref="shareBox" class="pop-content">
      <div class="share-box" v-if="!shareImgUrl">
        <div class="content-box" ref="contentBox">
          <div class="text">
            长按图片下载并分享
          </div>
          <div class="share-content-box">
            <div class="title">
              {{ detail.title }}
            </div>
            <div class="user-box">
              <img :src="detail.author && detail.author.avatar" alt="" />
              <span>{{ detail.author && detail.author.nickname }}</span>
            </div>
            <div class="content">
              {{ detail.contentText }}
            </div>
            <img
              class="logo"
              src="../../assets/ios3x_img_share_logo@3x.png"
              alt=""
            />
            <img :src="codeUrl" class="code" />
            <div class="direction">长按识别二维码查看原文</div>
          </div>
        </div>
      </div>
      <img v-else :src="shareImgUrl" class="share-img" alt="" />
    </div>
  </van-popup>
</template>

<script>
// 地址转二维码
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
export default {
  name: 'share-pop',
  props: {
    value: {
      type: Boolean
    },
    detail: {
      type: Object
    }
  },
  data () {
    return {
      // 二维码图片地址
      codeUrl: '',
      // 分享图片的地址
      shareImgUrl: ''
    }
  },
  watch: {
    value () {
      if (this.value) {
        console.log(this.$refs.shareBox)
        this.$nextTick(() => {
          html2canvas(this.$refs.shareBox, {
            useCORS: true
          }).then(canvas => {
            // console.log(canvas.toDataURL())
            this.shareImgUrl = canvas.toDataURL()
          })
        })
      }
    }
  },
  async mounted () {
    // 获取地址 生成 url 并设置给img
    const url = await QRCode.toDataURL(window.location.href, { margin: 0 })
    this.codeUrl = url
  }
}
</script>

<style lang="less" scoped>
.pop-content {
  width: 311px;
  height: 553px;
  padding: 0 15px 15px;
}
// 底部弹出层
.share-box {
  // background-image: url('../../assets/ios3x_img_share_bj@3x.png');
  background: linear-gradient(to bottom, #5bbed7, #53b5d1);
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .content-box {
    .text {
      text-align: center;
      font-size: 12px;
      color: white;
      padding: 15px;
    }
    .share-content-box {
      flex: 1;
      background-color: white;
      border-radius: 10px;
      padding: 0 15px;
      width: 286px;
      margin: 0 auto;
      .title {
        font-size: 16px;
        padding-top: 20px;
        font-weight: 600;
      }
      .user-box {
        margin-top: 15px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 5px;
        }
        span {
          font-size: 12px;
        }
      }
      .content {
        font-size: 16px;
        margin-top: 20px;
        height: 165px;
        overflow: hidden;
        position: relative;
        &::after {
          content: '';
          width: 100%;
          bottom: -2px;
          left: 0;
          height: 25px;
          // background-color: white;
          // opacity: 0.9;
          background: linear-gradient(rgba(255, 255, 255, 0.87), #ffffff);
          position: absolute;
        }
      }
      .logo {
        width: 150px;
        display: block;
        margin: 20px auto;
      }
      .code {
        margin: 0 auto;
        display: block;
        width: 80px;
      }
      .direction {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        color: #c1c1c8;
      }
    }
  }
}
.share-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
