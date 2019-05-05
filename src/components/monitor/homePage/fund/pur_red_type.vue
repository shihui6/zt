<template>
  <div>
    <!-- 基金申赎状态 -->
    <div class="pur_red_type_box">
      <!-- <div>基金代码 ：{{purRedTypeData.SECURITYCODE}}</div>
      <div>基金简称 ：{{purRedTypeData.SECURITYSNAME}}</div> -->
      <div>申赎状态 ：{{purRedTypeData.OFORCB}}</div>
      <div>截止日期 ：{{purRedTypeData.ENDDATE}}</div>
      <div>申购状态 ：{{purRedTypeData.PURTYPE}}</div>
      <div>赎回状态 ：{{purRedTypeData.REDTYPE}}</div>
      <div>单位净值 ：{{purRedTypeData.NVPER}}</div>
      <div>累计单位净值 ：{{purRedTypeData.ANVPER}}</div>
      <div>状态最新日期 ：{{purRedTypeData.UPDATEDATE}}</div>
      <div>场外日常申购起始日 ：{{purRedTypeData.ASDATEOTC}}</div>
      <div>场外日常赎回起始日 ：{{purRedTypeData.RSDATEOTC}}</div>
      <div>场内申购起始日 ：{{purRedTypeData.ASDATE}}</div>
      <div>场内赎回起始日 ：{{purRedTypeData.RSDATE}}</div>
      <div>申购申请确认日 ：{{purRedTypeData.APPLYADATE}}</div>
      <div>赎回申请确认日 ：{{purRedTypeData.REDEEMADATE}}</div>
      <div>赎回款项支付日 ：{{purRedTypeData.RSUMPAYDATE}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prop'],
  computed:{
    purRedTypeData(){
      const popUpData = this.prop;
      const pur_or_red = {};
      if(popUpData){
        pur_or_red.ENDDATE = popUpData.pur_or_red1[0].ENDDATE ? new Date(popUpData.pur_or_red1[0].ENDDATE).toLocaleDateString() : '-';
        pur_or_red.PURTYPE = popUpData.pur_or_red1[0].PURTYPE;
        pur_or_red.REDTYPE = popUpData.pur_or_red1[0].REDTYPE;
        pur_or_red.NVPER = popUpData.pur_or_red1[0].NVPER;
        pur_or_red.ANVPER = popUpData.pur_or_red1[0].ANVPER;
        pur_or_red.UPDATEDATE = popUpData.pur_or_red1[0].UPDATEDATE ? new Date(popUpData.pur_or_red1[0].UPDATEDATE).toLocaleDateString() : '-';
        pur_or_red.ASDATEOTC = popUpData.pur_or_red2[0].ASDATEOTC ? new Date(popUpData.pur_or_red2[0].ASDATEOTC).toLocaleDateString() : '-';
        pur_or_red.RSDATEOTC = popUpData.pur_or_red2[0].RSDATEOTC ? new Date(popUpData.pur_or_red2[0].RSDATEOTC).toLocaleDateString() : '-';
        pur_or_red.ASDATE = popUpData.pur_or_red2[0].ASDATE ? new Date(popUpData.pur_or_red2[0].ASDATE).toLocaleDateString() : '-';
        pur_or_red.RSDATE = popUpData.pur_or_red2[0].RSDATE ? new Date(popUpData.pur_or_red2[0].RSDATE).toLocaleDateString() : '-';
        pur_or_red.APPLYADATE = popUpData.pur_or_red2[0].APPLYADATE;
        pur_or_red.REDEEMADATE = popUpData.pur_or_red2[0].REDEEMADATE;
        pur_or_red.RSUMPAYDATE = popUpData.pur_or_red2[0].RSUMPAYDATE;

        pur_or_red.OFORCB = popUpData.OFORCB == '1' ? '开放式' : '封闭式';
      }
      
      return {
        // SECURITYCODE: popUpData.fund_info.SECURITYCODE,
        // SECURITYSNAME: popUpData.fund_info.SECURITYSNAME,
        OFORCB: pur_or_red.OFORCB,
        ENDDATE: pur_or_red.ENDDATE,
        PURTYPE: pur_or_red.PURTYPE,
        REDTYPE: pur_or_red.REDTYPE,
        NVPER: pur_or_red.NVPER,
        ANVPER: pur_or_red.ANVPER,
        UPDATEDATE: pur_or_red.UPDATEDATE,
        ASDATEOTC: pur_or_red.ASDATEOTC,
        RSDATEOTC: pur_or_red.RSDATEOTC,
        ASDATE: pur_or_red.ASDATE,
        RSDATE: pur_or_red.RSDATE,
        APPLYADATE: pur_or_red.APPLYADATE,
        REDEEMADATE: pur_or_red.REDEEMADATE,
        RSUMPAYDATE: pur_or_red.RSUMPAYDATE
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pur_red_type_box{
  margin: 70px 0 0 100px;
  >div{
    line-height: 30px;
  }
}
</style>
