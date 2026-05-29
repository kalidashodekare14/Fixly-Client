'use client';

import { store } from '@/state/store';
import { Provider } from 'react-redux';

const ReduxtProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxtProviderWrapper;
