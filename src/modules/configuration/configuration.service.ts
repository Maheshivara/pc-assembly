import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  PagedResult,
  PaginationOptions,
} from '../common/entities/pagination.entity';
import { UserConfig, UserConfigDetails } from './entities/configuration.entity';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';

@Injectable()
export class ConfigurationService {
  constructor(private prisma: PrismaService) {}

  async list(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PagedResult<UserConfig>> {
    try {
      const total = await this.prisma.userConfig.count({
        where: { userId },
      });

      if (total === 0 || pagination.skip() >= total) {
        return new PagedResult([], pagination.page, pagination.perPage, total);
      }

      const items = await this.prisma.userConfig.findMany({
        where: { userId },
        skip: pagination.skip(),
        take: pagination.take(),
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
        },
      });
      return new PagedResult(items, pagination.page, pagination.perPage, total);
    } catch (error) {
      console.error('Error fetching configuration:', error);
      throw new InternalServerErrorException('Could not fetch configuration');
    }
  }

  async getById(userId: string, configId: string): Promise<UserConfigDetails> {
    try {
      const config = await this.prisma.userConfig.findUnique({
        where: { id: configId, userId },
        select: {
          id: true,
          name: true,
          cpuMpn: true,
          gpuMpn: true,
          psuMpn: true,
          motherboardMpn: true,
          cpuFanMpn: true,
          memories: {
            select: {
              id: true,
              memoryMpn: true,
              quantity: true,
            },
          },
          storages: {
            select: {
              id: true,
              storageMpn: true,
              quantity: true,
            },
          },
          history: {
            select: {
              id: true,
              action: true,
              date: true,
            },
          },
        },
      });

      if (!config) {
        throw new NotFoundException('Configuration not found');
      }
      return config;
    } catch (error) {
      console.error('Error fetching configuration by ID:', error);
      throw new InternalServerErrorException('Could not fetch configuration');
    }
  }

  async deleteById(userId: string, configId: string): Promise<void> {
    try {
      const config = await this.prisma.userConfig.findUnique({
        where: { id: configId, userId },
      });

      if (!config) {
        throw new NotFoundException('Configuration not found');
      }

      await this.prisma.userConfig.delete({
        where: { id: configId },
      });
    } catch (error) {
      console.error('Error deleting configuration:', error);
      throw new InternalServerErrorException('Could not delete configuration');
    }
  }
  async create(
    userId: string,
    createConfigDto: CreateConfigDto,
  ): Promise<UserConfig> {
    try {
      const newConfig = await this.prisma.userConfig.create({
        data: {
          userId,
          name: createConfigDto.name,
          motherboardMpn: createConfigDto.motherboardMpn,
          cpuMpn: createConfigDto.cpuMpn,
          gpuMpn: createConfigDto.gpuMpn,
          psuMpn: createConfigDto.psuMpn,
          cpuFanMpn: createConfigDto.cpuFanMpn,
          memories: {
            create: createConfigDto.memories.map((memory) => ({
              memoryMpn: memory.memoryMpn,
              quantity: memory.quantity,
            })),
          },
          storages: {
            create: createConfigDto.storages.map((storage) => ({
              storageMpn: storage.storageMpn,
              quantity: storage.quantity,
            })),
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      return newConfig;
    } catch (error) {
      console.error('Error creating configuration:', error);
      throw new InternalServerErrorException('Could not create configuration');
    }
  }

  async update(
    userId: string,
    configId: string,
    updateConfigDto: UpdateConfigDto,
  ): Promise<UserConfig> {
    try {
      const existingConfig = await this.prisma.userConfig.findUnique({
        where: { id: configId, userId },
      });

      if (!existingConfig) {
        throw new NotFoundException('Configuration not found');
      }

      const updatedConfig = await this.prisma.userConfig.update({
        where: { id: configId },
        data: {
          userId,
          name: updateConfigDto.name,
          motherboardMpn: updateConfigDto.motherboardMpn,
          cpuMpn: updateConfigDto.cpuMpn,
          gpuMpn: updateConfigDto.gpuMpn,
          psuMpn: updateConfigDto.psuMpn,
          cpuFanMpn: updateConfigDto.cpuFanMpn,
          memories:
            updateConfigDto.memories && updateConfigDto.memories.length > 0
              ? {
                  deleteMany: {},
                  create: updateConfigDto.memories.map((memory) => ({
                    memoryMpn: memory.memoryMpn,
                    quantity: memory.quantity,
                  })),
                }
              : undefined,
          storages:
            updateConfigDto.storages && updateConfigDto.storages.length > 0
              ? {
                  deleteMany: {},
                  create: updateConfigDto.storages.map((storage) => ({
                    storageMpn: storage.storageMpn,
                    quantity: storage.quantity,
                  })),
                }
              : undefined,
          history: {
            create: {
              action: 'Updated configuration',
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      return updatedConfig;
    } catch (error) {
      console.error('Error updating configuration:', error);
      throw new InternalServerErrorException('Could not update configuration');
    }
  }
}
