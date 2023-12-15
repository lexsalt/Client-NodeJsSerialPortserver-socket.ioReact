// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import './App.css';
let a = 10
let b = 10
let c = 10
let gameOver = false


export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [counterA, setCounterA] = useState(10);
  const [counterB, setCounterB] = useState(10);
  const [counterC, setCounterC] = useState(10);
  if (a >= 20 && b >= 20 && c >= 20) {
    gameOver = true
  }
  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 1000);
    return () => clearInterval(interval);
  }, [counterA, counterB, counterC, gameOver]);

  function processData(data) {
    if (data.indexOf('a') === 0) {
      if (a < 20) {
        a++
        setCounterA(counterA => counterA + 1)
      }
    } else if (data.indexOf('b') === 0) {
      if (b < 20) {
        b++
        setCounterB(counterB => counterB + 1)
      }      
    } else if (data.indexOf('c') === 0) {
      if (c < 20) {
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

  return (
    <div className="App">
      <div className='third' style={{background: `#${counterA}${counterA}${counterA}`}}>
        <p>{`A: ${counterA}`}</p></div>
        <div className='third' style={{background: `#${counterB}${counterB}${counterB}`}}>
        <p>{`B: ${counterB}`}</p></div>
        <div className='third' style={{background: `#${counterC}${counterC}${counterC}`}}>
        <p>{`C: ${counterC}`}</p></div>
    </div>
  );
}