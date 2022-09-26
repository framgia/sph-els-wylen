import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import Category from "../interfaces/category";

const createCategory = async (category: Category) => {
  await axiosClient.post(`${apiUrls.CATEGORY}`, category)
}

const listCategories = async () => {
  return await axiosClient.get(`${apiUrls.CATEGORY}`)
}


export {
  createCategory,
  listCategories,
}
