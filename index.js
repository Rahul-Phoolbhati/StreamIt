import express from 'express'
import http from 'http'
import 'dotenv/config'
import {Server as SocketServer } from 'socket.io'
import { spawn } from 'child_process'

const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/dcfx-m7v2-j248-3185-9207`,
];

const ffmpegProcess = spawn('ffmpeg', options)

ffmpegProcess.stdout.on('data', (data) => {
    console.log(`ffmpeg process's stdout: ${data}`);
})

ffmpegProcess.stderr.on('data' , data=>{
    console.log(`ffmpeg process's stderr: ${data}`);
})
ffmpegProcess.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
})


const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)


io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('binarystream', (data) => {
        console.log(data)
        ffmpegProcess.stdin.write(data, (err)=>{
            console.log('ffmpeg stdin err - ', err);
        })
        
    })
})

app.use(express.static('public'))


server.listen(port, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})