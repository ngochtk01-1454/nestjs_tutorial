import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsEmailUniqueValidator } from '../validators/is-email-unique.validator';

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsEmailUniqueValidator,
    });
  };
}
