const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// @desc    Get all tasks with optional search and filters
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority } = req.query;
    const filter = {};

    // Search by title (case-insensitive)
    if (search && search.trim()) {
      filter.title = { $regex: search.trim(), $options: 'i' };
    }

    // Filter by status
    if (status && ['pending', 'completed'].includes(status)) {
      filter.status = status;
    }

    // Filter by priority
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    // Build statistics from the full collection (not filtered)
    const allTasks = await Task.find({});
    const stats = {
      total: allTasks.length,
      completed: allTasks.filter((t) => t.status === 'completed').length,
      pending: allTasks.filter((t) => t.status === 'pending').length,
      high: allTasks.filter((t) => t.priority === 'high').length,
      medium: allTasks.filter((t) => t.priority === 'medium').length,
      low: allTasks.filter((t) => t.priority === 'low').length,
    };

    res.status(200).json({ success: true, count: tasks.length, stats, data: tasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res, next) => {
  try {
    // Handle express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { title, description, priority } = req.body;
    const task = await Task.create({ title, description, priority });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { title, description, status, priority } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,          // return updated doc
      runValidators: true, // run schema validators on update
    });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
