import ProtectedRoute from '../components/Auth/ProtectedRoute';
import useAuth from '../hooks/useAuth';
import BoardList from '../components/Boards/BoardList';
import CreateBoard from '../components/Boards/CreateBoard';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="page-container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-lg text-slate-600 mt-2">Welcome back, {user?.email}!</p>
          </div>
          <CreateBoard />
        </div>
        <BoardList />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
