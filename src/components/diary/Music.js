import Tooltip from './PopUp';
import {GoogleGenerativeAI} from "@google/generative-ai";
import {useState} from "react";
import axios from 'axios';


export default function Music({userName, data}){
    const [musicData, setMusicData] = useState('오늘의 노래')
    const [spotifyToken, setSpotifyToken] = useState('');
    const AI_API_KEY = process.env.REACT_APP_GENERATIVE_AI;
    // console.log(AI_API_KEY)

    const handleClick = async () => {
        console.log("다이어리 내용:", data);
        const genAI = new GoogleGenerativeAI(AI_API_KEY);
        try {
            const response = await axios.get('/spotify/token');
            setSpotifyToken(response.data);
            console.log("spotify access token: ", response.data);
        } catch (error) {
            console.error('Error fetching Spotify token:', error);
        }

        async function run() {
            const model = genAI.getGenerativeModel({model: "gemini-pro"});
            const prompt = data + "내용을 보고 분위기에 맞는 실제 한국 노래 하나만 추천해줘. 단어로 추천해주면 돼. 그 노래 가수 이름도 포함해줘";
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setMusicData(text);
            console.log(text);
        }

        run();
    }
    const message = `스포티파이 로고를 클릭하면, AI가 오늘 하루 ${userName}님의 일기와 맞게 노래를 추천해드립니다!`

    return (
        <div className="text-right flex sm:col-span-3 sm:col-start-8">
        {/* <Link to="https://accounts.spotify.com/ko/login/" target="_blank" rel="noopener noreferrer"> */}
        <div className="mt-2" >
            <img src={process.env.PUBLIC_URL + '/img/spotify.png'}

                 alt='x' style={{width:'40px' ,cursor: 'pointer'}}
                 onClick={handleClick}/>
        </div>
        {/* </Link> */}

        <div className="mt-2 sm:col-span-2"
             style={{ width: '100%', cursor: 'pointer', position: 'relative'}}>
            <Tooltip content = {message}>
                <div className="block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <p className='text-center'>{musicData}</p>
                </div>
            </Tooltip>
        </div>
    </div>)
}