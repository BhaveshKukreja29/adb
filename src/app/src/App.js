import { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import {useTodos} from './hooks/useTodos'


export function App() {
    const { todos, loading, submitting, error, addTodo } = useTodos()
  const [inputVal, setInputVal] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return
    const success = await addTodo(inputVal)
    if (success) {
      setInputVal('')
    }
  }

  console.log(todos)

  return (
    <div className="App">
      <main className="todo-container">
        <h1>Todo Application</h1>

        {error && <div className="error-banner">{error}</div>}

        <section className="todo-section">
          <h2>Create a ToDo</h2>
          <form onSubmit={handleSubmit} className="todo-form">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={submitting}
            />
            <button type="submit" disabled={submitting || !inputVal.trim()}>
              {submitting ? 'Adding...' : 'Add ToDo'}
            </button>
          </form>
        </section>

        <section className="todo-section">
          <h2>List of TODOs</h2>
          {loading ? (
            <p>Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="empty-state">No todos yet. Add one above!</p>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo.id}>{todo.description}</li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App;
