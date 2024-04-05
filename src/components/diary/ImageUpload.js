import { PhotoIcon} from '@heroicons/react/24/solid'
import { useState } from 'react';
export default function ImageUpload({ onImageChange }){
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                console.log('Selected Image:', reader.result);
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };

    const handleDeleteImage =() => {
        setSelectedImage(null);
    }

    return(
        <div className="mt-3 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
                {selectedImage ? (
                    <div>
                        <img className="inputImage" src={selectedImage} alt="Selected"
                             style={{ objectFit:'contain' }}/>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>수정하기</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />

                            </label>
                        </div>

                        {/* 이미지 있을 때 삭제하는 버튼 */}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                            <button
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                onClick={handleDeleteImage}
                            >
                                <span>삭제</span>
                            </button>
                        </div>
                    </div>

                ) : (
                    <>
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>사진 업로드하기</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                            </label>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}