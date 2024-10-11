const BASE_URL = 'https://jsonplaceholder.typicode.com';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const getTodo = async (todoId: number) => {
  const data = await fetch(`${BASE_URL}/todos/${todoId}`, {
    // cache: 'force-cache',
    // cache: 'no-store',
    next: { revalidate: 5 },
  }).then((res) => res.json());

  return data as Todo;
};

export const getTodos = async (userId: number = 1) => {
  const data = await fetch(`${BASE_URL}/todos?userId=${userId}`, {
    cache: 'force-cache',
    // cache: 'no-store',
    // next: { revalidate: 5 },
  }).then((res) => res.json());

  // const data = await res.json();
  // return data;

  // return res.json();
  return data as Todo[];
};
