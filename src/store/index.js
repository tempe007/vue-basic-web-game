import { createStore } from 'vuex';
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    CLICKED_MINE : -6,
    OPENED : 0//0 이상이면 다 opened
}
const plantMine = (row,cell,mine) =>{
    console.log(row,cell,mine);
    const candidata = Array(row * cell).fill().map((arr,i) => {
        return i;
    });
    const shuffle = [];
    while(candidata.length > row * cell - mine){
        const chosen = candidata.splice(Math.floor(Math.random() * candidata.length),1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row ; i++){
        const rowData = [];
        data.push(rowData);
        for(let j=0 ;j<cell;j++){
            rowData.push(CODE.NORMAL);
        }
    }
    for (let k = 0; k < row ; k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;
}
export default createStore({
    state: {
        tableData: [['', '', ''], ['', '', ''], ['', '', '']],
        turns: 'O',
        winner: '',
        isDraw: false,
        /////////////
        mineTableData : [],
        data : {
            row : 0,
            cell : 0,
            mine : 0,
        },
        timer : 0 ,
        result: '',
        halted:true, //중단된
        openedCount : 0
    },
    getters:{

    },
    mutations: {
        SET_CELL(state, { rowIndex, cellIndex, value }) {
            state.tableData[rowIndex][cellIndex] = value;
        },
        SET_TURNS(state, turns) {
            state.turns = turns;
        },
        SET_WINNER(state, winner) {
            state.winner = winner;
        },
        SET_IS_DRAW(state, isDraw) {
            state.isDraw = isDraw;
        },
        RESET_GAME(state) {
            state.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
            state.turns = 'O';
            state.winner = '';
            state.isDraw = false;
        },
        [START_GAME](state,payload){
            const {row ,cell,mine} =  payload;
            state.data = {
                row,
                cell,
                mine
            }
            state.data[row] = row;
            state.mineTableData=plantMine(row,cell,mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount= 0;
        },
        [OPEN_CELL](state,{row,cell}){
            let openedCount = 0;
            const checked = [];
            function checkAround() {
                const checkRowOrCellIsUndefined = row < 0|| row >=state.mineTableData.length || cell < 0 || cell >= state.mineTableData[0].length;
                if(checkRowOrCellIsUndefined){
                   return;
                }
                if([CODE.OPENED,CODE.FLAG,CODE.FLAG_MINE,CODE.QUESTION_MINE,CODE.QUESTION].includes(state.mineTableData[row][cell])){
                    return;
                }
                if (checked.includes(row+'/'+cell)){
                    return;
                }else{
                    checked.push(row+'/'+cell)
                }
                let around=[];
                if(state.mineTableData[row-1]){
                    around = around.concat([
                        state.mineTableData[row -1 ][cell -1],state.mineTableData[row -1 ][cell],state.mineTableData[row -1 ][cell + 1]
                    ]);
                }

                around = around.concat([
                    state.mineTableData[row][cell -1],state.mineTableData[row][cell+1]
                ]);
                if(state.mineTableData[row+1]){
                    around = around.concat([
                        state.mineTableData[row +1 ][cell -1],state.mineTableData[row +1 ][cell],state.mineTableData[row + 1 ][cell + 1]
                    ]);
                }
                const counted = around.filter(function (v) {
                    return [CODE.MINE,CODE.FLAG_MINE,CODE.QUESTION_MINE].includes(v);
                })
                if(counted.length ===0 && row > -1){
                    const near = [];
                    if(row - 1 > -1){
                        near.push([row-1,cell-1]);
                        near.push([row-1,cell]);
                        near.push([row-1,cell+1]);
                    }
                    near.push([row-1,cell-1]);
                    near.push([row-1,cell+1]);
                    if(row + 1 >state.mineTableData.length){
                        near.push([row+1,cell-1]);
                        near.push([row+1,cell]);
                        near.push([row+1,cell+1]);
                    }
                    near.forEach((n)=>{
                        if(state.mineTableData[n[0]][n[1]] !== CODE.OPENED){
                            checkAround(n[0],n[1])
                        }
                    });
                }
                if(state.mineTableData[row][cell] === CODE.NORMAL){
                    openedCount += 1;
                }
                state.mineTableData[row][cell]=counted.length;
            }
            checkAround(row,cell);
            let halted = false;
            let result;
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
                halted = true;
                result = `${state.timer} 초만에 승리하셨습니다.`;
            }
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state,{row,cell}){
            state.mineTableData[row][cell] = CODE.CLICKED_MINE;
        },
        [FLAG_CELL](state,{row,cell}){
            if(state.mineTableData[row][cell] === CODE.MINE){
                state.mineTableData[row][cell]=CODE.FLAG_MINE;
            }else{
                state.mineTableData[row][cell]=CODE.FLAG;
            }
        },
        [QUESTION_CELL](state,{row,cell}){
            if(state.mineTableData[row][cell] === CODE.FLAG_MINE){
                state.mineTableData[row][cell]=CODE.QUESTION_MINE;
            }else{
                state.mineTableData[row][cell]=CODE.QUESTION;
            }
        },
        [NORMALIZE_CELL](state,{row,cell}){
            if(state.mineTableData[row][cell] === CODE.QUESTION_MINE){
                state.mineTableData[row][cell]=CODE.MINE;
            }else{
                state.mineTableData[row][cell]=CODE.NORMAL;
            }
        },
        [INCREMENT_TIMER](state){
            state.timer += 1;
        },
    },
    actions: {
        handleCellClick({ state, commit ,dispatch}, payload) {

            const { rowIndex, cellIndex } = payload;
            try{
                if (state.tableData[rowIndex][cellIndex] || state.winner) {
                    return;
                }
                commit('SET_CELL', { rowIndex, cellIndex, value: state.turns });
                dispatch('checkWinner', { rowIndex, cellIndex });
                if (!state.winner) {
                    commit('SET_TURNS', state.turns === 'O' ? 'X' : 'O');
                }
            }catch (error){
                console.error('Error in handleCellClick:', error);
            }
        },
        checkWinner({ state, commit,dispatch }) {
            try {
                const turns = state.turns;
                const tableData = state.tableData;
                let win = false;

                // Row check
                for (let i = 0; i < 3; i++) {
                    if (tableData[i].every(cell => cell === turns)) {
                        win = true;
                        break;
                    }
                }

                // Column check
                for (let i = 0; i < 3; i++) {
                    if (tableData.every(row => row[i] === turns)) {
                        win = true;
                        break;
                    }
                }

                // Diagonal check
                if (
                    (tableData[0][0] === turns && tableData[1][1] === turns && tableData[2][2] === turns) ||
                    (tableData[0][2] === turns && tableData[1][1] === turns && tableData[2][0] === turns)
                ) {
                    win = true;
                }

                if (win) {
                    commit('SET_WINNER', turns);
                    commit('RESET_GAME');
                } else {
                    dispatch('checkDraw');
                }
            } catch (error) {
                console.error('Error in checkWinner:', error);
            }
        },
        checkDraw({ state, commit }) {
            try {
                if (state.tableData.every(row => row.every(cell => cell))) {
                    commit('SET_IS_DRAW', true);
                    commit('RESET_GAME');
                }
            } catch (error) {
                console.error('Error in checkDraw:', error);
            }
        }

    }
});