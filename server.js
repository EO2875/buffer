const path = require('path');

const express = require('express')
const { ExpressPeerServer  } = require('peer')
const http = require('http')
const WSServer = require('ws')
const socketIO = require('socket.io')
const { v4:uuidV4 } = require('uuid')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.set('view engine', 'ejs')
app.use(express.static('public'))

let environment = process.env.NODE_ENV || 'development'

spaceOut = ()=> console.log('+'.repeat(15))

app.get('/', (req, res) => {
    res.redirect(`/room/`)
})

app.get('/room/', (req, res) => {

    spaceOut()
    console.log(`HTTP GET room`)

    res.sendFile(
        path.join(__dirname, './views/room.html')
    )
})

app.get('/mirror/', (req, res) => {
    spaceOut()
    console.log(`HTTP GET room`)

    res.sendFile(
        path.join(__dirname, './views/mirror.html')
    )
})

io.on('connection', socket => {

    spaceOut()
    console.log('Socket Connection!', socket)

    socket.on('join-room', (userId) => {

        spaceOut()
        console.log(`Join! User: ${userId}`)

        socket.join('room')
        socket.to('room').broadcast.emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.to('room').broadcast.emit('user-disconnected', userId)
        })
    })
})

server.listen(port)
const peerServer = ExpressPeerServer(
    server,
    {
        path: '/'
    }
)
app.use('/peer-server', peerServer)