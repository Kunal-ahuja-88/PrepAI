import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (time >= 3600) {
      setIsRunning(false);
    }
  }, [time]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Stopwatch</h1>
      <div className="flex justify-center">
        <div className="font-mono text-4xl">{formatTime(time)}</div>
      </div>
      <div className="flex justify-around gap-4">
        <Button onClick={startTimer} className="px-4 py-2 text-white bg-green-500 hover:bg-green-700 rounded">Start</Button>
        <Button onClick={stopTimer} className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded">Stop</Button>
        <Button onClick={resetTimer} className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded">Reset</Button>
      </div>
    </div>
  );
}
