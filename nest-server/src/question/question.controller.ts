import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDocument } from './question.schema';
import { QuestionDetails } from './question-details.interface';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Post()
    createQuestion(
        @Body('number') number: string,
        @Body('question') question: string,
        @Body('firstAnswer') firstAnswer: string,
        @Body('secondAnswer') secondAnswer: string
    ) : Promise<QuestionDocument>
    {
        return this.questionService.create(number, question, firstAnswer, secondAnswer)
    }

    @Get()
    findAllQuestions(): Promise<QuestionDocument[]> {
        return this.questionService.findAll();
    }
    
    @Patch(':id')
    addQuestion(
        @Param('id') id: string,
        @Body('number') number: string,
        @Body('question') question: string,
        @Body('first_answer') firstAnswer: string,
        @Body('second_answer') secondAnswer: string
    ): Promise<QuestionDocument> {
        return this.questionService.update(id, number, question, firstAnswer, secondAnswer);
    }

    @Patch(':id')
    updateQuestion(
        @Param('id') id: string,
        @Body('number') number: string,
        @Body('question') question: string,
        @Body('first_answer') firstAnswer: string,
        @Body('second_answer') secondAnswer: string
    ): Promise<QuestionDocument> {
        return this.questionService.update(id, number, question, firstAnswer, secondAnswer);
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.questionService.deleteOne(id);
    }
}
