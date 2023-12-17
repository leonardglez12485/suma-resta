<template>
   
   <MathPage/>
</template>

<script>
import MathPage from './pages/MathPage'


export default {
  name: 'App',
  components: {
    MathPage,
  },

  data(){
    return{
      sound: new Audio(require('./assets/music.mp3'))
   }
},
  methods: {
   
  },

  mounted() {
   
  },

  
}
</script>

<style>
 
#app {
 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e60;
  /* margin-top: 60px; */
}
</style>
