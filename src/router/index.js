import Vue from 'vue'
import Router from 'vue-router'
import opinion from '@/components/opinion'
import monitor from '@/components/monitor/monitor'
import monitor_ntb from '@/components/newthreeboard/monitor'
// 首页
import homePage from '@/components/monitor/homePage/homePage'
import homePage_ntb from '@/components/newthreeboard/homePage/homePage'
// 关联公司预警
import companyWarning from '@/components/monitor/companyWarning/companyWarning'
// 子公司舆情监控
import subMonitoring from '@/components/monitor/subMonitoring/subMonitoring'
// 黑天鹅事件
import blackSwan from '@/components/monitor/blackSwan/blackSwan'
//公司发布
import companyRelease from '@/components/monitor/companyRelease/companyRelease'
// 用户管理
import userSystem from '@/components/common/userSystemManagement'
// 重点关注池
import attentionPoolSet from '@/components/common/attentionPoolSet'

// >>>首页子页面
import homeContent from '@/components/monitor/homePage/homeContent'
//新三板子页面
import homeContent_ntb from '@/components/newthreeboard/homePage/homeContent'

// >>>董事会模块
import boardofdirectorsWarning from '@/components/boardofdirectors/boardofdirectorsWarning'

// >>>经济业务模块
import economicbusinessWarning from '@/components/economicbusiness/economicbusinessWarning'

//title子页面(自定义模块管理)
import userSystem_diyManagement from '@/components/monitor/homePage/userSystem/diyManagement'

// >> 债券
// 新闻预警 > 债券发行人负面新闻
import bond_negativeNews from '@/components/monitor/homePage/bond/negativeNews'
// 新闻预警 > 新闻收藏夹
import bond_newsFavorite from '@/components/monitor/homePage/bond/newsFavorite'
// 公告预警
import bond_ratingwarning from '@/components/monitor/homePage/bond/ratingwarning'
// 公告预警 > 债券发行人公告
import bond_issuerNotice from '@/components/monitor/homePage/bond/issuerNotice'
// 公告预警 >  受托管理人、主承销商发布的公告
import bond_manageNotice from '@/components/monitor/homePage/bond/manageNotice'
// 公告预警
import bond_template from '@/components/monitor/homePage/bond/template'
// 评级预警 >  评级信息
import bond_ratingInformation from '@/components/monitor/homePage/bond/ratingInformation'
// 评级预警 >  评级变动
import bond_ratingChange from '@/components/monitor/homePage/bond/ratingChange'
//评级预警 > 自定义板块预警
import bond_plateWarning from '@/components/monitor/homePage/bond/plateWarning'
// >> 债券

// >> 基金
// 新闻预警 > 基金重仓股负面新闻
import fund_shigekuraNews from '@/components/monitor/homePage/fund/shigekuraNews'
// 新闻预警 > 基金管理人新闻
import fund_managerNews from '@/components/monitor/homePage/fund/managerNews'
// 新闻预警 > 新闻收藏夹
import fund_newsFavorite from '@/components/monitor/homePage/fund/newsFavorite'
// 公告预警
import fund_issuerNotice from '@/components/monitor/homePage/fund/issuerNotice'
//公告預警 > 基本公告
import fund_Basicannounce from '@/components/monitor/homePage/fund/fund_Basicannounce'
//公告預警 > 自定义模板公告
import fund_Template from '@/components/monitor/homePage/fund/fund_Template'
// 基金情况
import fund_info from '@/components/monitor/homePage/fund/fund_info'
// >> 基金
//基金公告详情
import fundDetail from '@/components/monitor/homePage/fund/fundDetail'
import fundDetailtwo from '@/components/monitor/homePage/fund/fundDetailtwo'



// >> 期货
// 期货交易规则
import stock_index_futures from '@/components/monitor/homePage/futureGoods/stock_index_futures'
// >> 期货

// >> 新三板
// 新闻预警 > 新三板持仓股票舆情监控
import NEEQ_NewsMonitoring from '@/components/newthreeboard/homePage/NEEQ/newsMonitoring'
// 新闻预警 > 收藏夹
import NEEQ_favorite from '@/components/newthreeboard/homePage/NEEQ/favorite'
// 最新动态 > 通知公告
import NEEQ_announcement from '@/components/newthreeboard/homePage/NEEQ/announcement'
// 最新动态 > 股转动态
import NEEQ_dynamic from '@/components/newthreeboard/homePage/NEEQ/dynamic'
// 监管公开信息 > 自律监管措施
import NEEQ_selfMeasures from '@/components/newthreeboard/homePage/NEEQ/selfMeasures'
// 监管公开信息 > 纪律处分
import NEEQ_punishment from '@/components/newthreeboard/homePage/NEEQ/punishment'
// 监管公开信息 > 问询函
import NEEQ_inquiryLetter from '@/components/newthreeboard/homePage/NEEQ/inquiryLetter'
// 我的关注池
import NEEQ_attentionPoolSet from '@/components/newthreeboard/homePage/NEEQ/attentionPoolSet'
// >> 新三板

// >> 新三板
// 新闻预警 > 新三板持仓股票舆情监控
import NEEQ_NewsMonitoring_monitor from '@/components/monitor/homePage/NEEQ/newsMonitoring'
// 新闻预警 > 收藏夹
import NEEQ_favorite_monitor from '@/components/monitor/homePage/NEEQ/favorite'
// 最新动态 > 通知公告
import NEEQ_announcement_monitor from '@/components/monitor/homePage/NEEQ/announcement'
// 最新动态 > 股转动态
import NEEQ_dynamic_monitor from '@/components/monitor/homePage/NEEQ/dynamic'
// 监管公开信息 > 自律监管措施
import NEEQ_selfMeasures_monitor from '@/components/monitor/homePage/NEEQ/selfMeasures'
// 监管公开信息 > 纪律处分
import NEEQ_punishment_monitor from '@/components/monitor/homePage/NEEQ/punishment'
// 监管公开信息 > 问询函
import NEEQ_inquiryLetter_monitor from '@/components/monitor/homePage/NEEQ/inquiryLetter'
// >> 新三板

// >> 期权
// 场内期权业务交易所公告信息监控
import shareOption_page1 from '@/components/monitor/homePage/shareOption/shareOption_page1'
// 场内期权业务其他舆情监控
import shareOption_page2 from '@/components/monitor/homePage/shareOption/shareOption_page2'
// >> 期权

// >> 股票
// 新闻预警 新闻收藏夹
import stock_newsWarning from '@/components/monitor/homePage/stock/newsFavorite'
// 公告预警
import stock_afficheWarning from '@/components/monitor/homePage/stock/afficheWarning'
//股票 > 公告预警 > 基本公告
import stock_Basicannounce from '@/components/monitor/homePage/stock/stock_Basicannounce'
//股票 > 公告预警 > 自定义板块范围公告
import stock_Template from '@/components/monitor/homePage/stock/stock_Template'
//股票 > 公告预警 > 负面新闻
import stock_Negative from '@/components/monitor/homePage/stock/stock_Negative'


// 财务信息预警
import stock_financeWarning from '@/components/monitor/homePage/stock/financeWarning'
// 股价异动预警
import stock_sharePriceWarning from '@/components/monitor/homePage/stock/sharePriceWarning'
// 股价异动预警 新闻
import stock_sharePriceWarningNews from '@/components/monitor/homePage/stock/SharePriceMovementNews'
// >> 股票

// >> 监管要求
// 监管要求 > 监管对挂牌公司处罚情况
import supervise_page1 from '@/components/monitor/homePage/supervise/supervise_page1'
// 监管要求 > 一行两会、交易所、证券业协会、基金业协会发布的重要
import supervise_page2 from '@/components/monitor/homePage/supervise/supervise_page2'
// 监管要求 > 最新监管规则解读
import supervise_page3 from '@/components/monitor/homePage/supervise/supervise_page3'
//监管详情
import supervise_detail from '@/components/monitor/homePage/supervise/supervise_detail'
// >> 监管要求
// 法律法规

import legislation from '@/components/monitor/homePage/legislation/legislation'

// 全网舆情
// import publicSendtime from '@components/monitor/homePage/publicSendtime/publicSendtime'
import publicSendtime from '@/components/monitor/homePage/publicSendtime/publicSendtime'
// >>>首页子页面

// >>>黑天鹅事件子页面
import delistingWarning from '@/components/monitor/blackSwan/delistingWarning'
import executives from '@/components/monitor/blackSwan/executives'
import importantEvent from '@/components/monitor/blackSwan/importantEvent'
import customBlackSwan from '@/components/monitor/blackSwan/customBlackSwan'

//公司公告子页面
import release from '@/components/monitor/companyRelease/release'

// >>>关联公司预警子页面
import queryInformation from '@/components/monitor/companyWarning/queryInformation'
import concerncompany from '@/components/monitor/companyWarning/concerncompany'
import companylist from '@/components/monitor/companyWarning/companylist'
import negativenews from '@/components/monitor/companyWarning/negativenews'

// >>>子公司舆情监控子页面
import sub_queryInformation from '@/components/monitor/subMonitoring/queryInformation'
import sub_concerncompany from '@/components/monitor/subMonitoring/concerncompany'

//登录页面
import test from '@/components/test';
import login from '@/components/login';
import register from '@/components/register'
import platemanage from '@/components/platemanage'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: './',
  routes: [{
      path: '/',
      name: 'opinion',
      component: opinion,
      // meta: {
      //   requiresAuth: true
      // }
    },
    //用户登录页面
    //meta
    {
      path: '/monitor/homePage/fundDetail',
      name: 'fundDetail',
      component: fundDetail
    },
    {
      path: '/monitor/homePage/fundDetailtwo',
      name: 'fundDetailtwo',
      component: fundDetailtwo
    },
    {
      path: '/monitor/homePage/supervise_detail',
      name: 'supervise_detail',
      component:supervise_detail
    },

    {
      path: '/test',
      name: 'test',
      redirect: '/login',
      component: test,
      children: [{
        path: '/login',
        name: 'login',
        component: login
      }]
    },
    //自定义测试模块
    {
      path: '/platemanage',
      name:'platemanage',
      component: platemanage
    },
    {
      path: '/test',
      name: 'test',
      redirect: '/register',
      component: test,
      children: [{
        path: '/register',
        name: 'register',
        component: register,
      }]
    },
    {
      path: '/userSystem',
      name: 'userSystem',
      component: userSystem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/attentionPoolSet',
      name: 'attentionPoolSet',
      component: attentionPoolSet,
    },
    {
      path: '/newthreeboard',
      name: 'monitor_ntb',
      redirect: '/newthreeboard/homePage/homeContent',
      component: monitor_ntb,
      children: [{
        path: '/newthreeboard/homePage',
        name: 'homePage_ntb',
        redirect: '/newthreeboard/homePage/homeContent',
        component: homePage_ntb,
        children: [{
            path: '/newthreeboard/homePage/homeContent',
            name: 'homeContent_ntb',
            component: homeContent_ntb,

          },
          // >> 新三板
          {
            path: '/newthreeboard/homePage/NEEQ_NewsMonitoring',
            name: 'NEEQ_NewsMonitoring',
            component: NEEQ_NewsMonitoring,
          },
          {
            path: '/newthreeboard/homePage/NEEQ_favorite',
            name: 'NEEQ_favorite',
            component: NEEQ_favorite,

          },
          {
            path: '/newthreeboard/homePage/NEEQ_announcement',
            name: 'NEEQ_announcement',
            component: NEEQ_announcement,

          },
          {
            path: '/newthreeboard/homePage/NEEQ_dynamic',
            name: 'NEEQ_dynamic',
            component: NEEQ_dynamic
          },
          {
            path: '/newthreeboard/homePage/NEEQ_punishment',
            name: 'NEEQ_punishment',
            component: NEEQ_punishment
          },
          {
            path: '/newthreeboard/homePage/NEEQ_selfMeasures',
            name: 'NEEQ_selfMeasures',
            component: NEEQ_selfMeasures
          },
          {
            path: '/newthreeboard/homePage/NEEQ_inquiryLetter',
            name: 'NEEQ_inquiryLetter',
            component: NEEQ_inquiryLetter
          },
          {
            path: '/newthreeboard/homePage/NEEQ_attentionPoolSet',
            name: 'NEEQ_attentionPoolSet',
            component: NEEQ_attentionPoolSet
          },
          // >> 新三板
        ]
      }],
    },
    {
      path: '/monitor',
      name: 'monitor',
      redirect: '/monitor/homePage/homeContent',
      component: monitor,
      children: [{
          path: '/monitor/homePage',
          name: 'homePage',
          redirect: '/monitor/homePage/homeContent',
          component: homePage,
          children: [{
              path: '/monitor/homePage/homeContent',
              name: 'homeContent',
              component: homeContent,
            },
            // >>title子页面
            {
              path: '/monitor/homePage/userSystem_diyManagement',
              name: 'userSystem_diyManagement',
              component: userSystem_diyManagement,
            },
            // >>title子页面
            // >> 基金
            {
              path: '/monitor/homePage/fund_shigekuraNews',
              name: 'fund_shigekuraNews',
              component: fund_shigekuraNews,
            },
            {
              path: '/monitor/homePage/fund_managerNews',
              name: 'fund_managerNews',
              component: fund_managerNews
            },
            {
              path: '/monitor/homePage/fund_newsFavorite',
              name: 'fund_newsFavorite',
              component: fund_newsFavorite
            },
            {
              path: '/monitor/homePage/fund_issuerNotice',
              name: 'fund_issuerNotice',
              component: fund_issuerNotice
            },
            //公告预警
            {
              path: '/monitor/homePage/fund_Basicannounce',
              name: 'fund_Basicannounce',
              component: fund_Basicannounce
            },
            {
              path: '/monitor/homePage/fund_Template',
              name: 'fund_Template',
              component: fund_Template
            },


            // 基金情况
            {
              path: '/monitor/homePage/fund_info',
              name: 'fund_info',
              component: fund_info
            },
            // >> 基金

            //  >> 债券
            {
              path: '/monitor/homePage/bond_negativeNews',
              name: 'bond_negativeNews',
              component: bond_negativeNews
            },
            {
              path: '/monitor/homePage/bond_newsFavorite',
              name: 'bond_newsFavorite',
              component: bond_newsFavorite
            },
            {
              path: '/monitor/homePage/bond_issuerNotice',
              name: 'bond_issuerNotice',
              component: bond_issuerNotice
            },
            {
              path: '/monitor/homePage/bond_manageNotice',
              name: 'bond_manageNotice',
              component: bond_manageNotice
            },
            {
              path: '/monitor/homePage/bond_ratingwarning',
              name: 'bond_ratingwarning',
              component: bond_ratingwarning
            },
            {
              path: '/monitor/homePage/bond_ratingInformation',
              name: 'bond_ratingInformation',
              component: bond_ratingInformation
            },
            {
              path: '/monitor/homePage/bond_ratingChange',
              name: 'bond_ratingChange',
              component: bond_ratingChange
            },
            {
              path: '/monitor/homePage/bond_template',
              name: 'bond_template',
              component: bond_template
            },
            {
              path:'/monitor/homePage/bond_plateWarning',
              name: 'bond_plateWarning',
              component:bond_plateWarning
            },

            //  >> 债券

            // >> 期货
            {
              path: '/monitor/homePage/stock_index_futures',
              name: 'stock_index_futures',
              component: stock_index_futures
            },
            // >> 期货

            // >> 法律法规
            {
              path: '/monitor/homePage/legislation',
              name: 'legislation',
              component: legislation
            },
            // 全网舆情
            {
              path:'/monitor/homePage/publicSendtime',
              name:'publicSendtime',
              component:publicSendtime
            },
            // >> 法律法规

            // >> 期权
            {
              path: '/monitor/homePage/shareOption_page1',
              name: 'shareOption_page1',
              component: shareOption_page1
            },
            {
              path: '/monitor/homePage/shareOption_page2',
              name: 'shareOption_page2',
              component: shareOption_page2
            },
            // >> 期权
            // >> 新三板
            {
              path: '/monitor/homePage/NEEQ_NewsMonitoring',
              name: 'NEEQ_NewsMonitoring_monitor',
              component: NEEQ_NewsMonitoring_monitor,

            },
            {
              path: '/monitor/homePage/NEEQ_favorite',
              name: 'NEEQ_favorite_monitor',
              component: NEEQ_favorite_monitor,

            },
            {
              path: '/monitor/homePage/NEEQ_announcement',
              name: 'NEEQ_announcement_monitor',
              component: NEEQ_announcement_monitor,

            },
            {
              path: '/monitor/homePage/NEEQ_dynamic',
              name: 'NEEQ_dynamic_monitor',
              component: NEEQ_dynamic_monitor
            },
            {
              path: '/monitor/homePage/NEEQ_punishment',
              name: 'NEEQ_punishment_monitor',
              component: NEEQ_punishment_monitor
            },
            {
              path: '/monitor/homePage/NEEQ_selfMeasures',
              name: 'NEEQ_selfMeasures_monitor',
              component: NEEQ_selfMeasures_monitor
            },
            {
              path: '/monitor/homePage/NEEQ_inquiryLetter',
              name: 'NEEQ_inquiryLetter_monitor',
              component: NEEQ_inquiryLetter_monitor
            },
            // >> 新三板
            // >> 股票
            {
              path: '/monitor/homePage/stock_newsWarning',
              name: 'stock_newsWarning',
              component: stock_newsWarning
            },
            {
              path: '/monitor/homePage/stock_afficheWarning',
              name: 'stock_afficheWarning',
              component: stock_afficheWarning
            },
            //股票 > 基本公告
            {
              path: '/monitor/homePage/stock_Basicannounce',
              name: 'stock_Basicannounce',
              component: stock_Basicannounce
            },
            {
              path: '/monitor/homePage/stock_Template',
              name: 'stock_Template',
              component: stock_Template
            },
            {
              path: '/monitor/homePage/stock_Negative',
              name: 'stock_Negative',
              component: stock_Negative
            },
            {
              path: '/monitor/homePage/stock_financeWarning',
              name: 'stock_financeWarning',
              component: stock_financeWarning
            },
            {
              path: '/monitor/homePage/stock_sharePriceWarning',
              name: 'stock_sharePriceWarning',
              component: stock_sharePriceWarning
            },
            {
              path: '/monitor/homePage/stock_sharePriceWarningNews',
              name: 'stock_sharePriceWarningNews',
              component: stock_sharePriceWarningNews
            },
            // >> 股票

            // >> 监管要求
            {
              path: '/monitor/homePage/supervise_page1',
              name: 'supervise_page1',
              component: supervise_page1
            },
            {
              path: '/monitor/homePage/supervise_page2',
              name: 'supervise_page2',
              component: supervise_page2
            },
            {
              path: '/monitor/homePage/supervise_page3',
              name: 'supervise_page3',
              component: supervise_page3
            },
            // >> 监管要求
          ]
        },
        {
          path: '/monitor/companyWarning',
          name: 'companyWarning',
          component: companyWarning,
        },
        // {
        //   path: '/monitor/concerncompany',
        //   name: 'concerncompany',
        //   component: concerncompany
        // },
        // {
        //   path: '/monitor/companylist',
        //   name: 'companylist',
        //   component: companylist
        // },
        {
          path: '/monitor/subMonitoring',
          name: 'subMonitoring',
          component: subMonitoring
        },
        //公告
        {
          path:'/monitor/companyRelease',
          name: 'companyRelease',
          component: companyRelease,
          redirect: companyRelease,
          children: [{
            path:'/monitor/companyRelease/release',
            name:'release',
            component:release
          }]
        },
        // 黑天鹅
        {
          path: '/monitor/blackSwan',
          name: 'blackSwan',
          redirect: '/monitor/blackSwan/delistingWarning',
          component: blackSwan,
          children: [{
              path: '/monitor/blackSwan/delistingWarning',
              name: 'delistingWarning',
              component: delistingWarning,

            },
            {
              path: '/monitor/blackSwan/executives',
              name: 'executives',
              component: executives,

            },
            {
              path: '/monitor/blackSwan/importantEvent',
              name: 'importantEvent',
              component: importantEvent,

            },
            {
              path:'/monitor/blackSwan/customBlackSwan',
              name: 'customBlackSwan',
              component: customBlackSwan,
            }
          ]
        },
        // 关联公司预警
        {
          path: '/monitor/companyWarning',
          name: 'companyWarning',
          redirect: '/monitor/companyWarning/queryInformation',
          component: companyWarning,
          children: [{
              path: '/monitor/companyWarning/queryInformation',
              name: 'queryInformation',
              component: queryInformation,

            },
            {
              path: '/monitor/companyWarning/concerncompany',
              name: 'concerncompany',
              component: concerncompany,

            },
            {
              path: '/monitor/companyWarning/companylist',
              name: 'companylist',
              component: companylist,
            },
            {
              path: '/monitor/companyWarning/negativenews',
              name: 'negativenews',
              component: negativenews,
            },

          ]
        },
        // 子公司舆情监控
        {
          path: '/monitor/subMonitoring',
          name: 'subMonitoring',
          redirect: '/monitor/subMonitoring/queryInformation',
          component: subMonitoring,
          children: [{
              path: '/monitor/subMonitoring/queryInformation',
              name: 'queryInformation',
              component: sub_queryInformation,
            },
            {
              path: '/monitor/subMonitoring/concerncompany',
              name: 'concerncompany',
              component: sub_concerncompany,
            },
          ]
        }
      ]
    },
    {
      path: '/boardofdirectorsWarning',
      name: 'boardofdirectorsWarning',
      component: boardofdirectorsWarning,
    },
    {
      path: '/economicbusinessWarning',
      name: 'economicbusinessWarning',
      component: economicbusinessWarning,
    },
  ]
})
