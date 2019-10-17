<template>
  <div id="app" style="width: 800px;">
    <div class="is-size-3" style="margin-bottom: 60px;">
      WebSocket
    </div>
    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <b-input v-model="url"></b-input>
      <b-input v-model="token" placeholder="sec-websocket-key"></b-input>
      <b-button class="button is-primary" @click="openConnection">Connect</b-button>
    </div>
    <div v-if="socket" style="display: flex; justify-content: center; margin-bottom: 20px;">
      <b-input style="width: 464px;" v-model="message" placeholder="sec-websocket-key"></b-input>
      <b-button class="button is-primary" @click="sendMessage">Send</b-button>
    </div>
    <div class="input" style="display: flex; justify-content: center; overflow: auto; height:200px; width: 528px; margin: 0 auto;">
      <span style="white-space: pre; text-align: left;">{{output}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      url: 'ws://localhost:3000/onUpdateUser',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOThmZjNkMDhiZThkMGZlYzEyYTBhOSIsImlhdCI6MTU3MTM0Njg3MH0.ts8FiD-YL3QTOOGxRzBnkjTN5uXn8MpkvGjoSvjiSnU',
      output: '',
      socket: null,
      message: ''
    }
  },
  methods: {
    openConnection () {
      if (this.socket) {
        this.socket.close()
      }

      let protocol = 'Bearer---' + this.token
      this.socket = new WebSocket(this.url, protocol)
      this.socket.addEventListener('open', (event) => {
        let time = this.getTimestamp()
        this.output = time + ' - ' + 'connection opened' + '\n' + this.output
      })
      this.socket.addEventListener('close', (event) => {
        let time = this.getTimestamp()
        this.output = time + ' - ' + 'connection closed' + '\n' + this.output
        this.socket = null
      })
      this.socket.addEventListener('message', (event) => {
        let time = this.getTimestamp()
        this.output = time + ' - ' + `message ${event.data}` + '\n' + this.output
      })
    },
    sendMessage () {
      this.socket.send(this.message)
      this.message = ''
    },
    getTimestamp () {
      let date = new Date()
      return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;;
}
</style>
