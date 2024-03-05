<template>
  <div :class="filter + ' filter-item'" :style="`background-image:url(${imageUrl})`">
    <slot></slot>
    <button @click="file">버튼</button>
  </div> 
</template>

<script>


export default {
  name : 'filterBox',
  props : {
    imageUrl : String,
    filter : String,
  },
  methods : {
    file() {
      this.emitter.emit('filterSelect', this.filter)
    }
  }
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>