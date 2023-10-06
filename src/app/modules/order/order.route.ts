import express from 'express'
import { OrderController } from './order.controller'
import validateRequest from '../../middlewares/validateRequest'
import { OrderValidation } from './order.validation'
import { authVerify } from '../../middlewares/auth'
import { ENUM_ROLE } from '../users/user.interface'

const router = express.Router()
router.get(
  '/orders',
  authVerify(ENUM_ROLE.BUYER, ENUM_ROLE.SELLER, ENUM_ROLE.ADMIN),
  OrderController.getAllOrders
),
  router.get(
    '/orders/:id',
    authVerify(ENUM_ROLE.BUYER, ENUM_ROLE.SELLER, ENUM_ROLE.ADMIN),
    OrderController.getSingleOrder
  ),
  //post cow
  router.post(
    '/orders',
    authVerify(ENUM_ROLE.SELLER),
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder
  )

export const OrderRoute = router
// router.post(
//   '/create-cow',
//   validateRequest(CowValidation.createCowZodSchema),
//   CowController.createCow
// )
