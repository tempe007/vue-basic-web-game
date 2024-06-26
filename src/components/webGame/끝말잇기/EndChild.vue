<template>
    <div>{{word}}</div>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="value" ref='answer'/>
      <button type="submit">결과</button>
    </form>
    <div>{{result}}</div>
</template>

<script>
export default {
  props :
    ['startWord']
  ,
  data() {


    return {
      word : this.startWord,
      result: '',
      value : ''
    }
  },
  methods :{
    submitForm(){
      if(this.word[this.word.length-1] === this.value[0]){
        this.word=this.value;
        this.value='';
        this.result= '정답';
      }else{
        this.result= '오답';
        this.value='';
      }
      this.$refs.answer.focus();
    }
  }
}
</script>

<style scoped>

</style>