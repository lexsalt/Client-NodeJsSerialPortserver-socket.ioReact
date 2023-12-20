// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import './App.css';
import A from "./img/A.jpg";
import B from "./img/B.jpg";
import C from "./img/C.jpg";
import D from "./img/D.jpg";
import E from "./img/E.jpg";
import F from "./img/F.jpg";
import G from "./img/G.jpg";
import H from "./img/H.jpg";
import I from "./img/I.jpg";
import J from "./img/J.jpg";
import K from "./img/K.jpg";
import L from "./img/L.jpg";
import M from "./img/M.jpg";
import N from "./img/N.jpg";
import O from "./img/O.jpg";
import P from "./img/P.jpg";
import Q from "./img/Q.jpg";
import R from "./img/R.jpg";
import S from "./img/S.jpg";
import T from "./img/T.jpg";
import U from "./img/U.jpg";
import V from "./img/V.jpg";
import W from "./img/W.jpg";
import X from "./img/X.jpg";
import Y from "./img/y.jpeg";
import Z from "./img/z.jpeg";
import fireHighSound from "./audio/fire-high.mp3";
import fireLowSound from "./audio/fire-low.mp3";
let a = 10
let b = 10
let c = 10
let gameOver = false
const fireHigh = new Audio(fireHighSound)
const fireLow = new Audio(fireHighSound)
let imgArray = [A,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z];

function soundTrack (one, two, three) {
  // console.log(one)
  // console.log(two)
  // console.log(three)
  console.log((one+two+three)/3)
  if (((one+two+three)/3) > 15) {
    fireHigh.play()
  } else if (((one+two+three)/3) > 15) {
    fireHigh.pause()
  }
}
export default function Game() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [counterA, setCounterA] = useState(10);
  const [counterB, setCounterB] = useState(10);
  const [counterC, setCounterC] = useState(10);
  if (a >= 26 && b >= 26 && c >= 26) {
    gameOver = true
  }
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(imgArray.length)
      // console.log(`a: ${a}`)
      // console.log(`b: ${b}`)
      // console.log(`c: ${c}`)
      if (gameOver) {
        console.log("game over")
      } else if (!gameOver) {
        if (counterA > 1) {
          a--
          setCounterA(counterA => counterA - 1)
        }
        if (counterB > 1) {
          b--
          setCounterB(counterB => counterB - 1)
        }
        if (counterC > 1) {
          c--
          setCounterC(counterC => counterC - 1)
        }
      }
    }, 800);
    return () => clearInterval(interval);
  }, [counterA, counterB, counterC, gameOver]);

  function processData(data) {
    if (data.indexOf('a') === 0) {
      if (a < 26) {
        a++
        setCounterA(counterA => counterA + 1)
      }
    } else if (data.indexOf('b') === 0) {
      if (b < 26) {
        b++
        setCounterB(counterB => counterB + 1)
      }      
    } else if (data.indexOf('c') === 0) {
      if (c < 26) {
        c++
        setCounterC(counterC => counterC + 1)
      }
    }
  }


  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onData(value) {
      // console.log(typeof(value))
      processData(value)
      soundTrack(a,b,c)
      // setAge(a => a + 1);
    }
    socket.on('serialData', onData);
    socket.on('connection', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('serialData', onConnect);
      socket.off('connection', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  soundTrack(a,b,c)  
  return (
    <div className="App"> 
      <div className='third' style={{ backgroundImage: `url(${imgArray[a]})`,backgroundSize: "cover",
  backgroundRepeat: 'no-repeat' }}>
        <p>{`A: ${counterA}`}</p></div>
        <div className='third' style={{ backgroundImage: `url(${imgArray[b]})`,backgroundSize: "cover",
  backgroundRepeat: 'no-repeat' }}>
        <p>{`B: ${counterB}`}</p></div>
        <div className='third' style={{ backgroundImage: `url(${imgArray[c]})`,backgroundSize: "cover",
  backgroundRepeat: 'no-repeat' }}>
        <p>{`C: ${counterC}`}</p></div>
    </div>
  );
}