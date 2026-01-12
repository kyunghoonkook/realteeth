import { QueryProvider } from './providers';
import { AppRouter } from './router';
import { SmallModalProvider } from '@shared/ui';
import './styles/index.css';

export function App() {
  return (
    <QueryProvider>
      <SmallModalProvider />
      <AppRouter />
    </QueryProvider>
  );
}
