import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import Students from './pages/students/index.tsx';

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: Satisfy createRoot only accept HTML Element
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Toaster position="bottom-center" duration={1200} />
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="students" element={<Students />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
