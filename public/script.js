const video = document.getElementById('user-video')
const startBtn = document.getElementById('start-btn')

const socket = io();

const state = {media: null}

function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
startBtn.addEventListener('click', () => {
        const mediaRecorder = new MediaRecorder(video.srcObject, {
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
            framerate: 25
        })
        mediaRecorder.ondataavailable = (e) => {
            socket.emit('binarystream', e.data)
            console.log(e.data);
        }
        mediaRecorder.start(25);
})

window,onload =  async (e) => {
    if(getUserMediaSupported()) {
        const media = await navigator.mediaDevices.getUserMedia({video: true,
        audio: true})
        state.media = media
        video.srcObject = media
    }
}