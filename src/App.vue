<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step == 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container @write="postWrite = $event" :vuestaDatas="vuestaDatas" :step="step" :imageUrl="imageUrl"/>
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>



</template>

<script>
import Container from './components/Container.vue';
import postData from './assets/postData'
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      step : 0,
      moreClickNum : 0,
      vuestaDatas : postData,
      imageUrl : '',
      postWrite : ''
    }
  },
  mounted(){
    this.emitter.on('작명', (a)=>{
      console.log(a);
    })
  },
  components: {
    Container
  },
  methods : {
    more() {
      axios.get(`https://codingapple1.github.io/vue/more${this.moreClickNum}.json`)
      .then((result)=>{
        console.log(result.data)
        this.vuestaDatas.push(result.data)
        this.moreClickNum++
      })
      .catch(()=>{
        alert('더 없다 이놈아')
      })
    },
    upload(e) {
      const a = e.target.files
      console.log(a);
      const url = URL.createObjectURL(a[0])
      console.log(url);
      this.imageUrl = url
      this.step++
    },
    publish() {
      const myPost = {
        name: "Kim Hyun",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imageUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.postWrite,
        filter: "perpetua"
      }
      this.vuestaDatas.unshift(myPost)
      this.step = 0
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
