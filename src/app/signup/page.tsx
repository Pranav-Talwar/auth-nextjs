"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
// import { set } from "mongoose";

export default function SignupPage() {
  const router = useRouter();
  const [Loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("Error in signup", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false); }
    else{
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center p-6 justify-center h-screen ">
      <h1 className="text-4xl font-bold">{Loading ? "Processing" : "Signup"} </h1>
      <br />
      <hr />
      <div className="flex flex-col gap-4 justify-left border-2 border-gray-300 rounded-lg p-2">
      <div className="flex flex-row gap-4">
        <label htmlFor="username">username :</label>

        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="enter username"
          className="text-black"
        />
      </div>
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
     <button className="p-1 border border-gray-300 rounded-lg " 
     onClick={onSignup}>{buttonDisabled ? "❌ Signup" : "Signup"}</button>
     <Link href="/login">
  <button className="p-1 border border-gray-300 rounded-lg">Visit Login</button>
</Link> 

      </div>

      </div>
    </div>
  );
}
