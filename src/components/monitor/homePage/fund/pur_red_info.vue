<template>
  <div>
    <!-- 基金申赎明细 -->
    <div class="pur_red_type_box">
      <ul>
        <li v-for="(item, index) of purRedInfoData" :key="index" class="pur_red_type">
          <div>报表日期 ：{{item.REPORTDATE.toLocaleDateString()}}</div>
          <div>期初份额(份) ：{{item.SHAREBEGIN}}</div>
          <div>期间总申购份额(份) ：{{item.SHAREAPPLY}}</div>
          <div>因拆分增加份额(份) ：{{item.ADDFORSPLIT}}</div>
          <div>期间总赎回份(份) ：{{item.SHAREREDEEM}}</div>
          <div>期末基金份额(份) ：{{item.SHAREEND}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prop'],
  computed:{
    purRedInfoData(){
      if(this.prop){
        // const purRedInfo = this.prop.purRedInfo ? this.prop.purRedInfo : [{}];
         const purRedInfo = JSON.parse(JSON.stringify(this.prop.pur_red_info));
        purRedInfo.forEach(item => {
          item.REPORTDATE = item.REPORTDATE ? new Date(item.REPORTDATE) : '-';
        });
        return purRedInfo;
      }
    },
  }
}
</script>

<style lang="less" scoped>
.pur_red_type_box{
  margin: 70px 0 0 100px;
  .pur_red_type{
    margin-top: 50px;
  }
}
</style>
