import { z } from 'zod';

export const schema = z.object({
  first: z.string().trim().min(1, { message: 'First name is required.' }),
  last: z.string().trim().min(1, { message: 'Last name is required.' }),
  phone: z.string().min(10, { message: 'Invalid phone number.' }),
  email: z.string().trim().email({ message: 'Invalid email address.' }),
  agency: z.string().trim().optional(),
  role: z.string().trim().optional(),
  message: z.string().trim().min(1, { message: 'Please type your inquiry.' }),
});
