console.log("Welcome to Spotify");
 
var songIndex = 0;
var audioElement = new Audio("songs/1.mp3");
var masterPlay = document.getElementById('masterPlay');
var myProgressBar = document.getElementById('myProgressBar');
var gif = document.getElementById('gif');
var masterSongName = document.getElementById('masterSongName');


var songItems = Array.from(document.getElementsByClassName('songItem'));

var songs = [
    {songName: "Let me Love You", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Perfect", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Stay", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Love me like you do", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "I Don't Care", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Shape of You", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sorry", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Shape of You", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},

]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})



// audioElement.play();

//Handle play/pause click

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }

    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;

    }

})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');

    //update seek bar
    progress  = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    })
})


document.getElementById("next").addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0;

    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})


document.getElementById("previous").addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;

    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})