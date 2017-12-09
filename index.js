#!/usr/bin/env node
// console.log('Hello, world!');
var fs = require('fs');
var program = require('commander');
var titleize = require('titleize');

function FirstCapitalize (word) {
  return titleize(word);
}

function makeFile (name, extension) {
  var file = name + "." + extension;
  if (extension === 'vue') {
    var writeStream = fs.createWriteStream(file);
    writeStream.write("" +
      "<template>\n" +
      "\n" +
      "</template>\n" +
      "\n" +
      "<script>\n" +
      "  export default {\n" +
      "    name: '',\n" +
      "    data () {\n" +
      "      return {}\n" +
      "    }\n" +
      "  }\n" +
      "</script>\n" +
      "\n" +
      "<style>\n" +
      "\n" +
      "</style>\n");
    writeStream.end();
    console.log('\nComponent created.')
    console.log('Add <' + file + '> to your urls file.')
  }
}

function makeStore (name, extension) {
  var file = name + "." + extension;
    var writeStream = fs.createWriteStream(file);
    writeStream.write("" +
      "import Vue from 'vue'\n" +
      "import Vuex from 'vuex'\n" +
      "\n" +
      "Vue.config.productionTip = false\n" +
      "Vue.use(Vuex)\n" +
      "Vue.config.debug = true\n" +
      "\n" +
      "const debug = process.env.NODE_ENV !== 'production'\n" +
      "\n" +
      "export default new Vuex.Store({\n" +
      "  modules: {\n" +
      "  },\n" +
      "  strict: debug\n" +
      "})\n");
    writeStream.end();
    console.log('\nStore created.')
    console.log('Add <' + file + '> to your main.js file.')
}

function makeVuexFolder (folder_name) {
  var urls = folder_name +"Urls";
  var mutationtitle = folder_name.toUpperCase();
  var start = folder_name.toLowerCase();
  fs.mkdirSync(folder_name);
  
  var store = 'store.js';
  var writeStream = fs.createWriteStream(folder_name + '/' + store);
  writeStream.write("import mutations from './mutations'\n" +
    "import actions from './actions'\n" +
    "\n" +
    "const state = {\n" +
    "  all_" + start + "s: [],\n" +
    "  " + start + "s: [],\n" +
    "  " + start + ": [],\n" +
    "  deleted_" + start + "s: []\n" +
    "}\n" +
    "\n" +
    "export default {\n" +
    "  state, mutations, actions\n" +
    "}");
  writeStream.end();

  var actions = 'actions.js';
  var writeStream = fs.createWriteStream(folder_name + '/' + actions);
  writeStream.write("" +
    "import Vue from 'vue'\n" +
    "import {" + urls + "} from '../defaults/.url'\n" +
    "import router from '../../router/index'\n" +
    "// import VueNotifications from 'vue-notifications'\n" +
    "\n" +
    "export default {\n" +
    "  get_all_" + start + "s (context) {\n" +
    "    Vue.http.get(" + urls + ".getAll" + folder_name + "s).then(function (response) {\n" +
    "      context.commit('GET_ALL_" + mutationtitle + "S', response.data)\n" +
    "      context.dispatch('loading_false')\n" +
    "    })\n" +
    "  },\n" +
    "  get_" + start + "s (context, publicId) {\n" +
    "    Vue.http.get(" + urls + ".get" + folder_name + "s + publicId).then(function (response) {\n" +
    "      context.commit('GET_" + mutationtitle + "S', response.data)\n" +
    "      context.dispatch('loading_false')\n" +
    "    })\n" +
    "  },\n" +
    "  get_deleted_" + start + "s (context) {\n" +
    "    Vue.http.get(" + urls + ".getDeleted" + folder_name + ").then(function (response) {\n" +
    "      context.commit('GET_DELETED_" + mutationtitle + "S', response.data)\n" +
    "      context.dispatch('loading_false')\n" +
    "    })\n" +
    "  },\n" +
    "  get_" + start + " (context, publicId) {\n" +
    "    Vue.http.get(" + urls + ".get" + folder_name + " + publicId).then(function (response) {\n" +
    "      context.commit('GET_" + mutationtitle + "', response.data)\n" +
    "      context.dispatch('loading_false')\n" +
    "    })\n" +
    "  },\n" +
    "  post_" + start + " (context, data) {\n" +
    "    context.errors = []\n" +
    "    const postData = {\n" +
    "      index: data.item\n" +
    "    }\n" +
    "    Vue.http.post(" + urls + ".post" + folder_name + ", postData).then(function (response) {\n" +
    "      context.dispatch('get_all_" + start + "s')\n" +
    "      router.push({\n" +
    "        name: data.redirect_url\n" +
    "      })\n" +
    "      // VueNotifications.success({message: response.data.message})\n" +
    "      context.dispatch('loading_false')\n" +
    "    }).catch(function (error) {\n" +
    "      context.commit('UPDATE_ERRORS', error.data)\n" +
    "      context.dispatch('loading_false')\n" +
    "      // console.log(error.data)\n" +
    "    })\n" +
    "  },\n" +
    "  update_" + start + " (context, data) {\n" +
    "    context.errors = []\n" +
    "    const postData = {\n" +
    "      index: data.item\n" +
    "    }\n" +
    "    Vue.http.post(" + urls + ".post" + folder_name + ", postData).then(function (response) {\n" +
    "      context.dispatch('get_all_" + start + "s')\n" +
    "      router.push({\n" +
    "        name: data.redirect_url\n" +
    "      })\n" +
    "      // VueNotifications.success({message: response.data.message})\n" +
    "      context.dispatch('loading_false')\n" +
    "    }).catch(function (error) {\n" +
    "      context.commit('UPDATE_ERRORS', error.data)\n" +
    "      context.dispatch('loading_false')\n" +
    "      // VueNotifications.error({message: error.data.message})\n" +
    "      // console.log(error.data)\n" +
    "    })\n" +
    "  },\n" +
    "  delete_" + start + " (context, publicId) {\n" +
    "    Vue.http.get(" + urls + ".delete" + folder_name + " + publicId).then(function (response) {\n" +
    "      alert(response.data.message)\n" +
    "      context.commit('GET_DELETED_" + mutationtitle + "S', response.data)\n" +
    "      router.push({\n" +
    "        name: 'Module.Deleted" + folder_name + "s'\n" +
    "      })\n" +
    "      // VueNotifications.info({message: response.data.message})\n" +
    "      context.dispatch('loading_false')\n" +
    "    })\n" +
    "  },\n" +
    "  restore" + start + " (context, publicId) {\n" +
    "    Vue.http.get(" + urls + ".restore" + folder_name + " + publicId).then(function (response) {\n" +
    "      alert(response.data.message)\n" +
    "      context.commit('GET_ALL_" + mutationtitle + "S', response.data)\n" +
    "      router.push({\n" +
    "        name: 'Module." + folder_name + "s'\n" +
    "      })\n" +
    "      // VueNotifications.info({message: response.data.message})\n" +
    "      context.dispatch('loading_false')\n" +
    "    })\n" +
    "  }\n" +
    "}\n");
  writeStream.end();

  var mutations = 'mutations.js';
  var writeStream = fs.createWriteStream(folder_name + '/' + mutations);
  writeStream.write("export default {\n" +
    "  GET_" + mutationtitle + "S (state, data) {\n" +
    "    state." + start + "s = data.data\n" +
    "  },\n" +
    "  GET_ALL_" + mutationtitle + "S (state, data) {\n" +
    "    state.all_" + start + "s = data.data\n" +
    "  },\n" +
    "  GET_" + mutationtitle + " (state, data) {\n" +
    "    state." + start + " = data.data\n" +
    "  },\n" +
    "  GET_DELETED_" + mutationtitle + "S (state, data) {\n" +
    "    state.deleted_" + start + "s = data.data\n" +
    "  }\n" +
    "}\n");
  writeStream.end();

  console.log('\nVuex files folder created.')
  console.log('Add <' + folder_name + '> as a module to your Store.js file.')
}

program
  .version('1.0.0')
  .option('-c, --component <component_name>', 'Create a component')
  .option('-s, --store', 'Create a Vuex Store')
  .option('-f, --vuex_folder <vuex_folder>', 'Create a Folder with a store.js, mutations.js and actions')
  .parse(process.argv);

if (program.component) {
  makeFile(program.component, 'vue')
};
if (program.store) {
  makeStore('Store', 'js')
};
if (program.vuex_folder) {
  makeVuexFolder(program.vuex_folder)
};