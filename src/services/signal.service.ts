export const useSignalingService = (url: string, onMessage: (msg: any) => void) => {
  const ws = new WebSocket(url)

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data)
    onMessage(message) // Pass message back to peer connection
  }

  const waitForOpenConnection = () => {
    return new Promise<void>((resolve, reject) => {
      if (ws.readyState === WebSocket.OPEN) {
        resolve()
      } else {
        ws.addEventListener('open', () => resolve(), { once: true })
        ws.addEventListener('error', (err) => reject(err), { once: true })
      }
    })
  }

  const sendOffer = async (offer: RTCSessionDescriptionInit) => {
    try {
      await waitForOpenConnection()
      ws.send(JSON.stringify({ type: 'offer', data: offer }))
    } catch (error) {
      console.error('Failed to send offer:', error)
    }
  }

  const sendAnswer = async (answer: RTCSessionDescriptionInit) => {
    try {
      await waitForOpenConnection()
      ws.send(JSON.stringify({ type: 'answer', data: answer }))
    } catch (error) {
      console.error('Failed to send answer:', error)
    }
  }

  const sendCandidate = async (candidate: RTCIceCandidate) => {
    try {
      await waitForOpenConnection()
      ws.send(JSON.stringify({ type: 'candidate', data: candidate }))
    } catch (error) {
      console.error('Failed to send candidate:', error)
    }
  }

  return {
    sendOffer,
    sendAnswer,
    sendCandidate
  }
}
