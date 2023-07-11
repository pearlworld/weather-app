import React from 'react'


function WeatherButton({ cities, activeCity, handleCityChange }) {

  return (
    <>
      <div className='itemList-head'>
        <h3>내가 저장한 지역</h3>
        <button 
          className='btn_edit'
          onClick={() => onRemove(city, i)}>
          <i className='ico_edit'>편집</i>
        </button>
      </div>
      <div className='itemList-body'>
        {cities.map((city, i) => (
          <div className='itemList-inner'>
            <button
              key={i} 
              onClick={() => handleCityChange(city)}
              className={`itemList-btn ${activeCity === city ? 'active' : ''}`}
            >{city}
            </button>
          </div>
          // <button className='btn_delete' onClick={onRemove}>
          //   <i className='ico_delete'>삭제</i>
          // </button>
        ))}
      </div>
    </>
  );
}

export default WeatherButton;