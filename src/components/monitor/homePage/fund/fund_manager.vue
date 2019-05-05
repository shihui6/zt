<template>
  <div class="fmanager_infoBox">
    <ul>
      <li v-for="(item, index) of fmanager_info" :key="index" class="fmanager_info">
        <div>基金经理 ：{{item.MANAGER}}</div>
        <div>在任状态 ：{{item.POSTSTATE}}</div>
        <div>任职日期 ：{{item.POSTSDATE.toLocaleDateString()}}</div>
        <div>离任日期 ：{{item.POSTEDATE}}</div>
        <div>任职以来回报 ：{{item.YIELDSINCES.toFixed(2)}}%</div>
        <!-- <div>更新时间 ：{{item.UPDATEDATE.toLocaleDateString()}}</div> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['prop'],
  computed:{
    fmanager_info(){
      // const fmanagerInfo = this.prop.fmanager_info;
      console.log('基金经理详情组件',this.prop)
      if(this.prop){
        const fmanagerInfo = this.prop.fmanager_info ? JSON.parse(JSON.stringify(this.prop.fmanager_info)) : [{}];
        fmanagerInfo.forEach(item => {
          item.POSTSDATE = item.POSTSDATE ? new Date(item.POSTSDATE) : '-';
          if(item.POSTEDATE === '-' || item.POSTEDATE === null || item.POSTEDATE === '至今'){
            item.POSTEDATE = '至今';
          } else{
            item.POSTEDATE = item.POSTEDATE ? new Date(item.POSTEDATE).toLocaleDateString() : '-';
          }
          // item.UPDATEDATE = item.UPDATEDATE ? new Date(item.UPDATEDATE) : '-';
          // -1为现任，0为离任
          item.POSTSTATE = item.POSTSTATE == -1 ? '现任' : '离任';
        });
        return fmanagerInfo;
      }
    }
  },
}
</script>

<style lang="less" scoped>
.fmanager_infoBox{
  margin: 70px 0 0 100px;
  .fmanager_info{
    margin-top: 50px;
  }
}
</style>
