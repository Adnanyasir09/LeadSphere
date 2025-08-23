import { parse } from 'csv-parse/sync';
import xlsx from 'xlsx';
import { normalizeHeader } from './validate.js';

/**
 * Accepts Buffer and extension. Returns array of rows: { firstName, phone, notes }
 * Supports: csv, xlsx, xls, axls (treated as xls)
 */
export const parseLeadsFile = (buffer, ext) => {
  const extLower = (ext || '').toLowerCase();
  if (extLower === 'csv') {
    const text = buffer.toString('utf8');
    const records = parse(text, { columns: true, skip_empty_lines: true });
    return normalize(records);
  }

  if (['xlsx', 'xls', 'axls'].includes(extLower)) {
    const wb = xlsx.read(buffer, { type: 'buffer' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json = xlsx.utils.sheet_to_json(sheet, { defval: '' });
    return normalize(json);
  }

  throw new Error('Unsupported file type. Allowed: csv, xlsx, xls (axls).');
};

function normalize(rows) {
  return rows
    .map((r) => {
      // accept case-insensitive headers
      const map = {};
      for (const key of Object.keys(r)) {
        map[normalizeHeader(key)] = r[key];
      }
      const firstName = map['firstname'] ?? map['first name'] ?? map['name'] ?? '';
      const phone = String(map['phone'] ?? map['mobile'] ?? '').trim();
      const notes = map['notes'] ?? '';
      return {
        firstName: String(firstName || '').trim(),
        phone: phone,
        notes: String(notes || '').trim(),
      };
    })
    .filter((x) => x.firstName && x.phone);
}
