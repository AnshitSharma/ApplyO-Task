import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateTask = ({ boardId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardId,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      router.reload();
    } else {
      setError(data.error || 'Something went wrong');
    }

    setLoading(false);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
<div className="card bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Finish project report"
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about the task"
            className="form-input resize-y"
            rows="4"
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Due Date (Optional)
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateTask;
