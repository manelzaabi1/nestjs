import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { VoituresModule } from './voitures/voitures.module';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';


@Module({
  imports: [MessagesModule, UsersModule, VoituresModule,  PostsModule],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
