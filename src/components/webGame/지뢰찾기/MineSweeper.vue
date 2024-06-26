<script >
import {mapState} from 'vuex';
import store from "../../../store/index.js";
import TableComponent from "./TableComponent.vue";
import MineForm from "./MineForm.vue";
let interval = null;
import {INCREMENT_TIMER} from "../../../store/index.js";
export default {

  store,
  components: {
    TableComponent,
    MineForm
  },
  props:
      ['titleName']
  ,
  data() {
    return {
      title:this.titleName,
    }
  },
  watch :{
    halted(value,oldValue){
      if(value === false){
        setInterval(()=>{
          interval = this.$store.commit(INCREMENT_TIMER);
        },1000);
      }else{
        clearInterval(interval);
      }
    }
  }
  ,
  computed: {//캐싱때문에 계산식이나 복잡한식에 사용 ,성능에 관련됨
    ...mapState(['timer','result','halted']),
  }
}
</script>

<template>
  <h1>{{ title }}</h1>
  <div>
    <mine-form></mine-form>
    <div>{{timer}}</div>
    <table-component>
    </table-component>
    <div>{{result}}</div>
  </div>
  <h1>=========================</h1>
</template>

<style >
table {
  border-collapse: collapse;
  margin: 20px auto;
  width: 200px;
  height: 200px;
}

td {
  width: 66px;
  height: 66px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid black;
  cursor: pointer;
  font-size: 24px;
}
</style>