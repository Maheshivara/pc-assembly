import { Transform } from 'class-transformer';
import {
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateConfigDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @IsString({ message: 'Motherboard MPN must be a string' })
  motherboardMpn: string;

  @IsString({ message: 'CPU MPN must be a string' })
  cpuMpn: string;

  @IsString({ message: 'CPU Fan MPN must be a string' })
  cpuFanMpn: string;

  @IsString({ message: 'GPU MPN must be a string' })
  gpuMpn: string;

  @IsString({ message: 'PSU MPN must be a string' })
  psuMpn: string;

  @MinLength(1, { message: 'At least one memory is required' })
  memories: CreateConfigMemoryDto[];

  @MinLength(1, { message: 'At least one storage is required' })
  storages: CreateConfigStorageDto[];
}

class CreateConfigMemoryDto {
  @IsString({ message: 'Memory MPN must be a string' })
  memoryMpn: string;

  @IsPositive({ message: 'Quantity must be a positive number' })
  @Transform(({ value }) => Number(value))
  quantity: number;
}

class CreateConfigStorageDto {
  @IsString({ message: 'Storage MPN must be a string' })
  storageMpn: string;

  @IsPositive({ message: 'Quantity must be a positive number' })
  @Transform(({ value }) => Number(value))
  quantity: number;
}
