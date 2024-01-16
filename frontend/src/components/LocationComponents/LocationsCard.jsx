// LocationCard.jsx
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function LocationCard({
  title,
  description,
  markerIcon,
  imageSrc,
  altText,
}) {
  return (
    <div className="bg-white mt-4 p-6 rounded-lg shadow-md  dark:bg-gray-800 dark:text-slate-300 leading-loose">
      <h4 className="pb-3 text-4xl font-bold text-teal-600 dark:text-white">
        {title}
      </h4>
      <p className="pb-6 text-lg text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <h4 className="pb-3 text-2xl font-bold text-gray-800 dark:text-slate-200 flex items-center gap-1">
        <FaMapMarkerAlt className="text-orange-700" />
        <span>{markerIcon}</span>
      </h4>
      <div className="relative overflow-hidden max-h-[350px] h-auto rounded-md shadow-lg">
        <img
          className="w-full h-full object-cover bg-center"
          src={imageSrc}
          alt={altText}
        />
      </div>
    </div>
  );
}
