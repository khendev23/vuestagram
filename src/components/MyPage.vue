<template>
  <div style="padding : 10px">
    <h4>팔로워</h4>
    <input @input="search($event.target.value)" placeholder="?" />
    <div class="post-header" v-for="(follower, i) in follower" :key="i">
      <div class="profile" :style="{backgroundImage : `url(${follower.image})`}"></div>
      <span class="profile-name">{{follower.name}}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  name : 'MyPage',
  setup() {
    const follower = ref([]);
    const followerOriginal = ref([]);
  

    function search(e){
      let newFollower = followerOriginal.value.filter((a)=>{
        return a.name.indexOf(e) != -1
      })
      follower.value = [...newFollower]
    }

    onMounted(()=>{
      axios.get('/follower.json')
      .then((result)=>{
        follower.value = result.data;
        followerOriginal.value = [...result.data];
      })
    })
    

    return{follower, search}
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>