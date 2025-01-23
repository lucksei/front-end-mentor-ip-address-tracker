import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app.jsx';

// Import hooks
import { ApiDataProvider } from "./hooks/api_data_provider.jsx";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ApiDataProvider>
        <App />
    </ApiDataProvider>
)    