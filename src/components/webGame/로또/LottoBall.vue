<template>
  <div class="ball" :style="styleObject">{{numbers}}</div>
</template>

<script>
export default {
  name: 'Lotto ball',
  props : {
    numbers : Number
  },
  data(){
    return{

    }
  },
  computed :{
    styleObject (){
      let background;
      if(this.numbers <= 10){
        background = 'red';
      }else if(this.numbers <= 20){
        background = 'orange';
      }else if(this.numbers <= 30){
        background = 'blue';
      }else if(this.numbers <= 40){
        background = 'yellow';
      }else{
        background = 'green';
      }
      return {
        backGround: background
      };
    }
  },
  watch : {

  },
  methods : {

  },mounted() {

  }
}
</script>


<style >
.ball{
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>