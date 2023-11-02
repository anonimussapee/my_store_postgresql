import { UsersService } from '../../services/userService.js';
import {createUserSchema, getUserSchema, updateUserSchema} from '../../schemas/userSchema.js';
import { validatorHandler } from '../../middlewares/validatorHandler.js';
import express from 'express';

const service = new UsersService();

const userRouter = express.Router();

// esta parte te envia los usuarios y tambien te acepta opcionalmente queries

userRouter.get('/', async (req, res, next) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    try {

      const listUsers = await service.findLimitOffset(limit,offset);

      res.status(200).json(listUsers);
      res.end();

    } catch (error) {

      next(error);

    }

  } else {

    try {

      const listUsers = await service.find();
      res.status(200).json(listUsers);
      res.end();

    } catch (error) {

      next(error);
    }

  }
});

userRouter.get('/:id',
validatorHandler(getUserSchema, 'params'),
async(req, res, next) => {

  try {

    const { id } = req.params;
    const user = await service.findOne(id);
    res.status(200).json(user);
    res.end();

  } catch (error) {
    next(error);

  }


});

userRouter.post('/',
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {

  try {

    const body = req.body;
    const userPosted = await service.create(body);
    res.status(201).json({
      message: 'post successfull',
      data: body,
      id: userPosted.id
    });
    res.end();

  } catch (error) {
    next(error);
  }


});

userRouter.put('/:id',
validatorHandler(getUserSchema,'params'),
validatorHandler(updateUserSchema, 'body'),
async(req, res, next) => {

  try {

    const body = req.body;

    const { id } = req.params;
    const userPatch = await service.update(body, id);
    res.status(201).json({
      message: 'update successfull',
      data: userPatch,
      id: userPatch.id
    });
    res.end();

  } catch (error) {
    next(error);

  }

});


userRouter.patch('/:id',
validatorHandler(getUserSchema,'params'),
validatorHandler(updateUserSchema, 'body'),
async(req, res, next) => {

  try {

    const body = req.body;

    const { id } = req.params;
    const userPatch = await service.update(body, id);
    res.status(201).json({
      message: 'patched successfull',
      data: userPatch,
      id: userPatch.id
    });
    res.end();

  } catch (error) {
    next(error);

  }

});

userRouter.delete('/:id',
validatorHandler(getUserSchema, 'params'),
async(req, res, next) => {

  try {

    const { id } = req.params;
    await service.delete(id);
    res.status(200).json({
      message: 'Deleted successful',
    });

  } catch (error) {
    next(error);
  }

});



export default userRouter;
