import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import { authVerify } from '../../middlewares/auth'
import { ENUM_ROLE } from './user.interface'
//export const UserValidation = { createUserZodSchema }
const router = express.Router()
// auth/refresh-token
router.get(
  '/users/my-profile',
  authVerify(ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
  UserController.profile
),
  router.patch(
    '/users/my-profile',
    authVerify(ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
    UserController.updateProfile
  ),
  router.get(
    '/users/:id',
    authVerify(ENUM_ROLE.ADMIN, ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
    UserController.getSingleUser
  ),
  router.get('/users', authVerify(ENUM_ROLE.ADMIN), UserController.getAllUser),
  router.patch(
    '/users/:id',
    authVerify(ENUM_ROLE.ADMIN),
    UserController.updateUser
  ),
  router.delete(
    '/users/:id',
    authVerify(ENUM_ROLE.ADMIN),
    UserController.deletedUser
  ),
  router.post(
    '/auth/signup',
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  ),
  router.post('/auth/login', UserController.LoginUser),
  router.post('/auth/refresh-token', UserController.refreshToken)

export const UserRoute = router
