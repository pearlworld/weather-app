import React from 'react'
import { GoNoEntry } from "react-icons/go";

function WeatherButton({ cityList, activeCity, handleCityChange, 
  onRemove }) {

  return (
    <>
      <div className='itemList-head'>
        <h3>내가 저장한 지역</h3>
        <button 
          className='btn_edit'
          >
          <i className='ico_edit'>편집</i>
        </button>
      </div>
      <div className='itemList-body'>
        {cityList.map((city, i) => (
          <div className='itemList-inner'>
            <button
              key={i} 
              onClick={() => handleCityChange(city)}
              className={`itemList-btn ${activeCity === city ? 'active' : ''}`}
            >{city}
            </button>
            <GoNoEntry 
              className='btn_delete' 
              onClick={() => onRemove(city)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default WeatherButton;