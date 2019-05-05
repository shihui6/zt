<template>
  <div id="app">
    <router-view/>
    <div v-if="isShowUserSystem">
      <user-system></user-system>
    </div>
    <div v-if="isAttentionPool">
      <attention-pool-set></attention-pool-set>
    </div>
  </div>
</template>

<script>
import userSystem from '@/components/common/userSystemManagement'
import attentionPoolSet from '@/components/common/attentionPoolSet'
export default {
  name: 'App',
  data(){
    return {
      attentionPoolData: {
        parentEvent: 'attentionPoolSet',
        list: null
      },
    }
  },
  components:{
    userSystem,
    attentionPoolSet
  },
  computed:{
    isShowUserSystem:{
      get(){
        return this.$store.state.isShowUserSystem;
      },
      set(newValue){
        this.$store.state.isShowUserSystem = newValue;
      }
    },
    isShowPool(){
      return this.$store.state.isShowPool;
    },
    isAttentionPool(){
      return this.$store.state.isAttentionPool;
    }
  },
}
</script>

<style lang="less" scoped>
  

</style>
