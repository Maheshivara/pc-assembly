import { PartialType } from '@nestjs/mapped-types';
import { PaginationOptions } from '../entities/pagination.entity';

export class PaginationOptionsDto extends PartialType(PaginationOptions) {}
