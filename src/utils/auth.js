export const normalizeRole = (role) => {
  const normalized = (role || '').toString().trim().toLowerCase().replace(/\s+/g, '');

  if (normalized === 'admin') return 'Admin';
  if (normalized === 'busowner') return 'BusOwner';
  if (normalized === 'customer') return 'Customer';

  return role;
};

export const roleToPath = (role) => {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === 'Admin') return 'admin';
  if (normalizedRole === 'BusOwner') return 'busowner';
  if (normalizedRole === 'Customer') return 'customer';

  return '';
};
