import React from 'react'

const Notification = ({ message, types }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={types}>
        {message}
      </div>
    )
  }

  export default Notification