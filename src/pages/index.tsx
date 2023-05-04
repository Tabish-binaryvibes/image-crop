// import React, { useState, useRef } from 'react';
// import Cropper, { CropperProps } from 'react-easy-crop';

// const CropImage = () => {
//     const [crop, setCrop] = useState({ x: 0, y: 0 });
//     const [zoom, setZoom] = useState(1);
//     const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//     const [croppedImage, setCroppedImage] = useState("");
//     const cropperRef = useRef<any>(null);


//     const onFileChange = (e: any) => {
//         if (e.target.files && e.target.files.length > 0) {
//             const reader: any = new FileReader();
//             reader.readAsDataURL(e.target.files[0]);
//             reader.addEventListener("load", () => {
//                 setImageSrc(reader.result);
//             });
//         }
//     };
//     const getCroppedImg = (imageSrc: any, croppedAreaPixels: any) => {
//         const canvas: any = document.createElement("canvas");
//         console.log(imageSrc)
//         const scaleX = imageSrc.naturalWidth / imageSrc.width;
//         const scaleY = imageSrc.naturalHeight / imageSrc.height;
//         canvas.width = croppedAreaPixels.width;
//         canvas.height = croppedAreaPixels.height;
//         const ctx: any = canvas.getContext("2d");
//         console.log(scaleX)
//         console.log(scaleY)

//         ctx?.drawImage(
//             imageSrc,
//             croppedAreaPixels.x * scaleX,
//             croppedAreaPixels.y * scaleY,
//             croppedAreaPixels.width * scaleX,
//             croppedAreaPixels.height * scaleY,
//             0,
//             0,
//             croppedAreaPixels.width,
//             croppedAreaPixels.height
//         );
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("image", imageSrc);
//         const croppedImage: any = await getCroppedImg(imageSrc, croppedAreaPixels);
//         formData.append("croppedImage", croppedImage);
//         console.log(croppedImage)

//         setCroppedImage(croppedImage);
//     };

//     return (
//         <div>
//             <input type="file" onChange={onFileChange} />
//             <div style={{ width: '200px', height: '200px', position: 'relative' }}>
//                 {imageSrc && (
//                     <Cropper
//                         ref={cropperRef}
//                         image={imageSrc}
//                         crop={crop}
//                         cropSize={{ width: 150, height: 150 }}
//                         zoom={zoom}
//                         aspect={1}
//                         onCropChange={setCrop}
//                         onZoomChange={setZoom}
//                         onCropComplete={(_, croppedAreaPixels: any) =>
//                             setCroppedAreaPixels(croppedAreaPixels)
//                         }
//                     />
//                 )}
//             </div>

//             <button onClick={(e) => handleSubmit(e)}>Submit</button>
//         </div>
//     );
// };

// export default CropImage;

import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'

import getCroppedImg from '../components/cropImage'


const Demo = () => {
    const [imageSrc, setImageSrc] = useState<any>(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState("")

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])



    const onFileChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader: any = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener("load", () => {
                setImageSrc(reader.result);
            });
        }
    };

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage: any = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', croppedImage)
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])

    const onClose = useCallback(() => {
        setCroppedImage("")
    }, [])

    return (
        <div style={{ margin: "1rem auto", width: "500px" }}>
            <input type="file" onChange={onFileChange} style={{ margin: "1rem 0 1rem 0" }} />
            <div style={{ width: '200px', height: '200px', position: 'relative' }}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropSize={{ width: 100, height: 100 }}
                />
            </div>
            <div style={{ margin: "1rem 0 1rem 0" }}>
                <button
                    onClick={showCroppedImage}
                    color="primary"
                >
                    Show Result
                </button>
            </div>
            <img src={croppedImage} width={200} height={200} />
        </div>
    )
}

export default Demo;