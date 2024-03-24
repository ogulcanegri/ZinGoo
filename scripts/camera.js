document.getElementById('start-button').addEventListener('click', function() {
    var mainVideo = document.getElementById('main-video');
    var userVideo = document.getElementById('user-video');
    // Sol taraftaki videoyu gizle
    mainVideo.style.display = 'none';

    // WebRTC ile diğer kullanıcılardan gelen videoyu al
    var peerConnection = new RTCPeerConnection();
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(function(stream) {
        stream.getTracks().forEach(function(track) {
            peerConnection.addTrack(track, stream);
        });
    });

    peerConnection.ontrack = function(event) {
        // Diğer kullanıcının video akışını göster
        userVideo.srcObject = event.streams[0];
        userVideo.onloadedmetadata = function(e) {
            userVideo.play();
        };
    };
});