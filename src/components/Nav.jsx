import React from 'react'

function Nav({ open, setOpen, getCurrentLocation }) {

  return (
    <div className='header_wrap'>
      <nav id='nav'>
        <h1>Weather App</h1>
        <div className='btn-group'>
          <button
            className='btn_search' 
            onClick={
              () => { setOpen(!open) }
            }
          ><i className='ico_search'>검색</i></button>
          <button
            className='btn_location' 
            onClick={getCurrentLocation}
          ><i className='ico_location'>내 위치</i></button>
        </div>
      </nav>
    </div>
  )
}

export default Nav