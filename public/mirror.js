const videoGrid = document.getElementById('video-grid')

myVideo = document.createElement('video')
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
}).then(function(stream){
    addVideoStream(myVideo, stream)
})

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', function(){
        video.play()
    })
    videoGrid.append(video)
}