import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="flex items-center justify-center h-screen  bg-fixed bg-center bg-parallax bg-cover min-w-full">
      <h1 className=" text-white font-light text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl uppercase">
        share your adventures
      </h1>
    </div>
  );
}
