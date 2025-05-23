"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {}
  return (
    <div className="flex flex-col items-center p-6 justify-center h-screen ">
      <h1 className="text-4xl font-bold">Login</h1>
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
     <button className="p-1 border border-gray-300 rounded-lg " onClick={onLogin}>Login here</button>
     <Link href="/signup">
  <button className="p-1 border border-gray-300 rounded-lg">Visit signup</button>
</Link> 

      </div>

      </div>
    </div>
  );
}
