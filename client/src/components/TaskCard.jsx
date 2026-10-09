const PRIORITY_STYLES = {
  high:   'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-orange-100 text-orange-700 border-orange-200',
  low:    'bg-blue-100 text-blue-700 border-blue-200',
};

const PRIORITY_DOT = {
  high:   'bg-red-500',
  medium: 'bg-orange-400',
  low:    'bg-blue-400',
};

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const isCompleted = task.status === 'completed';

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });

  return (
    <div
      className={`card p-4 flex flex-col gap-3 transition-opacity duration-150 ${
        isCompleted ? 'opacity-70' : ''
      }`}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Completion toggle */}
        <button
          onClick={() => onToggleStatus(task)}
          title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
            isCompleted
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {isCompleted && (
            <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm leading-snug ${
              isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Priority badge */}
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[task.priority]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[task.priority]}`} />
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>

          {/* Status badge */}
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              isCompleted
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 mr-2">{formatDate(task.createdAt)}</span>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            title="Edit task"
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task._id)}
            title="Delete task"
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
