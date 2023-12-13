
<template>
     <h1 v-if="!respuesta">Cargando Operación... </h1>
     <div v-else>
      <h2>Resuelve la Operación</h2>
      <Suma :operation="respuesta.operation" />
      <Respuesta
      :respuestas="respuestasArray" 
      @selection="checkAnswer"
      />

    <h2 v-if="showAnswer" class="fade-in">{{ message }}</h2>
    <button v-if="showAnswer" @click="newGame">Jugar otra vez</button>
     </div>
</template>

<script>    
import Suma from '../components/Suma'
import Respuesta from '../components/Respuesta'
import getOperation from '../helpers/operations'
// import getRandomArbitrary from '../helpers/operations'

export default {

    components:{
      Suma,
      Respuesta
    },

    data() {
        return {
            respuesta:{
            },
            respuestasArray: [],
            message: '',
            showAnswer: false,
        }
    },
    methods:{

       
          chargeOps (){
          let aux = getOperation()
          let index = Math.floor(Math.random() * 6)
          while(aux.resp>99){
            aux = getOperation()
          }
          this.respuesta= aux;
          let solucion = this.respuesta.resp;
          this.respuestasArray.push(solucion);

          if(solucion + 10<100){
            this.respuestasArray.push(solucion + 10);
          }
          else{
            this.respuestasArray.push(38);
          }
          
          if(solucion - 10>0 ){
            this.respuestasArray.push(solucion - 10);
          }
          else{
            this.respuestasArray.push(79);
          }

          if( solucion + 20<100){
            this.respuestasArray.push(solucion + 20);
          }
          else{
            this.respuestasArray.push(57);
          }

          if(solucion - 20>0 ){
            this.respuestasArray.push(solucion - 20);
          }
          else{
            this.respuestasArray.push(19);
          }

          if((solucion + 50)<100){
            this.respuestasArray.push(solucion + 50);
          }
          else{
            this.respuestasArray.push(46);
          }
          const p = this.respuestasArray[index]
          const h = this.respuestasArray[0]
          this.respuestasArray[0]=p
          this.respuestasArray[index]=h

          // 
        },

      checkAnswer(resp){
      this.showAnswer= true 
      if(resp===this.respuesta.resp){
         this.message= `Correcto, la respuesta es ${this.respuesta.resp}`
      }else 
      this.message= `Opps, la respuesta era ${this.respuesta.resp}`
    },

    newGame(){
      this.respuestasArray= [],
      this.message= '',
      this.showAnswer= false,
      this.respuesta={
            },
      this.chargeOps()
    } 
        
  },
   mounted(){
   this.chargeOps()    
    }
}
</script>

<style scoped>
 h1, h2{
    padding-top: 40px;
 }

</style>