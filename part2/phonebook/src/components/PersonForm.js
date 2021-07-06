import React from 'react'

const PersonForm = ({handleSubmit, inputNameValue, inputNameChange, inputNumberValue, inputNumberChange, handleSubmitButton }) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input value={inputNameValue} onChange={inputNameChange} />< br/>
            number: <input value={inputNumberValue} type="tel" onChange={inputNumberChange} />
          </div>
          <div>
            <button type="submit" onClick={handleSubmitButton}>add</button>
          </div>
        </form>
      </div>
    )
  }

export default PersonForm