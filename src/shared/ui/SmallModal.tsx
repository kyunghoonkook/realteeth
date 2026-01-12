import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type ModalType = 'success' | 'error' | 'info' | 'warning';

interface SmallModalState {
  isOpen: boolean;
  message: string;
  type: ModalType;
}

let showModalFn: ((message: string, type: ModalType) => void) | null = null;

export const smallModal = {
  success: (message: string) => showModalFn?.(message, 'success'),
  error: (message: string) => showModalFn?.(message, 'error'),
  info: (message: string) => showModalFn?.(message, 'info'),
  warning: (message: string) => showModalFn?.(message, 'warning'),
};

export function SmallModalProvider() {
  const [state, setState] = useState<SmallModalState>({
    isOpen: false,
    message: '',
    type: 'info',
  });

  useEffect(() => {
    showModalFn = (message: string, type: ModalType) => {
      setState({ isOpen: true, message, type });
      setTimeout(() => {
        setState((prev) => ({ ...prev, isOpen: false }));
      }, 3000);
    };

    return () => {
      showModalFn = null;
    };
  }, []);

  if (!state.isOpen) return null;

  const icons = {
    success: <CheckCircle className="text-emerald-400" size={20} />,
    error: <XCircle className="text-red-400" size={20} />,
    info: <Info className="text-blue-400" size={20} />,
    warning: <AlertCircle className="text-amber-400" size={20} />,
  };

  const bgColors = {
    success: 'bg-emerald-500/10 border-emerald-500/30',
    error: 'bg-red-500/10 border-red-500/30',
    info: 'bg-blue-500/10 border-blue-500/30',
    warning: 'bg-amber-500/10 border-amber-500/30',
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${bgColors[state.type]} backdrop-blur-md shadow-lg`}
      >
        {icons[state.type]}
        <span className="text-sm font-medium text-white">{state.message}</span>
      </div>
    </div>
  );
}
