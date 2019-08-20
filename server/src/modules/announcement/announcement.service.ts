/**
 * Announcement service.
 * @file 公告模块数据服务
 * @module module/announcement/service
 * @author Surmon <https://github.com/surmon-china>
 */

import { PaginateResult, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@server/transforms/model.transform';
import { TMongooseModel } from '@server/interfaces/mongoose.interface';
import { Announcement } from './announcement.model';

@Injectable()
export class AnnouncementService {
  constructor(@InjectModel(Announcement) private readonly announcementModel: TMongooseModel<Announcement>) {}

  // 请求公告列表
  public getList(querys, options): Promise<PaginateResult<Announcement>> {
    return this.announcementModel.paginate(querys, options);
  }

  // 创建公告
  public create(announcement: Announcement): Promise<Announcement> {
    return new this.announcementModel(announcement).save();
  }

  // 修改单个公告
  public update(announcementId: Types.ObjectId, announcement: Announcement): Promise<Announcement> {
    return this.announcementModel.findByIdAndUpdate(announcementId, announcement, { new: true }).exec();
  }

  // 删除单个公告
  public delete(announcementId: Types.ObjectId): Promise<Announcement> {
    return this.announcementModel.findByIdAndRemove(announcementId).exec();
  }

  // 批量删除公告
  public batchDelete(announcementIds: Types.ObjectId[]): Promise<any> {
    return this.announcementModel.deleteMany({ _id: { $in: announcementIds }}).exec();
  }
}
