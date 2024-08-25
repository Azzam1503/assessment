import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        });

        response.cookies.set("Auth", "",{
            httpOnly: true,
            expires: new Date(0)
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            message: "error while logout"}, {status: 501});
    }
}