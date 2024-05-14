import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function DailyModal({ setModalOpen, userId, date }) {
    const navigate = useNavigate();
    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);
    const image = process.env.PUBLIC_URL + '/img/rabbit.jpg';

    useEffect(() => {
        const formattedDateForSave = new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date);

        const parts = formattedDateForSave.split('. ');
        const save_date = `${parts[0]}-${parts[1]}-${parts[2].slice(0, 2)}`; //2024-02-24

        const apiUrl = `http://localhost:8081/user/${save_date}`;

        axios.get(apiUrl, {
            withCredentials: true
        })
            .then(response => {
                console.log('불러온 다이어리 데이터 확인:', response.data);
                setDiary(response.data);
                setLoading(false);

                // 다이어리 데이터가 없을 경우 다이어리 작성 페이지로 이동
                if (!response.data) {
                    navigate(`/diary/${save_date}`);
                }
            })
            .catch(error => {
                console.error('다이어리 데이터 fetch 실패:', error);
                setDiary(null); // 다이어리 데이터 초기화
                setLoading(false);
            });   
    }, []);


    const editDiary = () => {
        // 편집 창 넘겨주기
        if(diary && window.confirm("다이러리를 수정할까요?")){
            navigate(`/edit/${diary.diaryDate}`, { state: { diary } });
        }
        // 데이터 받아오는 것까지
    }

    // 해당 다이어리 삭제
    const deleteDiary = () => {
        if(diary && window.confirm(`${diary.diaryDate} 다이어리를 정말 삭제할까요?`)){
            axios.delete(`http://localhost:8081/diary/${diary.diaryId}`, {
                withCredentials: true
            })
                .then(function(response){
                    console.log(response);
                    closeModal();
                })
                .catch(function(error){
                    console.log(error);
                })
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    };

    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);

    console.log(formattedDate)
    return (
        <div>
            {diary && (
                // 모달 뒷 배경
                <div
                    className='fixed left-0 top-0 w-[100%] h-[100%] flex items-center justify-center bg-neutral-500/50'>
                    {/* 모달 창 */}
                    <div className='bg-white rounded p-4 w-11/12'>
                        {/* 모달 창 상단 바 */}
                        <div className='flex justify-between text-[18px] items-center'>
                            <div className='flex'>
                                <div className='mr-1'>{':)'}</div>
                                <div>{formattedDate}</div>
                                
                                    {diary.diaryFeeling && (
                                        <div>
                                        {diary.diaryFeeling === "신남" ? "🤗" : diary.diaryFeeling === "하트" ? "🥰" : diary.diaryFeeling === "슬픔" ? "😥" : diary.diaryFeeling === "화남" ? "🤬" : diary.diaryFeeling}
                                       </div>

                                    )}
                            </div>
                            <div className='flex'>
                                {/* 삭제 버튼 */}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-7 h-7 mr-2'
                                    onClick={deleteDiary}
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                                    />
                                </svg>
                                {/* 편집 버튼 */}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-7 h-7 mr-2'
                                    onClick={editDiary}
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                                    />
                                </svg>
                                {/* 닫기 버튼 */}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-7 h-7'
                                    onClick={closeModal}
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M6 18 18 6M6 6l12 12'
                                    />
                                </svg>
                            </div>
                        </div>
                        {/* content */}
                        <div className='flex mt-2'>
                        <div className='border-2 mr-4 w-52 h-40 relative'>
                            <img
                                src={diary.diaryPhoto || image}
                                alt='Diary Photo'
                                className='absolute top-0 left-0 w-full h-full object-cover'
                            />
                        </div>

                            <div className='w-[100%]'>
                                <div className='flex justify-between'>
                                    <div>{diary.diaryTitle}</div>
                                </div>
                                <hr></hr>
                                <div>{diary.diaryWriting}</div>
                            </div>
                        </div>
                        <div className=' text-xs'>{diary.diaryAddressName}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default DailyModal;
