import { HttpException, HttpStatus } from '@nestjs/common';

export const getErrorMsg = (error: any) => {
  switch (error.code) {
    case 11000:
      throw new HttpException('Record already exists', HttpStatus.CONFLICT);
    default:
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
};