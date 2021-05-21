import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
  
        <div>No feedback given</div>
      </div>
    )
  }
  return(
    <div>
      <h2>Statistics</h2>

      <table>
        <tbody>
          <Statistic text="good" value ={props.good} />
          <Statistic text="neutral" value ={props.neutral} />
          <Statistic text="bad" value ={props.bad} />
          <Statistic text="all" value ={props.all} />
          <Statistic text="average" value ={props.average} />
          <Statistic text="positive" value ={props.positive+'%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all*100

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={addGood}
      text='good'
      />
      <Button handleClick={addNeutral}
      text='neutral'
      />
      <Button handleClick={addBad}
      text='bad'
      />

      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average.toPrecision(1)}
        positive={positive.toPrecision(3)}
      />

    </div>
  )
}

export default App