import Joi from 'joi';

const id = Joi.string().id();
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(6);
const avatar = Joi.string();


const createUserSchema = Joi.object({
  email: email.required(),
  name: name.required(),
  password: password.required(),
  image: avatar
});



const updateUserSchema = Joi.object({
  email: email,
  name: name,
  password: password,
  image: avatar

});

const getUserSchema = Joi.object({
  id: id.required()
});



export {createUserSchema, updateUserSchema, getUserSchema};
