// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

Vue.config.productionTip = false

// base components
Vue.component('image-visa', { template: `
  <button id="visaImg" class="mdl-button mdl-js-button" disabled>
    <img src="/static/visa.png"/>
  </button>`
})
Vue.component('image-mc', { template: `
  <button id="MasterCardImg" class="mdl-button mdl-js-button" disabled>
    <img src="/static/mastercard.png"/>
  </button>`
})
Vue.component('image-disc', { template: `
  <button id="DiscoverCardImg" class="mdl-button mdl-js-button" disabled>
    <img src="/static/discover.png"/>
  </button>`
})
Vue.component('image-amex', { template: `
  <button id="AmericanExpressImg" class="mdl-button mdl-js-button" disabled>
    <img src="/static/americanexpress.png"/>
  </button>`
})
Vue.component('input-cc', { template: `
  <div>
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
  </div>`
})
Vue.component('input-cvc', { template: `
    <input 
        placeholder='CVV'
        name='cvc'
        /> `
})
Vue.component('input-billme', { template: 
  `<div>
    <input id="billme" type="checkbox" />
  </div>`
}) 

// combo permutations
Vue.component('config-default', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
    <input-cvc/>
    <input-billme/>
  </div>`
})
Vue.component('config-0', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
  </div>`
})
Vue.component('config-1', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
  </div>`
})
Vue.component('config-2', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
  </div>`
})
Vue.component('config-3', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-billme/>
  </div>`
})
Vue.component('config-4', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-billme/>
  </div>`
})
Vue.component('config-5', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
    <input-billme/>
  </div>`
})
Vue.component('config-6', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-cvc/>
  </div>`
})
Vue.component('config-7', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-cvc/>
  </div>`
})
Vue.component('config-8', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
    <input-cvc/>
  </div>`
})
Vue.component('config-9', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-cvc/>
    <input-billme/>
  </div>`
})
Vue.component('config-10', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-cvc/>
    <input-billme/>
  </div>`
})
Vue.component('config-11', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
    <input-cvc/>
    <input-billme/>
  </div>`
})
Vue.component('config-12', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
  </div>`
})
Vue.component('config-13', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
  </div>`
})
Vue.component('config-14', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
  </div>`
})
Vue.component('config-15', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-billme/>
  </div>`
})
Vue.component('config-16', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-billme/>
  </div>`
})
Vue.component('config-17', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
    <input-billme/>
  </div>`
})
Vue.component('config-18', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-cvc/>
  </div>`
})
Vue.component('config-19', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-cvc/>
  </div>`
})
Vue.component('config-20', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
    <input-cvc/>
  </div>`
})
Vue.component('config-21', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-cvc/>
    <input-billme/>
  </div>`
})
Vue.component('config-22', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <image-amex/>
    <input-cc/>
    <input-cvc/>
    <input-billme/>
  </div>`
})
Vue.component('config-23', { template: 
  `<div>
    <image-visa/>
    <image-mc/>
    <image-disc/>
    <input-cc/>
    <input-cvc/>
    <input-billme/>
  </div>`
})

/* eslint-disable no-new */
window['CDSGPW'] = new Vue({
  el: '#CDSGPW',
  data: {
    config: 'default'
  },
  computed: {
    currentConfig: function () {
      //const elConfig = document.getElementById("CDSGPW").getAttribute("config");
      return 'config-'+this.config;
    }
  },
})