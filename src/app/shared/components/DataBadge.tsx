import { ExternalLink } from 'lucide-react';
import type { DatasetSource } from '../../core/datasets';

interface DataBadgeProps {
  source: DatasetSource;
  compact?: boolean;
}

export function DataBadge({ source, compact = false }: DataBadgeProps) {
  if (compact) {
    return (
      <a 
        href={source.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
      >
        <ExternalLink className="w-3 h-3" />
        {source.name}
      </a>
    );
  }

  return (
    <a 
      href={source.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
            {source.name}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{source.description}</p>
          <div className="flex gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="font-medium">Format:</span> {source.format}
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium">Actualització:</span> {source.lastUpdate}
            </span>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Llicència: <span className="font-medium">{source.license}</span>
      </div>
    </a>
  );
}
