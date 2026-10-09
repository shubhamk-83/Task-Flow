const TaskFilters = ({ filters, onChange, onReset }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const hasActiveFilters = filters.search || filters.status || filters.priority;

  return (
    <div className="card p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Search */}
      <div className="flex-1 w-full sm:w-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </span>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search tasks..."
            className="input pl-9"
          />
        </div>
      </div>

      {/* Status filter */}
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="input w-full sm:w-40"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority filter */}
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="input w-full sm:w-40"
      >
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Reset */}
      {hasActiveFilters && (
        <button onClick={onReset} className="btn-secondary whitespace-nowrap">
          Clear filters
        </button>
      )}
    </div>
  );
};

export default TaskFilters;
