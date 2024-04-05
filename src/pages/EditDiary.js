// import ImageUpload from '../components/diary/ImageUpload';
import Logo from '../components/Logo';
import WeatherUpload from '../components/diary/WeatherUpload';
import ToolOptions from '../components/diary/Options'
import { useState,useEffect } from 'react';
import Music from '../components/diary/Music';
import {Link, useNavigate , useLocation, useParams} from 'react-router-dom';

export default function EditDiary() {
    const location = useLocation();
    const { diary } = location.state || {};


    const {save_date} = useParams();
    const navigate = useNavigate();
    const [selectedRate, setSelectedRate] = useState('위치 별점주기');
    const [writingData, setWritingData] = useState('')
    const rates = ['0점', '1점', '2점', '3점', '4점', '5점', '취소'];
    const locationData = useLocation();
    const locationInfo = locationData.state ? locationData.state.location[0] : null;
    const address = locationInfo?.address ?? null;
    const name = locationInfo ? locationInfo.name : null;
    const y = locationInfo ? locationInfo.y : null;
    const x = locationInfo ? locationInfo.x : null;

    const images = Array(4).fill(process.env.PUBLIC_URL + '/img/rabbit.jpg');
    const [selectedEmoji, setSelectedEmoji] = useState('기분');
    const emojis = ['😊', '😥', '🤗', '🤬','🥰'];

    // 일기내용
    const handleWritingChange = (event) => {
        setWritingData(event.target.value);
    }

    // const [selectedImage, setSelectedImage] = useState(null);
    const [selectedWeather, setSelectedWeather] = useState(null);
    const handleEmojiClick = (emoji) => {
        setSelectedEmoji(emoji);
    };
    const handleVisitRateClick = (rate) => {
        setSelectedRate(rate == "취소" ? "위치 별점주기" : rate);
    };
    const handleWeatherChange = (weatherData) => {
        setSelectedWeather(weatherData);
    }

    // 음악 추천

    useEffect(() => {
        console.log("수정버튼 클릭 후 넘어온 데이터 확인",diary);
        // const inputTitle =  document.querySelector('#title').value
        // const inputWriting = document.querySelector('#content').value
        // const handleButtonClick = (event) => {
        //     // const titleValue = inputTitle.trim();
        //     event.preventDefault();
        //     const diaryData = {
        //         userId: document.querySelector("#new-diary-user-id").value,
        //         diaryPhoto: "사진없음",
        //         diaryDate: save_date,
        //         diaryFeeling: selectedEmoji === '😊' ? '행복' : selectedEmoji === '😥' ? "슬픔" : selectedEmoji === '🤗' ? "신남" : selectedEmoji === '🤬' ? "화남" : selectedEmoji === "🥰" ? "하트" : selectedEmoji === '기분' ? null : selectedEmoji,
        //         diaryLatitude: y,
        //         diaryLongitude: x,
        //         diaryVisitRate: selectedRate === "취소" || "위치 별점주기" ? null : selectedRate,
        //         diaryTitle:  document.querySelector('#title').value,
        //         diaryWriting: document.querySelector('#content').value,
        //         diaryWeather: selectedWeather === "null" ? null : selectedWeather.temperature
        //     };
        //     // if (diaryData.diaryTitle === null) {
        //     //     alert("다이어리 제목을 입력하세요.");
        //     //     return;
        //     // }
        //     //
        //     // if (diaryData.diaryWriting === null) {
        //     //     alert("다이어리 내용을 입력하세요.");
        //     //     return;
        //     // }
        //     console.log(diaryData);
        //     const url = "/api/user/" + diaryData.userId + "/diary";
        //     fetch(url, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(diaryData)
        //     }).then(response => {
        //         const msg = (response.ok) ? "다이어리가 등록됐습니다!" : "다이어리 등록 실패";
        //         alert(msg);
        //
        //         navigate("/main")


        // const diaryCreateBtn = document.querySelector('#saveButton');
        // if (diaryCreateBtn) {
        //     diaryCreateBtn.addEventListener("click", handleButtonClick);
        // }
        //
        // return () => {
        //     if (diaryCreateBtn) {
        //         diaryCreateBtn.removeEventListener("click", handleButtonClick);
        //     }
        // };
    }, []);


    return (
        <form action=" ">
            <div className="space-y-12 ">
                <div className="m-20 mb-5 border-b border-gray-900/10 pb-12">
                    <Logo/>
                    {/* 상단 정보: 날짜 날씨 기분 노래*/}
                    <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-10">
                        {/* 날짜 */}
                        <div  className="sm:col-span-2 sm:col-start-1">
                            <div className="mt-2">
                                <div className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                    <p id = "date" className='text-center'>{save_date}</p>
                                </div>
                            </div>
                        </div>
                        {/* 날씨 */}
                        <WeatherUpload setWeatherData = {handleWeatherChange} data={locationInfo}/>
                        {/* 기분 */}
                        <div className="block sm:col-span-1 mt-2" style={{ width: '40px'}}>
                            <ToolOptions content={ <div className="flex gap-2 ">
                                {emojis.map((emoji, index) => (
                                    <div
                                        key={index}
                                        style={{ cursor: 'pointer', top: '0', left: '0' }}
                                        onClick={() => handleEmojiClick(emoji)}
                                    >
                                        <div
                                            className="p-1 hover:bg-yellow-100 block w-full rounded-full border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            style={{ cursor: 'pointer'}}
                                        >
                                            <p className='text-center'>{emoji}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>}
                            >
                                <div
                                    className="block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    style={{ cursor: 'pointer'}}
                                >
                                    <p className='text-center'>{selectedEmoji}</p>
                                </div>
                            </ToolOptions>
                        </div>
                        {/* 노래 */}
                        <Music data = {writingData}/>
                    </div>

                    {/* 하단: 이미지, 일기 */}
                    <div className="pt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
                        {/* 하단 왼쪽: 사진 업로드, 위치 불러오기 */}
                        <div className="sm:col-span-2">
                            {/* 중간에 토끼 */}
                            <div className="pt-5 gap-5 flex flex-wrap"
                                 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt='x'
                                        style={{width: '40px'}}
                                    />
                                ))}
                            </div>
                            {/*<ImageUpload onImageChange={handleImageChange}/>*/}

                            {/*위치업로드*/}
                            {locationInfo && (
                                <>
                                    <p className="mt-2 text-center text-sm leading-6 text-gray-600">
                                        {address}
                                    </p>
                                    <p className="mt-2 text-center text-sm leading-6 text-gray-600">
                                        {name}
                                    </p>
                                </>
                            )}
                            <div className="mt-9">
                                <Link to={'/search-location'}>
                                    <div className="mt-3">
                                        <div
                                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            style={{cursor: 'pointer'}}
                                        >
                                            <p className="text-center"
                                            >위치 검색</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="pt-3" style={{cursor: 'pointer'}}>
                                    <ToolOptions
                                        content={
                                            <div className="flex gap-2">
                                                {rates.map((rate, index) => (
                                                    <div
                                                        key={index}
                                                        style={{cursor: 'pointer', top: '0', left: '0'}}
                                                        onClick={() => handleVisitRateClick(rate)}
                                                    >
                                                        <div
                                                            className="p-1 hover:bg-blue-100 block w-full rounded-full border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            style={{cursor: 'pointer'}}
                                                        >
                                                            <p className="text-center">{rate}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    >
                                        <div
                                            className="block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            style={{cursor: 'pointer'}}
                                        >
                                            <p className="text-center">
                                                {selectedRate}
                                                {/*{selectedRate === '0점' ? '⚡' : selectedRate === '1점' ? '⭐' : selectedRate === '2점' ? '⭐⭐' : selectedRate === '3점'*/}
                                                {/*                ? '⭐⭐⭐' : selectedRate === '4점' ? '⭐⭐⭐⭐' : selectedRate === '5점' ? '⭐⭐⭐⭐⭐' : selectedRate}*/}
                                            </p>
                                        </div>
                                    </ToolOptions>
                                </div>
                            </div>


                        </div>
                        {/* 하단 오른쪽 */}
                        <div className="sm:col-span-8">
                            <div className="mt-6">
                                <input
                                    placeholder='제목'
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6 mt-2"
                                />
                            </div>

                            <div className="mt-3">
                              <textarea
                                  id="content"
                                  name="about"
                                  rows={20}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6 mt-2"
                                  defaultValue={''}
                                  value={writingData}
                                  onChange={handleWritingChange}
                              />
                                <p>다이어리 내용: {writingData}</p>
                                <input type="hidden" id="new-diary-user-id" value="123"></input>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 취소, 저장 버튼 */}
            <div className=" mr-20 flex items-center justify-end gap-x-6">
                <Link to="/main">
                    <button type="button"
                            className="inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        취소
                    </button>
                </Link>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    id = "saveButton"
                >
                    저장
                </button>
            </div>
        </form>
    )
}