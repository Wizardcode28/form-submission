import './App.css'
import Admin from './components/Admin'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/admin",
      element: <Admin />
    },
  ]
)

function App() {

  return (
    <div>
      <RouterProvider router={router} /> 
    </div>
  )
}

export default App
