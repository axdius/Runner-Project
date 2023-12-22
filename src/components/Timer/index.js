import React, { useState, useEffect } from 'react';
import './index.css';

const Timer = ({ initialDuration, runnerDetails, setIsRaceStarted}) => {
  const [timer, setTimer] = useState(initialDuration);
  const [showPopup, setShowPopup] = useState(false);
  const [newRunnerDetails, setNewRunnerDetails] = useState(runnerDetails)

  const trackLength = 400 // in meters 

  const onClickRestartRace = () => {
    setTimer(initialDuration);
    setShowPopup(false);
    // You may want to reset any other relevant state or data here
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setShowPopup(true);
    }, initialDuration * 1000);

    const sortedRunner = [...newRunnerDetails].sort((a, b) => b.speed - a.speed);
    
    // Update the state with the sorted array
    setNewRunnerDetails(sortedRunner);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [initialDuration]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <p className='paragraph'>{formatTime(timer)}</p>
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <h1 className="heading2">SCORE BOARD</h1>
            <div className='title-container'>
                <p>Position</p>
                <p>Name</p>
                <p>Speed</p>
                <p>Start Time</p>
                <p>Time to Complete</p>
            </div>
            {newRunnerDetails.map((each, index) => {
              const timeToCompleteTrack = (trackLength / each.speed).toFixed(2)
                return (<div className='title-container runner'>
                    <p>{index + 1}</p>
                    <p>{each.name}</p>
                    <p>{each.speed}</p>
                    <p>{each.startTime}</p>
                    <p>{timeToCompleteTrack} sec</p>
                </div>)
            } )}
            <div className="button-container">
              <button type="button" className="back-button" onClick={() => (
                setIsRaceStarted(false)
              )}>
                Back to Home
              </button>
              <button type="button" className="restart-race" onClick={onClickRestartRace}>
                Restart Race
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Timer;
