import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 路由刷新页面flag 
    routerGoNow: true,
    // 是否打开用户系统管理
    isShowUserSystem: false,
    // 是否打开重点关注池
    isAttentionPool: false,
    // 新三板-自律监管措施-代码列表
    codeDataList_N: [],
    // 基金公告预警-基金列表
    codeDataList_F: [],
    // 基金情况-基金列表
    fundList: [],
    startnumber: "",
    //关联公司代码
    company_code_list: "",
    list:[],
  },

})
