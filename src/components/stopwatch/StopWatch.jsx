import React, { useState, useEffect } from 'react';
import "./stopwatch.css"

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      const now = Date.now();
      setStartTime(now - elapsedTime);
      interval = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, elapsedTime, startTime]);

  const startPauseHandler = () => {
    setIsRunning(!isRunning);
  };

  const stopHandler = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const milliseconds = pad(Math.floor((time / 10) % 100));
    const seconds = pad(Math.floor((time / 1000) % 60));
    const minutes = pad(Math.floor((time / (1000 * 60)) % 60));
    const hours = pad(Math.floor((time / (1000 * 60 * 60)) % 24));
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="display">{formatTime(elapsedTime)}</div>
      <div className="controls">
        <button onClick={startPauseHandler}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={stopHandler}>Stop</button>
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
