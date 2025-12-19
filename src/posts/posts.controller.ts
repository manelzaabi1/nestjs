import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post as PostMethod,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';
import { StatusInterceptor } from './status.interceptor';

@Controller('posts')
@UseInterceptors(StatusInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @PostMethod()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Get('stats/sum')
  sum() {
    return this.postsService.sumPosts();
  }
}
