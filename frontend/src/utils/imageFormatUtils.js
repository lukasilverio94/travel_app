const validImageFormats = ["image/jpeg", "image/png"];

export const isImageValid = (files) => {
  for (let i = 0; i < files.length; i++) {
    if (!validImageFormats.includes(files[i].type)) {
      return false;
    }
  }
  return true;
};
