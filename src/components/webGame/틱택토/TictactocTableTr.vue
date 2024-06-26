<template>
  <tr>
    <tictactoc-table-td v-for="(cellData,index) in rowData"  :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></tictactoc-table-td>
  </tr>
</template>

<script>
import TictactocTableTd from "./TictactocTableTd.vue";

export default {

  props :{
    rowData : Array,
    rowIndex: Number
  }

  ,
  components:{
    TictactocTableTd
  },
  data() {
    return {

    }
  },
  created() {

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