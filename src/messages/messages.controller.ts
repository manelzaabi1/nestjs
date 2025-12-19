import { Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages(){
        console.log("Message List")
    }
    @Get('/:id')
    listMessageById(){
        console.log("get message by id")
    }
    @Post()
    createmessage(){
        console.log("Create Message")
    }
}
