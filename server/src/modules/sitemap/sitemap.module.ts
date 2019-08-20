/**
 * Sitemap module.
 * @file Sitemap 模块
 * @module module/sitemap/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module } from '@nestjs/common';
import { CategoryProvider } from '@server/modules/category/category.model';
import { ArticleProvider } from '@server/modules/article/article.model';
import { TagProvider } from '@server/modules/tag/tag.model';
import { SitemapController } from './sitemap.controller';
import { SitemapService } from './sitemap.service';

@Module({
  controllers: [SitemapController],
  providers: [
    TagProvider,
    CategoryProvider,
    ArticleProvider,
    SitemapService,
  ],
  exports: [SitemapService],
})
export class SitemapModule {}
