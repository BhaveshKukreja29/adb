const API_BASE = 'http://localhost:8000/todos'

export async function fetchTodos() {
  const response = await fetch(API_BASE)

  if (!response.ok) {
    throw new Error('Failed to fetch to dos')
  }

  return response.json()
}

export async function createTodo(description) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-type': 'applciation/json'
    },
    body: JSON.stringify({description}),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))

    throw new Error(errorData.error || 'Failed to create to do')
  }

  return response.json()
}
