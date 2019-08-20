/**
 * App module.
 * @file App 主模块
 * @module app/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '@server/app.controller';

// 拦截器
import { HttpCacheInterceptor } from '@server/interceptors/cache.interceptor';

// 中间件
import { CorsMiddleware } from '@server/middlewares/cors.middleware';
import { OriginMiddleware } from '@server/middlewares/origin.middleware';

// 公共模块
import { DatabaseModule } from '@server/processors/database/database.module';
import { CacheModule } from '@server/processors/cache/cache.module';
import { HelperModule } from '@server/processors/helper/helper.module';

// 业务模块（辅助）
import { SitemapModule } from '@server/modules/sitemap/sitemap.module';
import { ExpansionModule } from '@server/modules/expansion/expansion.module';
import { MusicModule } from '@server/modules/music/music.module';
import { BilibiliModule } from '@server/modules/bilibili/bilibili.module';
import { WallpaperModule } from '@server/modules/wallpaper/wallpaper.module';

// 业务模块（核心）
import { AuthModule } from '@server/modules/auth/auth.module';
import { OptionModule } from '@server/modules/option/option.module';
import { AnnouncementModule } from '@server/modules/announcement/announcement.module';
import { TagModule } from '@server/modules/tag/tag.module';
import { CategoryModule } from '@server/modules/category/category.module';
import { ArticleModule } from '@server/modules/article/article.module';
import { CommentModule } from '@server/modules/comment/comment.module';
import { LikeModule } from '@server/modules/like/like.module';

import * as APP_CONFIG from '@server/app.config';

@Module({
  imports: [
    HelperModule,
    DatabaseModule,
    CacheModule,

    AuthModule,
    OptionModule,
    AnnouncementModule,
    TagModule,
    CategoryModule,
    ArticleModule,
    CommentModule,
    LikeModule,

    ExpansionModule,
    MusicModule,
    BilibiliModule,
    WallpaperModule,
    SitemapModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
