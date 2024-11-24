import { reactive } from 'vue'

export const usePeerConnection = (signalingServer: any) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  })

  const state = reactive({
    dataChannel: null as RTCDataChannel | null,
    chatLog: [] as string[]
  })
  console.log('signalingServer')
  console.log(signalingServer)
  // Handle incoming ICE candidates
  peerConnection.onicecandidate = (event) => {
    console.log('onicecandidate event')
    console.log(event)
    if (event.candidate) {
      signalingServer.sendCandidate(event.candidate)
    }
  }

  // Handle Data Channel creation
  const createDataChannel = () => {
    const channel = peerConnection.createDataChannel('chat', { id: 1 })
    console.log('channel', channel)

    channel.onmessage = (event) => {
      state.chatLog.push(`Peer: ${event.data}`)
    }
    state.dataChannel = channel
  }

  // Handle remote Data Channel (created by the other peer)
  peerConnection.ondatachannel = (event) => {
    console.log('event')
    console.log(event)
    state.dataChannel = event.channel
    event.channel.onmessage = (e) => {
      state.chatLog.push(`Peer: ${e.data}`)
    }
  }

  // Create offer
  const createOffer = async () => {
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    signalingServer.sendOffer(offer)
  }

  // Create answer
  const createAnswer = async (offer: RTCSessionDescriptionInit) => {
    await peerConnection.setRemoteDescription(offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    signalingServer.sendAnswer(answer)
  }

  // Add received ICE candidate
  const addIceCandidate = async (candidate: RTCIceCandidate) => {
    await peerConnection.addIceCandidate(candidate)
  }

  // Send message through DataChannel
  const sendMessage = (message: string) => {
    const attemptSend = (retries: number) => {
      if (state.dataChannel?.readyState === 'open') {
        state.dataChannel.send(message)
        state.chatLog.push(`You: ${message}`)
      } else if (retries > 0) {
        console.warn('DataChannel is not open, retrying...')
        setTimeout(() => attemptSend(retries - 1), 1000) // Retry after 1 second
      } else {
        console.error('DataChannel is not open after multiple attempts')
      }
    }

    attemptSend(5) // Attempt to send the message up to 5 times
  }

  return {
    state,
    createOffer,
    createAnswer,
    addIceCandidate,
    sendMessage,
    createDataChannel
  }
}
