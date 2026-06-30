// Tracks array - add more songs here
const tracks = [
    {
        title: "Just a Feeling",
        artist: "The Marías — CINEMA",
        src: "playlist/Just a Feeling.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Calling U Back",
        artist: "The Marías - CINEMA",
        src: "playlist/Calling U Back.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Hush",
        artist: "The Marías - CINEMA",
        src: "playlist/Hush.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "All I Really Want Is You",
        artist: "The Marías - CINEMA",
        src: "playlist/All I Really Want Is You.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Hable con Ella",
        artist: "The Marías - CINEMA",
        src: "playlist/Hable con Ella.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Little by Little",
        artist: "The Marías - CINEMA",
        src: "playlist/Little by Little.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Heavy",
        artist: "The Marías - CINEMA",
        src: "playlist/Paranoiaa.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Lejos de Ti",
        artist: "The Marías - CINEMA",
        src: "playlist/Lejos de ti.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Love You Anyway",
        artist: "The Marías - CINEMA",
        src: "playlist/Love you anyway.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Heavy",
        artist: "The Marías - CINEMA",
        src: "playlist/Heavy.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Un Millión",
        artist: "The Marías - CINEMA",
        src: "playlist/Un Millón.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Spin Me Around",
        artist: "The Marías - CINEMA",
        src: "playlist/Spin Me Around.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "The Mice Inside This Room",
        artist: "The Marías - CINEMA",
        src: "playlist/The Mice Inside This Room.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "To Say Hello",
        artist: "The Marías - CINEMA",
        src: "playlist/To Say Hello.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Fog as a Bullet",
        artist: "The Marías - CINEMA",
        src: "playlist/Fog as a Bullet.mp3",
        art: "photo/CINEMA.jpeg"
    },
    {
        title: "Talk to Her",
        artist: "The Marías - CINEMA",
        src: "playlist/Talk to Her.mp3",
        art: "photo/CINEMA.jpeg"
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
    song.load();
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
song.addEventListener("loadedmetadata", () => {
    progress.max = song.duration;
    progress.value = song.currentTime;
});

song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
});

song.addEventListener("error", () => {
    console.error("Audio error loading track:", song.src, song.error);
});

song.addEventListener("play", () => {
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
});

song.addEventListener("pause", () => {
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
});

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
    }
    else{
        song.play();
    }
}

progress.addEventListener("input", () => {
    song.currentTime = progress.value;
});

// Initialize
loadTrack(0);
renderPlaylist();