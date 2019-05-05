<template>
  <div>
    <div class="messageBox">
      <ul class="clearFloat">
        <li v-for="(item,index) of prop" 
            :key="index" class="messageLists clearFloat">
            <div class="messageTime">{{item.time}}</div>
            <div class="messageRight">
              <div @click="newsDetails(item)" class="title">{{item.title}}</div>
              <div class="content">{{item.content}}</div>
            </div>
        </li>
      </ul>
    </div>
    <div v-if="isShowDetails" class="detailsPopUp">
      <div class="detailsBox">
        <div>
          <h1>{{detailsData.news_title}}</h1>
          <h3>{{detailsData.sub_title}}</h3>
          <p>日期：{{detailsData.news_date}}  新闻类型：{{detailsData.neeq_type}}</p>
          <div>
            {{detailsData.news_content}}
          </div>
        </div>
        <span @click="closeDetails" class="closeBtn">×</span>
      </div>
    </div>
  </div>
</template>

<script>
//       {
// code: "0",
// msg: "query success",
// result: {
// neeq_news_detail: {
// appendix: "('/uploads/1/file/public/201805/20180515165415_hy2bwpbp0l.docx')",
// click_num: null,
// neeq_id: 12,
// neeq_type: "通知公告",
// news_content: "('全国股转公司根据《全国中小企业股份转让系统主办券商执业质量评价办法》（以下简称《评价办法》）和主办券商执业记录（2018年4月1日至4月30日），对主办券商2018年4月的执业质量情况进行了评价计值，现将评价结果公布如下。','本月共有101家主办券商参与评价，其中中信证券（山东）并入其母公司中信证券合并评价，东方花旗并入其母公司东方证券合并评价，申万宏源西部证券并入其母公司申万宏源证券合并评价，华泰联合证券并入其母公司华泰证券合并评价，实际列示97家主办券商评价结果（详见附件）。','31','家主办券商评价点值在90（含）点以上，占比31.96%（3月38.14%）；37家主办券商评价点值在80（含）-90点之间，占比38.14%（3月37.11%）；23家主办券商评价点值在70（含）-80点，占比23.71%（3月16.49%）；6家主办券商评价点值在70以下，占比6.19%（3月8.25%）。','评价点值排名前五的主办券商为申万宏源证券、招商证券（并列第一）、海通证券、方正证券、东莞证券、联讯证券（并列第五）、首创证券（并列第五）、东方证券（并列第五）。','本月全国股转公司共记录负面行为61条，按照《主办券商执业质量负面行为清单》中的调整系数调整后为52.5条，涉及40家主办券商。其中，推荐挂牌类3条，占比5.71%；推荐后督导类31条，占比59.05%；交易管理类12.5条，占比23.81%；综合管理类6条，占比11.43%。各类负面行为记录汇总见下表：','负面行为记录数在5条（含）以下的主办券商40家，合计占总记录数的100%（3月69.75%）；负面行为记录在5-20条（含）之间的主办券商0家，合计占总记录数的0%（3月0%）；20条以上的主办券商0家，合计占总记录数的0%（3月30.25%）。','从统计结果看，推荐挂牌类负面行为记录数与其业务量比值最高的为华安证券；挂牌后督导类负面行为记录数与其业务量比值最高的为中投证券；交易管理类负面行为记录数与其业务量比值最高的为大同证券；综合管理类负面行为记录数与其业务量比值最高的为国开证券。','负面行为记录的情形需重点关注的问题如下：','（一）推荐挂牌类中，负面行为清单第1条问题突出，其主要为部分申请材料缺少公章或相关人员签字。','（二）挂牌后督导类中，负面行为清单第18条问题突出，主要为临时公告标题与内容不符，公告内容存在错误，公告上传错误等问题。','（三）交易管理类中，负面行为清单第27条问题突出，主要为前次做市申报撤销或其申报数量经成交后不足1000股的，未在5分钟内重新报价。','（四）综合管理类中，负面行为清单第37条问题突出，主要为变更主办券商业务相关申请材料未在规定时间内提交。','全国股转系统主办券商执业质量月度评价结果主要体现主办券商执业质量变化的动态情况，是全国股转公司实施动态监管的需要。各主办券商需重点关注负面行为记录的主要记录事项和情形，加强合规风险管理，及时采取措施提高执业质量，切实落实执业质量评价工作对提升执业质量的推动作用。','主办券商对评价结果有异议的，应自公示后的5个转让日内向全国股转公司申请复议，将复议申请及相关证明材料通过BPM系统上传并及时电话联系自律管理部（010-63889557）。',' ',' ',' ',' ','全国中小企业股份转让系统有限责任公司','2018','年5月15日')",
// news_date: "2018-05-15",
// news_title: "2018年4月主办券商执业质量评价结果",
// sub_title: "关于正式发布2018年创新层挂牌公司名单的公告"
// }
// }
// }
export default {
  props: ['prop'],
  data(){
    return {
      isShowDetails: false,
      detailsData: {}
    }
  },
  methods:{
    newsDetails(item){
      this.isShowDetails = false;
      this.$_axios.get('http://10.25.24.51:10189/api/risk/neeq_news_detail?neeq_id=' + item.id)
      .then(response => {
        this.isShowDetails = true;
        const resultData = response.data.result;
        this.detailsData = JSON.parse(JSON.stringify(resultData.neeq_news_detail));
        console.log(resultData)
      })
      .catch(err => {
        console.log(err);
      });
    },
    closeDetails(){
      this.isShowDetails = false;
      this.detailsData = {}
    }
  }
}
</script>

<style lang="less" scoped>
.messageBox{
  width: 100%;
  // background-color: darkgrey;
  .messageLists{
    float: left;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    margin-top: 30px;
    >div{
      float: left;
    }
  }
  .messageTime{
    box-sizing: border-box;
    width: 65px;
    height: 50px;
    background-color: #93b1b9;
    color: #fff;
    padding-left: 10px;
    padding-top: 5px;
    font-size: 21px;
    line-height: 19px;
  }
  .messageRight{
    width: 75%;
    margin-left: 15px;
    >div{
      height: 25px;
      line-height: 25px; 
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .title{
      cursor: pointer;
    }
  }
}
.detailsPopUp{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: 1px solid #797979;
  word-break:break-all;
  word-wrap:break-word;
  background-color: #fff;
  z-index: 2;
  .detailsBox{
    position: relative;
    width: 900px;
    margin-left: auto;
    margin-right: auto;
    >div{
      height: 900px;
      overflow: hidden;
      >div{
        height: 823px;
        overflow-y: scroll;
      }
    }
    h1,h3{
      text-align: center;
      line-height: 40px;
    }
    p{
      text-align: center;
      line-height: 30px;
    }
    .closeBtn{
      position: absolute;
      right: -50px;
      top: 30px;
      font-size: 40px;
      cursor: pointer;
    }
  }
}
</style>
