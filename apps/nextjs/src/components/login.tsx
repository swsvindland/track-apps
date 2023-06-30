import { FC } from "react";
import { SignIn, useAuth } from "@clerk/nextjs";

export const Login: FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      {!isSignedIn && <SignIn />}
    </div>
  );
};
