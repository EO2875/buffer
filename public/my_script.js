/* const socket = io('/')
const peers = {}

socket.on('user-connected', userId => {
    console.log('User Connected!', userId)
    connectToNewUser(userId, stream)

    peers[userId] = true
})

const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
const id = customGenerationFunction()
socket.emit('join-room', ROOM_ID, id)

socket.on('user-disconnected', userId => {
    console.log('User Disconnected!', userId)
    if (peers[userId]) peers[userId].close()
}) */


peer = new Peer(/* {key:'supersecretkey'} */)
peer.on('open', () => {
    console.log('ID!', peer.id)
})
peer.on('connection', connection => {
    conn = connection
    peer_id = connection.peer
})
peer.on('error', console.log)