import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import { ArrowPathIcon, UserGroupIcon, PhoneIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState(null);
  const [items, setItems] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/assignments/latest');
      setBatch(data.batchId);
      setItems(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-teal-50 pt-6 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Dashboard Heading */}
          <h2 className="text-4xl font-extrabold text-teal-700 mb-6 flex items-center justify-center gap-3 tracking-wide uppercase">
            <ClipboardDocumentListIcon className="h-10 w-10 text-emerald-500 animate-bounce" />
            Dashboard
          </h2>

          {/* Loading / No batch */}
          {loading ? (
            <div className="bg-white shadow-lg rounded-xl p-6 text-center text-gray-600">
              <ArrowPathIcon className="h-6 w-6 animate-spin mx-auto text-emerald-500 mb-2" />
              Loading latest assignments...
            </div>
          ) : !batch ? (
            <div className="bg-white shadow-lg rounded-xl p-6 text-center text-gray-600">
              No assignments yet. Upload a file to distribute.
            </div>
          ) : (
            <div className="space-y-6">

              {/* Latest Batch Info */}
              <div className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 shadow-xl rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ClipboardDocumentListIcon className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="text-sm text-gray-500">Latest Batch</div>
                    <div className="font-mono text-teal-700 font-semibold">{batch}</div>
                  </div>
                </div>
                <button
                  onClick={load}
                  className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                >
                  <ArrowPathIcon className="h-5 w-5 mr-1" />
                  Refresh
                </button>
              </div>

              {/* Agents & Leads */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((block) => (
  <div
    key={block._id}
    className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
  >
    {/* Check if agent exists */}
    {block.agent ? (
      <>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <UserGroupIcon className="h-6 w-6 text-teal-600" />
            <div className="font-semibold text-teal-700">{block.agent.name}</div>
          </div>
          <div className="text-sm text-gray-500">{block.agent.email}</div>
        </div>

        <div className="text-gray-600 mb-2 flex items-center gap-1">
          <PhoneIcon className="h-4 w-4" /> {block.agent.phone}
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700">
              Leads: <span className="text-teal-600">{block.leadIds.length}</span>
            </div>
          </div>
          <ul className="space-y-2 max-h-64 overflow-auto">
            {block.leadIds.map((lead) => (
              <li key={lead._id} className="border rounded-lg p-2 hover:bg-emerald-50 transition">
                <div className="font-medium">{lead.firstName}</div>
                <div className="text-gray-600 flex items-center gap-1">
                  <PhoneIcon className="h-4 w-4" /> {lead.phone}
                </div>
                {lead.notes && <div className="text-gray-700 mt-1">{lead.notes}</div>}
              </li>
            ))}
          </ul>
        </div>
      </>
    ) : (
      <div className="text-center text-red-500 font-semibold">
        ⚠️ No agent assigned to this block. Please add an agent.
      </div>
    )}
  </div>
))}

              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
