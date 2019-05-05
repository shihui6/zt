<template>
    <div class="platemanage">
        <div><button @click="btn()">自定义管理模块</button></div>
        <ul>
            <li v-for="(item,index) of datalist" :key='index'>{{item}}</li>
        </ul>
    </div>
</template>
<script>    
export default {
    // props:['prop'],
    data(){
        return{
            datalist:''
        }
    },
    created(){
        const url = 'http://10.25.24.51:10195/api/v1.0/risk/sector'
        let username = this.$store.state.list
        console.log(username)

        this.$_axios(
                {   
                    methods:'get',
                    url,
                    auth:{
                        username: username
                }
            }
        ).then(response =>{
            console.log(response.data.result)
            this.datalist = response.data.result.result

        })
    },
    methods:{
        btn(){
            console.log(this.$store.state.list)
        }
    }
}
</script>


<style>
    .platemanage{
        margin-left:20px;
        margin-top:20px;
    }
</style>

