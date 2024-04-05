import SpotifyHorizonSongList from "../components/SpotifyMusicDisplay/get-monthly-list";
import GetMusicsByYearAndMonth from "../components/SpotifyMusicDisplay/fetch-spotify-songs";
import { Link } from "react-router-dom";

export default function Insight() {
  /* <Logo /> */
  return (
    <>
      <div className="grid grid-cols-5">
        <header className="col-span-1">
          <h1 className="text-2xl ml-4 mt-4">Dashboard</h1>
          <div className="flex">
            <p>여기에는 연, 월 선택</p>
            <GetMusicsByYearAndMonth />
          </div>
        </header>
        <main className="col-span-4">
          <h2 className="text-xl ml-4 mt-4">Spotify: </h2>
          <p>여기에는 스포티파이 노래</p>
          <SpotifyHorizonSongList />
          <h2 className="text-xl ml-4 mt-4">지도 API 출동 예정</h2>
        </main>
      </div>
    </>
  );
}
