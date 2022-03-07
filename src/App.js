import './App.css';
import React, {useState} from 'react'

import silence from './notes/silence.mp3';
import C2 from './notes/C2.mp3';
import E2 from './notes/E2.mp3';
import G2 from './notes/G2.mp3';
import B2 from './notes/B2.mp3';
import C5 from './notes/C5.mp3';


function App() {

  const [brightenGreen, setBrightenGreen] = useState(false)
  const [brightenRed, setBrightenRed] = useState(false)
  const [brightenYellow, setBrightenYellow] = useState(false)
  const [brightenBlue, setBrightenBlue] = useState(false)
  const [sequence, setSequence] = useState([])
  const [round, setRound] = useState(0)
  const [attempt, setAttempt] = useState([])
  const [clicks, setClicks] = useState(1)
  
  localStorage.getItem("rounds");

  function Start() {
    for (let i = 0; i < 100; i++) {
      var integer = Math.floor((Math.random() * 4) + 1)
      sequence.push(integer)
    }
    setSequence(sequence)
    //console.log('sequence:', sequence)
    setTimeout(TurnOn, 500, sequence[0]);
    setTimeout(TurnOff, 750, sequence[0]);
    setRound(round + 1)
  }

  function getHighScore() {
    if (localStorage.getItem("rounds") === null) {
      return '0'
    } else {
      return localStorage.getItem("rounds")
    }
  }

  function Attempt(quadrant) {
    setClicks(clicks + 1)
    //console.log('one click -------------------------')
    //console.log('sequence:', sequence)
    //console.log('quadrant in Attempt:', quadrant)
    TurnOn(quadrant)
    setTimeout(TurnOff, 250, quadrant);
    attempt.push(quadrant)
    setAttempt(attempt)
    // console.log('round in Attempt:', round)
    // console.log('attempt in Attempt:', attempt)
    // console.log('sequence.slice(0, round) in Attempt:', sequence.slice(0, round))
    // console.log('clicks in Attempt:', clicks)
    if (clicks >= round) {
      setTimeout(Enter, 1000)
    }

    for (let i = 0; i < attempt.length; i++) {
      if (attempt[i] === sequence.slice(0, round)[i]) {
        //console.log('so far, so good')
      } else {
        //console.log('mismatch: failure')
        let color = 1
        for (let i = 0; i < 8; i++) {
          //console.log('i, color:', i, color)
          setTimeout(TurnOn, 1000 + 500 * i, color);
          setTimeout(TurnOff, 1200 + 500 * i, color);
          color++
          if (color === 5) {
            color = 1
          }
        }
        setTimeout(TurnOn, 5000, 1);
        setTimeout(TurnOff, 5200, 1);
        
        setTimeout(Reset, 5000)
        setSequence([])
        //setRound(0)
        setAttempt([])
        setClicks(1)
      }
    };
  }

  function Reset() {
    //setSequence([])
    setRound(0)
    //setAttempt([])
    //setClicks(1)
  }

  function Enter() {
    // console.log('enter ------------------------')
    // console.log('sequence:', sequence)
    // console.log('attempt in Enter:', attempt)
    // console.log('attempt.slice(0, round) in Enter:', attempt.slice(0, round))
    // console.log('sequence.slice(0, round) in Enter:', sequence.slice(0, round))
    let count = 0
    for (let i = 0; i < attempt.length; i++) {
      count++
      //console.log('count, attempt.length:', count, attempt.length)
      if (attempt[i] === sequence.slice(0, round)[i]) {
        if (count === attempt.length) {
          setRound(round + 1)
          Round()
          if (round > localStorage.getItem("rounds")) {
            localStorage.setItem("rounds", round)
          }
          //console.log('the attempt matches the sequence: success')
        } else if (count === attempt.length) {
          setSequence([])
          setRound(0)
          setAttempt([])
          setClicks(1)
          //return console.log('the attempt does not match the sequence: failure')
        }
      }
    }
    setAttempt([])
    setClicks(1)
  }

  function Round() {
          
    //console.log('round in Round:', round)
    for (let i = 1; i <= round + 1; i++) {
      //console.log('i, round + 1:', i, round + 1)
      setTimeout(TurnOn, 1000 * i - 700, sequence[i - 1]);
      setTimeout(TurnOff, 1000 * i - 200, sequence[i - 1]);
    }
  }
  
  function TurnOn(quadrant) {
    if (quadrant === 1) {
      setBrightenGreen(true)
    }
    if (quadrant === 2) {
      setBrightenRed(true)
    }
    if (quadrant === 4) {
      setBrightenYellow(true)
    }
    if (quadrant === 3) {
      setBrightenBlue(true)
    }
  }

  function TurnOff(quadrant) {
    if (quadrant === 1) {
      setBrightenGreen(false)
    }
    if (quadrant === 2) {
      setBrightenRed(false)
    }
    if (quadrant === 4) {
      setBrightenYellow(false)
    }
    if (quadrant === 3) {
      setBrightenBlue(false)
    }
  }

  function launch() {
    var AudioPlay = new Audio (silence);
    AudioPlay.play();
  }
  function turnOnC5() {
    var AudioPlay = new Audio (C5);
    AudioPlay.play();
  }
  function turnOnE() {
    let AudioPlay = new Audio (C2);
    AudioPlay.play();
  }
  function turnOnAb() {
    let AudioPlay = new Audio (E2);
    AudioPlay.play();
  }
  function turnOnB() {
    let AudioPlay = new Audio (G2);
    AudioPlay.play();
  }
  function turnOnEb() {
    let AudioPlay = new Audio (B2);
    AudioPlay.play();
  }

  return (
    <div className="App">
      
      {brightenGreen && turnOnE()}
      {brightenRed && turnOnAb()}
      {brightenBlue && turnOnB()}
      {brightenYellow && turnOnEb()}

      <div className="highScore">High Score: {getHighScore()}</div>
      <div className="press" onClick={Start}>{round === 0 ? <div className="launch" onClick={launch}>Press</div> : round}</div>
      <div className="circleContainer">
      <div className="circle">
        <div className="container">
          <div className={brightenGreen ? 'greenQuadrant' : 'greenQuadrantDark'} onClick={() => Attempt(1)} id="green"></div>
          <div className={brightenRed ? 'redQuadrant' : 'redQuadrantDark'} onClick={() => Attempt(2)} id="red"></div>
        </div>
        <div className="container">
          <div className={brightenYellow ? 'yellowQuadrant' : 'yellowQuadrantDark'} onClick={() => Attempt(4)} id="yellow"></div>
          <div className={brightenBlue ? 'blueQuadrant' : 'blueQuadrantDark'} onClick={() => Attempt(3)} id="blue"></div>
        </div>
      </div>
      </div>
    </div>
  );

}

export default App;
