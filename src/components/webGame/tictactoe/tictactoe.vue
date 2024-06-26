<template>
    <table>
      <th></th>
      <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" data-tr-index={{rowIndex}}>
        <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            @click="handleCellClick({rowIndex, cellIndex})"
            data-td-index={{cellIndex}}
        >
          {{ cell }}

        </td>
      </tr>
    </table>
  {{ winner }}
  {{ isDraw }}
    <div v-show="winner">
      Winner: {{ winner }}
    </div>
    <div v-show="isDraw">
      It's a draw!
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['tableData', 'turns', 'winner', 'isDraw'])
  },
  methods: {
    ...mapActions(['handleCellClick'])
  }
};
</script>

<style scoped>
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