import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PageModel, TopLevelCategory } from './page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePageDto } from './dto/create-page.dto';
import { Types } from 'mongoose';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>,
  ) {}

  async create(dto: CreatePageDto) {
    return this.pageModel.create(dto);
  }

  async findById(id: string) {
    return this.pageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.pageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.pageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  async findByText(text: string) {
    return this.pageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }

  async deleteById(id: string) {
    return this.pageModel.findByIdAndRemove(id).exec();
  }

  async updateById(id: string | Types.ObjectId, dto: CreatePageDto) {
    return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
