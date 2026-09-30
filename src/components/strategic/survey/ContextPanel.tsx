import React from 'react';
import { BIRD_IMAGES, BIRD_VIDEOS, BIRD_SITES } from '@/lib/bird-urls';
import { ExternalLink, PlayCircle, Image as ImageIcon, Lightbulb } from 'lucide-react';

export interface ContextPanelProps {
  title: string;
  description: string;
  imageKey?: keyof typeof BIRD_IMAGES;
  videoKey?: keyof typeof BIRD_VIDEOS;
  siteKey?: keyof typeof BIRD_SITES;
}

const ContextPanel: React.FC<ContextPanelProps> = ({ title, description, imageKey, videoKey, siteKey }) => {
  const image = imageKey ? BIRD_IMAGES[imageKey] : null;
  const video = videoKey ? BIRD_VIDEOS[videoKey] : null;
  const site = siteKey ? BIRD_SITES[siteKey] : null;

  return (
    <div className="mb-6 space-y-3">
      <p className="text-sm text-[#ecfdf5]/80 leading-relaxed">{description}</p>

      {image && (
        <div className="rounded-xl overflow-hidden border border-[#C9A84C]/15 bg-[#011a12]/50">
          <img
            src={image.url}
            alt={image.alt}
            className="w-full max-h-64 object-contain"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <p className="text-[11px] text-[#64748b] px-3 py-2 border-t border-[#C9A84C]/10">{image.title}</p>
        </div>
      )}

      {video && (
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#011a12]/60 border border-[#C9A84C]/15 hover:border-[#C9A84C]/40 transition-all group"
        >
          <PlayCircle className="w-6 h-6 text-[#C9A84C] group-hover:scale-110 transition-transform" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#ecfdf5]">{video.title}</p>
            <p className="text-[11px] text-[#64748b]">{video.duration}</p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#C9A84C]" />
        </a>
      )}

      {site && (
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#011a12]/60 border border-[#C9A84C]/15 hover:border-[#C9A84C]/40 transition-all group"
        >
          <Lightbulb className="w-5 h-5 text-[#C9A84C]" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#ecfdf5]">Learn more: {site.title}</p>
            <p className="text-[11px] text-[#64748b]">{site.description}</p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#C9A84C]" />
        </a>
      )}
    </div>
  );
};

export default ContextPanel;
