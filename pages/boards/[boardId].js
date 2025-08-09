import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';
import TaskList from '../../components/Tasks/TaskList';
import CreateTask from '../../components/Tasks/CreateTask';
import { useEffect, useState } from 'react';

const BoardDetailPage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!boardId) return;

    const fetchBoard = async () => {
      try {
        const res = await fetch(`/api/boards/${boardId}`);
        if (res.ok) {
          const data = await res.json();
          setBoard(data.board);
        } else {
          const data = await res.json();
          setError(data.error || 'Failed to fetch board');
        }
      } catch (err) {
        setError('An error occurred while fetching the board.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="text-lg text-slate-600">Loading board...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-error text-center py-12">{error}</div>
  );
  
  if (!board) return (
    <div className="text-center py-12">
      <div className="text-lg text-slate-600">Board not found</div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="page-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">{board.title}</h1>
            <p className="text-slate-600 mt-2">Manage your tasks for this board</p>
          </div>
          <CreateTask boardId={boardId} />
        </div>
        <TaskList boardId={boardId} />
      </div>
    </ProtectedRoute>
  );
};

export default BoardDetailPage;
