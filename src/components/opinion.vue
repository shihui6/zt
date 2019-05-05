<template>
  <div class="opinionBox">
    <div class="opinionTop">
      <div class="logo">
        <router-link to="/"></router-link>
      </div>
      <div class="middle clearFloat">
        <div>
          <router-link to="/">首页</router-link>
        </div>
        <div>
          <div>
            舆情平台
          </div>
          <div class="linkBox">
            <a href="../../static/event/trust.html">托管业务版</a>
            <a href="../../static/event/credit.html">信用业务版</a>
          </div>
        </div>
        <div>
          <div>
            帮助文档
          </div>
          <div class="linkBox">
            <a href="../../static/event/hosting.html">托管信息详情</a>
            <a href="../../static/event/creditText.html">信用信息详情</a>
          </div>
        </div>
      </div>
    </div>
    <div class="homeImg" style="background-image: url(./static/img/4.jpg)"></div> 
    <div class="opinionEntrance">
      <div>
        <h3>专业、开放、易用的财经舆情分析平台</h3>
      </div>
      <div class="listBox">
        <ul>
          <li class="list">
            <div>
              <h3>托管业务版</h3>
              <p>服务于托管业务部，提供产品管理人风险警示等信息。</p>
              <a href="../../static/event/trust.html">试用</a>
            </div>
          </li>
          <li class="list">
            <div>
              <h3>信用业务版</h3>
              <p>服务于信用业务部，提供交易所公告，风险披露等信息。</p>
              <a href="../../static/event/credit.html">试用</a>
            </div>
          </li>
          <li class="list">
            <div>
              <h3>经纪业务版</h3>
              <p>服务于经纪业务部，提供场外配资监控等信息</p>
              <router-link to="/economicbusinessWarning">试用</router-link>
            </div>
          </li>
          <li class="list">
            <div>
              <h3>风险业务版</h3>
              <p>服务于风险管理部，提供新闻、公告、法律、监管等信息</p>
              <router-link to="/monitor/homePage/homeContent">试用</router-link>
            </div>
          </li>
          <li class="list">
            <div>
              <h3>董事会业务版</h3>
              <p>服务于董事会，提供中泰相关舆情监控及分析等信息</p>
              <router-link to="/boardofdirectorsWarning">试用</router-link>
            </div>
          </li>
          <li class="list">
            <div>
              <h3>投行委/新三板业务版</h3>
              <p>服务于投行委/新三板业务部，提供新三板挂牌企业负面新闻预警</p>
              <router-link to="/newthreeboard/homePage/homeContent">试用</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="opinionFooter">
      <p>市场有风险，投资需谨慎</p>
      <p>© 2015-2019 zts.com.cn. All Rights Reserved</p>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="less" scoped>
.opinionBox {
  min-width: 1200px;
}
.opinionTop {
  position: relative;
  width: 100%;
  height: 60px;
  .logo {
    position: absolute;
    top: 5px;
    left: 20px;
    width: 190px;
    height: 48px;
    background-image: url("../../static/assets/logo.png");
  }
  .middle {
    width: 260px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    > div {
      float: left;
      position: relative;
      height: 60px;
      line-height: 60px;
      margin-left: 20px;
      .linkBox {
        display: none;
        position: absolute;
        left: -60px;
        width: 180px;
        height: 100px;
        background-color: #fff;
        padding-top: 10px;
        a {
          float: left;
          width: 180px;
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
        a:hover {
          background-color: #eee;
          text-decoration: underline;
        }
      }
    }
    > div:hover {
      .linkBox {
        display: block;
      }
    }
  }
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #000;
  }
}
.homeImg {
  width: 100%;
  height: 600px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("./../../static/img/4.jpg");
}
.opinionEntrance {
  width: 100%;
  h3 {
    margin-top: 40px;
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    line-height: 40px;
  }
  .listBox {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    .list {
      float: left;
      width: 380px;
      height: 190px;
      padding: 0 40px;
      > div {
        position: relative;
        width: 100%;
        height: 100%;
        margin-bottom: 100px;
      }
      h3 {
        text-align: center;
        font-size: 24px;
        font-weight: 400;
      }
      p {
        margin-top: 30px;
      }
      a {
        position: absolute;
        bottom: 20px;
        left: 136px;
        color: #0063ff;
      }
    }
  }
}
.opinionFooter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  min-width: 1200px;
  height: 78px;
  background-color: #000;
  p {
    float: left;
    color: #ccc;
    font-size: 16px;
    margin-top: 30px;
  }
  p:nth-child(1) {
    margin-left: 10%;
  }
  p:nth-child(2) {
    float: right;
    margin-right: 10%;
  }
}
</style>
