import React from 'react';
import { AuthProvider } from './AuthProvider';
import LoadingScreen from './LoadingScreen';

export default function Providers() {
  return (
    <AuthProvider>
      <LoadingScreen />
    </AuthProvider>
  );
}