import { createApp } from 'vue'
import App from './App.vue'

/* FONT AWESOME */
/* Set up using Vue 3 */
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add([faPlay, faPause])
/* END FONT AWESOME */

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')

