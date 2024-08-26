import bcryptjs  from 'bcryptjs';
import connect from "@/helpers/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { SigninSchema } from "@/types";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedData = SigninSchema.safeParse(body);
        if(!parsedData.success){
            return NextResponse.json({message: "Incorrect inputs"}, {status: 402});
        };
        const {email, password} = body;
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({message: "No user found"}, {status: 402});
        }
        const comparedPassword = bcryptjs.compareSync(password, user.password);
        console.log(comparedPassword);
        if(!comparedPassword){
            return NextResponse.json({message: "Invalid Passowrd"}, {status: 400});
        }

        const token = jwt.sign({id: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET!, {expiresIn: '7d'});
        
        const response = NextResponse.json({
            message:"Logged In Successfully",
            success: true
        });

        response.cookies.set("Auth", token, {
            httpOnly: true
        });
        return response;
    } catch (error) {
       return NextResponse.json({error}, {status: 500});
    }
};
