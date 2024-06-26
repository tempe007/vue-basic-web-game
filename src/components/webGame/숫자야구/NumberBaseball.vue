<template>
  <h1>{{ title }}</h1>
  <form @submit.prevent="submitForm">
    <input type="text" minlength="4" maxlength="4" v-model="value" ref='answer'/>
    <button type="submit">결과</button>
  </form>
  <div>시도 : {{tries.length}}</div>
  <ul>
    <li v-for="item in tries">{{item.try}}//{{item.result}}</li>
  </ul>
  <h1>=========================</h1>
</template>

<script>
const getNumbers=()=>{
  const candidates = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0;i<4;i+=1){
    const chosen = candidates.splice(Math.floor(Math.random() * (9-i)),1)[0];
    array.push(chosen);
  }
  return array;
}
export default {
  props :
      ['titleName']
  ,
  data() {
    return {
      tries :[],
      value: '',
      result : '',
      title : this.titleName,
      answers: getNumbers()
    }
  },
  methods :{
    submitForm(e){
      if(this.value===this.answers.join('')){
        this.tries.push({
          try: this.value,
          result:'홈런'
        });
        this.answers = getNumbers();
        this.result='홈런';
        this.value='';
        this.tries=[];
        this.$refs.answer.focus();
      }else{
        if(this.tries.length >=9){
          this.result=`10번 넘게 틀려서 실패! 답은 ${this.answers.join('')} 입니다.`;
          alert('게임을 다시시작합니다.');
          this.value='';
          this.tries=[];
          this.answers = getNumbers();
          this.$refs.answer.focus();
        }
        let strike = 0;
        let ball = 0;
        const answerArray = this.value.split('').map(v=>parseInt(v));
        for(let i =0;i < 4;i+=1){
          if(answerArray[i] === this.answers[i]){
            strike ++;
          }else if(this.answers.includes(answerArray[i])){
            ball ++;
          }
        }
        this.tries.push({
          try : this.value,
          result :`${strike} 스트라이크 , ${ball} 볼입니다.`
        });

      }

      this.value='';
      this.$refs.answer.focus();
    }
  }
}
</script>

<style scoped>

</style>