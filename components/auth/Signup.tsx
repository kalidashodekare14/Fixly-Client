'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import SocialLogin from '../shared/SocialLogin';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export default function Signup() {
  const [accountType, setAccountType] = useState<'user' | 'provider'>('user');
  const [errorHandle, setErrorHandle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch('password');
  const confirmPassword = watch('confirm_password');

  // Form submit function
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userData = {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      password: data.password,
      role: accountType,
      status: 'active',
    };

    if (password !== confirmPassword) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        userData
      );

      console.log(res.data.data);

      if (res.status === 200 || res.status === 201) {
        const loginRes = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (loginRes?.ok) {
          reset();
          toast.success('Account created successfully 🎉');
          router.push('/');
        } else {
          toast.error('Login failed after registration ❌');
        }
      }
    } catch (error: any) {
      console.log(error.message);

      // Backend Error
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
        setErrorHandle(error.response.data.message);
      }

      // Network error
      else if (error?.message) {
        toast.error(error.message);
      }

      // Fallback Error
      else {
        toast.error('Something went wrong ❌');
      }
    } finally {
      setLoading(false);
    }
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

        {errorHandle && (
          <div className="bg-[#FEF2F2] border border-[#dd9595] mx-5 px-2 py-3 rounded-xl">
            <p className="text-[#a13535] text-center">{errorHandle}</p>
          </div>
        )}

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-charcoal">First Name</Label>
                <Input
                  {...register('first_name', { required: true })}
                  className={`p-6 ${errors.first_name && 'border-red-400'}`}
                  placeholder="John"
                />
                {errors.first_name && (
                  <span className="text-red-500 text-sm">
                    First Name is required
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-charcoal">Last Name (Optional)</Label>
                <Input
                  {...register('last_name')}
                  className={`p-6 ${errors.last_name && 'border-red-400'}`}
                  placeholder="Doe"
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm">
                    Last Name is required
                  </span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-charcoal">Email</Label>
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
              <Label className="text-charcoal">Password</Label>
              <Input
                {...register('password', {
                  required: true,
                })}
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label className="text-charcoal">Confirm Password</Label>
              <Input
                {...register('confirm_password', {
                  required: true,
                })}
                className={`p-6 ${errors.confirm_password && 'border-red-400'}`}
                type="password"
                placeholder="Confirm password"
              />
              {errors.confirm_password && (
                <span className="text-red-500 text-sm">
                  Confirm password is required
                </span>
              )}
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}

              {confirmPassword && password === confirmPassword && (
                <p className="text-green-500 text-sm">Passwords matched</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-pink hover:bg-pink"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-6" />
                  <span>SignUp...</span>
                </div>
              ) : (
                `Sign Up as ${accountType}`
              )}
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
      <Toaster />
    </div>
  );
}
