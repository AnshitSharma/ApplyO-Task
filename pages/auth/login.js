import AuthForm from '../../components/Auth/AuthForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div>
      <AuthForm isLogin />
      <div className="text-center mt-6">
        <p className="text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
