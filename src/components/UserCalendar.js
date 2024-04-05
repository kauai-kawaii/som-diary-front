import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DailyModal from './DailyModal';
import axios from "axios";
const apiUrl = `/api/photos`


function UserCalendar() {
    const [value, onChange] = useState(new Date());
    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 이미지 데이터 state
    const [photoData, setPhotoData] = useState([]);


    useEffect(() => {
        // 백엔드에서 이미지 데이터 가져오기
        fetch(`/api/photos`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch photo data');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setPhotoData(data);
            })
            .catch(error => {
                console.error('Error fetching photo data:', error);
            });
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

    // 모달을 띄우는 함수 (추후 데이터 같이 전달 가능하도록)
    const showModal = (date) => {
        setModalOpen(true);
        onChange(date);
    };


    // 사진 데이터 달력에 띄우기
    const getTileContent = ({ date, view }) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const matchingPhoto = photoData.find((photo) => {
            return (
                photo.year === year &&
                photo.month === month &&
                photo.day === day
            );
        });

        // 월간 뷰에서만 이미지를 표시하도록 설정
        if (matchingPhoto) {
            const imagePath = matchingPhoto.image;

            return (
                <div className='relative'>
                    <img
                        src={imagePath}
                        alt='Day'
                        className='w-full h-full object-cover'
                    />
                </div>
            );
        }
        // 나머지 경우에는 null 반환하여 기본 렌더링 유지
        return null;
    };

    return (
        <div>
            <Calendar
                onChange={onChange}
                onClickDay={showModal}
                value={value}
                formatDay={(locale, date) =>
                    date.toLocaleString('en', { day: 'numeric' })
                }
                nextLabel={'▶'}
                prevLabel={'◀︎'}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
                tileContent={getTileContent}
                className={'aspect-video max-h-[550px] max-w-5xl'}
            />
            {modalOpen && (
                <DailyModal setModalOpen={setModalOpen} date={value} />
            )}
        </div>
    );
}

export default UserCalendar;
