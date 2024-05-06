import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer } from '.prisma/client'; // Import the Customer model from Prisma
import { CreateCutomerDto } from './dto/create-cutomer.dto';
import { UpdateCutomerDto } from './dto/update-cutomer.dto';
import {
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger'; // Import Swagger decorators
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { signinEmployeeDto } from './dto/signinEmployeeDto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { v4 } from 'uuid';
import { log } from 'console';

@Injectable()
@ApiTags('customers') // Add a tag for Swagger
export class CustomerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getTokens(user: Customer) {
    const payload = {
      id: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async registration(createCustomerDto: CreateCutomerDto, res: Response) {
    const user = await this.prismaService.customer.findFirst({
      where: {
        email: createCustomerDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('This email is already registered');
    }
    // if (
    //   createCustomerDto.hashed_password !== createCustomerDto.confirm_password
    // ) {
    //   throw new BadRequestException('Passwords do not match');
    // }

    const hashed_password = await bcrypt.hash(
      createCustomerDto.hashed_password,
      10,
    );
    const newUser = await this.prismaService.customer.create({
      data: {
        ...createCustomerDto,
        hashed_password,
      },
    });
    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);
    const activation_link = v4();

    const updateUser = await this.prismaService.customer.update({
      where: { id: newUser.id },
      data: {
        hashed_refresh_token,
        activation_link,
      },
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendMail(updateUser);
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('Error sending email');
    }

    const response = {
      message: 'User registered',
      user: updateUser,
      tokens,
    };
    return response;
  }

  async login(loginDto: signinEmployeeDto, res: Response) {
    const user = await this.prismaService.customer.findFirst({
      where: {
        email: loginDto.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.hashed_password,
      user.hashed_password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.getTokens(user);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Login successful',
      user,
      tokens,
    };
    return response;
  }

  // async getTokens(user: Customer) {
  //   const payload = {
  //     id: user.id,
  //   };

  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(payload, {
  //       secret: process.env.ACCESS_TOKEN_KEY,
  //       expiresIn: process.env.ACCESS_TOKEN_TIME,
  //     }),
  //     this.jwtService.signAsync(payload, {
  //       secret: process.env.REFRESH_TOKEN_KEY,
  //       expiresIn: process.env.REFRESH_TOKEN_TIME,
  //     }),
  //   ]);
  //   return {
  //     access_token: accessToken,
  //     refresh_token: refreshToken,
  //   };
  // }
  // 76___________________________________dars**************
  // try {
  //   await this.mailService.sendMail(updateUser[1][0]);
  // } catch (error) {
  //   console.log('error', error);
  //   throw new BadRequestException('Error sending email');
  // }

  // const response = {
  //   message: 'User registered',
  //   user: updateUser[1][0],
  //   tokens,
  // };
  // return response;

  // async activate(link: string) {
  //   if (!link) {
  //     throw new BadRequestException('Activation link is required');
  //   }

  //   const updatedUser = await this.prismaService.customer.update(
  //     { is_active: true },
  //     { where: { activation_link: link, is_active: false }, returning: true },
  //   );
  //   if (!updatedUser[1][0]) {
  //     throw new BadRequestException('User already activated');
  //   }
  //   const response = {
  //     message: 'User activated successfully',
  //     user: updatedUser[1][0].is_active,
  //   };

  //   return response;
  // }

  // async login(loginUserDto: LoginUserDto, res: Response) {
  //   const { email, password } = loginUserDto;
  //   const user = await this.userRepo.findOne({ where: { email } });

  //   if (!user) {
  //     throw new BadRequestException('user not found');
  //   }
  //   if (!user.is_active) {
  //     throw new BadRequestException('user it not activated');
  //   }
  //   const isMatchPass = await bcrypt.compare(password, user.hashed_password);
  //   if (!isMatchPass) {
  //     throw new BadRequestException('Password do not  match');
  //   }
  //   const tokens = await this.getTokens(user);
  //   console.log('tokens ', tokens);
  //   const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
  //   const updateUser = await this.userRepo.update(
  //     { hashed_refresh_token },
  //     {
  //       where: { id: user.id },
  //       returning: true,
  //     },
  //   );
  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 15 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   const response = {
  //     message: 'User logged in',
  //     user: updateUser[1][0],
  //     tokens,
  //   };
  //   return response;
  // }
  // async logout(refreshToken: string, res: Response) {
  //   const userData = await this.jwtService.verify(refreshToken, {
  //     secret: process.env.REFRESH_TOKEN_KEY,
  //   });
  //   if (!userData) {
  //     throw new ForbiddenException('user not verifed');
  //   }

  //   const updateUser = await this.userRepo.update(
  //     {
  //       hashed_refresh_token: null,
  //     },
  //     {
  //       where: { id: userData.id },
  //       returning: true,
  //     },
  //   );
  //   res.clearCookie('refresh_token');
  //   const response = {
  //     message: 'user logged out successfully',
  //     user_refresh_token: updateUser[1][0].hashed_refresh_token,
  //   };
  //   return response;
  // }

  // async refreshToken(userId: number, refreshToken: string, res: Response) {
  //   const decodedToken = await this.jwtService.decode(refreshToken);

  //   if (userId !== decodedToken['id']) {
  //     throw new BadRequestException('Ruxsat etilamgan ');
  //   }

  //   const user = await this.userRepo.findOne({ where: { id: userId } });

  //   if (!user || !user.hashed_refresh_token) {
  //     throw new BadRequestException('user not found');
  //   }
  //   const tokenMatch = await bcrypt.compare(
  //     refreshToken,
  //     user.hashed_refresh_token,
  //   );

  //   if (!tokenMatch) {
  //     throw new ForbiddenException('Forbidden');
  //   }
  //   const tokens = await this.getTokens(user);
  //   console.log('tokens ', tokens);
  //   const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
  //   const updateUser = await this.userRepo.update(
  //     { hashed_refresh_token },
  //     {
  //       where: { id: user.id },
  //       returning: true,
  //     },
  //   );
  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 15 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   const response = {
  //     message: 'User refreshed',
  //     user: updateUser[1][0],
  //     tokens,
  //   };
  //   return response;
  // }
  // // 77-dars bu yerda biz bilan shug'ullanadi;
  // async findUser(findUserDto: FindeUserDto) {
  //   const where = {};
  //   if (findUserDto.full_name) {
  //     where['full_name'] = {
  //       [Op.like]: `%${findUserDto.full_name}%`,
  //     };
  //   }
  //   if (findUserDto.email) {
  //     where['email'] = {
  //       [Op.like]: `%${findUserDto.email}%`,
  //     };
  //   }
  //   if (findUserDto.phone) {
  //     where['phone'] = {
  //       [Op.like]: `%${findUserDto.phone}%`,
  //     };
  //   }
  //   if (findUserDto.tg_link) {
  //     where['tg_link'] = {
  //       [Op.like]: `%${findUserDto.tg_link}%`,
  //     };
  //   }
  //   console.log(where);
  //   const users = await this.userRepo.findAll({ where });
  //   if (users.length == 0) {
  //     throw new BadRequestException('user not  found');
  //   }

  //   return users;
  // }

  @ApiBadRequestResponse({ description: 'Bad Request' }) // Swagger documentation for BadRequest
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async create(createCustomerDto: CreateCutomerDto): Promise<Customer> {
    return this.prismaService.customer.create({
      data: {
        name: createCustomerDto.name,
        email: createCustomerDto.email,
        phone: createCustomerDto.phone,
        hashed_password: createCustomerDto.hashed_password,
        //         hashed_password String
        // activation_link String?

        


      },
    });
  }

  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async findAll(): Promise<Customer[]> {
    return this.prismaService.customer.findMany();
  }

  @ApiNotFoundResponse({ description: 'Customer Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async findOne(id: number): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  @ApiNotFoundResponse({ description: 'Customer Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async update(
    id: number,
    updateCustomerDto: UpdateCutomerDto,
  ): Promise<Customer> {
    const existingCustomer = await this.prismaService.customer.findUnique({
      where: {
        id,
      },
    });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.prismaService.customer.update({
      where: {
        id,
      },
      data: {
        name: updateCustomerDto.name,
        email: updateCustomerDto.email,
        phone: updateCustomerDto.phone,
      },
    });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('refresh_token');
    return { message: 'User logged out successfully' };
  }

  @ApiNotFoundResponse({ description: 'Customer Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async remove(id: number): Promise<void> {
    const existingCustomer = await this.prismaService.customer.findUnique({
      where: {
        id,
      },
    });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    await this.prismaService.customer.delete({
      where: {
        id,
      },
    });
  }
}
