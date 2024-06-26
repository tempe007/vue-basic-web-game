<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import store, {CLICK_CELL,SET_WINNER,NO_WINNER,RESET_GAME,CHANGE_TURN} from "./store.js";
import {useStore} from "vuex";
import {computed} from "vue";

export default {

  props :
      {
        cellData:String,
        rowIndex:Number,
        cellIndex:Number
      }
  ,
  created() {

  },
  components:{
    tableData(){
      return store.state.tableData;
    },
    turn(){
      return store.state.turns;
    }
  },

  data() {
    return {

    }
  },
  computed : {//캐싱때문에 계산식이나 복잡한식에 사용 ,성능에 관련됨

  },
  mounted() {

  },
  methods :{
      onClickTd() {
        const store  = useStore();
        if(this.cellData) return;
        console.log(this);
        store.commit(CLICK_CELL,{row : this.rowIndex, cell:this.cellIndex});


        let win = false;
        if(this.tableData[this.rowIndex][0] === this.turns
            && this.tableData[this.rowIndex][1] === this.turns
            && this.tableData[this.rowIndex][2] === this.turns
        ){
          win = true;
        }
        if(this.tableData[0][this.cellIndex] === this.turns
            && this.tableData[1][this.cellIndex] === this.turns
            && this.tableData[2][this.cellIndex] === this.turns
        ){
          win = true;
        }
        if(this.tableData[0][0] === this.turns
            && this.tableData[1][1] === this.turns
            && this.tableData[2][2] === this.turns
        ){
          win = true;
        }
        if(this.tableData[0][2] === this.turns
            && this.tableData[1][1] === this.turns
            && this.tableData[2][0] === this.turns
        ){
          win = true;
        }
        if(win){// 이긴경우 3줄 달성
          store.commit(SET_WINNER,this.turns);
          store.commit(RESET_GAME);
        }else{ //지거나 무승
          let all = true; //all이 true 면 무승부라는 뜻
          this.tableData.forEach((row)=>{
            row.forEach((cell)=>{
              if(!cell){
                all=false;
              }
            });
          });
          if(all){ //무승부
            store.commit(NO_WINNER)
            store.commit(RESET_GAME);
          }
          store.commit(CHANGE_TURN);
        }
      }
    },
  watch :{
    
  },
  unmounted() {

  },

}

</script>

<style scoped>

</style>