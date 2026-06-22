// Tracks array - add more songs here
const tracks = [
    {
        title: "Ride",
        artist: "The Marías — Submarine",
        src: "playlist/Ride - The Marías.mp3",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Hamptons",
        artist: "The Marías - Submarine",
        src: "playlist/Hamptons - The Marías.mp3",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Echo",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Run Your Mouth",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Real Life",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Blur",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Paranoia",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Lejos de Ti",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Love You Anyway",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Ay no Puedo",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "No One Noticed",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Vicious Sensitive Robot",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "If Only",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    },
    {
        title: "Sienna",
        artist: "The Marías - Submarine",
        src: "",
        art: "photo/ab67616d0000b2738aa339341a0b0c813909c831.jpeg"
    }

    // Add more tracks in this format:
    // { title: "Song Title", artist: "Artist Name", src: "playlist/Song Title - Artist.mp3", art: "photo/image.jpg" }
];

let currentTrackIndex = 0;
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");
let songImage = document.getElementById("song-image");
let playlistContainer = document.getElementById("playlist-container");
let playlistElement = document.getElementById("playlist");
let closePlaylistBtn = document.getElementById("closePlaylist");
let playlistToggle = document.getElementById("playlistToggle");
let prevTrackBtn = document.getElementById("prevTrackBtn");
let nextTrackBtn = document.getElementById("nextTrackBtn");

// Load a specific track
function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[index];
    
    song.src = track.src;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    songImage.src = track.art;
    
    // Update playlist highlight
    document.querySelectorAll(".playlist-item").forEach(item => item.classList.remove("active"));
    if (document.querySelectorAll(".playlist-item")[index]) {
        document.querySelectorAll(".playlist-item")[index].classList.add("active");
    }
}

// Navigate to next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

// Navigate to previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

// Render playlist UI
function renderPlaylist() {
    playlistElement.innerHTML = "";
    tracks.forEach((track, index) => {
        const item = document.createElement("div");
        item.className = "playlist-item" + (index === currentTrackIndex ? " active" : "");
        item.innerHTML = `<span>${track.title}</span><span class="artist">${track.artist}</span>`;
        item.onclick = () => {
            loadTrack(index);
            song.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
        };
        playlistElement.appendChild(item);
    });
}

// Toggle playlist visibility
playlistToggle.addEventListener("click", () => {
    playlistContainer.classList.toggle("playlist-hidden");
});

closePlaylistBtn.addEventListener("click", () => {
    playlistContainer.classList.add("playlist-hidden");
});

// Track navigation buttons
prevTrackBtn.addEventListener("click", prevTrack);
nextTrackBtn.addEventListener("click", nextTrack);

// Audio element event listeners
song.onloadedmetadata = function(){
    progress.max = song.duration; 
    progress.value = song.currentTime;
}

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else{
        song.play();
         ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
    },500);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
}

// Initialize
loadTrack(0);
renderPlaylist();