<template>
  <h1>{{ title }}</h1>
  <EndChild start-word="백화점"/>
  <h3>-------------------------------------------------</h3>
  <EndChild start-word="아파트"/>
  <h1>=========================</h1>
</template>

<script>
import EndChild from "./EndChild.vue";
export default {
  props :['titleName'],
  components: {EndChild},

  data() {
    return {
      title : this.titleName,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>