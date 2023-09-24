const container = document.getElementById('container'); 
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;
const songs = ['songs/Bassline Junkie.mp3', 'songs/Bonkers.mp3', 'songs/Freed From Desire.mp3', 'songs/God\'s Plan.mp3', 'songs/Gold Digger.mp3', 'songs/Just Wanna Rock.mp3', 'songs/Macklemore & Ryan Lewis - Can\'t Hold Us (Lyrics) ft. Ray Dalton.mp3', 'songs/Simmer (feat. Burna Boy).mp3', 'songs/Yeah 3x.mp3']

audio1.addEventListener('ended', function () {
    audio1.currentTime = 0;
    audio1.src = songs[Math.floor(Math.random() * songs.length)];
    audio1.play();
});

container.addEventListener('click', function () {
    const audioCtx = new AudioContext();
    const audio1 = document.getElementById('audio1');
    audio1.src = songs[Math.floor(Math.random() * songs.length)];
    audio1.load();
    audio1.play();
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = (canvas.width/2) / bufferLength;
    let barHeight;
    let x;

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }

    animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;
        const red = (i*4);
        const green = barHeight**(11/12);
        const blue = (255-(i/4));
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(canvas.width/2-x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;
        const red = (i*4);
        const green = barHeight**(11/12);
        const blue = (255-(i/4));
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}