import React from 'react'

function Weather({ weather }) {

  return (
    <>
      {
        weather && (
          <>
            <p className='iconBox'>
              <img 
                className="img-fluid" 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              />
            </p>
            <h3>{weather.name}</h3>
            <p>현재 온도 : {(weather.main.temp-273.15).toFixed(1)}°C</p>
            <p>날씨 : {weather.weather[0].description}</p>
          </>
        )
      }
    </>
  )
}

export default Weather