import axios from "axios"
import { QuestionDocument } from "../model/Question"
import { NewQuestion } from "../model/NewQuestion"
import { DisplayQuestion } from "../model/DisplayQuestion.interface"
import { UpdateQuestionNumber } from "../model/UpdateQuestionNumber.interface"

const getQuestions = async () => {
    const response = await axios.get<QuestionDocument[]> (`http://localhost:3000/api/question`)
    return response
}

const addQuestion = async (newQuestion: NewQuestion): Promise<DisplayQuestion | null> => {
    const response = await axios.post(`http://localhost:3000/api/question`, newQuestion);
    return response.data;
}

const updateQuestion = async (id: string, question: DisplayQuestion): Promise<DisplayQuestion | null> => {
    console.log(question)
    const response = await axios.patch(`http://localhost:3000/api/question/${id}`, question);
    return response.data;
}

const updateQuestionNumber = async (id: string, numberUpdate: UpdateQuestionNumber): Promise<DisplayQuestion | null> => {
    const response = await axios.patch(`http://localhost:3000/api/question/${id}`, numberUpdate);
    return response.data;
}

const updateQuestionBulk = async (QuestionBulkArray: any) => {
    const response = await axios.patch('http://localhost:3000/api/question', QuestionBulkArray);
    return response.data;
}

const deleteQuestion = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/question/${id}`);
}



const questionService = {
    getQuestions,
    addQuestion,
    updateQuestion,
    updateQuestionNumber,
    updateQuestionBulk,
    deleteQuestion
}

export default questionService;
