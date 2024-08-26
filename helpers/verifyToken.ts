import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("Auth")?.value || "";

        if(token.length == 0){
            throw new Error("No token found");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded; 
    } catch (error) {
        console.log(error);
    }
}