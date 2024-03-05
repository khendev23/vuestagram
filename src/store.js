import { createStore } from "vuex";
import postData from "./assets/postData";

const store = createStore({
  state () {
    return {
      vuestaData : postData,
      likeSwitch : false
    }
  },
  mutations : {
    plusLike(state, i) {
      if(!state.likeSwitch) {
        state.vuestaData[i].likes++
        state.likeSwitch = true
      } else {
        state.vuestaData[i].likes--
        state.likeSwitch = false
      }
    }
  }
})

export default store;