'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SocialLogin from '../shared/SocialLogin';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

const Signin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                {...register('email', { required: true })}
                className={`p-6 ${errors.email && 'border-red-400'}`}
                type="email"
                placeholder="example@mail.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                {...register('password', { required: true })}
                className={`p-6 ${errors.password && 'border-red-400'}`}
                type="password"
                placeholder="Enter password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-pink hover:bg-pink"
            >
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
