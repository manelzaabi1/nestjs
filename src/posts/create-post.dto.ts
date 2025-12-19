// src/DTOS/posts/create-post.dto.ts
import { IsBoolean, IsDateString, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(5)                 // title min 5 caractères
  title: string;

  @IsDateString()
  created_at: string;           // sera converti en Date

  @IsString()
  @MinLength(5)                 // description min 5 caractères
  description: string;

  @IsBoolean()
  status: boolean;
}
