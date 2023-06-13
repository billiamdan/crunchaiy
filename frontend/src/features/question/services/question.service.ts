import axios from "axios"
import { QuestionDocument } from "../model/Question"
import { NewQuestion } from "../model/NewQuestion"
import { DisplayQuestion } from "../model/DisplayQuestion.interface"

const getQuestions = async () => {
    const response = await axios.get<QuestionDocument[]> (`http://localhost:3000/api/question`)
    return response
}

const addQuestion = async (newQuestion: NewQuestion): Promise<DisplayQuestion | null> => {
    const response = await axios.post(`http://localhost:3000/api/question`, newQuestion);
    return response.data;
}

const deleteQuestion = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/question/${id}`);
}



const questionService = {
    getQuestions,
    addQuestion,
    deleteQuestion
}

export default questionService;
