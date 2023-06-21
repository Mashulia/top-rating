import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @prop()
  countNimber: number;
  @prop()
  juniorSelary: number;
  @prop()
  middleSalary: number;
  @prop()
  seniorSalary: number;
}

export class PageAdvantage {
  @prop()
  title: string;
  @prop()
  description: string;
}

export interface PageModel extends Base {}
export class PageModel extends TimeStamps {
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @prop()
  secondCategory: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({ type: () => [HhData] })
  hh?: HhData;

  @prop({ type: () => [PageAdvantage] })
  advantages: PageAdvantage[];

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({ type: () => [String] })
  tags: string[];
}