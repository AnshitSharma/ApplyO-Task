import { useEffect, useState } from 'react';
import Link from 'next/link';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await fetch('/api/boards');
        if (res.ok) {
          const data = await res.json();
          setBoards(data.boards);
        } else {
          const data = await res.json();
          setError(data.error || 'Failed to fetch boards');
        }
      } catch (err) {
        setError('An error occurred while fetching boards.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="text-lg text-slate-600">Loading boards...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-error text-center py-12">{error}</div>
  );

  if (boards.length === 0) return (
    <div className="text-center py-12">
      <div className="text-lg text-slate-600 mb-2">No boards yet</div>
      <p className="text-slate-500">Create your first board to get started!</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {boards.map((board) => (
        <Link 
          key={board.id} 
          href={`/boards/${board.id}`} 
          className="card block hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <h5 className="text-xl font-bold text-slate-800 mb-2">{board.title}</h5>
          <p className="text-slate-500 text-sm">Click to view tasks</p>
        </Link>
      ))}
    </div>
  );
};

export default BoardList;
