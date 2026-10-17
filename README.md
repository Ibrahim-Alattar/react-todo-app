# React Todo App

A todo list built with React and Tailwind CSS while learning the fundamentals.

## Features

- Add, edit, delete, and check off todos
- "X of Y done" counter
- Press Enter to add a todo, or Enter / Escape to save / cancel an edit
- Todos are saved in `localStorage`, so they survive a page refresh
- Responsive layout that works on phones and desktops

## Tech stack

- React (Vite)
- Tailwind CSS

## Run it locally

```bash
git clone https://github.com/Ibrahim-Alattar/react-todo-app.git
cd react-todo-app
npm install
npm run dev
```

Then open the local URL that Vite prints in the terminal.

## What I practiced

- `useState`, including functional updates and lazy initial state
- Props, and passing functions down to child components
- Rendering lists with `.map()` and stable `key`s
- Updating arrays immutably (spread, `filter`, `map`)
- Controlled inputs and forms (`onSubmit`, `preventDefault`)
- `useEffect` and the dependency array, used to sync state with `localStorage`
- Styling with Tailwind utility classes

## Possible next steps

- Fetch data from an API
- Filter todos (all / active / done)
- Deploy it (Vercel or Netlify)