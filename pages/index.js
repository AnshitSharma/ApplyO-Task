import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">TaskBoard</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          The ultimate solution for organizing your tasks and boosting your productivity. 
          Simple, clean, and powerful.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/register" className=" btn btn-primary">
            Get Started
          </Link>
          <Link href="/auth/login" className="btn btn-secondary">
            Sign In →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
