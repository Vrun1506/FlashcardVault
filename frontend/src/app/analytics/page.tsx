"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "../components/Navbar";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FileObject {
  name: string;
  created_at: string;
}

interface ChartDataPoint {
  name: string;
  conversions: number;
}

export default function AnalyticsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, recent: [] as FileObject[] });
  const [chartData, setChartData] = useState([] as ChartDataPoint[]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch files from the 'decks' bucket for this user
      const { data: files, error } = await supabase.storage
        .from('decks')
        .list(user.id, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (!error && files) {
        setStats({
          total: files.length,
          recent: files.slice(0, 5) // Last 5 conversions
        });

        // Mock chart data based on volume (In a real app, you'd group by date)
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        setChartData(days.map(day => ({
          name: day,
          conversions: Math.floor(Math.random() * 10) + 1
        })));
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, [supabase]);

  if (loading) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activeSection="analytics" />
      
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Usage Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Total Conversions Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Decks Generated</span>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-5xl font-bold text-blue-600">{stats.total}</span>
              <span className="text-slate-400 mb-1 font-medium">decks</span>
            </div>
            <p className="text-xs text-slate-400 mt-4">Lifetime activity in Flashcard Vault</p>
          </div>

          {/* Activity Graph Card */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Weekly Activity</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="conversions" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 6 ? '#2563eb' : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Table/List Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Recent Conversions</h3>
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">Last 5 files</span>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recent.length > 0 ? stats.recent.map((file, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-slate-400">{new Date(file.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">Processed</span>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-slate-500">
                No files converted yet. Head over to the Convert page to get started!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}