const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Validation rules reused across create and update
const titleValidation = body('title')
  .notEmpty().withMessage('Title is required')
  .trim()
  .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters');

const descriptionValidation = body('description')
  .optional()
  .trim()
  .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters');

const priorityValidation = body('priority')
  .optional()
  .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high');

const statusValidation = body('status')
  .optional()
  .isIn(['pending', 'completed']).withMessage('Status must be pending or completed');

router
  .route('/')
  .get(getTasks)
  .post([titleValidation, descriptionValidation, priorityValidation], createTask);

router
  .route('/:id')
  .get(getTask)
  .put([titleValidation.optional(), descriptionValidation, priorityValidation, statusValidation], updateTask)
  .delete(deleteTask);

module.exports = router;
