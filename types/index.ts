import {z} from 'zod';

export const SignupSchema = z.object({
    name: z.string().min(5),
    email: z.string().email().min(8),
    password: z.string().min(6),
    role: z.string().min(5)
});

export const SigninSchema = z.object({
    email: z.string().email().min(8),
    password: z.string().min(6),
})

export const ProductSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(15),
    price: z.number().min(1),
    image: z.string()
});

export const UpdateProductSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(15),
    price: z.number().min(1),
    image: z.string()
})