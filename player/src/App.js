import {Component, createRef} from 'react';
import './App.css';
import senatra_jingle from "./music/Frank Sinatra - Jingle Bells.mp3";
import senatra_snow from "./music/Frank Sinatra - Let It Snow.mp3";
import senatra_stran from "./music/Frank Sinatra - Strangers In The Night.mp3";

class App extends Component {
  state = {songs: [senatra_jingle, senatra_snow, senatra_stran],
    titles: ["Frank Sinatra - Jingle Bells", "Frank Sinatra - Let It Snow",
    "Frank Sinatra - Strangers In The Night"]};    
    audio = createRef();
    play = () => {
      this.audio.volume=0.2;
      this.audio.play();
    };
    pause = () => {
      this.audio.pause();;
    };
    volumeDown = () => {
      this.audio.volume -=0.1
    };
    volumeUp = () => {
      this.audio.volume +=0.1
    };
    next = () => {
      let a;
      let b;
      let song = this.state.songs;
      let title = this.state.titles;
      for (let i = 0; i < song.length; i++) {  
        a = song[(i++)%song.length]
      }
      for (let j = 0; j < title.length; j++) {    
        b = title[(j++)%title.length]
      }
      document.getElementById('audio').src = a;
      document.querySelector('.download').setAttribute("href", a);
      document.querySelector('.title').innerHTML = b;
      this.audio.play();
      
    };
    prev = () => {
      let a;
      let b;
      let song = this.state.songs;
      let title = this.state.titles;
      for (let i = 0; i < song.length; i++) {
        a = song[(song.length--)%song.length];
      }
      for (let j = 0; j < title.length; j++) {
        b = title[(title.length--)%title.length];
      }
      document.getElementById('audio').src = a;
      document.querySelector('.download').setAttribute("href", a);
      document.querySelector('.title').innerHTML = b;
      this.audio.play();
    };
    progress = (event) => {
      let progressBar = document.getElementById("progressBar"),
      duration = event.target.duration,
      currentTime = event.target.currentTime,
      progress = (100 / duration * currentTime);
      progressBar.style.width = progress + "%";
    };  
    
    song1 = () => {
      let song = document.getElementById('audio');
      song.src = senatra_jingle;
      song.play();
      document.querySelector('.title').innerHTML = this.state.titles[0];
      document.querySelector('.download').setAttribute("href", senatra_jingle);
    };
    song2 = () => {
      let song = document.getElementById('audio');
      song.src = senatra_snow;
      song.play();
      document.querySelector('.title').innerText = this.state.titles[1];
      document.querySelector('.download').setAttribute("href", senatra_snow);
    };
    song3 = () => {
      let song = document.getElementById('audio');
      song.src = senatra_stran;
      song.play();
      document.querySelector('.title').innerHTML = this.state.titles[2];
      document.querySelector('.download').setAttribute("href", senatra_stran);
    };
    
    render() {
      return (
        <div className="App">
        
        <p className="song" onClick={this.song1}>{this.state.titles[0]}</p>
        <p className="song" onClick={this.song2}>{this.state.titles[1]}</p>
        <p className="song" onClick={this.song3}>{this.state.titles[2]}</p>
        
        <div className="buttons">
        <p className="title">Frank Sinatra - Jingle Bells</p>
        <div className="progressBar" id="progressBar" value="0" max="1">
        </div>
        <div className="buttons_player">
        <button className="prev" onClick={this.prev}></button>
        <button className="play" onClick={this.play} ></button>
        <button className="pause" onClick={this.pause}></button> 
        <button className="next" onClick={this.next}></button>
        <a href={senatra_jingle} className="download" id="download" download>Download</a>
        <button className="volume" onClick={this.volumeUp}>+</button>
        <button className="volume" onClick={this.volumeDown}>-</button>
        </div>
        
        </div>
        <audio controls ref={audio => this.audio = audio} onTimeUpdate={this.progress} id="audio">
        <source src={this.state.songs[0]} />
        <source src={this.state.songs[1]} />
        <source src={this.state.songs[2]} />
        </audio>
        </div> 
        );
      }
    } 
    
    export default App;
    