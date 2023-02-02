import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class queryBoolPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const result = value ?? false;
    return result === false ? false : true;
  }
}
