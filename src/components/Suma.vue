<template>
    <div class="div-operation">
        <h1>
            {{ operation }}
        </h1>
    </div>

</template>

<script>
export default {
   
    props: {
      operation:{
        type: String,
        require: true,
        default: 'a+b+c'
      }
      },
    computed:{
    // oper(){
    //   return  operation;
    // // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    // }
    },

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rowdies&display=swap');

h1{
    font-family: 'Acme' ;
    font-size: 50px;
}


</style>