<template>
  <h1>{{ title }}</h1>
  <div>
    <div>당첨 숫자</div>
    <div id="resultScreen">
      <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:numbers="ball"/>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :numbers="bonus"/>
    <button v-if="redo" @click="clickReset">한 번 더!</button>
  </div>
  <h1>=========================</h1>
</template>

<script>
import LottoBall from "./LottoBall.vue";
const getWinNumbers = ()=>{
  const candidate = Array(45).fill().map((v,i)=>i+1);
  const shuffle = [];
  while(candidate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length-1];
  const winNumbers = shuffle.slice(0,6).sort((p,c)=> p-c);
  return [...winNumbers,bonusNumber];
}
let timeout=[];
export default {
  props :
      ['titleName']
  ,
  components:{
    LottoBall
  },
  data() {
    return {
      title : this.titleName,
      redo : false,
      winBalls : [],
      bonus : null,
      winNumbers : getWinNumbers()


    }
  },
  computed : {//캐싱때문에 계산식이나 복잡한식에 사용 ,성능에 관련됨

  },
  mounted() {
    console.log('mounted parents',this.winNumbers);
    this.showBalls();
    console.log('mounted winballs',this.winBalls);
  },

  methods :{
      clickReset(){
        this.winNumbers=getWinNumbers();
        this.winBalls=[];
        this.bonus = null;
        this.redo = false;
        this.showBalls();
      },
      showBalls(){
        for(let i = 0;i<this.winNumbers.length -1 ; i++){
          timeout[i]=setTimeout(()=>{
            this.winBalls.push(this.winNumbers[i]);
          },( i + 1 ) * 1000);
        }
        timeout[6] =setTimeout(()=>{
          this.bonus=this.winNumbers[6];
          this.redo=true;
        });
      }
    },
  watch :{

  },
  unmounted() {
    timeout.forEach((t)=>{
      clearTimeout(t);
    });
  }

}

</script>

<style scoped>

</style>