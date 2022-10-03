import axiosClient from "."
import apiUrls from "../constants/apiUrls"
import { AnswerCreation } from './../interfaces/answer';

const createAnswer = async (answer: AnswerCreation) => {
  return await axiosClient.post(`${apiUrls.ANSWER}`, answer)
}

export {
  createAnswer,
}
