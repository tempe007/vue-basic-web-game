<script >
import { mapState } from 'vuex';
import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL} from "../../../store/index.js";
export default {
  computed :{
    ...mapState(['mineTableData','halted']),
    cellDataStyle :function (state){
      return (row,cell)=>{
        switch (this.$store.state.mineTableData[row][cell]){
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              background : '#444',
            }
          case CODE.CLICKED_MINE:
          case CODE.OPENED:
            return  {
              background: 'white'
            }
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return {
              background : 'red',
            }
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return {
              background: 'yellow'
            }
          default:
            return {};
        }
      }
    },
    cellDataText: function (state){
      return (row,cell)=> {
        switch (this.$store.state.mineTableData[row][cell]) {
          case CODE.MINE:
            return 'X';
          case CODE.NORMAL:
            return '';
          case CODE.CLICKED_MINE:
            return '꽝';
          case CODE.FLAG:
            return '!';
          case CODE.FLAG_MINE:
            return {}
          case CODE.QUESTION:
            return '?';
          default:
            return this.$store.state.mineTableData[row][cell];
        }
      }
    }
  },
  methods :{
    onClickTd(row,cell){
      console.log(row,cell);
      if(this.halted){
        return;
      }
      switch (this.mineTableData[row][cell]){
        case CODE.NORMAL:
          return this.$store.commit(OPEN_CELL,{row,cell});
        case CODE.MINE:
          return this.$store.commit(CLICK_MINE,{row,cell});
        default:
          return;
      }
    },
    onRightClickTd(row,cell){
      console.log(row,cell);
      if(this.halted){
        return;
      }
      switch (this.mineTableData[row][cell]){
        case CODE.NORMAL:
        case CODE.MINE:
          this.$store.commit(FLAG_CELL,{row:row,cell : cell});
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          this.$store.commit(QUESTION_CELL,{row:row,cell : cell});
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          this.$store.commit(NORMALIZE_CELL,{row:row,cell : cell});
          return;
      }
    }
  }
}
</script>

<template>

  <table>
    <th></th>
    <tr v-for="(rowData,rowIndex) in mineTableData" :key="rowIndex">
      <td v-for="(cellData,cellIndex) in rowData"
          :key="cellData"
          :style="cellDataStyle(rowIndex,cellIndex)"
          @click="onClickTd(rowIndex,cellIndex)"
          @contextmenu.prevent="onRightClickTd(rowIndex,cellIndex)"
      >
        {{cellDataText(rowIndex,cellIndex)}}
      </td>
    </tr>
  </table>
</template>
<style>

</style>