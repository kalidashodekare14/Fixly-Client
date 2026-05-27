'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import SocialLogin from '../shared/SocialLogin';
import Link from 'next/link';

export default function Signup() {
  const [accountType, setAccountType] = useState<'user' | 'provider'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup submitted', accountType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-indigo-50 via-white to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-100">
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-2xl font-semibold">
            Create Account
          </CardTitle>

          {/* Toggle */}
          <div className="flex items-center justify-center bg-gray-100 rounded-full p-2 w-80 mx-auto">
            <button
              type="button"
              onClick={() => setAccountType('user')}
              className={`px-15 py-3 text-sm rounded-full transition-all ${
                accountType === 'user'
                  ? 'bg-white shadow text-pink'
                  : 'text-gray-500'
              }`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => setAccountType('provider')}
              className={`px-12 py-3 text-sm rounded-full transition-all ${
                accountType === 'provider'
                  ? 'bg-white shadow text-pink'
                  : 'text-gray-500'
              }`}
            >
              Provider
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input className="p-6" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input className="p-6" placeholder="Doe" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                className="p-6"
                type="email"
                placeholder="example@mail.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                className="p-6"
                type="password"
                placeholder="Enter password"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                className="p-6"
                type="password"
                placeholder="Confirm password"
              />
            </div>

            <Button className="w-full h-11 rounded-xl bg-pink hover:bg-pink">
              Sign Up as {accountType}
            </Button>
            {/* Or Sign Up */}
            <div className="flex items-center gap-3 my-5">
              <div className="border border-gray-300 w-35"></div>
              <p className="text-center text-sm text-gray-500 -mt-3">
                or sign up with
              </p>
              <div className="border border-gray-300 w-35"></div>
            </div>

            {/* Social Login */}
            <SocialLogin />

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href={'/signin'}>
                <span className="text-pink">SignIn</span>
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
