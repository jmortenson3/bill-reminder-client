<template>
  <div class="toast">
    <p>{{toastText}}</p>
    <button v-if='btnText' v-on:click="btnFunction(id)">{{btnText}}</button>
  </div>
</template>
<script>
export default {
  name: 'toast',
  props: ['id', 'toastText', 'btnText', 'btnFunction'],
  data() {
    return {};
  }
}
</script>

<style>
.toast {
  max-width: 750px;
  min-width: 300px;
  margin: 10px auto;
  padding: 10px;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, .7);
  border-radius: 15px;
  z-index: 999999;
  box-shadow: 1px 2px 8px #666;
}

.toast p, .toast button {
  display: inline-block;
}

.toast button:hover {
  cursor: pointer;
}

.toast button {
  margin-left: 15px;
  background-color: #26a67a;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 20px;
}

@media (max-width: 600px) {
  .toast {
    position: fixed;
    bottom: 0;
    max-width: none;
    min-width: none;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    text-align: center;
    color: white;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 15px;
    z-index: 999999;
    box-shadow: 1px 2px 8px #666;
  }
}
</style>


