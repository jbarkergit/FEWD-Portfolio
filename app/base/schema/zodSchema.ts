import { z } from 'zod';

export const zodSchema = {
  user: z.object({
    firstName: z.string().trim().min(1, { message: 'First name is required.' }),
    lastName: z.string().trim().min(1, { message: 'Last name is required.' }),
    dateOfBirth: z.date(),
    age: z.number().min(18, { message: 'You are not of age. Access permissions revoked.' }),
  }),
  entity: z.object({
    business: z.string().trim().optional(),
    role: z.string().trim().optional(),
    website: z.string().trim().url().optional(),
  }),
  contact: z.object({
    emailAddress: z.string().trim().email({ message: 'Invalid email address.' }),
    phoneNumber: z.number().min(10, { message: 'Invalid phone number.' }),
  }),
  fields: z.object({ message: z.string().trim().min(5, { message: 'Please type your inquiry.' }) }),
};

type ZodSchema = typeof zodSchema;
type ZodSchema_Contact = z.infer<ZodSchema['contact']>;
type ZodSchema_Entity = z.infer<ZodSchema['entity']>;
type ZodSchema_Fields = z.infer<ZodSchema['fields']>;
type ZodSchema_User = z.infer<ZodSchema['user']>;

export type Type_ZodSchema = {
  Contact: ZodSchema_Contact;
  Entity: ZodSchema_Entity;
  Fields: ZodSchema_Fields;
  User: ZodSchema_User;
};
