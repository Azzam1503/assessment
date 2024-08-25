import {z} from 'zod';

export const SignupSchema = z.object({
    name: z.string().min(5),
    email: z.string().email().min(8),
    password: z.string().min(6),
    role: z.string().min(5)
});