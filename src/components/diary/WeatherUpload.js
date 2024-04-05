import { useEffect, useState } from "react";

export default function WeatherUpload({ data, setWeatherData }) {
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const [weatherInfo, setWeatherInfo] = useState({
        temperature: null,
        description: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data) {
            const latitude = data.y;
            const longitude = data.x;

            const getWeather = async (lat, lon) => {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
                    );

                    if (!response.ok) {
                        throw new Error('날씨 정보 없음');
                    }

                    const json = await response.json();
                    setWeatherInfo({
                        temperature: json.main.temp,
                        description: json.weather[0].description
                    });
                } catch (error) {
                    setError(error.message);
                }
            };

            getWeather(latitude, longitude);
        }
    }, []);

    useEffect(() => {
        // 날씨 정보가 변경될 때마다 Diary 컴포넌트로 업데이트된 날씨 정보 전달
        setWeatherData(weatherInfo);
    }, [weatherInfo, setWeatherData]);

    return (
        <div className="sm:col-span-2">
            <div className="mt-2">
                <div className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    {error ? (
                        <p className="text-center">{error}</p>
                    ) : (
                        <p className="text-center">{weatherInfo.temperature !== null ? `${weatherInfo.temperature}℃ ${weatherInfo.description}` : '날씨 정보 없음'}</p>
                    )}
                </div>
            </div>
        </div>
    );
}