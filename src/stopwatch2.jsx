import { useState, useRef, useEffect } from 'react';
import logo from '/src/assets/logo.png';

export default function Stopwatch() {
  const [time, setTime] = useState(10 * 1000); 
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  const startPauseTimer = () => {
    if (!running) {
      setTime(0); 
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); 
      }, 10);
    } else {
      clearInterval(timerRef.current);
      setRunning(false);

      if (time < 10000) {
        setMessage('Annulé');
      } else if (time == 10000 ) {
        setMessage('livré 🎉🎉');
      } else {
        setMessage('Refusé');
      }
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(10 * 1000); 
    setRunning(false);
    setMessage('');
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10); 
    const seconds = Math.floor(time / 1000) % 60; 
    const minutes = Math.floor(time / 60000); 
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`; 
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); 
        startPauseTimer(); 
      }
      if (event.key.toLowerCase() === 'r') {
        resetTimer(); 
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [running, time]);

  return (
    <div className="flex flex-col justify-between min-h-screen" style={{ backgroundColor: '#474f93' }}>
      <div className="flex flex-col items-center pt-10">
        <img src={logo} className='mb-4 h-[300px] w-[300px]' alt="Logo" />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className='text-center text-9xl mb-16 text-white font-extrabold bg-[#474f93]'>
          T9ed t <span className='text-green-500'>Livriha</span> fl we9t?
        </h1>

        <div className="text-[250px] font-bold text-white mb-10 py-8 mx-10 px-8 rounded-lg shadow-lg" style={{ backgroundColor: '#6f78b8' }}>
          {formatTime(time)}
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={startPauseTimer}
            className={`w-56 h-56 mb-6 rounded-full text-2xl text-white font-semibold ${running ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-[#b4ca51] hover:bg-green-600'} focus:outline-none flex items-center justify-center`}
          >
            {running ? 'Pause' : 'Start'}
          </button>

          <button
            onClick={resetTimer}
            className="btn btn-wide bg-red-500 hover:bg-red-600 rounded-lg text-white text-xl border-none font-semibold focus:outline-none"
          >
            Reset
          </button>
        </div>

        {message && (
          <div className={`text-[150px] mt-2 text-center font-bold text-white transition-opacity ${message ? 'opacity-100' : 'opacity-0'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="flex justify-center items-end pb-4">
      </div>
    </div>
  );
}
