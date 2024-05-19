//노래추천 관련 함수 모음

const tracks = [
  {
    artist: "Kanye West",
    album: "The Life Of Pablo",
    track: "No More Parties in L.A.",
    source:
      "https://upload.wikimedia.org/wikipedia/en/4/4d/The_life_of_pablo_alternate.jpg",
  },
  {
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    track: "Runaway",
    source:
      "https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Kanye West",
    album: "The Life Of Pablo",
    track: "Waves",
    source:
      "https://upload.wikimedia.org/wikipedia/en/4/4d/The_life_of_pablo_alternate.jpg",
  },
  {
    artist: "Kanye West",
    album: "The Life Of Pablo",
    track: "Saint Pablo",
    source:
      "https://upload.wikimedia.org/wikipedia/en/4/4d/The_life_of_pablo_alternate.jpg",
  },
  {
    artist: "Kanye West",
    album: "Yeezus",
    track: "Black Skinhead",
    source:
      "https://upload.wikimedia.org/wikipedia/en/0/03/Yeezus_album_cover.png",
  },
  {
    artist: "Kanye West",
    album: "Donda",
    track: "Off The Grid",
    source:
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Almost_black_square_020305.png",
  },
];

const cover = document.querySelector("#songInfo img");
const artist = document.querySelector("#artist");
const album = document.querySelector("#album");
const track = document.querySelector("#track");

function setTrack() {
  let number = Math.floor(Math.random() * tracks.length);
  cover.src = tracks[number].source;
  artist.innerText = `Artist: ${tracks[number].artist}`;
  album.innerText = `Album: ${tracks[number].album}`;
  track.innerText = `Track: ${tracks[number].track}`;
}

document.addEventListener("DOMContentLoaded", setTrack);
