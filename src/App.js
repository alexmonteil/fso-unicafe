import React from 'react';
import { useState } from "react";

// components
const Header = ({text}) => <h1>{text}</h1>;
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;
const StatisticsRow = ({text, data}) => <tr><td>{text}</td><td>{data}</td></tr>;
const StatisticsTable = ({good, neutral, bad, total, average, positivePercent}) => {

  if (total === 0) {
    return <p>No feedback given</p>;
  }
  
  return (
    <table>
      <StatisticsRow text="good:" data={good} />
      <StatisticsRow text="neutral:" data={neutral} />
      <StatisticsRow text="bad:" data={bad} />
      <StatisticsRow text="total:" data={total} />
      <StatisticsRow text="average:" data={average} />
      <StatisticsRow text="positive percentage:" data={positivePercent.toString() + "%"} />
    </table>
  );
};

const App = () => {

 // state
 const [good, setGood] = useState(0);
 const [neutral, setNeutral] = useState(0);
 const [bad, setBad] = useState(0);
 const [total, setTotal] = useState(0);
 const [average, setAverage] = useState(0.0);
 const [positivePercent, setPositivePercent] = useState(0.0);

  // helpers
  const calcAverage = (good, bad, total) => ((good * 1.0) - (bad * 1.0)) / total;
  const calcPositivePercent = (good, total) => (good / total) * 100;

 // event handlers
 const handleClickGeneric = rating => {
  if (rating === "good") {
    return () => {
      let newGood = good + 1;
      let newTotal = total + 1;
      setGood(newGood);
      setTotal(newTotal);
      setAverage(calcAverage(newGood, bad, newTotal));
      setPositivePercent(calcPositivePercent(newGood, newTotal));
    }
  }
  else if (rating === "neutral") {
    return () => {
      let newNeutral = neutral + 1;
      let newTotal = total + 1;
      setNeutral(newNeutral);
      setTotal(newTotal);
      setAverage(calcAverage(good, bad, newTotal));
      setPositivePercent(calcPositivePercent(good, newTotal));
    }
  }
  else if (rating === "bad") {
    return () => {
      let newBad = bad + 1;
      let newTotal = total + 1;
      setBad(newBad);
      setTotal(newTotal);
      setAverage(calcAverage(good, newBad, newTotal));
      setPositivePercent(calcPositivePercent(good, newTotal));
    }
  }
  else {
    throw new Error("Handle Click Exception: rating not supported");
  }
 };
 
 return (
  <div>
    <Header text="Give Feedback" />
    <div>
      <Button handleClick={handleClickGeneric("good")} text="good" />
      <Button handleClick={handleClickGeneric("neutral")} text="neutral" />
      <Button handleClick={handleClickGeneric("bad")} text="bad" />
    </div>
    <Header text="Statistics" />
    <StatisticsTable good={good} neutral={neutral} bad={bad} total={total} average={average} positivePercent={positivePercent} />
  </div>
 );
};

export default App;
