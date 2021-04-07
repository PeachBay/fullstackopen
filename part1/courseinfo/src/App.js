import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.part1} exo={props.exercises1} />
      <Part name={props.part2} exo={props.exercises2} />
      <Part name={props.part3} exo={props.exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exo}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exo}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
      />
      <Total exo={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App