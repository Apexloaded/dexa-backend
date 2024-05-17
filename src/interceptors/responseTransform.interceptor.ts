import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private errorMap: Record<string, any> = {
    CastError_ObjectId: NotFoundException,
    ValidationError: BadRequestException,
    MongoError_11000: ConflictException,
    NotFound: NotFoundException,
    Unauthorized: UnauthorizedException,
    Forbidden: ForbiddenException,
    default: InternalServerErrorException,
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      catchError((error) => {
        Logger.log(
          `\n<<<<<<<<<<FIX ERROR NOW>>>>>>>>>>\n ${error} +${
            Date.now() - now
          }ms \n<<<<<<<<<<FIX ERROR NOW>>>>>>>>>>\n`,
          context.getClass().name,
        );
        return throwError(() => this.getException(error));
      }),
      map((data) => {
        console.log(data)
        return {
          status: 'kk',
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data?.message,
          data: data,
        };
      }),
    );
  }

  private getException(error: any): any {
    const errorType = this.getErrorType(error);
    const ExceptionClass = this.errorMap[errorType] || this.errorMap.default;
    const errorMsg = this.getErrorDetails(errorType, error);
    return new ExceptionClass(errorMsg);
  }

  private getErrorType(error: any): string {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return 'MongoError_11000';
    }
    return `${error.name}_${error.kind || error.code}`;
  }

  private getErrorDetails(errorType: any, error: any): string {
    console.log(errorType);
    console.log(error);
    switch (errorType) {
      case 'CastError_ObjectId':
        return 'invalid id parameter passed';
      case 'ValidationError':
        return 'Validation error';
      case 'MongoError_11000':
        return 'Duplicate key error';
      case 'NotFound':
        return 'Resource not found';
      case 'Unauthorized':
        return 'Unauthorized access';
      case 'Forbidden':
        return 'Access forbidden';
      default:
        return error.response ? error.response : error.message;
    }
  }
}
