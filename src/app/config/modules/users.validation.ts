const Joi = require('joi')

const fullValidationNameSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
})

const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
})

const orderValidationSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.string().required(),
  quantity: Joi.string().required(),
})

const userValidationSchema = Joi.object({
  userId: Joi.string().required(),
  password: Joi.string(),
  username: Joi.string().required(),
  fullName: fullValidationNameSchema,
  age: Joi.string().required(),
  email: Joi.string().required(),
  isActive: Joi.string().valid('active', 'inActive').default('active'),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidationSchema,
  orders: Joi.array().items(orderValidationSchema),
  isDeleted: Joi.boolean().default(false),
})
export default userValidationSchema
