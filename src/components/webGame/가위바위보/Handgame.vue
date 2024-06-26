<template>
  <h1>{{ title }}</h1>
  <div id="computer" :class="{}" :style="styleObject">

  </div>
  <div>
    <button @click="clickEvent('b')">바위</button>
    <button @click="clickEvent('a')">가위</button>
    <button @click="clickEvent('c')">보</button>
  </div>
  <div>{{result}}</div>
  <div>현재 {{score}} 점</div>
  <h1>=========================</h1>
</template>

<script>
let interval = null;
import * as url from "url";
const rspCode = {
  R : '0',
  C : '-142px',
  P : '-284px'
};
const scores = {
  S : 1,
  R : 0,
  P : -1
}
const computerChoice = (imgCode)=>{
  return Object.entries(rspCode).find(function (v) {
    return v[1] === imgCode
  })[0];
}

export default {
  props :
      ['titleName']
  ,
  data() {
    return {
      title : this.titleName,
      result : '',
      score : 0,
      classObject : {

      },
      imgCode :rspCode.R
    }
  },
  computed : {//캐싱때문에 계산식이나 복잡한식에 사용 ,성능에 관련됨
    styleObject (){
      return {
        background :`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCode} 0`
      }
    }
  },

  methods :{
    clickEvent(choice){
      console.log()
      clearInterval(interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imgCode)];
      const diff = myScore - cpuScore;
      if(diff === 0){
        this.result = '비겼습니다.';
      }else if([-1,2].includes(diff)){
        this.result = '이겼습니다.';
        this.score += 1;
      }else{
        this.result = '졌습니다.';
        this.score -= 1;
      }
      interval = setInterval(()=>{
        this.changeHand();
      },300);
    },
    changeHand(){

        if(this.imgCode === rspCode.R){
          this.imgCode = rspCode.C;
        }else if(this.imgCode === rspCode.C){
          this.imgCode = rspCode.P;
        }else{
          this.imgCode = rspCode.R;
        }

    }
  },
  mounted(){
    console.log('mounted');
    interval = setInterval(()=>{
      this.changeHand();
    },300);
  },
  updated(){
    //console.log('updated');
  },
  beforeUnmount() {
    console.log('beforeUnmount');
    clearInterval(interval);
  }
}
</script>

<style scoped>
  #computer {
    width: 142px;
    height: 200px;
    background-position: 0 0;
  }
</style>