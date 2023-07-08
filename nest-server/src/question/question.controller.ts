import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDocument } from './question.schema';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Post()
    createQuestion(
        @Body('number') number: number,
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
    updateQuestion(
        @Param('id') id: string,
        @Body('number') number: number,
        @Body('question') question: string,
        @Body('firstAnswer') firstAnswer: string,
        @Body('secondAnswer') secondAnswer: string
    ): Promise<QuestionDocument> {
        return this.questionService.update(id, number, question, firstAnswer, secondAnswer);
    }

    @Patch(':id')
    updateQuestionNumber(
        @Param('id') id: string,
        @Body('number') number: number,
    ): Promise<QuestionDocument> {
        return this.questionService.updateNumber(id, number);
    }

    @Patch()
        updateBulk(@Body() QuestionBulkArray: Array<{ id: string, number: number }>
    ){
        return this.questionService.bulkWrite(QuestionBulkArray);
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.questionService.deleteOne(id);
    }  
}
