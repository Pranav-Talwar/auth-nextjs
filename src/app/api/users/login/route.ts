import { connect } from "@/dbConfig/dbConfig.ts";
import { NextResponse } from "next/server";
import User  from "@/models/userModel.js";          
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
connect();
export async function POST(request: Request) {

    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log("Request Body:", reqBody);

        const user = await User.findOne({ email })
        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
        const tokendata = {
            Id: user._id,
            email: user.email,
            username: user.username,    
        }
        const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET, {expiresIn: "1h"});      
        const response = NextResponse.json(
            { message: "Login successful", success: true, token, user: tokendata }, )

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: error.message || "An error occurred during login" },
            { status: 500 }
        );  
        
    }
}