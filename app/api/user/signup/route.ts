import connect from "@/helpers/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { SignupSchema } from "@/types";

connect();

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        console.log(body);
        const parsedBody = SignupSchema.safeParse(body);
        if(!parsedBody.success){
            NextResponse.json({message: "Invalid inputs"}, {status: 401});
        };
        const {name, email, password, role} = body;

        const existing = await User.findOne({email});
        if(existing){
            NextResponse.json({message: "User already exist"}, {status: 401});
        };
        const user = await  User.create({
            name, email, password, role
        });
        console.log(user);
        return NextResponse.json({user}, {status: 200});
    } catch (error) {
        console.log("in the singup post", error);
        return NextResponse.json({error}, {status: 500});
    }
}

