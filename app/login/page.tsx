import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In - Media Collector",
  description: "Sign in to Media Collector",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-surface-secondary">
      <div className="flex h-[33.33vh] w-full items-center justify-center">
        <Image
          src="/next.svg"
          alt="Media Collector logo"
          width={400}
          height={96}
          priority
          style={{ height: "13vh", width: "auto" }}
        />
      </div>
      <LoginForm />
    </div>
  );
}
