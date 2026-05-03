import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setMessage('Welcome to the inner circle. We will be in touch.');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  return (
    <section className="bg-primary text-background py-32 px-8 md:px-16 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start justify-between gap-16 relative z-10">
        <div className="max-w-xl">
          <div className="inter text-[10px] uppercase tracking-[0.4em] text-background/50 font-bold mb-8">
            Studio Insights
          </div>
          <h2 className="newsreader text-[6vw] md:text-[4vw] font-bold leading-[1.1] tracking-tighter mb-6">
            Get our <span className="italic text-secondary">latest</span> strategies & updates.
          </h2>
          <p className="inter text-background/60 text-lg leading-relaxed">
            Join a curated list of founders, designers, and innovators. We share deep dives into digital experiences, branding, and motion design once a month.
          </p>
        </div>

        <div className="w-full max-w-md mt-auto">
          {status === 'success' ? (
            <div className="bg-background/10 backdrop-blur-md p-8 border border-background/20 animate-fade-in flex flex-col items-start gap-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <h3 className="newsreader text-2xl mb-2 font-bold">Subscribed.</h3>
                <p className="inter text-sm text-background/60">{message}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-transparent border-b border-background/30 pb-4 pt-2 px-0 text-xl inter placeholder:text-background/20 focus:outline-none focus:border-secondary transition-colors duration-300 peer disabled:opacity-50"
                  required
                  disabled={status === 'loading'}
                />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-secondary transition-all duration-500 ease-expo group-hover:w-full peer-focus:w-full"></span>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className={`inter text-xs ${status === 'error' ? 'text-red-400' : 'text-background/40'} transition-opacity ${message ? 'opacity-100' : 'opacity-0'}`}>
                  {message || 'Error placeholder'}
                </span>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group relative overflow-hidden bg-background text-primary px-8 py-4 inter text-xs uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:text-background transition-colors duration-500"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'loading' ? 'Joining...' : 'Subscribe'}
                  </span>
                  <div className="absolute inset-0 bg-secondary transform scale-y-0 origin-bottom transition-transform duration-500 ease-expo group-hover:scale-y-100"></div>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-background/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
