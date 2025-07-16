import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  @UseGuards(AuthGuard)
  async getInfo(@Req() req: any) {
    const info = {
      email: req.user.email,
      username: req.user.username,
    };
    return info;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('')
  @UseGuards(AuthGuard)
  async updateUser(@Req() req: any, @Body() body: UpdateUserDto) {
    return this.userService.updateOne(req.user.id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('')
  @UseGuards(AuthGuard)
  async deleteUser(@Req() req: any) {
    return this.userService.deleteOne(req.user.id);
  }
}
