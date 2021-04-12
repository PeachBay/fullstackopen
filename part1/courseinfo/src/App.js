import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.data1.name} ex={props.data1.exercises} />
      <Part name={props.data2.name} ex={props.data2.exercises} />
      <Part name={props.data3.name} ex={props.data3.exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.ex}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exo}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content 
        data1={part1}
        data2={part2}
        data3={part3}
      />
      <Total exo={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

export default App