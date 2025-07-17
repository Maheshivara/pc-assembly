import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { AuthGuard } from '../auth/auth.guard';
import { PaginationOptionsDto } from '../common/dto/pagination.dto';
import { PaginationOptions } from '../common/entities/pagination.entity';
import { isUUID } from 'class-validator';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { RequestWithUser } from '../common/entities/request.entity';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  @UseGuards(AuthGuard)
  async getConfig(
    @Req() req: RequestWithUser,
    @Query() paginationInfo: PaginationOptionsDto,
  ) {
    const pagination = new PaginationOptions(
      paginationInfo.page,
      paginationInfo.perPage,
    );
    return this.configurationService.list(req.user.id, pagination);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @UseGuards(AuthGuard)
  async getConfigById(
    @Req() req: RequestWithUser,
    @Param('id') configId: string,
  ) {
    if (isUUID(configId) === false) {
      throw new NotFoundException('Invalid configuration ID');
    }
    return this.configurationService.getById(req.user.id, configId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteConfigById(
    @Req() req: RequestWithUser,
    @Param('id') configId: string,
  ) {
    if (isUUID(configId) === false) {
      throw new NotFoundException('Invalid configuration ID');
    }
    return this.configurationService.deleteById(req.user.id, configId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @UseGuards(AuthGuard)
  async createConfig(
    @Req() req: RequestWithUser,
    @Body() createConfigDto: CreateConfigDto,
  ) {
    return this.configurationService.create(req.user.id, createConfigDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateConfig(
    @Req() req: RequestWithUser,
    @Param('id') configId: string,
    @Body() updateConfigDto: UpdateConfigDto,
  ) {
    return this.configurationService.update(
      req.user.id,
      configId,
      updateConfigDto,
    );
  }
}
