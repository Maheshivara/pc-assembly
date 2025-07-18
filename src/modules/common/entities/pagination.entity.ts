import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PagedResult<T> {
  items: T[];
  page: number;
  perPage: number;
  total: number;

  constructor(items: T[], page: number, perPage: number, total: number) {
    this.items = items;
    this.page = page;
    this.perPage = perPage;
    this.total = total;
  }
}

export class PaginationOptions {
  @IsInt({ message: 'Page must be an integer.' })
  @Min(1, { message: 'Page must be at least 1.' })
  @Transform(({ value }) => Number(value))
  page: number;

  @IsInt({ message: 'Items per page must be an integer.' })
  @Min(10, { message: 'Items per page must be at least 10.' })
  @Transform(({ value }) => Number(value))
  perPage: number;

  constructor(page: number = 1, perPage: number = 10) {
    this.page = page;
    this.perPage = perPage;
  }

  skip(): number {
    return (this.page - 1) * this.perPage;
  }

  take(): number {
    return this.perPage;
  }
}
