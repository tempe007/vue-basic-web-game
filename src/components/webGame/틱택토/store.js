import vuex, {createStore} from 'vuex';
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';
export default createStore({
    state:{//data와 비슷
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turns: 'O',

        winner:''
    },
    getters:{//computed와 비슷

    },
    mutations:{//state를 수정할때 사용,동기적으로
        [SET_WINNER](state,winner){
            state.winner = winner;
        },
        [CLICK_CELL](state,{row,cell}){
            state.tableData[row][cell] = state.turn;
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn='O';
            state.tableData = [
                 ['','',''],
                 ['','',''],
                 ['','','']
            ];
        },
        [NO_WINNER](state){
            state.winner = '';
        }

    },
    actions:{//비동기를 사용할때,또는 여러 뮤테이션을 연달아 실행할 때

    }
})