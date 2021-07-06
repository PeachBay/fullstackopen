import React from 'react'

const Filter = ({text, value, handleChange}) => {
    return (
      <div>
        {text} <input value={value} onChange={handleChange} />
      </div>
    )
  }

export default Filter