import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './TodoForm.css';

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup className="todo-input-group">
        <Form.Control
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="todo-input"
          maxLength={100}
        />
        <Button 
          variant="primary" 
          type="submit" 
          className="add-btn"
          disabled={!text.trim()}
        >
          <i className="fas fa-plus me-2"></i>
          Add Task
        </Button>
      </InputGroup>
    </Form>
  );
}

export default TodoForm;