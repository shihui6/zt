<template>
 <div>
    <div class="detail_top">
    </div>
    <i onclick="window.opener=null;window.close()" class="return_back">×</i>
    <div class="detail_content" v-show='detailContent'>{{dataList.content}}</div>
 </div>
</template>

<script>
export default {
    data(){
        return{
            detailContent:true,
            messageLink:false,
            url:'http://10.25.24.51:10189/api/risk/regulatory_detail',
            queryCondition:{
                 id:'',
            },
            sendData: {},
            dataList:{},
            categoryIndex:0,
        }
    },
    created(){
        this.queryCondition.id = this.$route.query.id
        this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
        // this.sendData.id = 'AN201706060627564480'
        console.log(this.sendData)
        console.log(this.url)
        //发送请求
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
          console.log(response)
        // console.log('股票 > 股价异动预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.news_detail));
        // this.resultData = response.data.result;
        console.log(this.dataList)
        
      })
        .catch(err => {
          // console.log(err);
        });
    },
    methods:{
    }
}
</script>


<style scoped>
    .detail_top{
        position: absolute;
        top: 78px;
        left: 425px;
    }
    .detail_top span{
        width: 140px;
        height: 46px;
        line-height: 46px;
        display: inline-block;
    }
    span{
        display: inline-block;
        cursor: pointer;
        background-color: #D7D7D7;
        color:white;
        height: 27px;
        width: 84px;
        text-align: center;
        line-height: 27px;
    }
    span.active{
        background-color: #b50229;
    }

    .detail_content{
        position: absolute;
        border: 1px solid #000;
        top: 227px;
        left: 594px;
        width: 675px;
    }
    .messageLink_one > ul{
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        overflow: hidden;
        width:590px;
        list-style: none;
    }
    .messageLink_one > ul > li{
        float: left;
        width:25%;
        height:64px;
        line-height: 64px;
        text-align: center;
        border-left:1px solid #000;
        border-top:1px solid #000;
    }

        .messageLink_one > ul > li:nth-child(1){
        /* height: 90px; */
        background-color: #F0F5F9;
    }
        .messageLink_one > ul > li:nth-child(2){
        /* height: 90px; */
        background-color: #F0F5F9;
    }
        .messageLink_one > ul > li:nth-child(3){
        /* height: 90px; */
        background-color: #F0F5F9;
    }
        .messageLink_one > ul > li:nth-child(4){
        /* height: 90px; */
        background-color: #F0F5F9;
    }
    .messagelink{
        position: absolute;
        top: 226px;
        left: 424px;
    }
    /* .detail_top .close{
    font-size: 40px;
    cursor: pointer;
    font-weight: 500;
  } */
  .return_back{
        font-size: 70px;
        position: absolute;
        top: 167px;
        right: 612px;
        cursor: pointer;
        color: #b50229;
  }

</style>

