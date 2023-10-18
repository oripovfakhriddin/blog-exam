import { ENDPOINT } from "../constants";

export const getCatePostImage = (photo) => {
  let img = `${ENDPOINT}/upload/${photo?._id}.${photo?.name?.split(".")[1]}`;
  return img;
};

const getUserImage = (photo) => {
  return `${ENDPOINT}upload/${photo}`;
};

export default getUserImage;
