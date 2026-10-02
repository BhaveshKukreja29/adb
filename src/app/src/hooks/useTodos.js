import { useState, useEffect } from 'react'
import { fetchTodos, createTodo } from '../services/api'

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const loadTodos = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchTodos()
      
      setTodos(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodos()
  }, []) // empty cuz we run on mount

  const addTodo = async (description) => {
    try {
      setSubmitting(true)
      setError(null)
      
      await createTodo(description)
      await loadTodos()
      
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return { todos, loading, submitting, error, addTodo, reload: loadTodos }
}
