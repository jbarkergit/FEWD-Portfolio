import { z } from 'zod';

const zodSchema = {
  user: z.object({
    firstName: z
      .string()
      .trim()
      .regex(/[a-zA-Z-']{1,}$/)
      .min(1, { message: 'First name is required.' }),
    lastName: z
      .string()
      .trim()
      .regex(/[a-zA-Z-']{1,}$/)
      .min(1, { message: 'Last name is required.' }),
    dateOfBirth: z.date(),
    age: z.number().min(18, { message: 'You are not of age. Access permissions revoked.' }),
  }),
  account: z.object({
    password: z
      .string()
      .trim()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one digit, one special character, and be at least 8 characters long.'
      ),
  }),
  entity: z.object({
    business: z.string().trim().optional(),
    role: z.string().trim().optional(),
    website: z.string().trim().url().optional(),
  }),
  contact: z.object({
    emailAddress: z.string().trim().email({ message: 'Invalid email address.' }),
    phoneNumber: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 digits.' })
      .refine((val) => val.replace(/\D/g, '').length >= 10, {
        message: 'Phone number must have at least 10 digits',
      }),
  }),
  fields: z.object({ message: z.string().trim().min(5, { message: 'Please type your inquiry.' }) }),
};

export const contactSchema = z.object({
  firstName: zodSchema.user.shape.firstName,
  lastName: zodSchema.user.shape.lastName,
  phoneNumber: zodSchema.contact.shape.phoneNumber,
  emailAddress: zodSchema.contact.shape.emailAddress,
  business: zodSchema.entity.shape.business,
  role: zodSchema.entity.shape.role,
  message: zodSchema.fields.shape.message,
});

export const registrationSchema = z.object({
  firstName: zodSchema.user.shape.firstName,
  lastName: zodSchema.user.shape.lastName,
  emailAddress: zodSchema.contact.shape.emailAddress,
  password: zodSchema.account.shape.password,
});

export const loginSchema = z.object({
  emailAddress: zodSchema.contact.shape.emailAddress,
  password: zodSchema.account.shape.password,
});
