import Joi from 'joi';

export const VALIDATOR = {
  unixTimestamp: () => {
    const v = Joi.number()
      .integer()
      .positive()
      .custom((value, helpers) => {
        const isValid = Number.isInteger(value) && ('' + value).length === 10;
        if (!isValid) {
          return helpers.error('any.invalid');
        }
        return value;
      });
    return v;
  },
  schemaValidate: <ReturnValue = any>(
    Schema: Joi.Schema<ReturnValue>,
    input: any
    // ): TValidationResult<ReturnValue> => {
  ): ReturnValue => {
    const { value, error } = Schema.validate(input);
    if (error) {
      throw new Error(error.message);
      // return { error, message: error.details[0].message, value: null };
    }
    // return { value: value as ReturnValue, error: null, message: 'Valid' };
    return value;
  },
};
