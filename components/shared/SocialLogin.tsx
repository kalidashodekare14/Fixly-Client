'use client';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

const SocialLogin = () => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex items-center justify-center gap-10">
      <div
        onClick={handleGoogleSignIn}
        className="cursor-pointer rounded-full p-1 bg-white shadow"
      >
        <FcGoogle className="text-4xl" />
      </div>
      <div className="rounded-full p-1 bg-white shadow pointer-events-none opacity-50 cursor-not-allowed">
        <FaFacebook className="text-3xl text-blue-600" />
      </div>
    </div>
  );
};

export default SocialLogin;
