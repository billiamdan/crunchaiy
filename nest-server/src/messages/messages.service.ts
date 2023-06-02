import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './message.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {

  constructor (@InjectModel('Message') private readonly messageModel: Model<Message>) {}

  async insertMessage(title: string, desc: string, date: string) {
    const newMessage = new this.messageModel({
      title: title, 
      description: desc, 
      date: date
    });
    const result = await newMessage.save();
    console.log(result.id)
    return result.id as string;
  }

  async getMessages() {
    const messages = await this.messageModel.find().exec();
    return messages.map((message) => ({
      id: message.id, 
      title: message.title,
      description: message.description,
      date: message.date   
    }));
  }

  async getSingleMessage(messageId: string) {
    const message = await this.findMessage(messageId);
    return {
      id: message.id, 
      title: message.title,
      description: message.description,
      date: message.date   
    };
  }

  async updateMessage(messageId: string, title: string, desc: string, date: string) {
    const updatedMessage = await this.findMessage(messageId);
    if (title) {
      updatedMessage.title = title;
    }
    if (desc) {
      updatedMessage.description = desc;
    }
    if (date) {
      updatedMessage.date = date;
    }
    updatedMessage.save();
  }

  async deleteMessage(messageId: string) {
      const result = await this.messageModel.deleteOne({_id: messageId}).exec();
      // if (result.n === 0) {
      //   throw new NotFoundException('Could not find message.');
      // }
      // console.log(result)
  }

  private async findMessage(id: string): Promise<Message> {
    let message;
    try {
      message = await this.messageModel.findById(id).exec();;
    } catch (error) {
      throw new NotFoundException('Could not find message.');
    }
    
    if (!message) {
      throw new NotFoundException('Could not find message.');
    }
    return message;
  }
}
