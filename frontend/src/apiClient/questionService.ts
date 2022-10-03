import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import { QuestionCreation } from "../interfaces/question";

const createQuestion = async (question: QuestionCreation) => {
  return await axiosClient.post(`${apiUrls.QUESTION}`, question)
}

const listQuestionsByCategory = async (categoryId: number) => {
  return await axiosClient.get(`questions?category=${categoryId}`)
}

export {
  createQuestion,
  listQuestionsByCategory
};
