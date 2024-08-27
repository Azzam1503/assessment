import connect from "@/helpers/db";
import { verifyToken } from "@/helpers/verifyToken";
import Product from "@/models/product";
import { ProductSchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest){
    try {
        console.log('In the product create routes')
        const body = await req.json();
        const tokenData = await verifyToken(req);
        console.log(tokenData);
        if(!tokenData || tokenData.role !== "admin"){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }
        const parsedData = ProductSchema.safeParse(body);
        if(!parsedData.success){
            return NextResponse.json({message: "Invalid Inputs"}, {status: 402});
        }
        const {name, description, price, image} =  parsedData.data;
        const product = await Product.create({
            name, description, price, image
        })
        console.log("product", product);
        return NextResponse.json({product}, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status:500});
    }
}