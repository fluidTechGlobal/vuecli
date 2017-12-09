#FLUID TECH GLOBAL VUE CLI

###Installation
        npm install -g fluidtechglobal-vuecli 
        
#### Creating a Vue Component
Go to the directory you want to create the component and run the command below:

        vuecli -c <ComponentName>

A vue component by default looks as follows:
    
        <template>
        
        </template>
        
        <script>
          export default {
            name: '',
            data () {
              return {}
            }
          }
        </script>
        
        <style>
        
        </style>
        

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
            
The command below will create the folder and the files in the current directory run in.

        vuecli -f <FolderName>
        
PS. Start each word of the folder name with a capital for better styling inside the files.

The files created are as follows: 

`Replace the word folder name with the <FolderName> put in the command above`

##### actions.js

        import Vue from 'vue'
        import {FolderNameUrls} from '../defaults/.url'
        import router from '../../router/index'
        // import VueNotifications from 'vue-notifications'
        
        export default {
          get_all_folder_names (context) {
            Vue.http.get(FolderNameUrls.getAllFolderNames).then(function (response) {
              context.commit('GET_ALL_FOLDERNAMES', response.data)
              context.dispatch('loading_false')
            })
          },
          get_folder_names (context, publicId) {
            Vue.http.get(FolderNameUrls.getFolderNames + publicId).then(function (response) {
              context.commit('GET_FOLDERNAMES', response.data)
              context.dispatch('loading_false')
            })
          },
          get_deleted_folder_names (context) {
            Vue.http.get(FolderNameUrls.getDeletedFolderName).then(function (response) {
              context.commit('GET_DELETED_FOLDERNAMES', response.data)
              context.dispatch('loading_false')
            })
          },
          get_folder_name (context, folder_nameId) {
            Vue.http.get(FolderNameUrls.getFolderName + folder_nameId).then(function (response) {
              context.commit('GET_FOLDERNAME', response.data)
              context.dispatch('loading_false')
            })
          },
          post_folder_name (context, data) {
            context.errors = []
            const postData = {
              index: data.item
            }
            Vue.http.post(FolderNameUrls.postFolderName, postData).then(function (response) {
              context.dispatch('get_all_folder_names')
              router.push({
                name: data.redirect_url
              })
              // VueNotifications.success({message: response.data.message})
              context.dispatch('loading_false')
            }).catch(function (error) {
              context.commit('UPDATE_ERRORS', error.data)
              context.dispatch('loading_false')
              // console.log(error.data)
            })
          },
          update_folder_name (context, data) {
            context.errors = []
            const postData = {
              index: data.item
            }
            Vue.http.post(FolderNameUrls.postFolderName, postData).then(function (response) {
              context.dispatch('get_all_folder_names')
              router.push({
                name: data.redirect_url
              })
              // VueNotifications.success({message: response.data.message})
              context.dispatch('loading_false')
            }).catch(function (error) {
              context.commit('UPDATE_ERRORS', error.data)
              context.dispatch('loading_false')
              // VueNotifications.error({message: error.data.message})
              // console.log(error.data)
            })
          },
          delete_folder_name (context, publicId) {
            Vue.http.get(FolderNameUrls.deleteFolderName + publicId).then(function (response) {
              alert(response.data.message)
              context.commit('GET_DELETED_FOLDERNAMES', response.data)
              router.push({
                name: 'Module.DeletedFolderNames'
              })
              // VueNotifications.info({message: response.data.message})
              context.dispatch('loading_false')
            })
          },
          restoreFolderName (context, publicId) {
            Vue.http.get(FolderNameUrls.restoreFolderName + publicId).then(function (response) {
              alert(response.data.message)
              context.commit('GET_ALL_FOLDERNAMES', response.data)
              router.push({
                name: 'Module.FolderNames'
              })
              // VueNotifications.info({message: response.data.message})
              context.dispatch('loading_false')
            })
          }
        }

 
#####mutations.js
        export default {
          GET_FOLDERNAMES (state, data) {
            state.folder_names = data.data
          },
          GET_ALL_FOLDERNAMES (state, data) {
            state.all_folder_names = data.data
          },
          GET_FOLDERNAME (state, data) {
            state.folder_name = data.data
          },
          GET_DELETED_FOLDERNAMES (state, data) {
            state.deleted_folder_names = data.data
          }
        }

#####store.js

        import mutations from './mutations'
        import actions from './actions'
        
        const state = {
          all_folder_names: [],
          folder_names: [],
          folder_name: [],
          deleted_folder_names: []
        }
        
        export default {
          state, mutations, actions
        }

