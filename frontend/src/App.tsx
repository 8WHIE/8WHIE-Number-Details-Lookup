import { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultCard, { type LookupResult } from './components/ResultCard';
import Branding from './components/Branding';
import { ShieldAlert, Activity } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (number: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Use relative URL so it works when served by Flask or proxied by Vite
      const response = await fetch(`/api/search?number=${encodeURIComponent(number)}`);
      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setResult(data.result);
      } else {
        setError(data.message || 'An error occurred during lookup.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-100">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Number Intelligence</h1>
          </div>
          <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Secure Search
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Global Phone Number Lookup
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Securely lookup verified details for international phone numbers including country, region, and network carrier information.
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mt-8 bg-red-50 border border-red-100 rounded-xl p-4 flex items-start space-x-3">
            <ShieldAlert className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Lookup Failed</h3>
              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Results State */}
        {result && <ResultCard result={result} />}

        {/* Initial Empty State / Educational */}
        {!result && !error && !isLoading && (
           <div className="max-w-2xl mx-auto mt-16 text-center text-slate-500">
             <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-4">
               <Activity className="h-8 w-8 text-slate-400" />
             </div>
             <h3 className="text-lg font-medium text-slate-900 mb-2">Ready for Lookup</h3>
             <p className="text-sm max-w-md mx-auto">
               Enter a phone number with country code above. All lookups are performed securely and respect privacy standards. No personal identifying information (PII) is accessed.
             </p>
           </div>
        )}
      </main>

      <Branding />
    </div>
  );
}

export default App;
