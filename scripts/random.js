const startButton = document.getElementById('startButton');
        const videoPlayer = document.getElementById('videoPlayer');
        
        // Rastgele video listesi
        const videos = [
            'user/user_1.mp4',
            'user/user_2.mp4',
            'user/user_3.mp4',
            'user/user_4.mp4',
            'user/user_5.mp4'
            // buraya istediğiniz kadar video ekleyebilirsiniz
        ];

        // Başla butonuna tıklandığında veya video bitince
        function playRandomVideo() {
            // Rastgele bir video seç
            const randomIndex = Math.floor(Math.random() * videos.length);
            const randomVideo = videos[randomIndex];
            
            // Seçilen videoyu göster
            videoPlayer.src = randomVideo;
            videoPlayer.play();
        }

        // Başla butonuna tıklandığında
        startButton.addEventListener('click', playRandomVideo);

        // Video bittiğinde
        videoPlayer.addEventListener('ended', playRandomVideo);
        
        // Sayfa yüklendiğinde ilk videoyu oynat
        window.addEventListener('load', playRandomVideo);