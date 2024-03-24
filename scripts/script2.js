function pairUsers(user1, user2) {
    // user1 ve user2 arasında bir peer bağlantısı oluşturun
    var peerConnection1 = new RTCPeerConnection();
    var peerConnection2 = new RTCPeerConnection();

    // user1 için medya akışını paylaşma
    user1.localStream.getTracks().forEach(track => peerConnection1.addTrack(track, user1.localStream));

    // user2 için medya akışını paylaşma
    user2.localStream.getTracks().forEach(track => peerConnection2.addTrack(track, user2.localStream));

    // ICE bağlantılarını belirleme
    peerConnection1.onicecandidate = event => {
        if (event.candidate) {
            peerConnection2.addIceCandidate(event.candidate);
        }
    };

    peerConnection2.onicecandidate = event => {
        if (event.candidate) {
            peerConnection1.addIceCandidate(event.candidate);
        }
    };

    // Medya akışlarını değişimini belirleme
    peerConnection1.ontrack = event => {
        user2.remoteVideoElement.srcObject = event.streams[0];
    };

    peerConnection2.ontrack = event => {
        user1.remoteVideoElement.srcObject = event.streams[0];
    };

    // SDP bilgisini değişimini belirleme
    peerConnection1.createOffer().then(offer => {
        peerConnection1.setLocalDescription(offer);
        peerConnection2.setRemoteDescription(offer);

        peerConnection2.createAnswer().then(answer => {
            peerConnection2.setLocalDescription(answer);
            peerConnection1.setRemoteDescription(answer);
        });
    });
}

// Kullanıcı nesneleri
var user1 = {
    localStream: localStream1,
    remoteVideoElement: document.getElementById('remoteVideo1')
};

var user2 = {
    localStream: localStream2,
    remoteVideoElement: document.getElementById('remoteVideo2')
};

// Kullanıcıları eşleştirme
pairUsers(user1, user2);