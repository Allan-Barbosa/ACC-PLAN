import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css'
// import firebase from "../node_modules/firebase/app";
// import "../node_modules/firebase/auth";
// import firebaseConfig from "./firebaseConfig";

// const.initializeApp(firebaseConfig);


const app = createApp(App)

app.use(bootstrap)

app.use(router)

app.mount('#app')
