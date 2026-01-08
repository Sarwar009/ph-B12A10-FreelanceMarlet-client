import React from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Router from './routes/Router';
import {RouterProvider} from 'react-router/dom';
import { AuthProvider } from './contexts/AuthProvider';

createRoot (document.getElementById ('root')).render (
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </React.StrictMode>
);