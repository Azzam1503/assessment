"use client";
import useLogin, { Login } from "@/hooks/useLogin";
import React, { ChangeEvent, useState } from "react";

export default function () {
  const { signin } = useLogin();
  const [userDeatils, setUserDetails] = useState<Login>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signin(userDeatils);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center text-center min-h-screen">
      <div className="">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={userDeatils.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={userDeatils.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
