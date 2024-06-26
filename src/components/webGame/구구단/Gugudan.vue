<template>
<!--  <div>-->
<!--    <button @click="clickLikeButton">{{ liked ? 'Unlike' : 'Like' }}</button>-->
<!--  </div>-->
<!--  <p>{{ liked ? 'You liked this.' : 'You haven\'t liked this yet.' }}</p>-->
<!--  <p v-if="liked">{{ 'You liked this.'}}</p>-->
<!--  <p v-else>{{'You haven\'t liked this yet.' }}</p>-->
  <h1>{{ title }}</h1>
  <div>{{first}}곱하기{{second}}</div>

    <form @submit.prevent="submitForm">
      <input type="text" ref="answer" v-model="value">
      <button>연산</button>
    </form>
    <div>{{resultText}}</div>
    <button v-if="resultText === '정답'" @click="refresh">refresh</button>
  <h1>=========================</h1>
</template>

<script>
export default {
  props :['titleName'],
  data() {
    return {
      //liked : false
      title : this.titleName,
      first : this.generatedNum(),
      second : this.generatedNum(),
      value : '',
      resultText : ''
    }
  },
  methods:{
    generatedNum(){
      return Math.floor(Math.random()*9);
    },
    clickLikeButton () {
      this.liked = !this.liked;
    },
    submitForm (e){
      if(parseInt(this.value) === (this.first * this.second)){
        this.resultText = '정답';
      }else{
        this.resultText = '오답';
      }
      this.$refs.answer.focus();
    },
    refresh(){
      this.first = this.generatedNum();
      this.second = this.generatedNum();
      this.value = '';
      this.resultText = '';
    }
  },
  computed:{


  }
}
</script>

<style lang="scss" scoped>

</style>