import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import { UserPlusIcon, EnvelopeIcon, PhoneIcon, KeyIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/solid';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const loadAgents = async () => {
    try {
      const { data } = await axios.get('/api/agents');
      setAgents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAgents(); }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      await axios.post('/api/agents', form);
      setForm({ name: '', email: '', phone: '', password: '' });
      loadAgents();
    } catch (e) {
      setError(e?.response?.data?.message || e?.response?.data?.errors?.[0]?.msg || 'Failed to create');
    } finally {
      setCreating(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this agent?')) return;
    await axios.delete(`/api/agents/${id}`);
    loadAgents();
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-4xl font-extrabold text-teal-600 mb-8 text-center flex items-center justify-center gap-3 tracking-wide uppercase">
  <UserPlusIcon className="h-10 w-10 text-emerald-500 animate-bounce" />
  Agent Management
</h2>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Add Agent Card */}
            <div className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 shadow-xl rounded-2xl p-6 transition transform hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-xl font-semibold mb-5 text-emerald-700 flex items-center gap-2">
                <UserPlusIcon className="h-6 w-6 text-emerald-600" />
                Add New Agent
              </h3>
              <form className="space-y-4" onSubmit={onCreate}>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <UserPlusIcon className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Agent Name"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="email"
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="agent@example.com"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile (E.164)</label>
                  <PhoneIcon className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+9198XXXXXX10"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <KeyIcon className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="password"
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Set a password"
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow hover:from-emerald-600 hover:to-teal-600 transition flex items-center justify-center gap-2"
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create Agent'}
                  <UserPlusIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Current Agents Card */}
            <div className="bg-gradient-to-r from-white via-emerald-50 to-teal-50 shadow-xl rounded-2xl p-6 transition transform hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-xl font-semibold mb-5 text-emerald-700 flex items-center gap-2">
                <UserGroupIcon className="h-6 w-6 text-emerald-600" />
                Current Agents
              </h3>

              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : agents.length === 0 ? (
                <p className="text-gray-500">No agents yet.</p>
              ) : (
                <ul className="space-y-3">
                  {agents.map((a) => (
                    <li
                      key={a._id}
                      className="flex items-center justify-between bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition"
                    >
                      <div>
                        <div className="font-medium text-emerald-700 flex items-center gap-1 mb-1">
                          <UserPlusIcon className="h-5 w-5 text-emerald-500" />
                          {a.name}
                        </div>
                        <div className="text-sm text-gray-600 flex flex-col gap-1">
                          <span className="flex items-center gap-2">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400" /> {a.email}
                          </span>
                          <span className="flex items-center gap-2">
                            <PhoneIcon className="h-4 w-4 text-gray-400" /> {a.phone}
                          </span>
                        </div>
                      </div>
                      <button
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition gap-1"
                        onClick={() => onDelete(a._id)}
                      >
                        <TrashIcon className="h-5 w-5" /> Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-3 text-sm text-gray-500 italic">
                Tip: Create exactly 5 agents before uploading lists for balanced distribution.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
