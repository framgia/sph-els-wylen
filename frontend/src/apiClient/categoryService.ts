import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import Category from "../interfaces/category";

const createCategory = async (category: Category) => {
  await axiosClient.post(`${apiUrls.CATEGORY}`, category)
}

const listCategories = async () => {
  return await axiosClient.get(`${apiUrls.CATEGORY}`)
}

const getCategory = async (id: number) => {
  return await axiosClient.get(`${apiUrls.CATEGORY}${id}`)
}

const updateCategory = async (category: Category) => {
  const { id, title, description } = category;

  return await axiosClient.patch(
    `${apiUrls.CATEGORY}${id}`, { title, description })
}

export {
  createCategory,
  listCategories,
  getCategory,
  updateCategory,
}
