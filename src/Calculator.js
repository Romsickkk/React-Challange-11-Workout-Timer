import { useCallback, useEffect, useMemo, useState } from "react";
import clickSound from "./ClickSound.m4a";
import Label from "./Label";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const [duration, setDuration] = useState(0);

  // const playSound = useMemo(() => {
  //   return function () {
  //     if (!allowSound) return;
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   };
  // }, [allowSound]);

  useEffect(() => {
    setDuration(
      Math.round((number * sets * speed) / 60 + (sets - 1) * durationBreak)
    );
  }, [number, sets, speed, durationBreak]);

  useEffect(() => {
    const playSound = function () {
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    };
    playSound();
  }, [duration]);

  useEffect(() => {
    document.title = `Your ${number}-exercise workout`;
  }, [number]);

  // const duration =
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleInc() {
    setDuration((duration) => duration + 1);
  }
  function handleDec() {
    if (duration <= 1) return;
    setDuration((duration) => duration - 1);
  }

  const handleSetsChange = useCallback((e) => setSets(e.target.value), []);
  const handleSpeedChange = useCallback((e) => setSpeed(e.target.value), []);
  const handleBreakChange = useCallback(
    (e) => setDurationBreak(e.target.value),
    []
  );

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>

        <Label
          type="range"
          labelName="How many sets?"
          min={1}
          max={5}
          value={sets}
          onChange={handleSetsChange}
        />

        <Label
          type="range"
          labelName="How fast are you?"
          min={30}
          max={180}
          step={30}
          value={speed}
          onChange={handleSpeedChange}
        />

        <Label
          type="range"
          labelName="Break length"
          min={1}
          max={10}
          value={durationBreak}
          onChange={handleBreakChange}
        />
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default Calculator;
