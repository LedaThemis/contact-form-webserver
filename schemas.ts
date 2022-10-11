import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Please provide a valid email'),
  content: z.string({
    required_error: 'Content is required',
  }),
});
