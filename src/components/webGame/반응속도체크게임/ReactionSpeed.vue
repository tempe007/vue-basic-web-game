<template>
  <h1>{{ title }}</h1>
  <div id="screen" :class="state" @click="changeScreen">{{message}}</div>
  <template  v-show="result.length">
    <div>평균시간 : {{average}}ms</div>
    <button @click="onReset" type="submit">리셋</button>
  </template>
  <h1>=========================</h1>
</template>

<script>
let startTime=0;
let endTime=0;
let timeout=null;
export default {
  props :
      ['titleName']
  ,
  computed : {//캐싱때문에 계산식이나 복잡한식에 사용 ,성능에 관련됨
    average(){
      return this.result.reduce((a,c) => a+c,0)/this.result.length||0;
    }
  },
  data() {
    return {
      title : this.titleName,
      result : [],
      state : 'waiting',
      message : '클릭해서 시작하세요'
    }
  },
  methods :{
    onReset(e){
      this.result=[];
    },
    changeScreen(){
      if (this.state ==='waiting'){
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요';
        timeout=setTimeout(()=>{
          this.state='now';
          this.message='지금클릭';
          startTime = new Date();
        },Math.floor(Math.random() * 1000)+2000); //2-3초
      }else if(this.state ==='ready'){
        clearTimeout(timeout);
        this.state = 'waiting';
        this.message = '너무 빠릅니다.초록색이 되면 클릭하세요';
      }else if(this.state ==='now'){
        endTime = new Date();
        this.state = 'waiting';
        this.message = '클릭해서 시작하세요';
        this.result.push(endTime - startTime);
      }
    }

  }
}
</script>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
#screen.waiting{
  background-color: aqua;
}
#screan.ready{
  background-color: red;
}
#screan.now{
  background-color: greenyellow;
}
</style>