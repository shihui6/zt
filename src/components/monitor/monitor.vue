<template>

  <div class="ppp">
    <div class="app">
      <!-- 舆情监控 opinion monitor -->
      <div class="monitor_top clearFloat">
        <div class="">
          <router-link to="/">
            <!-- <h1>中泰风险
              <span>预警</span>系统</h1> -->
            <!-- <div class="di-header">
              <a href="/" class="tj-logo-wrapper">
                <img src="/../static/event/img/logo.png">
              </a>
            </div> -->
            <!-- <div class="name">中泰证券舆情分析系统</div> -->
            <h1>中泰证券舆情分析系统</h1>
          </router-link>
          <div class="floatRight userSystemBox">
            <span>我的账户
              <i class="iconfont icon-icon_on_the_down"></i>
            </span>
            <span class="pullDown">
              <router-link to="/userSystem">自定义板块管理</router-link>
              <!-- <p @click="enterUserSystem">系统管理</p> -->
              <!-- <p>我的收藏夹</p> -->
              <router-link to="/attentionPoolSet">我的关注池</router-link>
              <!-- <p @click="openAttentionPool">我的关注池</p> -->
              <p>注销</p>
            </span>
          </div>
        </div>

      </div>
      <!-- <div>
        <div class="subname">风险预警</div>
      </div> -->
      <div class="homePageNav clearFloat">
        <div class="">
          <div>风险预警</div>
        </div>
        <div class="link-homePage hover">
          <router-link to="/monitor/homePage/homeContent">首页</router-link>
        </div>
        <div class="link-companyWarning hover">
          <router-link to="/monitor/companyWarning/queryInformation">关联公司舆情</router-link>
        </div>
        <div class="link-subsidiryMonitoring hover">
          <router-link to="/monitor/subMonitoring/queryInformation">子公司舆情监控</router-link>
        </div>
        <div class="link-blackSwan hover">
          <router-link to="/monitor/blackSwan/delistingWarning">黑天鹅事件</router-link>
        </div>
        <div class="link-comRelease hover">
          <router-link to="/monitor/companyRelease/release">公司发布</router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  methods: {
    enterUserSystem() {
      this.$store.state.isShowUserSystem = true;
    },
    openAttentionPool() {
      this.$store.state.isAttentionPool = true;
    },
    security_type_axios(number) {
      const url = 'http://10.25.24.51:10193/api/risk/code_name_info';
      const sendData_N = {
        security_type: 'N'
      }
      sendData_N.page = number;
      this.$_axios.get(url, {
        params: sendData_N
      }).then(response => {
        const resultData = response.data;
        if (resultData.msg === 'query success') {
          const dataList = JSON.parse(JSON.stringify(resultData.result.securitycodelist));
          this.$store.state.codeDataList_N.push(...dataList);
          console.log('自律监管措施', this.$store.state.codeDataList_N.length)
        }
      })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    const url = 'http://10.25.24.51:10193/api/risk/code_name_info';

    const sendData_F = {
      security_type: 'F'
    }
    this.security_type_axios(0);
    this.security_type_axios(1);
    // 基金情况
    this.$_axios.get('http://10.25.24.51:10191/api/rest/nlp/query_stock_list?stock_type=F')
      .then(response => {
        if (response.data.msg === 'success') {
          this.$store.state.fundList = response.data.result.stock_list;
          console.log('基金情况', this.$store.state.fundList.length)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style lang="less" scoped>
.app {
  margin-left: -30px;
  overflow-x: hidden;
  overflow-y: auto;
}
.ppp {
  width: 1560px;
  margin: 0 auto;
}
.monitor_top {
  width: 1455px;
  h1 {
    display: block;
    width: 343px;
    height: 49px;
    font-size: 28px;
    line-height: 49px;
    // font-style: oblique;
    margin-top: 20px;
    margin-left: 50px;
    // padding-left: 10px;
    color: #000000;
    span {
      color: #ff6633;
    }
  }
  .userSystemBox {
    position: relative;
    height: 25px;
    margin-top: -40px;
    margin-right: -116px;
    // background-color: #fff;
    span {
      display: inline-block;
      width: 100px;
      cursor: pointer;
    }
    .pullDown {
      display: none;
      position: absolute;
      top: 20px;
      left: -10px;
      text-align: center;
      background-color: #fff;
    }
    .pullDown a {
      color: #000000;
    }
  }
  .userSystemBox:hover {
    .pullDown {
      display: block;
    }
  }
}

.homePageNav {
  width: 1500px;
  height: 70px;
  font: 20px/70px Arial;
  margin-top:10px;
  color: #ffffff;
  // margin-top: 10px;
  margin-left: 50px;
  // padding-left: 233px;
  background-color: #b50229;
  border: 1px solid #797979;
  overflow: hidden;
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    color: #ffffff;
    text-decoration: none;
  }
  // a.router-link-active {
  //   // background-color: #6acdfd;
  // }
  > div {
    float: left;
    width: 250px;
    height: 100%;
    text-align: center;
    cursor: pointer;
    border-left: 1px solid #797979;
  }
  > div:nth-child(6) {
    float: left;
    width: 248px;
    height: 100%;
    text-align: center;
    cursor: pointer;
    border-left: 1px solid #797979;
  }
  // > div:hover {
  //   background-color: #979797;
  // }
  .hover:hover {
    background-color: #979797;
  }
  // .link-homePage {
  //   // width: 140px;
  // }
  .link-blackSwan {
    border-right: 1px solid #797979;
  }
}

//导航栏效果
.di-header {
  min-width: 1000px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  text-align: center;
}

.di-header:after {
  content: "";
  display: table;
  width: 100%;
  height: 4px;
  z-index: 1;
  background: url(//../static/event/img/line_1.png) repeat-x;
  position: absolute;
  top: 58px;
}

.tj-logo-wrapper {
  position: absolute;
  left: 40px;
  top: 5px;
}
.tj-logo-wrapper img {
  display: block;
  outline: 0;
}
.name {
  font-family: 微软雅黑;
  font-size: 24px;
  font-weight: 400;
  height: 36px;
  line-height: 36px;
  color: black;
  margin: 10px 50px 10px 50px;
}
</style>
