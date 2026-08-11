"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "admin@mecelfab.com" && password === "admin") {
    cookies().set("admin_session", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    redirect("/admin/dashboard");
  } else {
    return { error: "Invalid credentials" };
  }
}

export async function logout() {
  cookies().delete("admin_session");
  redirect("/admin/login");
}
