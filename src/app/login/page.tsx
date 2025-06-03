"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [butttondisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
     const response=  await axios.post("/api/users/login", user, )
      console.log("Response:", response);
      if (response.data.success) {
        toast.success("Login successful");
        router.push("/profile");
      } else {
        toast.error(response.data.error || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center p-6 justify-center h-screen ">
      <h1 className="text-4xl font-bold">{loading ? "Processing" : "Login"} </h1>
      <br />
      <hr />
      <div className="flex flex-col gap-4 justify-left border-2 border-gray-300 rounded-lg p-2">
        <div className="flex flex-row gap-4">
          <label htmlFor="email">email :</label>

          <input
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="enter email"
            className="text-black"
          />
        </div>
        <div className="flex flex-row gap-4">
          <label htmlFor="password">password :</label>

          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="enter password"
            className="text-black"
          />
        </div>
        <div className="flex flex-row gap-4">
          <button
            className="p-1 border border-gray-300 rounded-lg "
            onClick={onLogin}
          >
            Login here
          </button>
          <Link href="/signup">
            <button className="p-1 border border-gray-300 rounded-lg">
              Visit signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
