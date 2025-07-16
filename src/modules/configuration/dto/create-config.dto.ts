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

  @IsUUID('4', { message: 'Invalid motherboard ID' })
  motherboardId: string;

  @IsUUID('4', { message: 'Invalid CPU ID' })
  cpuId: string;

  @IsUUID('4', { message: 'Invalid CPU Fan ID' })
  cpuFanId: string;

  @IsUUID('4', { message: 'Invalid GPU ID' })
  gpuId: string;

  @IsUUID('4', { message: 'Invalid PSU ID' })
  psuId: string;

  @MinLength(1, { message: 'At least one memory is required' })
  memories: CreateConfigMemoryDto[];

  @MinLength(1, { message: 'At least one storage is required' })
  storages: CreateConfigStorageDto[];
}

class CreateConfigMemoryDto {
  @IsUUID('4', { message: 'Invalid memory ID' })
  memoryId: string;

  @IsPositive({ message: 'Quantity must be a positive number' })
  quantity: number;
}

class CreateConfigStorageDto {
  @IsUUID('4', { message: 'Invalid storage ID' })
  storageId: string;

  @IsPositive({ message: 'Quantity must be a positive number' })
  quantity: number;
}
