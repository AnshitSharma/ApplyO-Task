import AuthForm from '../../components/Auth/AuthForm';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div>
      <AuthForm />
      <div className="text-center mt-6">
        <p className="text-slate-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
