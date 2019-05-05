// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '@/store/store'
import EasyScroll from 'easyscroll'
import '@/common/extend.js';
import '@/style/common.css';
import '@/style/queryCondition.css';
import '@/style/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/index.js';
import ElementUI from 'element-ui';

Vue.config.productionTip = false
Vue.prototype.$_axios = axios;
Vue.use(EasyScroll);
Vue.use(ElementUI);


// // 解决401问题
// axios.interceptors.request.use(
//   config => { // 这里写死一个token，你需要在这里取到你设置好的token的值
//     let token = localStorage.getItem('token')
//     // let hash = localStorage.getItem('hash')
//     if (token) {
//       config.headers['Username'] = token
//       // config.headers['Api-Token-Hash'] = hash
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
// // 拦截401 跳到登陆页
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401: // 返回 401 清除token信息并跳转到登录页面
//           // store.commit(types.LOGOUT);
//           // router.replace({
//           //   path: '/login',
//           //   query: {
//           //     redirect: router.currentRoute.fullPath
//           //   }
//           // })
//       }
//     }
//     // return Promise.reject(error.response.data) // 返回接口返回的错误信息
//   })


router.beforeEach((to, from, next) => {
  if(to.path === '/login'){next()}
  else{
    //指定的需要登录的页面，没有登录信息的页面
    if(to.path !=='/login' && !sessionStorage.getItem('token')){
      console.log('跳转到登录页')
      next()
    }else{
      next()
    }
  }
  
})
// /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
