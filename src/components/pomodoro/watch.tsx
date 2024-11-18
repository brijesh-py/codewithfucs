import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { MdPause } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { playTone } from "../../utils/sound";
import { FaRegEyeSlash } from "react-icons/fa";

function Watch() {
  const defaultMinutes = 25;
  const [isHovered, setIsHovered] = useState(true);
  const [percentage, setPercentage] = useState({});
  const [isStarting, setIsStarting] = useState(true);
  const [showTimer, setShowTimer] = useState("00:00");
  let minutes = useRef<number>(defaultMinutes);
  let seconds = useRef<number>(0);
  let totalTime = useRef<number>(0);
  let intervalTimer = useRef<any>();
  let count = useRef<number>(0);
  let startTime = useRef<number>(minutes.current);

  function visibleTimer() {
    setShowTimer(
      `${minutes.current < 10 ? "0" : ""}${minutes.current}:${
        seconds.current < 10 ? "0" : ""
      }${seconds.current}`
    );
  }

  function initializeTimer() {
    count.current++;

    setPercentage(
      Number(
        (((60 / (totalTime.current / 100)) * count.current) / 60).toFixed(2)
      )
    );
    if (minutes.current === 0 && seconds.current === 0) {
      playTone({ frequency: 4040, duration: 3 });
      setIsStarting(true);
      clearInterval(intervalTimer.current);
      return;
    }

    if (seconds.current === 0) {
      seconds.current = 59;
      minutes.current--;
    } else {
      seconds.current--;
    }
    visibleTimer();

  }

  function timerWatchPal() {
    if (isStarting) {
      intervalTimer.current = setInterval(initializeTimer, 1000);
      setIsStarting(false);
    } else {
      setIsStarting(true);
      clearInterval(intervalTimer.current);
    }
  }

  function startHandler() {
    if (isStarting) {
      totalTime.current = minutes.current * 60 + seconds.current;
      if( minutes.current === 0 && seconds.current === 0) {
        controlTimer({ reset: true });
      }
      timerWatchPal();
    }
  }

  function controlTimer({
    decrease,
    increase,
    reset,
  }: {
    decrease?: boolean;
    increase?: boolean;
    reset?: boolean;
  }) {
    if (increase) {
      minutes.current++;
    }
    if (decrease) {
      minutes.current--;
    }
    if (reset) {
      minutes.current = defaultMinutes;
      setPercentage(0)
    }
    count.current = 0;
    seconds.current = 0;
    totalTime.current = minutes.current * 60 + seconds.current;
    startTime.current = minutes.current;
    visibleTimer();
  }

  function resetHandler() {
    controlTimer({ reset: true });
  }

  function pauseHandler() {
    if (!isStarting) {
      timerWatchPal();
    }
  }

  function increaseHandler() {
    if (minutes.current < 60) {
      controlTimer({ increase: true });
    }
  }

  function decreaseHandler() {
    if (minutes.current > 1) {
      controlTimer({ decrease: true });
    }
  }

  useEffect(() => {
    visibleTimer();
    return () => clearInterval(intervalTimer.current);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        <div
          className="shadow-xl watch w-80  h-80 rounded-full flex items-center justify-center bg-[#060516]"
          style={{
            backgroundImage: `conic-gradient(#4fcf74 0% ${percentage}%, #060516 ${percentage}% 100%)`,
          }}
        >
          <div className="z-20 w-72 h-72 flex rounded-full items-center justify-center bg-neutral">
            <div>
              <button
                className="btn btn-ghost btn-sm block mx-auto w-fit mb-4 text-2xl"
                onClick={() => setIsHovered(!isHovered)}
              >
                {isHovered ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
              </button>
              <div className="flex items-center justify-center gap-x-1">
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={decreaseHandler}
                >
                  <FaAnglesLeft />
                </button>
                {isHovered ? (
                  <h2 className="title text-8xl">{showTimer}</h2>
                ) : (
                  <h2 className="title text-8xl">
                    {startTime.current < 10
                      ? "0" + startTime.current
                      : startTime.current}
                    min
                  </h2>
                )}

                <button
                  className="btn btn-sm btn-ghost"
                  onClick={increaseHandler}
                >
                  <FaAnglesRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2 mt-4 mx-auto w-fit text-2xl">
          {isStarting ? (
            <button className="btn" onClick={startHandler}>
              <FaPlay />
            </button>
          ) : (
            <button className="btn" onClick={pauseHandler}>
              <MdPause />
            </button>
          )}
          <button className="btn" onClick={resetHandler}>
            <GrPowerReset />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Watch;
