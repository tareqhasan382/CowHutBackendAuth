import express from 'express'
import { AdminController } from './admin.controller'
import { AdminValidation } from './admin.validation'
import validateRequest from '../../middlewares/validateRequest'
import { authVerify } from '../../middlewares/auth'
import { ENUM_ROLE } from '../users/user.interface'

//export const UserValidation = { createUserZodSchema }
const router = express.Router()
// auth/refresh-token
router.get(
  '/admins/my-profile',
  authVerify(ENUM_ROLE.ADMIN),
  AdminController.profile
),
  router.patch(
    '/admins/my-profile',
    authVerify(ENUM_ROLE.ADMIN),
    AdminController.updateProfile
  ),
  router.post('/admins/login', AdminController.LoginAdmin),
  router.post(
    '/admins/create-admin',
    validateRequest(AdminValidation.createAdminZodSchema),
    AdminController.createAdmin
  )
export const AdminRoute = router
