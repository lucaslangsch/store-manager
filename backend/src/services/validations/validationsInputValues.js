const { insertProductSchema } = require('./schema');

const validateNameProduct = (keysObjectToValidate) => {
  const { error } = insertProductSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNameProduct,
};
