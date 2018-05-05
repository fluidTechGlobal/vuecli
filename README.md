#FLUID TECH GLOBAL VUEX CLI

###Installation
        npm i -g fluidtechglobal-vuex-cli
        

#### Creating the VUEX module store file
Create a "vuex" folder in the following path 
        
        /src/vuex
        
Then run
    
        vuecli -s
        
The above command will create a file that looks like below:

        import Vue from 'vue'
        import Vuex from 'vuex'
        
        Vue.config.productionTip = false
        Vue.use(Vuex)
        Vue.config.debug = true
        
        const debug = process.env.NODE_ENV !== 'production'
        
        export default new Vuex.Store({
          modules: {
        
          },
          strict: debug
        })
        

#### Creating Vuex files. 
A standard vuex service contains a folder structure as follows:
        
        -folder-name
            -actions.js
            -mutations.js
            -store.js
            -url.js
            
The command below will create the folder and the files in the current directory run in.

        vuecli -f 
