import { useState, useEffect  } from 'react'
import './css/App.css'
import Search from './components/Search';
import Weather from './components/Weather';
import WeatherButton from './components/WeatherButton';
import Nav from './components/Nav';

function App() {
  const [ location, setLocation ] = useState(''); // 검색어
  const [ open, setOpen ] = useState(false); // 검색창
  const [ error, setError ] = useState(false); // 에러상태
  const [ cityList, setCityList ] = useState(['seoul', 'jeju', 'london', 'tokyo']); // 즐겨찾기 목록
  const [ weather, setWeather ] = useState(null); // 날씨 데이터
  
  const apiKey = import.meta.env.VITE_API_KEY;

  // 현재 위치 불러오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log("현재 위치는 ?", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    })
  }

  // 현재 위치 날씨 불러오기
  const getWeatherByCurrentLocation = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`;
    
    fetch(url)
      .then(res => res.json())  // json포맷으로 변환
      .then(data => {
        setWeather(data);
        return;
      })
      .catch(() => {
        setError("날씨 정보를 가져올 수 없습니다.");
        console.log('에러');
      })
  }
  
  // 내가 저장한 지역 날씨 불러오기
  const getWeatherByCity = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        // console.log("현재 날씨는?", data);
      })
      .catch(() => {
        console.log('에러');
      })
  }

  // 날씨 요청하기
  const fetchWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=kr`;

    fetch(url)
      .then(res => res.json())  // json포맷으로 변환
      .then(data => {
        if(data.cod === '404') {
          setWeather(null);
          return;
        }
        setWeather(data);
      })
      .catch(() => {
        setError("날씨 정보를 가져올 수 없습니다.");
        console.log('에러');
      })
  }

  // 입력함수
  const handleLocationChange = (e) => { // e : 이벤트 발생
    setLocation(e.target.value);
  }

  // 전송버튼
  const handleWeatherSearch = (e) => {
    e.preventDefault(); // 전송 이벤트 취소(기본 이벤트)
    fetchWeather(); // 날씨 데이터 요청
  }

  // 즐겨찾기 목록
  const [ city, setCity ] = useState('');
  const [ activeCity, setActiveCity ] = useState('');
  const handleCityChange = (city) => {
    if(city === "current") {
      setCity('');
    } else {
      setCity(city);
      setActiveCity(city);
    }
  }
  useEffect(() => {
    if(city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  // 즐겨찾기 삭제 이벤트
  const onRemove = (removedCity) => {
    setCityList(cityList.filter(city => city !== removedCity));
  }

  // 즐겨찾기 수정 버튼
  const [ edit, setEdit ] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  return (
    <>
      <header>
        <Nav 
          open={open}
          setOpen={setOpen}
          getCurrentLocation={getCurrentLocation}
        />
      </header>
      <main>
        <div className="wrap">
          <div className='container'>
            { open ?
              (
                <Search
                  handleLocationChange={handleLocationChange}
                  handleWeatherSearch={handleWeatherSearch}
                  location={location}
                />
              ) : null
            }
            <div className='weather'>
              {weather ? 
                <Weather 
                  weather={weather} 
                /> : <p className='err_msg'>날씨 정보가 없습니다.</p>
              }
              {error && <p>{error}</p>}
            </div>
            <div className='myList'>
              <WeatherButton 
                cityList={cityList}
                activeCity={activeCity}
                handleCityChange={handleCityChange}
                onRemove={onRemove}
                key={city}
                edit={edit}
                toggleEdit={toggleEdit}
              />
            </div>
            
          </div>
        </div>
      </main>
      
    </>
  )
}

export default App
