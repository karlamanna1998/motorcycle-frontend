import { useState } from "react";
import "./imageComponent.css"

interface ImageComponentProps {
    src: string;
    width : number;
    height : number;
}


export default function ImageComponent({ src , width , height }: ImageComponentProps) {

    const [imageLoaded , setImageLoaded] = useState(false)

    return (
        <>
            {!imageLoaded && <div className="imagePlaceholder">loading...</div>}
            <img className="image" style={{visibility : imageLoaded ? 'visible' : 'hidden' , height :  imageLoaded ? 'auto' : '200px'}} src={src} width={width} height={height} loading="lazy" onLoad={()=>setImageLoaded(true)}/>
        </>
    )

}