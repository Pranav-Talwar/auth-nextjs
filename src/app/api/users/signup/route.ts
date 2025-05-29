import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { User } from "@/models/userModel";          
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    connect(); // ensure DB connection

    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "An error occurred during signup",
      },
      { status: 500 }
    );
  }
}
