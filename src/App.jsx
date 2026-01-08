import { RouterProvider } from 'react-router'
import Router from './routes/Router'
import AuthProvider from './contexts/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  )
}

export default App
