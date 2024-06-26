<template>
  <h1>{{ title }}</h1>
  <div>
    <div>{{turns}} 님의 턴입니다.</div>
    <TictactocTable :table-data="tableData" ></TictactocTable>
    <div v-if="winner">{{winner}} 님의 승리!</div>
  </div>
  <h1>=========================</h1>
</template>

<script>
import TictactocTable from "./TictactocTable.vue";
import Store from "./store.js";

export default {
  props:
      ['titleName']
  ,
  components: {
    TictactocTable
  },
  data() {
    return {
      title:this.titleName,
    }
  }
  ,
  computed: {//캐싱때문에 계산식이나 복잡한식에 사용 ,성능에 관련됨

  },
  mounted() {

  },
  methods: {
    onclickTd(rowIndex,cellIndex){
      

    }
  },
  watch: {},
  unmounted() {

  },
  created() {

  }
}

</script>

<style>
  table{
    border-collapse: collapse;
  }
  td{
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
  div{
    color: black;
  }
</style>