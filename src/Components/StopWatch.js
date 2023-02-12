import React, { useRef } from "react";
import { useReducer, useEffect, useMemo } from "react";
import "./StopWatch.css";

const initialState = {
  minute: 0,
  second: 0,
  miliS: 0,
  lap: [],
  id: 0,
  value: false,
};
function reducerfn(state, action) {
  if (action.type === "START") {
    console.log(state.miliS);

    return { ...state, value: true };
  }
  if (action.type === "LAP") {
    let newArray = [...state.lap];
    newArray.push({
      miliS: state.miliS,
      second: state.second,
      minute: state.minute,
    });
    console.log(newArray);
    return { ...state, lap: newArray };
  }
  if (action.type === "TICK") {
    return { ...state, miliS: state.miliS + 10 };
  }

  if (action.type === "RESET") {
    return { lap: [], miliS: 0, second: 0, minute: 0, value: false };
  }
  if (action.type === "INCRESESECOND") {
    return { ...state, miliS: 0, second: state.second + 1 };
  }
  if (action.type === "INCRESEMINUTE") {
    return { ...state, miliS: 0, second: 0, minute: state.minute + 1 };
  }
  if (action.type === "CLEAR") {
    return { ...state, lap: [] };
  }

  return state;
}

function StopWatch() {
  const [countDown, dispatch] = useReducer(reducerfn, initialState);
  let timerRef = useRef(0);
  useEffect(() => {
    if (!countDown.value) {
      console.log("kkj");
      return;
    }
    // console.log(countDown.time);

    timerRef.current = setInterval(() => {
      return dispatch({ type: "TICK" }); //timerRefwill 1
    }, 10);
    return () => {
      clearInterval(timerRef.current); //timerRef will 0
      timerRef.current = 0;
    };
  }, [countDown.value]);

  if (countDown.miliS >= 1000) {
    return dispatch({ type: "INCRESESECOND" });
  }
  if (countDown.second >= 60) {
    return dispatch({ type: "INCRESEMINUTE" });
  }

  function handleStart() {
    dispatch({ type: "START" });
  }
  function handleStop() {
    dispatch({ type: "LAP" });
  }
  function handleReset() {
    dispatch({ type: "RESET" });
  }
  function handleTick() {
    dispatch({ type: "TICK" });
  }
  function handleClear() {
    dispatch({ type: "CLEAR" });
  }

  return (
    <>
      <div className="container">
        <div className="watch">
          <div
            className=" outer-circle animation-bg"
            // style={{ background: colorValue.current }}
          >
            <div className="inner-circle">
              <span id="text-min">
                {countDown.minute}
                <span>:</span>
              </span>
              <span id="text-sec">
                {countDown.second}
                <span>:</span>
              </span>
              <span id="text-msec">{countDown.miliS}</span>
            </div>
          </div>
          <div className="btn-wrapper">
            <button
              className={countDown.value ? "#" : "btn-reset-hidden"}
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="btn-play"
              onClick={() => {
                if (countDown.value == false) {
                  handleStart();
                } else {
                  handleReset();
                }
              }}
            >
              {countDown.value ? "Stop" : "Play"}
            </button>
            <button
              className={countDown.value ? "#" : "btn-lap-hidden"}
              onClick={handleStop}
            >
              Lap
            </button>
          </div>
        </div>
        <div className="laps-wrapper">
          {" "}
          <ul className="laps">
            {countDown.lap.map((val, index) => {
              console.log(val);
              let item = (
                <li>
                  <span> #{index + 1}</span>{" "}
                  <span class="text min">
                    {val.minute}:{val.second}:{val.miliS}
                  </span>
                </li>
              );
              console.log(item);
              return item;
            })}
          </ul>
        </div>
        {/* <!-- li lap --> */}
        <div
          id={countDown.lap.length !== 0 ? "#" : "btn-clear-hidden"}
          className="btn-wrapper"
        >
          {" "}
          <button onClick={handleClear} className="">
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default StopWatch;
