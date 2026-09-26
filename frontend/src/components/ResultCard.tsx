
import { ShieldCheck, Globe, MapPin, Signal, Clock, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export interface LookupResult {
  target_number: string;
  valid: boolean;
  country_code: string;
  region_code: string;
  region: string;
  carrier: string;
  timezones: string[];
  international_format: string;
  national_format: string;
}

interface ResultCardProps {
  result: LookupResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const InfoRow = ({ icon: Icon, label, value, fieldId }: { icon: any, label: string, value: string, fieldId: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-3 text-gray-600">
        <Icon className="h-5 w-5 text-gray-400" />
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-900 font-semibold text-right">{value}</span>
        <button
          onClick={() => copyToClipboard(value, fieldId)}
          className="text-gray-400 hover:text-blue-500 transition-colors"
          title="Copy to clipboard"
        >
          {copiedField === fieldId ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center">
          <ShieldCheck className="h-6 w-6 mr-2" />
          Lookup Results
        </h3>
        <div className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium backdrop-blur-sm">
          {result.valid ? 'Verified Number' : 'Invalid Number'}
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-2">
          <InfoRow icon={Globe} label="International Format" value={result.international_format} fieldId="intl" />
          <InfoRow icon={Globe} label="National Format" value={result.national_format} fieldId="natl" />
          <InfoRow icon={MapPin} label="Country / Region" value={`${result.region_code} (${result.country_code})`} fieldId="country" />
          <InfoRow icon={MapPin} label="Location Details" value={result.region} fieldId="region" />
          <InfoRow icon={Signal} label="Carrier / Network" value={result.carrier} fieldId="carrier" />
          <InfoRow icon={Clock} label="Timezone(s)" value={result.timezones.join(', ')} fieldId="timezone" />
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-xl text-sm text-gray-500 border border-gray-100">
          <p className="flex items-start">
            <span className="mr-2">ℹ️</span>
            Information displayed is based on public routing data. Carrier information may be outdated if the number was ported recently. Personal identity and live location data are not publicly available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
