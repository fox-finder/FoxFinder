/**
 * Article module.
 * @file 文章模块
 * @module module/article/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module } from '@nestjs/common';
import { SitemapModule } from '@server/modules/sitemap/sitemap.module';
import { CategoryModule } from '@server/modules/category/category.module';
import { TagModule } from '@server/modules/tag/tag.module';
import { ArticleController } from './article.controller';
import { ArticleProvider } from './article.model';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TagModule,
    CategoryModule,
    SitemapModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleProvider, ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
