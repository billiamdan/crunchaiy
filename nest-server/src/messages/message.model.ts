
import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
})

export interface Message extends mongoose.Document {

    id: string;
    title: string;
    description: string;
    date: string;

}
