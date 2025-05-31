import { connect } from "@/dbConfig/dbConfig.ts";
import { NextResponse } from "next/server";
import User  from "@/models/userModel.js";          
import bcrypt from "bcrypt";
 
export async function POST(request: Request) {
  try {
    await connect(); // ensure DB connection

    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("Request Body:", reqBody);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error); // Add this line
    return NextResponse.json(
      { error: error.message || "An error occurred during signup" },
      { status: 500 }
    );
  }
}
