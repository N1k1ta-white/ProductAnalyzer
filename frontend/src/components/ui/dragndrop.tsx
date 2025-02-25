import React from 'react';
import { useDropzone } from 'react-dropzone';

interface DragAndDropProps {
    images: {isFromDataBase: boolean, url: string}[],
    onImagesUploaded: (images: {isFromDataBase: boolean, url: string}[]) => void; // Функция, которая передает изображения в родительский компонент
    className?: string;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onImagesUploaded, images, className }) => {

    const onDrop = (acceptedFiles: File[]) => {
        if (images.length + acceptedFiles.length <= 3) {
            const imageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
            const updatedImages = [...images, ...imageUrls.map(url => ({ isFromDataBase: false, url: url }))]
            onImagesUploaded(updatedImages);
        } else {
            alert('Можно загрузить не более 3 изображений');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    // Удаление изображений
    const handleRemoveImage = async (image: {isFromDataBase: boolean, url: string}) => {
        try {
            if(!image.isFromDataBase) {
                onImagesUploaded(images.filter((img) => img.url !== image.url));
            } else {

            }
        } catch (error) {
            alert("Ошибка при удалении изображения: " + (error as Error).message);
        }
    };

    return (
        <div className={`${className} p-4`}>
            <div {...getRootProps()} className="border-dashed border-2 p-6 text-center cursor-pointer">
                <input {...getInputProps()} />
                <p>Перетащите изображения сюда или кликните для выбора</p>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image.url} alt={`Preview ${index + 1}`} className="w-full h-auto rounded-lg" />
                        <button
                            onClick={() => handleRemoveImage(image)}
                            className={`absolute top-1 right-1 ${image.isFromDataBase ? 'bg-amber-950' : 'bg-red-500'} text-white rounded-full w-4 h-4 leading-4`}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragAndDrop;
