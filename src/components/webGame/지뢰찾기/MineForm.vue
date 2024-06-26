<script>
import {
  START_GAME
} from '../../../store/index.js';
import {useStore} from "vuex";

    export default {
      data(){
        return{
          row: 10,
          cell:10,
          mine:20,
        }
      },methods:{
        onChangeRow(e){
          this.row = e.target.value;
        },
        onChangeCell(e){
          this.cell = e.target.value;
        },
        onChangeMine(e){
          this.mine = e.target.value;
        },
        onClickBtn(){
          try {
            this.$store.commit(START_GAME,{row : this.row , cell:this.cell , mine : this.mine});
          }catch (e){
            console.log(e);
          }

        }
      }
    }
</script>

<template>
  <div>
    <input type="number" placeholder="세로" :value="row" @change="onChangeRow"/>
    <input type="number" placeholder="가로" :value="cell" @change="onChangeCell"/>
    <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine"/>
    <button @click="onClickBtn">시작</button>
  </div>
</template>

<style scoped>

</style>