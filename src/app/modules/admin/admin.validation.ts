import { z } from 'zod'

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['admin'], { required_error: 'Role is required' }),
    name: z.object({
      firstName: z.string({ required_error: 'First Name is required ' }),
      lastName: z.string({ required_error: 'Last Name is required ' }),
    }),
    phoneNumber: z.string({ required_error: 'Phone Number is required' }),
    address: z.string({ required_error: 'Address is required ' }),
  }),
})

export const AdminValidation = { createAdminZodSchema }
// req -> validation
//body -> object
// data -> object
//// phoneNumber: z.string().min(1).unique().required(),
