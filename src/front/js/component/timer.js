import React, { useState, useRef } from "react";

const Time = () => {
	const [timer, setTimer] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [pulse, setPulse] = useState("");
	const increment = useRef(null);

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(true);
		increment.current = setInterval(() => {
			setTimer(timer => timer + 1);
		}, 1000);
		setPulse("blob red");
	};

	const handlePause = () => {
		clearInterval(increment.current);
		setIsPaused(false);
		setPulse("");
	};

	const handleResume = () => {
		setIsPaused(true);
		increment.current = setInterval(() => {
			setTimer(timer => timer + 1);
		}, 1000);
		setPulse("");
	};

	const handleReset = () => {
		clearInterval(increment.current);
		setIsActive(false);
		setIsPaused(false);
		setTimer(0);
	};

	const formatTime = () => {
		const getSeconds = `0${timer % 60}`.slice(-2);
		const minutes = `${Math.floor(timer / 60)}`;
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

		return `${getHours} : ${getMinutes} : ${getSeconds}`;
	};

	return (
		<div>
			<div className="stopwatch-card">
				<p>{formatTime()}</p>
			</div>
			<div className="buttons">
				{!isActive && !isPaused ? (
					<button onClick={handleStart}>Start</button>
				) : isPaused ? (
					<button onClick={handlePause}>Pause</button>
				) : (
					<button onClick={handleResume}>Resume</button>
				)}
				<button onClick={handleReset} disabled={!isActive}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Time;
