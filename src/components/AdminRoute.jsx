import React, { useEffect, useState } from 'react';
import { getAdminUser } from '../lib/adminAuth';

export default function AdminRoute({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    const redirectToLogin = () => {
      const next = `${window.location.pathname}${window.location.search}`;
      window.location.replace(`/admin/login?next=${encodeURIComponent(next)}`);
    };

    getAdminUser()
      .then((user) => {
        if (!active) return;
        if (!user) redirectToLogin();
        else setAuthorized(true);
      })
      .catch(redirectToLogin)
      .finally(() => { if (active) setChecking(false); });

    return () => { active = false; };
  }, []);

  if (checking || !authorized) {
    return <div className="grid min-h-[60vh] place-items-center px-6 pt-28 text-sm text-slate-500" role="status">Checking administrator access…</div>;
  }
  return children;
}
