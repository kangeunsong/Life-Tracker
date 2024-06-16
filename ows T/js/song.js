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
  //노래 앨범 추가
  {
    artist: "Adele",
    album: "25",
    track: "Hello",
    source:
      "https://upload.wikimedia.org/wikipedia/en/8/85/Adele_-_Hello_%28Official_Single_Cover%29.png",
  },
  {
    artist: "Justin Bieber",
    album: "single",
    track: "Love Yourself",
    source:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/JustinBieberLoveYourself.png",
  },
  {
    artist: "Major Lazer",
    album: "single",
    track: "Believer",
    source:
      "https://upload.wikimedia.org/wikipedia/en/5/57/Major_Lazer_Showtek_Believer.jpg",
  },
  {
    artist: "One Direction",
    album: "Up All Night",
    track: "What Makes You Beautiful",
    source:
      "https://upload.wikimedia.org/wikipedia/en/9/96/One_direction_up_all_night_albumcover.jpg",
  },
  {
    artist: "One Direction",
    album: "Up All Night",
    track: "Gotta Be You",
    source: "https://upload.wikimedia.org/wikipedia/en/b/bc/GottaBeYou.jpg",
  },
  {
    artist: "One Direction",
    album: "Up All Night",
    track: "One Thing",
    source:
      "https://upload.wikimedia.org/wikipedia/en/a/ae/One_Direction_-_One_Thing_Cover.jpg",
  },
  {
    artist: "One Direction",
    album: "Up All Night",
    track: "More than This",
    source: "https://upload.wikimedia.org/wikipedia/en/4/4c/Morethanthis.jpg",
  },
  {
    artist: "One Direction",
    album: "Made in the A.M.",
    track: "Perfect",
    source:
      "https://upload.wikimedia.org/wikipedia/en/1/15/One_Direction_-_Perfect.png",
  },
  {
    artist: "Charlie Puth",
    album: "Voicenotes",
    track: "Attention",
    source:
      "https://upload.wikimedia.org/wikipedia/en/5/55/Charlie_Puth_Voicenotes.png",
  },
  {
    artist: "Charlie Puth",
    album: "Voicenotes",
    track: "Change",
    source:
      "https://upload.wikimedia.org/wikipedia/en/f/f0/Charlie_Puth_Voicenotes_%28alt%29.png",
  },
  {
    artist: "Charlie Puth",
    album: "Charlie",
    track: "Light Switch",
    source:
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Charlie_Puth_-_Charlie.png",
  },
  {
    artist: "Charlie Puth",
    album: "Charlie",
    track: "That's Hilarious",
    source:
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Charlie_Puth_-_Charlie.png",
  },
  {
    artist: "Charlie Puth",
    album: "Charlie",
    track: "Left and Right",
    source:
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Charlie_Puth_-_Charlie.png",
  },
  {
    artist: "Charlie Puth",
    album: "Charlie",
    track: "I Don't Think That I Like Her",
    source:
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Charlie_Puth_-_Charlie.png",
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
