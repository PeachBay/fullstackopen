import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState( [...anecdotes].fill(0) )

  const setAnecdotes = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomInt)
  }

  const incrementVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1

    setVotes(copyVotes)
  }

  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} <br />
      has {votes[selected]} vote(s)</p>
      <Button handleClick={incrementVote} text="vote" />
      <Button handleClick={setAnecdotes} text="next anecdotes" />
      <br />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedIndex]} <br />
      has {votes[mostVotedIndex]} vote(s)</p>
    </div>
  )
}

export default App