import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidCEPConstraint implements ValidatorConstraintInterface {
  validate(cep: any) {
    const cepRegex = /^\d{2}\.\d{3}-\d{3}$/;
    return typeof cep === 'string' && cepRegex.test(cep);
  }

  defaultMessage() {
    return 'CEP inválido! O formato correto é XX.XXX-XXX';
  }
}

export function IsValidCEP(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidCEPConstraint,
    });
  };
}
