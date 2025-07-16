import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('Error finding user:', error);
      throw new InternalServerErrorException('Could not find user');
    }
  }

  async create(userData: CreateUserDto): Promise<User> {
    try {
      return this.prisma.user.create({
        data: userData,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Could not add user');
    }
  }

  async updateOne(id: string, updateData: UpdateUserDto): Promise<User> {
    try {
      return this.prisma.user.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Could not update user');
    }
  }

  async deleteOne(id: string): Promise<true> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Could not delete user');
    }
  }
}
