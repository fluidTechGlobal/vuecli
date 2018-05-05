#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
var fs = require('fs');
var titleize = require('titleize');
var program = require('commander');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Vuex Cli', { horizontalLayout: 'full' })
  )
);
console.log(chalk.yellow('Developed and maintained by http://fluidtechglobal.com \n'));
console.log(chalk.green('Get command list by typing $ vuecli --help'));

program
  .version('1.1.0')
  // .option('-c, --component <component_name>', 'Create a component')
  .option('-s, --store', 'Create a Vuex Store')
  .option('-f, --vuex_folder', 'Create a Folder with a store.js, mutations.js and actions')
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

function makeVuexFolder (folder) {
  const run = async () => {
    const vuexFolder = await inquirer.vuexFolder();

    var urls = vuexFolder.capital_variable +"Urls";
    var firstCapitalSingular = titleize(vuexFolder.capital_variable);
    var firstCapitalPlural = titleize(vuexFolder.small_variable);
    var mutationSingular = vuexFolder.capital_variable.toUpperCase();
    var mutationPlural = vuexFolder.small_variable.toUpperCase();
    var startSingular = vuexFolder.capital_variable.toLowerCase();
    var startPlural = vuexFolder.small_variable.toLowerCase();
    fs.mkdirSync(vuexFolder.folder);
    var folder_name = vuexFolder.folder

    var store = 'store.js';
    var writeStream = fs.createWriteStream(folder_name + '/' + store);
    writeStream.write("import mutations from './mutations'\n" +
      "import actions from './actions'\n" +
      "\n" +
      "const state = {\n" +
      "  all_" + startPlural + ": [],\n" +
      "  " + startPlural + ": [],\n" +
      "  " + startSingular + ": [],\n" +
      "  deleted_" + startPlural + ": []\n" +
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
      "import {" + urls + "} from './urls'\n" +
      "import router from '../../router/index'\n" +
      "\n" +
      "export default {\n" +
      "  get_all_" + startPlural + " (context) {\n" +
      "    Vue.http.get(" + urls + ".getAll" + firstCapitalPlural + ").then(function (response) {\n" +
      "      context.commit('GET_ALL_" + mutationPlural + "', response.data)\n" +
      "      context.dispatch('loading_false')\n" +
      "    }).catch(function () {\n" +
      "      var data = {data: []}\n" +
      "      context.commit('GET_ALL_" + mutationPlural + "', data)\n" +
      "      context.dispatch('loading_false')\n" +
      "    })\n" +
      "  },\n" +
      "  get_deleted_" + startPlural + " (context) {\n" +
      "    Vue.http.get(" + urls + ".getDeleted" + firstCapitalPlural + ").then(function (response) {\n" +
      "      context.commit('GET_DELETED_" + mutationPlural + "', response.data)\n" +
      "      context.dispatch('loading_false')\n" +
      "    }).catch(function () {\n" +
      "      var data = {data: []}\n" +
      "      context.commit('GET_DELETED_" + mutationPlural + "', data)\n" +
      "      context.dispatch('loading_false')\n" +
      "    })\n" +
      "  },\n" +
      "  get_" + startSingular + " (context, publicId) {\n" +
      "    Vue.http.get(" + urls + ".get" + firstCapitalSingular + " + publicId).then(function (response) {\n" +
      "      context.commit('GET_" + mutationSingular + "', response.data)\n" +
      "      context.dispatch('loading_false')\n" +
      "    }).catch(function () {\n" +
      "      var data = {data: []}\n" +
      "      context.commit('GET_" + mutationSingular + "', data)\n" +
      "      context.dispatch('loading_false')\n" +
      "    })\n" +
      "  },\n" +
      "  post_" + startSingular + " (context, data) {\n" +
      "    Vue.http.post(" + urls + ".post" + firstCapitalSingular + ", data).then(function (response) {\n" +
      "      context.dispatch('get_all_" + startPlural + "')\n" +
      "      router.push({\n" +
      "        name: data.redirect_url\n" +
      "      })\n" +
      "      context.dispatch('loading_false')\n" +
      "    })\n" +
      "  },\n" +
      "  update_" + startSingular + " (context, data) {\n" +
      "    Vue.http.post(" + urls + ".post" + firstCapitalSingular + ", data).then(function (response) {\n" +
      "      context.dispatch('get_all_" + startPlural + "')\n" +
      "      router.push({\n" +
      "        name: data.redirect_url\n" +
      "      })\n" +
      "      context.dispatch('loading_false')\n" +
      "     })\n" +
      "  },\n" +
      "  delete_" + startSingular + " (context, publicId) {\n" +
      "    Vue.http.get(" + urls + ".delete" + firstCapitalSingular + " + publicId).then(function (response) {\n" +
      "      alert(response.data.message)\n" +
      "      context.commit('GET_DELETED_" + mutationPlural + "', response.data)\n" +
      "      router.push({\n" +
      "        name: 'Module.Deleted" + firstCapitalPlural + "'\n" +
      "      })\n" +
      "      context.dispatch('loading_false')\n" +
      "    })\n" +
      "  },\n" +
      "  restore_" + startSingular + " (context, publicId) {\n" +
      "    Vue.http.get(" + urls + ".restore" + firstCapitalSingular + " + publicId).then(function (response) {\n" +
      "      alert(response.data.message)\n" +
      "      context.commit('GET_ALL_" + mutationPlural + "', response.data)\n" +
      "      router.push({\n" +
      "        name: 'Module." + firstCapitalPlural + "'\n" +
      "      })\n" +
      "      context.dispatch('loading_false')\n" +
      "    })\n" +
      "  }\n" +
      "}\n");
    writeStream.end();

    var mutations = 'mutations.js';
    var writeStream = fs.createWriteStream(folder_name + '/' + mutations);
    writeStream.write("export default {\n" +
      "  GET_" + mutationPlural + " (state, data) {\n" +
      "    state." + startPlural + " = data.data\n" +
      "  },\n" +
      "  GET_ALL_" + mutationPlural + " (state, data) {\n" +
      "    state.all_" + startPlural + " = data.data\n" +
      "  },\n" +
      "  GET_" + mutationSingular + " (state, data) {\n" +
      "    state." + startSingular + " = data.data\n" +
      "  },\n" +
      "  GET_DELETED_" + mutationPlural + " (state, data) {\n" +
      "    state.deleted_" + startPlural + " = data.data\n" +
      "  }\n" +
      "}\n");
    writeStream.end();

    var url = 'urls.js';
    var writeStream = fs.createWriteStream(folder_name + '/' + url);
    writeStream.write("// If there is an external url file uncomment below and replace main url with the import\n" +
      "// import url from ''\n" +
      "\n" +
      "const mainUrl = 'http://../'\n" +
      "\n" +
      "export const " + urls + " = {\n" +
      "  post" + firstCapitalSingular +": mainUrl + 'post',\n" +
      "  getAll" + firstCapitalPlural +": mainUrl + 'get_all',\n" +
      "  get" + firstCapitalSingular +": mainUrl + 'get_single',\n" +
      "  edit" + firstCapitalSingular +": mainUrl + 'update',\n" +
      "  getDeleted" + firstCapitalPlural +": mainUrl + 'delete'\n" +
      "}");
    writeStream.end();

    console.log('\nVuex files folder created.')
    console.log('Add <' + folder_name + '> as a module to your Store.js file.')
  }
  run();

}