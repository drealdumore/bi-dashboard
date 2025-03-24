import * as z from 'zod';

// Login form schema
export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  keepLoggedIn: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Registration form schema
export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine(
      (password) => {
        // At least one uppercase letter, one lowercase letter, and one number
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password);
      },
      {
        message: 'Password must include uppercase, lowercase, and number',
      }
    ),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
