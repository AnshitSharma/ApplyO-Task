import { useEffect, useState } from 'react';

const TaskList = ({ boardId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/tasks/board/${boardId}`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('An error occurred while fetching tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (boardId) {
      fetchTasks();
    }
  }, [boardId]);

  const handleUpdateStatus = async (taskId, status) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, status } : task));
      } else {
        console.error('Failed to update task status');
      }
    } catch (err) {
      console.error('An error occurred while updating task status.', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (err) {
      console.error('An error occurred while deleting the task.', err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="text-lg text-gray-500">Loading tasks...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-red-500 text-center py-12">{error}</div>
  );

  if (tasks.length === 0) return (
    <div className="text-center py-12">
      <div className="text-xl text-gray-500 mb-2">No tasks yet.</div>
      <p className="text-gray-400">Create a new task to get started!</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tasks</h2>
      <div className="grid gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="card bg-white shadow-lg rounded-lg p-6 ">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h5 className="text-xl font-bold text-gray-800">{task.title}</h5>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  task.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : task.status === 'in-progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status === 'completed' ? 'Completed' : 
                   task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleUpdateStatus(task.id, 'completed')}
                  className="btn btn-success text-black"
                  disabled={task.status === 'completed'}
                >
                  Done
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn btn-danger text-black"
                >
                  Remove
                </button>
              </div>
            </div>
            
            {task.description && (
              <p className="text-gray-600 mb-4">{task.description}</p>
            )}
            
            {task.dueDate && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Due:</span>
                <span className="ml-2">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
