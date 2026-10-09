import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import StatsBar from '../components/StatsBar';
import TaskFilters from '../components/TaskFilters';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const EMPTY_FILTERS = { search: '', status: '', priority: '' };

// Simple debounce helper
const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

const Dashboard = () => {
  const [tasks, setTasks]           = useState([]);
  const [stats, setStats]           = useState(null);
  const [filters, setFilters]       = useState(EMPTY_FILTERS);
  const [loading, setLoading]       = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError]           = useState(null);
  const [modalOpen, setModalOpen]   = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Debounce the search so we don't fire on every keystroke
  const debouncedSearch = useDebounce(filters.search, 350);

  const loadTasks = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetchTasks({
        search: debouncedSearch,
        status: filters.status,
        priority: filters.priority,
      });
      setTasks(res.data);
      setStats(res.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.status, filters.priority]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  // --- CRUD handlers ---

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      await toast.promise(
        createTask(data),
        {
          loading: 'Creating task…',
          success: 'Task created successfully!',
          error: 'Failed to create task. Please try again.',
        }
      );
      closeModal();
      await loadTasks();
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    setFormLoading(true);
    try {
      await toast.promise(
        updateTask(editingTask._id, data),
        {
          loading: 'Saving changes…',
          success: 'Task updated successfully!',
          error: 'Failed to update task. Please try again.',
        }
      );
      closeModal();
      await loadTasks();
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task? This cannot be undone.')) return;
    try {
      await toast.promise(
        deleteTask(id),
        {
          loading: 'Deleting task…',
          success: 'Task deleted successfully!',
          error: 'Failed to delete task. Please try again.',
        }
      );
      await loadTasks();
    } catch {
      // error already shown by toast.promise
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    const successMsg =
      nextStatus === 'completed' ? 'Task marked as completed!' : 'Task marked as pending!';
    try {
      await toast.promise(
        updateTask(task._id, { status: nextStatus }),
        {
          loading: 'Updating status…',
          success: successMsg,
          error: 'Failed to update task status. Please try again.',
        }
      );
      await loadTasks();
    } catch {
      // error already shown by toast.promise
    }
  };

  // --- Modal helpers ---

  const openCreate = () => { setEditingTask(null); setModalOpen(true); };
  const openEdit   = (task) => { setEditingTask(task); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingTask(null); };

  const handleFormSubmit = (data) =>
    editingTask ? handleUpdate(data) : handleCreate(data);

  const resetFilters = () => setFilters(EMPTY_FILTERS);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600 tracking-tight">TaskFlow</span>
          </div>
          <button onClick={openCreate} className="btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Filters */}
        <TaskFilters filters={filters} onChange={setFilters} onReset={resetFilters} />

        {/* Error banner */}
        {error && (
          <div role="alert" className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600" aria-label="Dismiss error">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Task list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <svg className="w-8 h-8 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm">Loading tasks…</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <div className="text-center">
              <p className="font-medium text-gray-500">
                {filters.search || filters.status || filters.priority
                  ? 'No tasks match your filters'
                  : 'No tasks yet'}
              </p>
              <p className="text-sm mt-1">
                {filters.search || filters.status || filters.priority
                  ? 'Try adjusting your search or filters.'
                  : 'Create your first task to get started.'}
              </p>
            </div>
            {!filters.search && !filters.status && !filters.priority && (
              <button onClick={openCreate} className="btn-primary mt-2">
                Create a task
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={openEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modalOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onClose={closeModal}
          isLoading={formLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;
