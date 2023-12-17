
<template>
  <div class="resp-container">
    <ul>
      <li id="lista2" v-for="resp in respuestas" :key="resp" @click="$emit('selection', resp)">
        {{ resp }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    respuestas: {
      type: Array,
      requeire: true,
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  /* list-style-image: url('../assets/navbar.png'); */
}
li {
  background-color: #5f0e46;
  /* border-radius: 25px; */
  color: #cae6e1;
  cursor: pointer;
  margin-bottom: 10px;
  width: 60px;
  height: 30px;
  scrollbar-shadow-color: #5f0e46;
}

li:hover {
  background-color: #579389;
  color: #cae6e1;
  border: 2px solid #5f0e46;
}

.resp-container {
  display: flex;
  justify-content: center;
}




</style>
