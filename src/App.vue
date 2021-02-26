<template>
  <div>
    <div v-if="state.username === '' || state.username === null">
      <form @submit.prevent="Login">
        <h1>로그인 채팅</h1>
        <label for="userName">유저이름</label>
        <input
          type="text"
          v-model="inputUserName"
          placeholder="유저 이름을 입력해 해주세요">
        <input
          type="submit"
          value="Login">
      </form>
    </div>
    <div v-else>
      <header>
        <button @click="Logout">Logout</button>
        <h1>안녕하세요~! {{ state.username }}님</h1>
      </header>
      <section>
        <div
          v-for="message in state.messages"
          :key="message.key"
          :class="(message.username === state.username ? 'person1' : 'person2')">
          <div>
            <div>{{ message.username }}</div>
            <div>{{ message.content }}</div>
          </div>
        </div>
      </section>
      <footer>
        <form @submit.prevent="SendMessage">
          <input
            type="text"
            v-model="inputMessage"
            placeholder="메세지를 작성하세요.">
          <input
            type="submit"
            value="전송">
        </form>
      </footer>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import db from './db.js'
export default {
  setup () {
    const inputUserName = ref("")
    const inputMessage = ref("")
    const state = reactive({
      username: "",
      messages: []
    })
    const Login = () => {
      if (inputUserName.value !== "" || inputUserName.value != null) {
        state.username = inputUserName.value
        inputUserName.value = ""
      }
    }
    const Logout = () => {
      state.username = ""
    }
    const SendMessage = () => {
      const messagesRef = db.database().ref("messages")

      if (inputMessage.value === "" || inputMessage.value === null) {
        return
      }
      const message = {
        username: state.username,
        content: inputMessage.value
      }
      messagesRef.push(message)
      inputMessage.value = ""
    }

    onMounted(() => {
      const messagesRef = db.database().ref("messages")

      messagesRef.on('value', snapshot => {
        const data = snapshot.val()
        const messages = []
        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          })

          state.messages = messages
        })
      })
    })

    return { inputUserName, inputMessage, state, Login, SendMessage, Logout }
  }
}
</script>
