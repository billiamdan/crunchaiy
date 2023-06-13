import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionDocument } from './question.schema';
import { QuestionDetails } from './question-details.interface';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel('Question') 
        private readonly questionModel: Model<QuestionDocument>
    ) {}

    async create(
        number: string,
        question: string,
        firstAnswer: string,
        secondAnswer: string
        ): Promise<QuestionDocument> {
        const newQuestion = new this.questionModel({number, question, firstAnswer, secondAnswer});
        return newQuestion.save();
    }

    async findAll(): Promise<QuestionDocument[]> {
        return this.questionModel.find().exec();
      }

    async find(id: string): Promise<QuestionDocument> {
        return this.questionModel.findById(id).exec();
    }

    async update(
        id: string, 
        newNumber: string, 
        newQuestion: string, 
        newFirstAnswer: string,
        newSecondAnswer: string): Promise<QuestionDocument> {
            let existingQuestion = await this.find(id);
            existingQuestion.number = newNumber || existingQuestion.number;
            existingQuestion.question = newQuestion || existingQuestion.question;
            existingQuestion.firstAnswer = newFirstAnswer || existingQuestion.firstAnswer;
            existingQuestion.secondAnswer = newSecondAnswer || existingQuestion.secondAnswer;
            return existingQuestion.save();
    }

    async deleteOne(id: string) {
        const result = await this.questionModel.deleteOne({_id: id}).exec();
        return result
    }
}