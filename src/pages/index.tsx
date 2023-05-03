import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';

const CropImage = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [imageSrc, setImageSrc] = useState("");

    const onFileChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader: any = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener("load", () => {
                setImageSrc(reader.result);
            });
        }
    };
    const getCroppedImg = (imageSrc: any, croppedAreaPixels: any) => {
        console.log(imageSrc, "imageSrc")
        const canvas: any = document.createElement("canvas");
        const scaleX = 400 / imageSrc.width;
        const scaleY = 400 / imageSrc.height;
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx: any = canvas.getContext("2d");
        if (
            typeof imageSrc === 'object' &&
            (imageSrc instanceof HTMLImageElement ||
                imageSrc instanceof HTMLCanvasElement ||
                imageSrc instanceof HTMLVideoElement)
        ) {
            ctx.drawImage(
                imageSrc,
                croppedAreaPixels.x * scaleX,
                croppedAreaPixels.y * scaleY,
                croppedAreaPixels.width * scaleX,
                croppedAreaPixels.height * scaleY,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );
        }


        return new Promise((resolve) => {
            canvas.toBlob((blob: any) => {
                resolve(blob);
            }, "image/jpeg", 1);
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", imageSrc);
        const croppedImage: any = await getCroppedImg(imageSrc, croppedAreaPixels);
        formData.append("croppedImage", croppedImage);
        console.log(croppedImage)
        // send the formData object to the server using fetch or axios
    };
    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <div style={{ width: '200px', height: '200px', position: 'relative' }}>
                {imageSrc && (
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        cropSize={{ width: 150, height: 150 }}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, croppedAreaPixels: any) =>
                            setCroppedAreaPixels(croppedAreaPixels)
                        }
                    />
                )}
            </div>

            <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    );
};

export default CropImage;
