import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyDQZHI8hFknjiRb92Kvobz_E46Pmm6tByo',
  authDomain: 'vue-chat-2f803.firebaseapp.com',
  projectId: 'vue-chat-2f803',
  storageBucket: 'vue-chat-2f803.appspot.com',
  messagingSenderId: '438999367966',
  appId: '1:438999367966:web:45b9b1d4cd5396c23c490f'
}

const db = firebase.initializeApp(config)

export default db
