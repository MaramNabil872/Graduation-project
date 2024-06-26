import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AuthRoute({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  
  return user ? (
    children
  ) : (
    <Redirect to={`/login?returnUrl=${location.pathname}`} />
  );
}
