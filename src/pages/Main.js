import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserCalendar from '../components/UserCalendar';
import DailyModal from '../components/DailyModal';

function Main() {
    return (
        <div className='bg-white flex flex-col sm:flex-row'>
            <div className='flex flex-row sm:flex-col sm:text-center sm:items-center'>
                <div className='flex grow sm:grow-0 items-center pl-5'>
                    다이어리
                </div>
                <img
                    src={'diary-img.jpeg'}
                    alt={'Logo'}
                    className={'hidden sm:block max-w-28'}
                />
                <div className='flex gap-x-6'>
                    <Link
                        to={`/insight`}
                        className='text-center w-36 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        {'인사이트'}
                    </Link>
                </div>
            </div>
            <div className='min-h-60 flex grow justify-center'>
                {/* 달력 */}
                <UserCalendar />
            </div>
        </div>
    );
}

export default Main;
