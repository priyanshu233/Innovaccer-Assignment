import { useState } from 'react';
import { Card, Button, Form, Badge } from 'react-bootstrap';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onEdit(editText);
    }
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Card className={`todo-item ${todo.completed ? 'completed' : ''} mb-3`}>
      <Card.Body className="d-flex align-items-center p-3">
        <div className="drag-handle me-3">
          <i className="fas fa-grip-lines text-muted"></i>
        </div>
        
        <div className="flex-grow-1">
          {isEditing ? (
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="edit-input"
                autoFocus
                maxLength={100}
              />
              <Button
                variant="success"
                size="sm"
                onClick={handleEdit}
                disabled={!editText.trim()}
              >
                <i className="fas fa-check"></i>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCancel}
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                className="todo-checkbox"
              />
              <span className={`todo-text ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                {todo.text}
              </span>
              {todo.completed && (
                <Badge bg="success" className="ms-2">
                  <i className="fas fa-check me-1"></i>
                  Done
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {!isEditing && (
          <div className="todo-actions">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="me-2"
              disabled={todo.completed}
            >
              <i className="fas fa-edit"></i>
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={onDelete}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default TodoItem;