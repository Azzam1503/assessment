import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/user";

export interface Token extends JwtPayload{
    id: string,
    email: string,
    role: string,
};

export const verifyToken = async (req: NextRequest) => {
    try {
        const token: string = req.cookies.get("Auth")?.value || "";

        if(token.length == 0){
            throw new Error("No token found");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Token;
        console.log("In the verified here");
        return decoded; 
    } catch (error) {
        console.log(error);
    }
}