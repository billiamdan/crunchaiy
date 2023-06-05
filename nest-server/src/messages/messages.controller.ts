import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async addMessage(
    @Body('title') messageTitle: string,
    @Body('description') messageDesc: string,
    @Body('date') messageDate: string,
  ) {
    const generatedId = await this.messagesService.insertMessage(
      messageTitle,
      messageDesc,
      messageDate,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllMessages() {
    const messages = await this.messagesService.getMessages();
    return messages;
  }

  @Get(':id')
  getMessage(@Param('id') messageId: string) {
    return this.messagesService.getSingleMessage(messageId);
  }

  @Patch(':id')
  async updateMessage(
    @Param('id') messageId: string,
    @Body('title') messageTitle: string,
    @Body('description') messageDesc: string,
    @Body('date') messageDate: string,
  ) {
    await this.messagesService.updateMessage(messageId, messageTitle, messageDesc, messageDate);
    return null;
  }

  @Delete(':id')
  async removeMessage(@Param('id') messageId: string) {
      await this.messagesService.deleteMessage(messageId);
      return null;
  }
}
