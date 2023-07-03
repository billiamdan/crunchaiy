import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type QuestionDocument = Question & Document;

@Schema() 
export class Question{
    @Prop({required: true})
    number: string;
    @Prop({required: true})
    question: string;
    @Prop({required: true})
    firstAnswer: string;
    @Prop({required: true})
    secondAnswer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);