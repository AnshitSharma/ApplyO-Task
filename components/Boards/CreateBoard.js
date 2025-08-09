import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateBoard = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();

    if (res.ok) {
      router.reload();
    } else {
      setError(data.error || 'Something went wrong');
    }

    setLoading(false);
    setTitle('');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New board title"
          className="form-input min-w-[350px]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Creating...' : 'Create Board'}
        </button>
      </form>
      {error && <p className="text-error text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CreateBoard;
