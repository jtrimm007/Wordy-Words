<template>
  <div>
      <div>
    <p v-if="peerConnected">My peer ID is: {{ peerId }}</p>
    <button v-if="peerConnected" @click="copyPeerId">Copy ID</button>
  </div>
    <input v-model="username" placeholder="Enter your username" />
    <button @click="initializePeer">Join Chat</button>
    <input v-model="connectionId" placeholder="Enter connection id" />
    <button @click="connectToPeer">Connect to Peer</button>
    <div v-if="peerConnected">
      <input v-model="message" placeholder="Type a message" />
      <button @click="sendMessage">Send</button>
    </div>
    <div v-for="msg in chatHistory" :key="msg.id">
      <strong>{{ msg.username }}:</strong> {{ msg.text }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Peer from 'peerjs'

const username = ref('')
const message = ref('')
const chatHistory = ref([])
const peerId = ref('')
const peerConnected = ref(false)
const connections = ref([]) // Holds the connections to other peers
const connectionId = ref('')
const userId = ref(uuidv4()) // Generate a UUID for the user
let peer

onMounted(() => {
  // if (connections.value.length < 10) {
  //   connectToPeer(peerId.value)
  // } else {
  //   alert('Maximum number of connections reached')
  // }
})
const getIceServers = async () => {
  const response = await fetch('https://global.xirsys.net/_turn/word-game', {
    method: 'PUT',
    headers: {
      Authorization: 'Basic ' + btoa('jtrimm007:d39ed6e2-560a-11ef-9b6d-0242ac150003'), // Replace with your credentials
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  if (data.v) {
    return data.v.iceServers
  } else {
    console.error('Failed to get ICE servers from Xirsys')
    return []
  }
}
// Assuming you have a list of peer IDs
const connectToPeer = () => {
  if (!peer) {
    console.error('Peer is not initialized')
    return
  }
  console.log('connecting to peer', connectionId.value)
  const conn = peer.connect(connectionId.value)

  conn.on('open', () => {
    console.log(`Connected to peer: ${connectionId.value}`)
    connections.value.push(conn)

    // Handle incoming data
    // conn.on('data', receiveMessage)
    conn.send({ username: username.value, text: 'Hello from ' + username.value })
  })
  conn.on('data', (data) => {
    console.log('connect to peer data')
    console.log(data)
    if (data.id !== userId.value)
      chatHistory.value.push({ ...data, id: userId.value, date: Date.now() })
  })

  conn.on('error', (err) => {
    console.error('Connection error:', err)
  })
  conn.on('close', () => {
    console.log(`Disconnected from peer: ${connectionId.value}`)
  })
}

// Initialize the peer connection
const initializePeer = async () => {
  if (!username.value) return alert('Please enter a username')
  const iceServers = await getIceServers()

  peer = new Peer({
    config: {
      iceServers: [
        {
          urls: iceServers[0].urls || iceServers[0].url
        },
        {
          urls: iceServers[3].urls || iceServers[3].url,
          credential: iceServers[3].credential,
          username: iceServers[3].username
        },
        {
          urls: iceServers[4].urls || iceServers[4].url,
          credential: iceServers[4].credential,
          username: iceServers[4].username
        }
      ]
    }
  })

  peer.on('open', (id) => {
    peerId.value = id
    peerConnected.value = true
    console.log('My peer ID is:', id)
  })

  peer.on('connection', (conn) => {
    connections.value.push(conn)

    conn.on('data', (data) => {
      chatHistory.value.push({ ...data, id: userId.value, date: Date.now() })
      const broadcastMessage = (message) => {
        connections.value.forEach((conn) => {
          if (conn.open) {
            console.log('broadcastMessage')
            conn.send(message)
          }
        })
      }
      broadcastMessage(data)
    })
  })
}
const copyPeerId = () => {
  navigator.clipboard.writeText(peerId.value).then(() => {
    console.log('Peer ID copied to clipboard')
  }).catch(err => {
    console.error('Failed to copy peer ID: ', err)
  })
}
// Send a message to all connected peers
const sendMessage = () => {
  if (!message.value) return
  const msg = { msgId: uuidv4(), id: userId.value, username: username.value, text: message.value }

  connections.value.forEach((conn) => {
    if (peerId.value !== conn.peer) conn.send(msg)
  })
  chatHistory.value.push({ ...msg, id: userId.value, date: Date.now() }) // Update your own history
  message.value = '' // Reset message input
}

// Handle incoming messages
const receiveMessage = (data) => {
  chatHistory.value.push({ ...data, id: userId.value, date: Date.now() })
}
</script>

<style scoped>
/* Basic styling */
</style>
