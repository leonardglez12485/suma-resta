
<template>
 <div id="inicio" v-if="inicio">
  <img id="img-portada" src="../assets/portada.png" alt="">
    <!-- <h1 id="h1-inicio">Bienvenidos a FuntMath</h1> -->
    <!-- <p id="p-inicio">sdasdasasd adssdfaafasdfasdfas </p> -->
   
   <div id="div-jugar">
    <div id="div-play">
      <img id="nube-play" src="../assets/nube.png" alt="">
      <img id="img-play"  src="../assets/boton.png" alt=""  v-if="inicio" @click="restart">
    </div>
    
    <!-- <button id="button-inicio" v-if="inicio" @click="restart">Jugar</button> -->
    <img id="img-gato" src="../assets/gato.png" alt="">
   </div>
</div>

<div id="div-juego" v-else>
 <div id="div-gameOver" v-if="gameOver">
  <h1 id="h1-gameOver">Game Over</h1>
  <button v-if="showButtom" @click="restart">Jugar otra vez</button>
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
    <h2 id="h2-resuelve">Resuelve la Operación</h2>
    <div id="suma">
      <Suma :operation="respuesta.operation" />
    </div>
    
    <div id="div-lista-resp">
      <img id="img-gato-game" src="../assets/gato-game.png" alt="">
      <Respuesta :respuestas="respuestasArray" @selection="checkAnswer" />
      <img id="img-coneja-game" src="../assets/conejita-game.png" alt="">
    </div>
    

    <h2 id="h2-resp" v-if="showAnswer" class="fade-in">{{ message }}</h2>
    <button v-if="showButtom" @click="newGame">Continuar Jugando</button>
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
      puntos:0
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

    // playSound(){
    // const sound = new Audio('./assets/music.mp3')
    // sound.play()
    // },

    restart(){
      this.gameOver= false,
      this.showButtom= false,
      this.vidas =3,
      this.puntos=0,
      this.inicio = false,
      this.newGame

    },


    newGame() {
      (this.respuestasArray = []),
        (this.message = ""),
        (this.showAnswer = false),
        (this.showButtom = false),
        (this.respuesta = {}),
        this.gameOver= false,
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
        // this.vidas= this.vidas
    },

    checkAnswer(resp) {
     
      this.showAnswer = true
      if (resp === this.respuesta.resp) {
        this.puntos+=1
        this.message = `Correcto, la respuesta es ${this.respuesta.resp}`
        setTimeout(
          this.contGame
        ,1000);
      } else{
        this.vidas-=1
        if(this.vidas===0){
          console.log('pepe')
          this.gameOver= true
          this.showButtom =true
        } else{
          this.message = `Opps, la respuesta era ${this.respuesta.resp}`
          this.showButtom = true
        }
    
        
      } 
    },
  },
  mounted() {
   // this.playSound()
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
}

#suma{
  margin-top: 30px;
}

#h1-gameOver{ 
  padding-top: 220px;
  font-family: "Acme";
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
}

#img-play{
margin-top: 40px;
 height: 50px;
}

#nube-play{
  margin-top: 40px;
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

#div-lista-resp{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:50px;
}

#img-gato-game{
  margin-left: 40px;
  margin-top: 50px;
}

#img-coneja-game{
  margin-right: 40px;
  margin-top: 50px;
}




</style>