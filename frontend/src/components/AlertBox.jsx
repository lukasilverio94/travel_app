import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AlertBox = () => {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    showAlert && (
      <div className="w-full max-w-[650px] rounded-xl  bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4">
        <div className="flex">
          <div className="flex-shrink-0">
            {/* Icon */}
            <IoMdClose
              className="h-5 w-5 cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="ml-3">
            {/* Alert Content */}
            <h1 className="text-2xl text-teal-800 my-3">Note: </h1>
            <p className="text-gray-700 font-bold">
              After click on <span className="text-red-800">X</span> of the
              image, it will be deleted from your post
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default AlertBox;
