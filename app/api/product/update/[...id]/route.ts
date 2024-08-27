import Product  from '@/models/product';
import { verifyToken } from "@/helpers/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import connect from '@/helpers/db';
import { UpdateProductSchema } from '@/types';

connect();

export async function POST(req: NextRequest, params:any){
    try {
        const body = await req.json();
        const parsedData = UpdateProductSchema.safeParse(body);
        if(!parsedData.success){
            return NextResponse.json({message: "Invalid Inputs"}, {status: 402});
        }

        const decoded= await verifyToken(req);
        if(!decoded || decoded.role !== "admin"){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        };
        const id = params.params.id[0];
        
        const {name, description, price, image} = parsedData.data;

        const prodcut = await Product.findByIdAndUpdate({_id: id},
            {
                name, description, price, image
            }
        )
        return NextResponse.json({prodcut}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error while updating product"}, {status: 501});
    }
}