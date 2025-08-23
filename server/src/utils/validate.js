export const isE164Phone = (phone) => {
  return /^\+?[1-9]\d{7,14}$/.test(phone); // simple E.164-ish check
};

export const normalizeHeader = (h) => (h || '').toString().trim().toLowerCase();
