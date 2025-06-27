import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { loadTodos, saveTodos } from './utils/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage 
  useEffect(() => {
    console.log('Loading todos from localStorage...');
    const savedTodos = loadTodos();
    console.log('Loaded todos:', savedTodos);
    if (savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      saveTodos(todos);
    }
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const reorderTodos = (startIndex, endIndex) => {
    setTodos(prevTodos => {
      const result = Array.from(prevTodos);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="app-container">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-4">
              <h1 className="app-title">✓ TODO Listyle</h1>
              <p className="app-subtitle">Make and Mark your tasks</p>
            </div>
            
            <Card className="main-card shadow-lg">
              <Card.Body className="p-4">
                <TodoForm onAddTodo={addTodo} />
                
                <TodoFilter 
                  currentFilter={filter} 
                  onFilterChange={setFilter}
                />
                
                <TodoList
                  todos={filteredTodos}
                  onToggleTodo={toggleTodo}
                  onDeleteTodo={deleteTodo}
                  onEditTodo={editTodo}
                  onReorderTodos={reorderTodos}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
