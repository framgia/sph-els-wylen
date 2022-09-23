import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import User from "../interfaces/user";

const registerUser = async (user: User) => {
  await axiosClient.post(`${apiUrls.REGISTRATION}`, user)
}

export {
  registerUser,
};