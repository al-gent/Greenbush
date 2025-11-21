import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
export default function RAG() {
  const [question, setQuestion] = useState('How does this project work?')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState(null)
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
      setFile(null)
    } catch (err) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '48px 16px' 
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: 'white',
            marginBottom: '12px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            RAG Demo
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
            Ask questions about uploaded documents
          </p>
        </div>

        {/* Upload Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
            📄 Upload Document
          </h2>
          <form onSubmit={handleUpload} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input 
              type="file" 
              accept=".pdf,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                flex: 1,
                padding: '10px',
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            />
            <button 
              type="submit" 
              disabled={!file || uploading}
              style={{
                padding: '12px 24px',
                background: !file || uploading ? '#9ca3af' : '#667eea',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: !file || uploading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '16px'
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>

        {/* Query Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
            💬 Ask a Question
          </h2>
          <form onSubmit={handleQuery}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to know?"
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                style={{
                  padding: '14px 32px',
                  background: loading || !question.trim() ? '#9ca3af' : '#667eea',
                  color: 'white',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'background 0.2s'
                }}
              >
                {loading ? '⏳ Searching...' : '🔍 Ask'}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: '2px solid #fecaca',
            color: '#991b1b',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontWeight: '500'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Response Section */}
        {response && (
          <div>
            {/* Answer Card */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '28px',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', marginRight: '12px' }}>✨</span>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                  Answer
                </h2>
              </div>

            <div style={{ 
              color: '#374151', 
              lineHeight: '1.8',
              fontSize: '17px',
            }}>
              <ReactMarkdown>{response.answer}</ReactMarkdown>
            </div>
            </div>

            {/* Sources Card */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '28px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px', marginRight: '12px' }}>📚</span>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                  Sources
                </h2>
              </div>
              <div>
                {response.sources.map((source, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderLeft: '4px solid #667eea',
                      paddingLeft: '20px',
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      marginBottom: idx < response.sources.length - 1 ? '20px' : 0,
                      background: '#f9fafb',
                      borderRadius: '0 8px 8px 0'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <span style={{ 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: '#4b5563',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        📄 {source.source}
                      </span>
                      <span style={{ 
                        fontSize: '13px', 
                        color: '#6b7280',
                        background: '#e5e7eb',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: '500'
                      }}>
                        Relevance: {(source.score * 100).toFixed(1)}%
                      </span>
                    </div>
            <div style={{ 
              color: '#374151', 
              lineHeight: '1.8',
              fontSize: '17px',
            }}>
              <ReactMarkdown>{source.text}</ReactMarkdown>
            </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '48px', 
          color: 'rgba(255,255,255,0.8)',
          fontSize: '14px'
        }}>
          <p>Built with FastAPI, Qdrant, and OpenAI • Deployed on DigitalOcean</p>
        </div>
      </div>
    </div>
  )
}