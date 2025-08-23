import { useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [resData, setResData] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResData(null);
    if (!file) return setError('Please choose a file');

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const { data } = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResData(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-teal-50 pt-6">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-teal-700 mb-8 text-center flex items-center justify-center gap-3 tracking-wide uppercase">
          <ClipboardDocumentListIcon className="h-10 w-10 text-emerald-500 animate-bounce" />
          Upload & Distribute Leads
        </h2>

        {/* Upload Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 transition-transform hover:-translate-y-1 hover:shadow-2xl">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leads File (csv, xlsx, xls, axls)
              </label>
              <input
                type="file"
                accept=".csv,.xlsx,.xls,.axls"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
              />
            </div>

            <button
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow hover:from-emerald-600 hover:to-teal-600 transition flex justify-center items-center"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload & Distribute'}
            </button>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          </form>

          {/* Result Card */}
          {resData && (
            <div className="mt-6 bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-6 space-y-4 transition-transform hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-teal-700">Batch Created</h3>
              <p className="text-sm text-gray-700">
                Batch ID: <span className="font-mono text-teal-600">{resData.batchId}</span>
              </p>
              <p className="text-sm text-gray-700">
                Total Leads: <span className="font-medium text-teal-700">{resData.total}</span>
              </p>

              <ul className="space-y-2 max-h-64 overflow-auto">
                {resData.summary.map((s) => (
                  <li
                    key={s.agent.id}
                    className="flex justify-between bg-emerald-50 rounded-lg p-2 shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      <span className="font-medium text-teal-700">{s.agent.name}</span> ({s.agent.email})
                    </div>
                    <div className="font-semibold text-teal-600">{s.count} lead(s)</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
