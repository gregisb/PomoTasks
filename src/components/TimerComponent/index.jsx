import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [minute, setMinute] = useState('25');
    const [second, setSecond] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState((25 * 60) -1);
    
    const [pomoClass, setPomoClass] = useState('active');
    const [shortClass, setShortClass] = useState('');
    const [longClass, setLongClass] = useState('');

    useEffect(() => {
        let intervalId;

        if(isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % -60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter(counter => counter - 1);
                
                if(secondCounter === 0 && minuteCounter === 0) {
                    stopTimer()
                }
                
            }, 1000)
        } 
        return () => clearInterval(intervalId);
        
    }, [isActive, counter]);

    function stopTimer() {
        setIsActive(false);
        setCounter((60 * 25) -1);
        setMinute('25')
        setSecond('00');
      }

      function pomodoroTime() {
        setPomoClass('active');
        setShortClass('');
        setLongClass('');
        setIsActive(false);
        setCounter((25 * 60) -1);
        setMinute('25')
        setSecond('00');
      };

      function shortBreak() {
        setShortClass('active');
        setLongClass('');
        setPomoClass('');
        setIsActive(false);
        setCounter((5 * 60) -1);
        setMinute('05')
        setSecond('00');
      };

      function longBreak() {
        setLongClass('active');
        setPomoClass('');
        setShortClass('');
        setIsActive(false);
        setCounter((15 * 60) -1);
        setMinute('15')
        setSecond('00');
      };




    return (
        <div className="timer-container">
            <div className='chosen-time'>
                <button className={`chosen-time-button ${pomoClass}`} onClick={pomodoroTime}>Pomodoro</button>
                <button className={`chosen-time-button ${shortClass}`} onClick={shortBreak}>Short Break</button>
                <button className={`chosen-time-button ${longClass}`} onClick={longBreak}>Long Break</button>
            </div>
            <div className="time">
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
            <div className="buttons">
                <button className="start" onClick={() => setIsActive(!isActive) }>{isActive ? 'Pause' : 'Start'}</button>
                {/* <button className="reset" onClick={stopTimer}>Reset</button> */}
            </div>
        </div>
    )
};

export default Timer;