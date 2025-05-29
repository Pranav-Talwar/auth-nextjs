"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const onSignup = async () => {}

  return (
    <div className="flex flex-col items-center p-6 justify-center h-screen ">
      <h1 className="text-4xl font-bold">Signup</h1>
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
     onClick={onSignup}>Signup here</button>
     <Link href="/login">
  <button className="p-1 border border-gray-300 rounded-lg">Visit login</button>
</Link> 

      </div>

      </div>
    </div>
  );
}
