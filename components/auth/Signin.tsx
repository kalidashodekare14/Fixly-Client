'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SocialLogin from '../shared/SocialLogin';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '../ui/spinner';

type Inputs = {
  email: string;
  password: string;
};

const Signin = () => {
  const router = useRouter();
  const [errorHandle, setErrorHandle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const loginData = {
        email: data.email,
        password: data.password,
        redirect: false,
      };
      const res = await signIn('credentials', loginData);
      if (res?.status === 200) {
        reset();
        toast.success('Login Successfully🎉');
        router.push('/');
      }
      if (res?.error) {
        reset();
        toast.error('The email or password is incorrect ❌');
        setErrorHandle(true);
      }
    } catch (error) {
      console.error(error);
      toast.error('Login Failed ❌');
    } finally {
      setLoading(false);
    }
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
        {errorHandle && (
          <div className="bg-[#FEF2F2] border border-[#dd9595] mx-5 px-2 py-3 rounded-xl">
            <p className="text-[#a13535] text-center">
              Invalid email or password. Please try again.
            </p>
          </div>
        )}
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
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-6" />
                  <span>SignIn...</span>
                </div>
              ) : (
                `Sign In`
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
              Don't have an account?{' '}
              <Link href={'/signup'}>
                <span className="text-pink">SignUp</span>
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Signin;
