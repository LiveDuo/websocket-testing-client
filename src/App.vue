<template>
  <div id="app" style="width: 800px;">
    <div class="is-size-3" style="margin-bottom: 40px;">
      <span>WebSocket Debugging Tool</span>
      <b-tooltip style="margin-left: 20px;" v-if="token" class="is-dark" :label="token" position="is-bottom" :multilined="true" size="is-large">
        <b-tag type="is-primary">Token</b-tag>
      </b-tooltip>
    </div>
    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <b-input v-model="loginUrl" placeholder="url"></b-input>
      <b-input v-model="loginParams" placeholder="params"></b-input>
      <b-input v-model="loginPathToKey" placeholder="path-to-key"></b-input>
      <b-button class="button is-primary" @click="login">Login</b-button>
    </div>
    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
      <b-input v-model="webSocketUrl" style="width: 640px;"></b-input>
      <!-- <b-input style="width: 422px;" v-model="token" placeholder="sec-websocket-key"></b-input> -->
      <b-button class="button is-primary" @click="openConnection">Connect</b-button>
    </div>
    <!-- <div v-if="socket" style="display: flex; justify-content: center; margin-bottom: 20px;">
      <b-input style="width: 664px;" v-model="message" placeholder="message"></b-input>
      <b-button class="button is-primary" @click="sendMessage">Send</b-button>
    </div> -->
    <div v-if="socket" style="display: flex; justify-content: center; margin-bottom: 20px;">
      <b-input style="width: 322px;" v-model="exampleUrl" placeholder="url"></b-input>
      <b-input style="width: 322px;" v-model="exampleParams" placeholder="params"></b-input>
      <b-button class="button is-primary" @click="example">Example</b-button>
    </div>
    <div class="input" style="overflow-y: auto; height:160px; width: 728px; margin: 0 auto; margin-bottom: 20px;">
      <span v-if="output.length" style="display: flex; flex-direction: column; text-align: left; margin-top: auto;">
        <!-- <span style="word-break: break-all;">-</span> -->
        <span v-for="(out, index) in output" :key="index" style="word-break: break-all;">{{out}}</span>
      </span>
      <span v-else style="margin: 0 auto;">No data</span>
    </div>
    <div style="width: 728px; margin: 0 auto; margin-bottom: 20px;">
      <span>Note: To get rid of the SecurityError caused by using http over a github.io page, go to firefox's about:config and toggle network.websocket.allowInsecureFromHTTPS. Also, for login and example requests you will need to disable CORS you can use a plugin such as "CORS Everywhere".</span>
    </div>
    <b-tooltip class="is-dark" :label="examples" position="is-top" :multilined="true" size="is-large">
      <button @click="loadExamples" class="button is-info">Load examples</button>
    </b-tooltip>
  </div>
</template>

<script>
import axios from 'axios'

const getPropertyFromPath = (target, keypath) => keypath.split('.').reduce((previous, current) => { return previous[current] }, target)

const examplesText = `webSocketUrl = ws://localhost:3000/onUpdateUser
  loginUrl = http://localhost:3000/users/login
  loginParams = {"email": "test36@gmail.com","password": "asdad"}
  this.exampleUrl = http://localhost:3000/users/update
  exampleParams = {"is_sync":false,"first_name":"Lilaland"}`

export default {
  name: 'app',
  data () {
    return {
      webSocketUrl: 'ws://localhost:<port>/<endpoint>',
      loginUrl: 'http://localhost:<port>/<endpoint>',
      loginParams: '',
      loginPathToKey: '',
      exampleUrl: '',
      exampleParams: '',
      token: '',
      output: [],
      socket: null,
      message: '',
      examples: examplesText
    }
  },
  methods: {
    async login () {
      try {
        let params = JSON.parse(this.loginParams)

        let headers = { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        let result = await axios({ method: 'post', url: this.loginUrl, headers: headers, data: params })
        this.token = getPropertyFromPath(result, this.loginPathToKey)
      } catch (error) {
        console.log(error.message)
      }
    },
    async example () {
      try {
        // let params = JSON.parse(this.exampleParams)
        let formData = new FormData()
        formData.set('json', this.exampleParams)

        let headers = { 'Access-Control-Allow-Origin': 'http://localhost:3000', Authorization: `Bearer ${this.token}` }
        let result = await axios({ method: 'post', url: this.exampleUrl, headers: headers, data: formData })
        console.log(result)
      } catch (error) {
        console.log(error.message)
      }
    },
    loadExamples () {
      this.webSocketUrl = 'ws://localhost:3000/onUpdateUser'

      this.loginUrl = 'http://localhost:3000/users/login'
      this.loginParams = '{"email": "test36@gmail.com","password": "asdad"}'
      this.loginPathToKey = 'data.jwt'

      this.exampleUrl = 'http://localhost:3000/users/update'
      this.exampleParams = '{"is_sync":false,"first_name":"Lilaland"}'
    },
    openConnection () {
      if (this.socket) {
        this.socket.close()
      }

      let protocol = 'Bearer---' + this.token
      this.socket = new WebSocket(this.webSocketUrl, protocol)
      this.socket.addEventListener('open', (event) => {
        let message = this.getTimestamp() + ' - ' + 'connection opened'
        this.output = [message, ...this.output]
      })
      this.socket.addEventListener('close', (event) => {
        let message = this.getTimestamp() + ' - ' + 'connection closed'
        this.output = [message, ...this.output]
        this.socket = null
      })
      this.socket.addEventListener('message', (event) => {
        let message = this.getTimestamp() + ' - ' + `received ${event.data}`
        this.output = [message, ...this.output]
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
  margin: 40px auto;;
}
</style>
