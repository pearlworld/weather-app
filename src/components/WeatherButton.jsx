import React from 'react'
import { IoMdSettings } from "react-icons/io";


function WeatherButton({ cityList, activeCity, handleCityChange, 
  onRemove, edit, toggleEdit }) {

  return (
    <>
      <div className='itemList-head'>
        <h3>내가 저장한 지역</h3>
        <IoMdSettings 
          className='btn_edit'
          onClick={toggleEdit} 
        />
      </div>
      <div className='itemList-body'>
        {cityList.map((city, i) => (
          <div
            key={city}
            onClick={() => handleCityChange(city)}
            className={`itemList-inner ${activeCity === city ? 'active' : ''}`}
          >
            <button
              key={i} 
              className='itemList-btn'
            >{city}
            </button>
            {
              edit && (
                <button
                  className='btn_delete'
                  onClick={() => onRemove(city)}
                 ><i className='ico_delete'>삭제</i>
                </button>
              )
            }
            
          </div>
          ))
        }
      </div>
    </>
  );
}

export default WeatherButton;