import { CodeSnippet } from './types'

export const SNIPPETS: CodeSnippet[] = [
  {
    id: 'js-recursion',
    language: 'JavaScript',
    title: 'Recursive Fibonacci',
    description: 'Classic recursion warm-up.',
    code: `function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

for (let i = 0; i < 10; i += 1) {
  console.log(fibonacci(i))
}`,
  },

  {
    id: 'js-arrow-function',
    language: 'JavaScript',
    title: 'Arrow function',
    description: 'JavaScript’dagi funktsiya yozishning qisqa, zamonaviy usuli.',
    code: `// Foydalanuvchilar ro'yxati
const users = [
  { name: "Ali", age: 17 },
  { name: "Vali", age: 20 },
  { name: "Hasan", age: 15 },
  { name: "Husan", age: 22 }
];

// 18 yoshdan katta foydalanuvchilarni filter qilamiz
const kattalar = users.filter(user => user.age >= 18);

// Har birining malumotini stringga o'zgartiramiz
const natija = kattalar.map(user => user.name + "(" + user.age + " yosh)");

// Ekranga chiqaramiz
natija.forEach(item => console.log(item));`
  },

  {
    id: 'py-context',
    language: 'Python',
    title: 'Context Timer',
    description: 'Measure execution time with ease.',
    code: `from contextlib import contextmanager
from time import perf_counter


@contextmanager
def timer(label: str):
    start = perf_counter()
    yield
    elapsed = perf_counter() - start
    print(f"{label} took {elapsed:.3f}s")


with timer("fetch data"):
    fetch_remote_data()`,
  },

  {
    id: 'html-card',
    language: 'HTML',
    title: 'Glass Card',
    description: 'Frosted glass UI shell.',
    code: `<section class="glass-card">
  <header>
    <h2>Fast Code Typing</h2>
    <p>Sharpen your skills</p>
  </header>
  <button class="cta">Start Now</button>
</section>`,
  },

  {
    id: 'react-hook',
    language: 'React',
    title: 'useToggle Hook',
    description: 'Reusable toggle logic.',
    code: `import { useCallback, useState } from 'react'

export const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(prev => !prev), [])
  return [value, toggle] as const
}`,
  },

  {
    id: 'css-keyframes',
    language: 'CSS',
    title: 'Pulse Keyframes',
    description: 'Subtle animation utility.',
    code: `:root {
  color-scheme: dark;
}

@keyframes pulse {
  0% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(0.98);
  }
}`,
  },
];


