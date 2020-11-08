const videoGrid = document.getElementById('video-grid')
const textDiv   = document.getElementById('text-div')

function dirtyLog(string){
    textDiv.innerHTML += `<p>${String(string)}</p>`
}

function socketsAndPeers(){
    var socket, myPeer, peers, secure, port;

    secure = window.location.protocol.startsWith('https')

    port = secure ? 443 : 3000

    socket = io('/')
    myPeer = new Peer(undefined, {
        host: '/',
        // TODO - we should not hard-code the port
        port,
        path: '/peer-server/',
        secure: secure,
    })
    peers = {}

    myVideo = document.createElement('video')
    myVideo.muted = true

    window.addEventListener('beforeunload', () => {
        socket.close()
    })


    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    }).then(function(stream){
        addVideoStream(myVideo, stream)

        myPeer.on('call', function(call){
            console.log('Received call', call)
            dirtyLog('Received Call', call)

            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', function(userVideoStream){
                addVideoStream(video, userVideoStream)
            })
        })
    })

    socket.on('user-connected', function(userId){
        console.log(`User Connected: ${userId}`)
        dirtyLog(`User Connected: ${userId}`)
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true,
        }).then(stream => connectToNewUser(userId, stream))
    })

    socket.on('user-disconnected', function(userId){
        console.log(`User Disconnected: ${userId}`)
        dirtyLog(`User Disconnected: ${userId}`)
        if (peers[userId]) peers[userId].close()
    })

    myPeer.on('open', function(id){
        socket.emit('join-room', id)
    })
    myPeer.on('error', (err) => {
        console.log(err)
        dirtyLog(err)
    })

    function connectToNewUser(userId, stream) {
        console.log('Calling User')
        dirtyLog('Calling User')

        const call = myPeer.call(userId, stream)

        const video = document.createElement('video')
        call.on('stream', function(userVideoStream){
            addVideoStream(video, userVideoStream)
        })
        // Cannot simply use video.remove callback
        // since that does not implement Element interface
        // so `this` will be useless
        call.on('close',() => video.remove())

        peers[userId] = call
    }

    function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', function(){
            video.play()
        })
        videoGrid.append(video)
    }
}

try {
    socketsAndPeers()
} catch (error) {
    console.log(error)
    dirtyLog('Error:')
    dirtyLog(error)
}

dirtyLog('Tests Passed')