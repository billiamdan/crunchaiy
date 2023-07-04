export interface Question {
    number: number;
    question: string;
    firstAnswer: string;
    secondAnswer: string
}

export interface QuestionDocument extends Question {
    _id: string;
    __v: number;
}