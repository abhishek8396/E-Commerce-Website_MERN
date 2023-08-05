import React, { useEffect, useState } from 'react'
import image1 from "../Image/image1.jpeg.jpg"
import image2 from "../Image/image2.jpeg.jpg"
import image3 from "../Image/image3.jpeg.jpg"
import image4 from "../Image/image4.jpeg.jpg"
import image5 from "../Image/image5.jpeg.jpg"
import "../Style/Slider.css"

const Slider = () => {
    const [img, setImg]= useState(0);
    const [allImg ]=useState([image1, image2, image3, image4, image5])
    useEffect(() => {
        const interval = setInterval(() => {
            setImg(img => img < 4 ? img + 1 : 0);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

  return (
    <>
      <img className='img-all' src={allImg[img]} alt="empty"/>
    </>
  )
}

export default Slider
