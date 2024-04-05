import {Link} from "react-router-dom";
import GoogleLogin from '../components/login/GoogleLogin';

function Start() {
    return (
        <div className='bg-white'>
            <div className='relative isolate px-6 pt-14 lg:px-8'>
                <div className='mx-auto max-w-2xl py-8 sm:py-12 lg:py-16'>
                    <div className='mb-12 flex justify-center'>
                        <img
                            src={'diary-img.jpeg'}
                            alt={'Logo'}
                            className={'min-w-36 max-w-20'}
                        />
                    </div>

                    <div className='text-center'>
                        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                            알솜달솜 &nbsp;다이어리
                        </h1>
                        <p className='mt-6 text-lg leading-8 text-gray-600'>
                            로그인 후 이용해주세요!
                        </p>
                    </div>
                    <div className='my-8 flex justify-center'>
                        <GoogleLogin />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;
