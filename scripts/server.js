document.getElementById('start-button').addEventListener('click', function() {
    var mainVideo = document.getElementById('main-video');
    var userVideo = document.getElementById('user-video');
    // Sol taraftaki videoyu gizle
    mainVideo.style.display = 'none';
    
    // Kameraya erişim izni alınıyor
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        // Kullanıcının kamera görüntüsünü göster
        if ('srcObject' in userVideo) {
            userVideo.srcObject = stream;
        } else {
            userVideo.src = window.URL.createObjectURL(stream);
        }
        userVideo.onloadedmetadata = function(e) {
            userVideo.play();
        };
    })
    .catch(function(err) {
        console.error('Kamera erişimi hatası: ', err);
    });
});