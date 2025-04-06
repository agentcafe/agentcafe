import { useState } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

export default function PostJob() {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, company, location, description }),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await res.json()
      console.log('Job posted:', result)
      alert('Job posted successfully!')
      router.push('/')
    } catch (error) {
      console.error('Error posting job:', error)
      alert('Failed to post job. Check console for details.')
    }
  }

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Post a New Job</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </Layout>
  )
} 