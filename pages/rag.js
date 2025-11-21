import { useState } from 'react'

export default function RAG() {
    const [question, setQuestion] = useState('')
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  const [error, setError] = useState('')

  const handleQuery = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResponse(null)

    try {
      const res = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) {
        throw new Error('Query failed')
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError('Failed to get answer. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const [file, setFile] = useState(null)

const handleUpload = async (e) => {
  e.preventDefault()
  if (!file) return
  
  setUploading(true)
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    alert(data.message)
  } catch (err) {
    alert('Upload failed')
  } finally {
    setUploading(false)
  }
}


  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '48px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px' }}>
          RAG Demo
        </h1>

<form onSubmit={handleUpload} style={{marginBottom: '32px'}}>
<input 
  type="file" 
  accept=".pdf,.txt"  // <-- Add .txt
  onChange={(e) => setFile(e.target.files[0])}
/>
  <button type="submit" disabled={!file || uploading}>
    {uploading ? 'Uploading...' : 'Upload PDF'}
  </button>
</form>
        <form onSubmit={handleQuery} style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the documents..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
              }}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              style={{
                padding: '12px 24px',
                background: loading || !question.trim() ? '#9ca3af' : '#2563eb',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                fontSize: '16px',
              }}
            >
              {loading ? 'Searching...' : 'Ask'}
            </button>
          </div>
        </form>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
          }}>
            {error}
          </div>
        )}

        {response && (
          <div>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '24px',
              marginBottom: '24px',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                Answer
              </h2>
              <p style={{ color: '#374151', lineHeight: '1.6' }}>
                {response.answer}
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '24px',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                Sources
              </h2>
              <div>
                {response.sources.map((source, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderLeft: '4px solid #2563eb',
                      paddingLeft: '16px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>
                        {source.source}
                      </span>
                      <span style={{ fontSize: '14px', color: '#9ca3af' }}>
                        Score: {source.score.toFixed(3)}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#374151' }}>
                      {source.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}