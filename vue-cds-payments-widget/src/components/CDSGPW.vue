<template>
  <div id="CDSGPW">
    <button id="visaImg" class="mdl-button mdl-js-button" disabled >
        <img src='/static/visa.png'/>
    </button>
    <button id="MasterCardImg" class="mdl-button mdl-js-button" disabled >
        <img src='/static/mastercard.png'/>
    </button>
    <button id="DiscoverCardImg" class="mdl-button mdl-js-button" disabled >
        <img src='/static/discover.png'/>
    </button>
    {{buttons}}
    <br/>
    <input 
        id='cc-number' 
        data-cds='ccNumber'
        placeholder='Card Number'
        name='number'
        /> 
    <br/>
    <input 
        placeholder='Expiration Date (MM/YY)'
        name='expiry'
        /> 
    <br/>
    <input 
        placeholder='CVV'
        name='cvc'
        /> 
    <br/>
    <input 
        id="billme"
        type="checkbox"
        /> 
    <br/>
        {{msg}}
  </div>
</template>

<script>
export default {
  name: "CDSGPW",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      buttons: <div>button</div>
    };
  }, 
  beforeMount() { 
      console.log('here')
      const deal = document.getElementById('app')
      console.log({deal})
      const dealAttr = deal.getAttribute('config')
      console.log({dealAttr})
  },
  mounted() { 
      console.log('orig='+this.msg)
      this.msg = 'your mom is PHAT'
      console.log('new='+this.msg)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
