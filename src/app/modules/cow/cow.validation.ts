import { z } from 'zod'

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    age: z.number({ required_error: 'Age is required' }),
    price: z.number({ required_error: 'Price is required' }),
    location: z.enum(
      [
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ],
      { required_error: 'Location is required' }
    ),
    breed: z.enum(
      [
        'Brahman',
        'Nellore',
        'Sahiwal',
        'Gir',
        'Indigenous',
        'Tharparkar',
        'Kankrej',
      ],
      { required_error: 'Breed is required' }
    ),
    weight: z.number({ required_error: 'Weight is required' }),
    label: z.enum(['for sale', 'sold out']).default('for sale'),
    category: z.enum(['Dairy', 'Beef', 'Dual Purpose'], {
      required_error: 'Category is required',
    }),
    seller: z.string(),
  }),
})

export const CowValidation = { createCowZodSchema }
// req -> validation
//body -> object
// data -> object
