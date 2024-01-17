// uploadController.js

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import multer from "multer";
import app from "../config/firebase.config.js";

const storage = getStorage(app);
const upload = multer({ storage: multer.memoryStorage() });

export const uploadImage = async (files) => {
  try {
    const imagePaths = [];

    for (const file of files) {
      const fileName = new Date().getTime() + file.originalname;
      const storageRef = ref(storage, "images/" + fileName);
      await uploadBytesResumable(storageRef, file.buffer, {
        contentType: file.mimetype,
      });

      const publicUrl = await getDownloadURL(storageRef);
      console.log("File available at", publicUrl);
      imagePaths.push(publicUrl);
    }

    return imagePaths;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};

//Delete data on firebase
export const deleteImageFromStorage = async (imageUrl) => {
  const storage = getStorage(app);
  const imageRef = ref(storage, imageUrl);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting file from Firebase Storage:", error);
    throw error;
  }
};

export { upload };
