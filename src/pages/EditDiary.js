import Logo from '../components/Logo';
import EditWeatherUpload from '../components/diary/EditWeatherUpload';
import ToolOptions from '../components/diary/Options'
import { useState,useEffect } from 'react';
import {Link, useNavigate , useLocation, useParams} from 'react-router-dom';
import EditImageUpload from "../components/diary/EditImageUpload";
import { uploadToS3 } from './uploadToS3';
import axios from "axios";

export default function EditDiary() {
    const {save_date} = useParams();
    const navigate = useNavigate();

    const [diary, setDiary] = useState(null);
    const [selectedRate, setSelectedRate] = useState(null);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedWeather, setSelectedWeather] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedWriting, setSelectedWriting] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedAddressName, setSelectedAddressName] = useState(null);
    const [selectedLatitude, setSelectedLatitude] = useState(null);
    const [selectedLongitude, setSelectedLongitude] = useState(null);
    const rates = ['0점', '1점', '2점', '3점', '4점', '5점', '취소'];

    useEffect(() => {
        const apiUrl = `/edit/123/${save_date}`;
        console.log(apiUrl);

        axios.get(apiUrl)
            .then(response => {
                console.log('수정 페이지 데이터 불러오기:', response.data);
                setDiary(response.data);
                setSelectedRate(response.data.diaryVisitRate); 
                setSelectedEmoji(response.data.diaryFeeling === "신남" ? "🤗" : response.data.diaryFeeling === "하트" ? "🥰" : response.data.diaryFeeling === "슬픔" ? "😥" : response.data.diaryFeeling === "화남" ? "🤬" : response.data.diaryFeeling); 
                setSelectedImage(response.data.diaryPhoto === null ? null : response.data.diaryPhoto);
                setSelectedWeather(response.data.diaryWeather);
                setSelectedTitle(response.data.diaryTitle);
                setSelectedWriting(response.data.diaryWriting);
                setSelectedAddress(response.data.diaryAddress);
                setSelectedAddressName(response.data.diaryAddressName);
                setSelectedLatitude(response.data.diaryLatitude);
                setSelectedLongitude(response.data.diaryLongitude);
            })
            .catch(error => {
                console.error('수정 다이어리 데이터 fetch 실패:', error);
                setDiary(null);
            });   
    }, [setDiary]);


    const locationData = useLocation();
    useEffect(() => {
        // 위치 정보 업데이트 처리
        const locationInfo = locationData.state && locationData.state.location ? locationData.state.location[0] : null;
        console.log(locationInfo);
        if (locationInfo) {
            setSelectedAddress(locationInfo.address);
            setSelectedAddressName(locationInfo.name);
        }
    }, [selectedAddress, selectedAddressName, selectedLatitude, selectedLongitude]);

    // useEffect(() => {
    //     if (locationInfo) {
    //         setSelectedAddress(locationInfo.address);
    //         setSelectedAddressName(locationInfo.name);
    //     }
    // }, [locationInfo]);


    const images = Array(4).fill(process.env.PUBLIC_URL + '/img/rabbit.jpg');
    const emojis = ['😊', '😥', '🤗', '🤬','🥰']; // 행복, 슬픔, 신남, 화남, 하트

    const handleImageChange = (image) => {
        if (image) {
            setSelectedImage(image);
            console.log("수정페이지에 전달받은 이미지", image)
        } else{
            setSelectedImage(null);
            console.log("전달받은 사진이 없습니다.", image)
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
        const handleButtonClick = async (event) => {
            event.preventDefault();

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

            let imageUrl = selectedImage;
            console.log("최종 imageUrl",imageUrl);

            // 이미지가 수정되었을 때만 S3에 업로드
            if (selectedImage !== null) {
                try {
                    imageUrl = await uploadToS3(selectedImage);
                } catch (error) {
                    console.error('S3에 이미지 업로드 실패', error);
                    return;
                }
            } 
            

            // 수정한 데이터 전체 설정하기!!!
            const diaryData = {
                userId: document.querySelector("#new-diary-user-id").value,
                diaryPhoto: imageUrl,
                diaryDate: save_date,
                diaryFeeling: selectedEmoji === '😊' ? '행복' : selectedEmoji === '😥' ? "슬픔" : selectedEmoji === '🤗' ? "신남" : selectedEmoji === '🤬' ? "화남" : selectedEmoji === "🥰" ? "하트" : selectedEmoji === '기분' ? null : selectedEmoji,
                diaryLatitude: selectedLatitude,
                diaryLongitude: selectedLongitude,
                diaryVisitRate: selectedRate === null ? null : selectedRate,
                diaryTitle: title,
                diaryWriting: content,
                diaryWeather: selectedWeather === "null" ? null : selectedWeather,
                diaryAddress: selectedAddress,
                diaryAddressName: selectedAddressName
            }
            console.log("수정된 클라이언트 다이어리 확인",diaryData);
            const url = `/edit/${diaryData.userId}/${save_date}`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(diaryData)
            }).then(response => {
                const msg = (response.ok) ? "다이어리가 수정되었습니다.!" : "다이어리 등록 실패";
                alert(msg);

                navigate("/main")
            });
        }

        const diaryCreateBtn = document.querySelector('#saveButton');
        if (diaryCreateBtn) {
            diaryCreateBtn.addEventListener("click", handleButtonClick);
        }

        return () => {
            if (diaryCreateBtn) {
                diaryCreateBtn.removeEventListener("click", handleButtonClick);
            }
        };
    }, [selectedRate, selectedEmoji, selectedWeather, selectedImage, selectedAddress, selectedAddressName, selectedLatitude, selectedLongitude]);


    return (
        <form action=" ">
        {diary && (
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
                        <EditWeatherUpload setWeatherData={handleWeatherChange} savedWeather = {selectedWeather}/>
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
                            <EditImageUpload onImageChange={handleImageChange} savedImage = {selectedImage}/>

                            {/*위치업로드*/}
                            {/* {locationInfo && ( */}
                                <>
                                    <p className="mt-2 text-center text-sm leading-6 text-gray-600">
                                        {selectedAddress}
                                    </p>
                                    <p className="mt-2 text-center text-sm leading-6 text-gray-600">
                                        {selectedAddressName}
                                    </p>
                                </>
                            {/* )} */}
                            <div className="mt-9">
                                <Link to={`/edit/search-location/${save_date}`}>
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
        )}
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
                    수정
                </button>
            </div>                        
        </form>
    )
}