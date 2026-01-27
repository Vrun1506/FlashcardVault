import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '../components/Navbar'
import FileUpload from '../components/FileUpload'

export default async function ConvertPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* activeSection="convert" matches the label logic in Navbar */}
      <Navbar activeSection="convert" />

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Convert PDF to Anki flashcards</h1>
          <p className="text-slate-600 mt-2">Upload your notes to generate flashcards.</p>
        </div>

        <FileUpload />
      </main>
    </div>
  )
}