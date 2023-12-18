
<template>
 <div id="inicio" v-if="inicio">
  <img id="img-portada" src="../assets/portada.png" alt="">
    <!-- <h1 id="h1-inicio">Bienvenidos a FuntMath</h1> -->
    <!-- <p id="p-inicio">sdasdasasd adssdfaafasdfasdfas </p> -->
   
   <div id="div-jugar">
    <div id="div-play">
      <img id="nube-play" src="../assets/nube.png" alt="">
     
        <img id="img-play"  src="../assets/boton.png" alt=""  v-if="inicio" @click="restart">
        <!-- <img id="img-pause" src="../assets/pause.png" alt="" v-if="sonido" @click="pauseSound"> -->
      
    </div>
    
    <!-- <button id="button-inicio" v-if="inicio" @click="restart">Jugar</button> -->
    <img id="img-gato" src="../assets/gato.png" alt="">
   </div>
</div>

<div id="div-juego" v-else>
 <div id="div-gameOver" v-if="gameOver">
  <h1 class="stroke" id="h1-gameOver">Game Over</h1>
  <img id="button-restart" src="../assets/restart.png" alt="" @click="restart">
  <!-- <button v-if="showButtom" @click="restart">Jugar otra vez</button> -->
  <img id="img-burro" src="../assets/burro.png" alt="">
 </div>
 <div v-else>
  <div id="vidas">
    <img id="img-puntos" src="../assets/puntos.png" alt="" />
    <h2 id="h2-puntos">{{ this.puntos }}</h2>
    <img id="img-vida" src="../assets/vida.png" alt="" />
    <h2 id="h2-vida">{{ this.vidas }}</h2>
  </div>
  <h1 v-if="!respuesta">Cargando Operación...</h1>
  <div v-else>
    <h2 class="stroke" id="h2-resuelve">Resuelve la Operación</h2>
    <div id="suma">
      <Suma class="stroke" :operation="respuesta.operation" />
    </div>
    
    <div id="div-lista-resp">
      <img id="img-gato-game" src="../assets/gato-game.png" alt="">
      <Respuesta  :respuestas="respuestasArray" @selection="checkAnswer" />
      <!-- <Respuesta :respuestas="respuestasArray" @selection="timer" /> -->
      <img id="img-coneja-game" src="../assets/conejita-game.png" alt="">
    </div>
    

    <h2 id="h2-resp" v-if="showAnswer" class="fade-in stroke">{{ message }}</h2>
    <button class="stroke" v-if="showButtom" @click="newGame">Continuar Jugando</button>
  </div>
 </div>
</div>
</template>

<script>
import Suma from "../components/Suma";
import Respuesta from "../components/Respuesta";
import getOperation from "../helpers/operations";
// import getRandomArbitrary from '../helpers/operations'

export default {
  components: {
    Suma,
    Respuesta,
  },

  data() {
    return {
      respuesta: {},
      respuestasArray: [],
      message: "",
      showAnswer: false,
      showButtom: false,
      gameOver: false,
      inicio: true,
      vidas:3,
      puntos:0,
      sonido: false,
      sound: new Audio(require('../assets/music.mp3')),
      perdTime: true
    };
  },
  methods: {
    chargeOps() {
      let aux = getOperation();
      let index = Math.floor(Math.random() * 6);
      while (aux.resp > 99) {
        aux = getOperation();
      }
      this.respuesta = aux;
      let solucion = this.respuesta.resp;
      this.respuestasArray.push(solucion);

      if (solucion + 10 < 100) {
        this.respuestasArray.push(solucion + 10);
      } else {
        this.respuestasArray.push(38);
      }

      if (solucion - 10 > 0) {
        this.respuestasArray.push(solucion - 10);
      } else {
        this.respuestasArray.push(79);
      }

      if (solucion + 20 < 100) {
        this.respuestasArray.push(solucion + 20);
      } else {
        this.respuestasArray.push(57);
      }

      if (solucion - 20 > 0) {
        this.respuestasArray.push(solucion - 20);
      } else {
        this.respuestasArray.push(19);
      }

      if (solucion + 50 < 100) {
        this.respuestasArray.push(solucion + 50);
      } else {
        this.respuestasArray.push(46);
      }
      const p = this.respuestasArray[index];
      const h = this.respuestasArray[0];
      this.respuestasArray[0] = p;
      this.respuestasArray[index] = h;

      //
    },

    changeTime(){
    this.perdTime= true
    },
    checkTime(){
      setTimeout(this.changeTime, 2000)
    },

    // loseByTime(){
    // if(this.perdTime){
    //   this.vidas-=1
    //     if(this.vidas===0){
    //       this.message = `Tiempo Agotado!!!!`
    //       setTimeout(
    //       this.gameOver= true
    //     ,2000);
    //      // this.showButtom =true
    //     } else{
    //       this.message = `Tiempo Agotado!!!!`
    //       setTimeout(
    //       this.contGame
    //     ,2000);
    //     }
    // }
    // },

    playSound(){
     this.sound.currentTime=0
     this.sound.play()
     this.sound.loop= true
   },

   pauseSound(){
     this.sound.pause()
   },

    restart(){
      this.gameOver= false,
      this.showButtom= false,
      this.vidas =3,
      this.message="",
      this.puntos=0,
      this.inicio = false,
      // this.checkTime(),
      this.newGame
      if(this.sonido){
        this.playSound()
      }
    },


    newGame() {
      (this.respuestasArray = []),
        (this.message = ""),
        (this.showAnswer = false),
        (this.showButtom = false),
        (this.respuesta = {}),
        this.gameOver= false,
        // this.checkTime(),
        this.chargeOps();
    },

    contGame() {
     
      (this.message = `Correcto, la respuesta es ${this.respuesta.resp}`),
      (this.respuestasArray = []),
        (this.message = ""),
        (this.showAnswer = false),
        (this.showButtom = false),
        this.gameOver = false,
        (this.respuesta = {}),
        this.chargeOps()
        // this.checkTime()
        // this.vidas= this.vidas
    },

   
    checkAnswer(resp) {
      this.perdTime= false
      this.showAnswer = true
      if (resp === this.respuesta.resp) {
        this.puntos+=3
        this.message = `Correcto, la respuesta es ${this.respuesta.resp}`
        setTimeout(
          this.contGame
        ,2000);
      } else{
        this.vidas-=1
        if(this.vidas===0){
          this.message = `Opps, la respuesta era ${this.respuesta.resp}`
          setTimeout(
          this.gameOver= true
        ,2000);
         // this.showButtom =true
        } else{
          this.message = `Opps, la respuesta era ${this.respuesta.resp}`
          setTimeout(
          this.contGame
        ,2000);
        }
 
      } 
    },
    // timer(){
    //   if(this.perdTime){
    //     this.checkAnswer()
    //   }else{
    //     this.loseByTime();
    //   }
    // }
  },
  // created(){  
  //  this.playSound()
  // },
  mounted() {
    this.chargeOps()
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

/* #div-juego{
  background-image: url(../assets/fondoPortada.png);
  background-size: cover;
} */

#img-vida {
  margin-left: 20px;
  width: 25px;
  height: 25px;
}
#img-puntos {
  margin-left: 200px;
  width: 25px;
  height: 25px;
}

#vidas {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#h2-vida {
  font-family: "Acme";
  color: #f17082;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: black;
  font-size: 30px;
  margin-left: 10px;
}
#h2-puntos {
  font-family: "Acme";
  color: #f17082;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: black;
  font-size: 30px;
  margin-left: 10px;
}

h2{
  font-size: 30px;
}

#h2-resp{
  font-family: "Acme";
  font-size: 20px;
}
#h2-resuelve{
  margin-top: 10px;
  font-family: "Acme";
}

#suma{
  margin-top: 30px;
}

#h1-gameOver{ 
  padding-top: 180px;
  font-family: "Acme";
  font-size: 80px;
  transition: .5rem ease;
  animation: floatGameOver 2s ease-in-out 1; 
} 

#button-restart{
  transition: .5rem ease;
  animation: floatButton 2s ease-in-out 1; 
}
.stroke {
-webkit-text-fill-color: #784e39;
-webkit-text-stroke: 1px black;
}


#img-portada{
  margin-bottom: 50px;
}
/* #inicio{
  background-image: url(../assets/fondoPortada.png);
  background-size: cover;
} */

#img-gato{
margin-bottom: 50px;
margin-top: 50px;
/* transition: .5rem ease;
animation: floatImage 4s ease-in-out infinite; */
}

@keyframes floatImage {
       0% {
           transform: translateY(0);
       }
       50% {
           transform: translateY(-1.8rem);
       }
       100% {
           transform: translateY(0);
       }
   }
   @keyframes floatButton {
       0% {
           transform: translateX(-8.8rem);
       }
       /* 50% {
           transform: translateX();
       } */
       100% {
           transform: translateX(0);
       }
   }
   @keyframes floatImg {
       0% {
           transform: translateX(-1.5rem);
       }
       75% {
           transform: translateX(1rem);
       }
       100% {
           transform: translateX(0);
       }
   }
   @keyframes floatImgInv {
       0% {
           transform: translateX(1.5rem);
       }
       75% {
           transform: translateX(-1rem);
       }
       100% {
           transform: translateX(0);
       }
   }

   @keyframes floatGameOver {
       0% {
           transform: translateY(-8.8rem);
       }
       40% {
           transform: translateY(0);
       }
       60%{
        transform: translateY(-1.5rem);
       }
       75%{
        transform: translateY(0);
       }
       85%{
        transform: translateY(-0.7rem);
       }
       90%{
        transform: translateY(0);
       }
       95%{
        transform: translateY(-0.3rem);
       }
       100% {
           transform: translateY(0);
       }
   }

   

  /* #img-gato:hover{
    transform: scale(1.1);
  } */

#img-play{
margin-top: 40px;
height: 50px;
transition: .5rem ease;
animation: floatButton 1s ease-in-out 1;
}

#nube-play{
  margin-top: 40px;
  transition: .5rem ease;
  animation: floatImage 4s ease-in-out infinite;
}

#nube-play:hover{
  transform: scale(1.1);
}

#h1-inicio{
  padding-top: 20px;
  font-size: 40px;
}

#p-inicio{
  padding-top: 30px;
  font-size: 15px;
  font-weight:bolder;
}

#button-inicio{
  font-size: 35px;
  font-weight:bolder;
}

#div-jugar{
  display: flex;
  justify-content: center;
}

#pause-play{
  padding-left: 30px;
  display: grid;
}
#img-pause{
  padding-left: 50px;
}

#div-lista-resp{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:50px;
}

#img-gato-game{
  margin-left: 40px;
  margin-top: 50px;
  transition: .5rem ease;
  animation: floatImg 1.5s ease-in-out 1;
}

#img-coneja-game{
  margin-right: 40px;
  margin-top: 50px;
  transition: .5rem ease;
  animation: floatImgInv 1.5s ease-in-out 1;
}




</style>