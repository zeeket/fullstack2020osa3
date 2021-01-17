import React from 'react'

const Filter = (props) => {

  return (
    <div>
    filter shown with 
    <input value={props.nameFilter} onChange={props.handleNameFilterChange}/>
    </div>
  )
}

export default Filter
