import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
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
          <Statistic text="good" value ={good} />
          <Statistic text="neutral" value ={neutral} />
          <Statistic text="bad" value ={bad} />
          <Statistic text="all" value ={all} />
          <Statistic text="average" value ={average} />
          <Statistic text="positive" value ={positive+'%'} />
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