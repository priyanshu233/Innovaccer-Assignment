import { ButtonGroup, Button } from 'react-bootstrap';
import './TodoFilter.css';

function TodoFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All', icon: 'fas fa-list' },
    { key: 'active', label: 'Active', icon: 'fas fa-clock' },
    { key: 'completed', label: 'Completed', icon: 'fas fa-check' }
  ];

  return (
    <div className="filter-container mb-4">
      <ButtonGroup className="w-100">
        {filters.map(filter => (
          <Button
            key={filter.key}
            variant={currentFilter === filter.key ? 'primary' : 'outline-primary'}
            onClick={() => onFilterChange(filter.key)}
            className="filter-btn"
          >
            <i className={`${filter.icon} me-2`}></i>
            {filter.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default TodoFilter;