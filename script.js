const songs = [
  { title: "Song One", artist: "Artist A", src: "songs/song1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "songs/song2.mp3" },
  { title: "Song Three", artist: "Artist C", src: "songs/song3.mp3" }
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

// Load song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

// Play song
function playSong() {
  audio.play();
}

// Pause song
function pauseSong() {
  audio.pause();
}

// Next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  let mins = Math.floor(audio.duration / 60) || 0;
  let secs = Math.floor(audio.duration % 60) || 0;
  duration.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    playSong();
  });
  playlist.appendChild(li);
});

// Autoplay next
audio.addEventListener("ended", nextSong);

// Event listeners
playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Initialize
loadSong(currentSongIndex);
                                      
