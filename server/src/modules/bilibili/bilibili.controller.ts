/**
 * Bilibili controller.
 * @file Bilibili 模块控制器
 * @module module/bilibili/controller
 * @author Surmon <https://github.com/surmon-china>
 */

import { UseGuards, Controller, Get, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '@server/guards/auth.guard';
import { QueryParams } from '@server/decorators/query-params.decorator';
import { HttpProcessor } from '@server/decorators/http.decorator';
import { BilibiliService, IBilibiliVideoList } from './bilibili.service';

@Controller('bilibili')
export class BilibiliController {

  constructor(private readonly bilibiliService: BilibiliService) {}

  @Get('list')
  @HttpProcessor.handle('获取视频列表')
  getBilibiliVideos(@QueryParams() { options: { page, limit }}): Promise<IBilibiliVideoList> {
    return this.bilibiliService.isRequestDefaultList(limit, page)
      ? this.bilibiliService.getVideoListCache()
      : this.bilibiliService.getVideoList(limit, page);
  }

  @Patch('list')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('更新视频列表缓存')
  updateBilibiliVideosCache(): Promise<IBilibiliVideoList> {
    return this.bilibiliService.updateVideoListCache();
  }
}
