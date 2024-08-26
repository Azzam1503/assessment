"use client";
import useSingup, { UserI } from "@/hooks/useSingup";
import React, { ChangeEvent, useState } from "react";

export default function () {
  const { signup } = useSingup();
  const [userDeatils, setUserDetails] = useState<UserI>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(userDeatils);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-center text-center min-h-screen">
      <div className="">
        <h4>Sign up</h4>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDeatils.name}
              onChange={handleChange}
            />
          </div>
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
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="text"
              id="confirm-password"
              name="confirmPassword"
              value={userDeatils.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <input
              type="radio"
              id="team-member"
              name="role"
              value="team-member"
              onChange={handleChange}
            />
            <label htmlFor="team-member">Team-Member</label>
            <br />
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              onChange={handleChange}
            />
            <label htmlFor="admin">Admin</label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
