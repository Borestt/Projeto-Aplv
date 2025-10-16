import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './containers/Home';
import Create from './containers/Create';
import Settings from './containers/Settings';
import Infos from './containers/Infos';
import './index.css';

// A rota PRECISA estar definida aqui
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/infos",
    element: <Infos />,
  }
]);

// O RouterProvider PRECISA estar sendo renderizado
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);