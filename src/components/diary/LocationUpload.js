import ToolOptions from './Options';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LocationUpload({ data }) {
    const [selectedRate, setSelectedRate] = useState('위치 별점주기');
    const rates = ['0점', '1점', '2점', '3점', '4점', '5점', '취소'];

    const handleRateClick = (rate) => {
        if (rate === '취소') {
            setSelectedRate('위치 별점주기');
        } else {
            setSelectedRate(rate);
        }
    };

    // 데이터가 없는 경우에는 기본값 출력
    const address = data ? data.address : '';
    const name = data ? data.name : '';

    return (
        <>
            <p className="mt-2 text-center text-sm leading-6 text-gray-600">
                {address}
            </p>
            <p className="mt-2 text-center text-sm leading-6 text-gray-600">
                {name}
            </p>
            <div className="mt-9">
                <Link to={'/search-location'}>
                    <div className="mt-3">
                        <div
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            style={{ cursor: 'pointer' }}
                        >
                            <p className="text-center">위치 검색</p>
                        </div>
                    </div>
                </Link>
                <div className="pt-3" style={{ cursor: 'pointer' }}>
                    <ToolOptions
                        content={
                            <div className="flex gap-2">
                                {rates.map((rate, index) => (
                                    <div
                                        key={index}
                                        style={{ cursor: 'pointer', top: '0', left: '0' }}
                                        onClick={() => handleRateClick(rate)}
                                    >
                                        <div
                                            className="p-1 hover:bg-blue-100 block w-full rounded-full border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            style={{ cursor: 'pointer' }}
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
                            style={{ cursor: 'pointer' }}
                        >
                            <p className="text-center">
                                {selectedRate === '0점'
                                    ? '⚡'
                                    : selectedRate === '1점'
                                        ? '⭐'
                                        : selectedRate === '2점'
                                            ? '⭐⭐'
                                            : selectedRate === '3점'
                                                ? '⭐⭐⭐'
                                                : selectedRate === '4점'
                                                    ? '⭐⭐⭐⭐'
                                                    : selectedRate === '5점'
                                                        ? '⭐⭐⭐⭐⭐'
                                                        : selectedRate}
                            </p>
                        </div>
                    </ToolOptions>
                </div>
            </div>
        </>
    );
}
