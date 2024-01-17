import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { getDownloadURL, ref } from "firebase/storage";

export default function Carousel({ images, storage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [downloadURLs, setDownloadURLs] = useState([]);

  useEffect(() => {
    const fetchDownloadURLs = async () => {
      if (!storage || !images || images.length === 0) {
        return; // Return early if storage or images are not available
      }

      setCurrentIndex(0);

      const urls = [];
      for (const image of images) {
        if (image) {
          // Check if the image is not null or undefined
          try {
            const imageRef = ref(storage, image);
            const url = await getDownloadURL(imageRef);
            urls.push(url);
          } catch (error) {
            console.error(`Error fetching URL for image '${image}':`, error);
          }
        } else {
          console.warn("Skipping null or undefined image in the array.");
        }
      }
      setDownloadURLs(urls);
    };

    fetchDownloadURLs();
  }, [images, storage]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (!downloadURLs || downloadURLs.length === 0) {
    return null;
  }

  return (
    <div className="w-full lg:max-w-[550px] h-[400px] md:ms-24 lg:ms-10 pb-10 relative group">
      {downloadURLs.map((url, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${url})` }}
          className={`w-full h-full rounded-2xl bg-center bg-cover duration-500 ${
            index === currentIndex ? "" : "hidden"
          }`}
        ></div>
      ))}
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {downloadURLs.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${
              slideIndex === currentIndex ? "text-teal-600" : "text-gray-400"
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
