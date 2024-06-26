<template>

    <tictactocTableTr v-for="(rowData,index) in tableData" :key="index" :row-data="rowData" :row-index="index"></tictactocTableTr>

</template>

<script>
import tictactocTableTr from "./TictactocTableTr.vue";

export default {
  props :
      {
        tableData:Array,
        turns : String
      }
  ,
  created() {

  },
  components:{
    tictactocTableTr
  },
  data() {
    return {
      turnTable : this.turns
    }
  },
  computed : {//캐싱때문에 계산식이나 복잡한식에 사용 ,성능에 관련됨

  },
  mounted() {

  },

  methods :{

  },
  watch :{
    
  },
  unmounted() {

  }
}

</script>

<style scoped>

</style>