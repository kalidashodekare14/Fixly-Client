'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SocialLogin from '../shared/SocialLogin';
import Link from 'next/link';

const Signin = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-indigo-50 via-white to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-100">
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardContent className="text-charcoal">
            Log in to your account to continue
          </CardContent>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button className="w-full h-11 rounded-xl bg-pink hover:bg-pink">
              Sign In
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
              Don't have an account?{' '}
              <Link href={'/signup'}>
                <span className="text-pink">SignUp</span>
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
