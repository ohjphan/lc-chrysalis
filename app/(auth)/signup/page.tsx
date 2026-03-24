import type { Metadata } from "next";
import { SignupPageClient } from "@/components/auth/signup-page-client";

export const metadata: Metadata = {
  title: "Sign up",
  description:
    "Sign in or create a Learning Commons developer account. Continue with Google, GitHub, or email.",
};

export default function SignupPage() {
  return <SignupPageClient />;
}
