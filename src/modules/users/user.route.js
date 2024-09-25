import express from 'express'
import userController from './controllers/user.controller.js'
import { createValidator } from 'express-joi-validation'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'

const validator = createValidator()

const userRouter = express.Router()

userRouter.get('', userController.getUsers)
userRouter.get('/:id', userController.getUserByID)
userRouter.post('', validator.body(CreateUserDto), userController.addUser)
userRouter.patch('/:id', validator.body(UpdateUserDto), userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

export default userRouter