const container = document.getElementById('container'); 
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;
const songs = ['songs/24K Magic.opus', 'songs/Barking.opus', 'songs/Bassline Junkie.opus', 'songs/Best Life.opus', 'songs/Boasty (feat. Idris Elba) (Kingdom 93 Remix).opus', 'songs/Bodak Yellow.opus', 'songs/Bonkers.opus', 'songs/Can\'t Hold Us (feat. Ray Dalton).opus', 'songs/Cosby Sweater.opus', 'songs/Crazy In Love.opus', 'songs/Die Young.opus', 'songs/Don\'t Stop The Party.opus', 'songs/Freed From Desire.opus', 'songs/Friday (Dopamine Re-Edit).opus', 'songs/Full Thrift Samba (Samba _ 50 BPM).opus', 'songs/Funky Friday.opus', 'songs/Get Busy.opus', 'songs/God\'s Plan.opus', 'songs/Gold Digger.opus', 'songs/Gyal You a Party Animal.opus', 'songs/Hips Don\'T Lie.opus', 'songs/It’s My Birthday.opus', 'songs/Just Wanna Rock.opus', 'songs/Lean & Bop.opus', 'songs/Lemonade.opus', 'songs/Loyal.opus', 'songs/Nasty Freestyle (The Replay).opus', 'songs/No Type.opus', 'songs/No Words.opus', 'songs/ORANGE SODA.opus', 'songs/Rain.opus', 'songs/Ramenez la coupe à la maison.opus', 'songs/Rich Flex.opus', 'songs/Samba de Janeiro.opus', 'songs/SICKO MODE.opus', 'songs/Simmer (feat. Burna Boy).opus', 'songs/Single Ladies (Put a Ring on It).opus', 'songs/Sweet Dreams (Remix).opus', 'songs/Talk Dirty (feat. 2 Chainz).opus', 'songs/Temperature.opus', 'songs/The Box.opus', 'songs/Turn Down for What.opus', 'songs/Vamp Anthem.opus', 'songs/Whoopty.opus', 'songs/Worth It.opus', 'songs/Yeah 3x.opus']
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