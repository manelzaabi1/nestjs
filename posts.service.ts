// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { CreatePostDto } from '../posts/create-post.dto';
import { UpdatePostDto } from '../posts/update-post.dto';

@Injectable()
export class PostsService {
  private posts: PostEntity[] = [];
  private currentId = 1;

  // "Hook" métier avant insertion : status=true, date >= now
  private beforeInsert(dto: CreatePostDto): PostEntity {
    const now = new Date();
    const candidate = new Date(dto.created_at);
    const created_at = candidate < now ? now : candidate;
    const status = dto.status ?? true;

    const post = new PostEntity();
    post._id = this.currentId++;
    post.title = dto.title;
    post.created_at = created_at;
    post.description = dto.description;
    post.status = status;

    return post;
  }

  // CRUD
  create(dto: CreatePostDto) {
    const post = this.beforeInsert(dto);
    this.posts.push(post);
    return post;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((p) => p._id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  update(id: number, dto: UpdatePostDto) {
    const post = this.findOne(id);

    if (dto.title !== undefined) post.title = dto.title;
    if (dto.description !== undefined) post.description = dto.description;
    if (dto.status !== undefined) post.status = dto.status;
    if (dto.created_at !== undefined) {
      const candidate = new Date(dto.created_at);
      post.created_at = candidate < new Date() ? new Date() : candidate;
    }

    return post;
  }

  remove(id: number) {
    const index = this.posts.findIndex((p) => p._id === id);
    if (index === -1) throw new NotFoundException('Post not found');
    const [deleted] = this.posts.splice(index, 1);
    return deleted;
  }

  // Fonction qui regroupe la liste des posts et leur somme
  // Ici : somme des longueurs de description
  sumPosts() {
    const total = this.posts.reduce(
      (acc, p) => acc + p.description.length,
      0,
    );
    return { count: this.posts.length, total };
  }
}
