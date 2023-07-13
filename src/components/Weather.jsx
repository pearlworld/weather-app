import React from 'react'

function Weather({ weather }) {

  return (
    <div>
      {
        weather && (
          <div className='weather_inner'>
            <p className='weather-icon'>
              <img 
                className="icon-img" 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              />
            </p>
            <h3 className='location'>{weather.name}</h3>
            <p className='temp'>{(weather.main.temp-273.15).toFixed(1)}°C</p>
            <p className='description'>{weather.weather[0].description}</p>
          </div>
        )
      }
    </div>
  )
}

export default Weather