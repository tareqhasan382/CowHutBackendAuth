import express from 'express'
import { CowController } from './cow.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CowValidation } from './cow.validation'
import { authVerify } from '../../middlewares/auth'
import { ENUM_ROLE } from '../users/user.interface'
// import validateRequest from '../../middlewares/validateRequest'
//export const UserValidation = { createUserZodSchema }

const router = express.Router()
//get all cow
router.get(
  '/cows',
  authVerify(ENUM_ROLE.SELLER, ENUM_ROLE.BUYER, ENUM_ROLE.ADMIN),
  CowController.getAllCow
),
  router.get(
    '/cows/:id',
    authVerify(ENUM_ROLE.SELLER, ENUM_ROLE.BUYER, ENUM_ROLE.ADMIN),
    CowController.getSingleCow
  ),
  router.patch(
    '/cows/:id',
    authVerify(ENUM_ROLE.SELLER),
    CowController.updateCow
  ),
  router.delete(
    '/cows/:id',
    authVerify(ENUM_ROLE.SELLER),
    CowController.deletedCow
  ),
  //post cow
  router.post(
    '/cows',
    authVerify(ENUM_ROLE.SELLER),
    validateRequest(CowValidation.createCowZodSchema),
    CowController.createCow
  )

export const CowRoute = router
