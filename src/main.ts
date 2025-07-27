import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
          myCustomTheme: {
            dark: false,
            colors: {
                background: '#FFFFFF',     
                surface: '#FFFFFF',          
                primary: '#2196F3',          
                secondary: '#013447',        
                accent: '#BBDEFB',           
                error: '#EF5350',            
                info: '#29B6F6',             
                success: '#66BB6A',          
                warning: '#FFA726',   
            },
          },
        },
      },
  })
  
createApp(App).use(vuetify).mount('#app')
