import Logo from '../components/Logo';
import WeatherUpload from '../components/diary/WeatherUpload';
import ToolOptions from '../components/diary/Options'
import { useState,useEffect } from 'react';
import {Link, useNavigate , useLocation, useParams} from 'react-router-dom';
import ImageUpload from "../components/diary/ImageUpload";
import { uploadToS3 } from './uploadToS3';

export default function Diary() {

    const {save_date} = useParams();
    const navigate = useNavigate();

    const [selectedRate, setSelectedRate] = useState(null);
    const [selectedEmoji, setSelectedEmoji] = useState('기분');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedWeather, setSelectedWeather] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedWriting, setSelectedWriting] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedAddressName, setSelectedAddressName] = useState(null);

    const rates = ['0점', '1점', '2점', '3점', '4점', '5점', '취소'];
    const locationData = useLocation();
    const locationInfo = locationData.state ? locationData.state.location[0] : null;
    const address = locationInfo?.address ?? null; // 다이어리 주소
    const name = locationInfo ? locationInfo.name : null; // 다이어리 도로명 주소
    const y = locationInfo ? locationInfo.y : null;
    const x = locationInfo ? locationInfo.x : null;
    
    useEffect(() => {
        if (locationInfo) {
            setSelectedAddress(locationInfo.address);
            setSelectedAddressName(locationInfo.name);
        }
    }, [locationInfo]);

    const images = Array(4).fill(process.env.PUBLIC_URL + '/img/rabbit.jpg');
    const emojis = ['😊', '😥', '🤗', '🤬','🥰'];


    const handleImageChange = (image) => {
        if (image) {
            setSelectedImage(image);
            console.log("전달받은 사진",image)
        } else{
            setSelectedImage(null);
            console.log("전달받은 사진이 없습니다.")
        }
    }
    const handleEmojiClick = (emoji) => {
        setSelectedEmoji(emoji);
    };
    const handleVisitRateClick = (rate) => {
        setSelectedRate(rate === "취소" ? null : rate === "위치 별점주기" ? null : rate);
    };
    const handleWeatherChange = (weatherData) => {
        setSelectedWeather(weatherData);
    }

    useEffect(() => {
        const handleBackNavigation = (event) => {
            event.preventDefault();
            event.returnValue = '';
            sessionStorage.removeItem(`diaryTitle_${save_date}`);
            sessionStorage.removeItem(`diaryContent_${save_date}`);
            sessionStorage.removeItem(`diaryPhoto_${save_date}`);
            sessionStorage.removeItem(`diaryFeeling_${save_date}`);
        };
    
        window.addEventListener('popstate', handleBackNavigation);
    
        return () => {
            window.removeEventListener('popstate', handleBackNavigation);
        };
    }, []);
    
    useEffect(() => {
        const localSavedTitle = sessionStorage.getItem(`diaryTitle_${save_date}`) || '';
        const localSavedContent = sessionStorage.getItem(`diaryContent_${save_date}`) || '';
        const localSavedImage = sessionStorage.getItem(`diaryPhoto_${save_date}`) || '';
        const localSavedEmoji = sessionStorage.getItem(`diaryFeeling_${save_date}`) || '기분';
        setSelectedTitle(localSavedTitle || ''); // 초기값을 빈 문자열로 설정
        setSelectedWriting(localSavedContent || ''); 
        setSelectedImage(localSavedImage || null);
        setSelectedEmoji(localSavedEmoji || '기분');
    }, [save_date]);

    const handleLocationClick = () => {
        sessionStorage.setItem(`diaryTitle_${save_date}`, selectedTitle);
        sessionStorage.setItem(`diaryContent_${save_date}`, selectedWriting);
        sessionStorage.setItem(`diaryPhoto_${save_date}`, selectedImage);
        sessionStorage.setItem(`diaryFeeling_${save_date}`, selectedEmoji);
    };

    const handleCancelWriting = () => {
        sessionStorage.removeItem(`diaryTitle_${save_date}`);
        sessionStorage.removeItem(`diaryContent_${save_date}`);
        sessionStorage.removeItem(`diaryPhoto_${save_date}`);
        sessionStorage.removeItem(`diaryFeeling_${save_date}`);
    };

    
    useEffect(() => {
        const handleButtonClick = async (event) => {
            event.preventDefault();

            // 다이어리 제목, 내용 입력 확인 Not Null
            const title = document.querySelector('#title').value;
            const content = document.querySelector('#content').value;
            if(!title.trim()){
                alert("제목을 입력해주세요.");
                return;
            }
            if(!content.trim()){
                alert("일기 내용을 입력해주세요.");
                return;
            }

            // 이미지를 S3에 업로드
            let imageUrl = null;
            if (selectedImage) {
                try {
                    imageUrl = await uploadToS3(selectedImage);
                } catch (error) {
                    console.error('S3에 이미지 업로드 실패', error);
                    return;
                }
            }

            const diaryData = {
                userId: document.querySelector("#new-diary-user-id").value,
                diaryPhoto: imageUrl,
                diaryDate: save_date,
                diaryFeeling: selectedEmoji === '😊' ? '행복' : selectedEmoji === '😥' ? "슬픔" : selectedEmoji === '🤗' ? "신남" : selectedEmoji === '🤬' ? "화남" : selectedEmoji === "🥰" ? "하트" : selectedEmoji === '기분' ? null : selectedEmoji,
                diaryLatitude: y,
                diaryLongitude: x,
                diaryVisitRate: selectedRate === null ? null : selectedRate,
                diaryTitle: title,
                diaryWriting: content,
                diaryWeather: selectedWeather === "null" ? null : selectedWeather,
                diaryAddress: selectedAddress,
                diaryAddressName: selectedAddressName
            };

            console.log("클라이언트 다이어리 확인",diaryData);
            const url = "/new/" + diaryData.userId;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(diaryData)
            }).then(response => {
                const msg = (response.ok) ? "다이어리가 등록됐습니다!" : "다이어리 등록 실패";
                alert(msg);

                navigate("/main")
            });
        };

        const diaryCreateBtn = document.querySelector('#saveButton');
        if (diaryCreateBtn) {
            diaryCreateBtn.addEventListener("click", handleButtonClick);
        }

        return () => {
            if (diaryCreateBtn) {
                diaryCreateBtn.removeEventListener("click", handleButtonClick);
            }
        };
    }, [selectedRate, selectedEmoji, locationInfo, selectedWeather, selectedImage]);


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
                                    <p className='text-center'>{selectedEmoji === null ? "기분" : selectedEmoji}</p>
                                </div>
                            </ToolOptions>
                        </div>
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
                            <ImageUpload onImageChange={handleImageChange}/>

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
                                <Link to={`/search-location/${save_date}`} onClick={handleLocationClick} >
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
                                                {selectedRate === '0점' ? '🤢' : selectedRate === '1점' ? '⭐' : selectedRate === '2점' ? '⭐⭐' : selectedRate === '3점'
                                                ? '⭐⭐⭐' : selectedRate === '4점' ? '⭐⭐⭐⭐' : selectedRate === '5점' ? '⭐⭐⭐⭐⭐' : selectedRate === null ? '위치 별점주기' : selectedRate} 
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
                                    value={selectedTitle}
                                    onChange={(e) => setSelectedTitle(e.target.value)}
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
                                  value={selectedWriting}
                                onChange={(e) => setSelectedWriting(e.target.value)}
                              />
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
                            className="inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                            onClick={handleCancelWriting}
                            >
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