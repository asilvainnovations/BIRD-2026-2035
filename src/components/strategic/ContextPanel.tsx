// src/components/strategic/ContextPanel.tsx
// BIRD 2026-2035 · Context Reference Panel with Videos, Images & Sites
// Updated: 2026-07-16 — description support, enhanced categories, tooltips

import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play, Image as ImageIcon, BookOpen, Globe, Info,
} from "lucide-react";
import {
  BIRD_VIDEOS, BIRD_IMAGES, BIRD_SITES,
  getImagesForSection, getVideosForSection,
  type BIRDImage, type BIRDVideo, type BIRDSite,
} from "@/lib/bird-urls";

// ── Category color map ───────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  framework:    { bg: "bg-[#C9A84C]/20",  text: "text-[#E8C560]",   border: "border-[#C9A84C]/40" },
  systems:      { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/40" },
  archetype:    { bg: "bg-amber-500/20",   text: "text-amber-400",   border: "border-amber-500/40" },
  cluster:      { bg: "bg-teal-500/20",    text: "text-teal-400",    border: "border-teal-500/40" },
  connectivity: { bg: "bg-sky-500/20",     text: "text-sky-400",     border: "border-sky-500/40" },
  provincial:   { bg: "bg-violet-500/20",  text: "text-violet-400",  border: "border-violet-500/40" },
  "provincial-outlook": { bg: "bg-fuchsia-500/20", text: "text-fuchsia-400", border: "border-fuchsia-500/40" },
  leverage:     { bg: "bg-rose-500/20",    text: "text-rose-400",    border: "border-rose-500/40" },
  roadmap:      { bg: "bg-[#C9A84C]/20",  text: "text-[#E8C560]",   border: "border-[#C9A84C]/40" },
  cld:          { bg: "bg-cyan-500/20",    text: "text-cyan-400",    border: "border-cyan-500/40" },
  survey:       { bg: "bg-lime-500/20",    text: "text-lime-400",    border: "border-lime-500/40" },
  metrics:      { bg: "bg-orange-500/20",  text: "text-orange-400",  border: "border-orange-500/40" },
  finance:      { bg: "bg-green-500/20",   text: "text-green-400",   border: "border-green-500/40" },
  governance:   { bg: "bg-indigo-500/20",  text: "text-indigo-400",  border: "border-indigo-500/40" },
  site:         { bg: "bg-[#C9A84C]/20",  text: "text-[#E8C560]",   border: "border-[#C9A84C]/40" },
};

function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] || { bg: "bg-[#C9A84C]/10", text: "text-[#E8C560]", border: "border-[#C9A84C]/30" };
}

// ── Components ───────────────────────────────────────────────────────────────

interface ContextPanelProps {
  sectionId?: string;
  showAll?: boolean;
  compact?: boolean;
}

/** Inline video thumbnail with play overlay */
const VideoThumbnail: React.FC<{ video: BIRDVideo; compact?: boolean }> = ({ video, compact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoId = video.url.split("/").pop()?.split("?")[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={`flex items-center gap-2 rounded-lg bg-[#022c22]/60 border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all text-left w-full group ${compact ? "px-3 py-2" : "flex-col"}`}>
          <div className={`rounded-full bg-[#C9A84C]/20 flex items-center justify-center group-hover:bg-[#C9A84C]/30 ${compact ? "w-8 h-8" : "w-14 h-14 mb-2"}`}>
            <Play className={`text-[#C9A84C] fill-current ${compact ? "w-4 h-4" : "w-6 h-6"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-[#E8C560] truncate ${compact ? "text-xs" : "text-sm"}`}>{video.title}</p>
            {!compact && <p className="text-[10px] text-[#ecfdf5]/50">{video.duration}</p>}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-[#022c22] border-[#C9A84C]/30">
        <DialogHeader>
          <DialogTitle className="text-[#C9A84C] font-serif">{video.title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video rounded-lg overflow-hidden border border-[#C9A84C]/20">
          <iframe
            width="100%" height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.title} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-sm text-[#ecfdf5]/70">{video.description}</p>
      </DialogContent>
    </Dialog>
  );
};

/** Image card with lightbox, category badge, and description tooltip */
const ImageCard: React.FC<{ image: BIRDImage; compact?: boolean }> = ({ image, compact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const catStyle = getCategoryStyle(image.category);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={`rounded-xl overflow-hidden border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all bg-[#011a12] text-left w-full group ${compact ? "flex items-center gap-2 px-3 py-2" : ""}`}>
          {compact ? (
            <>
              <div className="w-8 h-8 rounded bg-[#C9A84C]/20 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <p className="text-xs font-semibold text-[#E8C560] truncate">{image.title}</p>
            </>
          ) : (
            <>
              <div className="aspect-[4/3] bg-[#022c22] relative">
                <img
                  src={image.url} alt={image.alt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3">
                  <Badge variant="outline" className={`text-[9px] ${catStyle.border} ${catStyle.text} ${catStyle.bg}`}>
                    {image.category}
                  </Badge>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-[#E8C560] line-clamp-2">{image.title}</p>
                {"description" in image && image.description && (
                  <p className="text-[10px] text-[#ecfdf5]/40 mt-1 line-clamp-2">{image.description}</p>
                )}
              </div>
            </>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-[#022c22] border-[#C9A84C]/30">
        <DialogHeader>
          <DialogTitle className="text-[#C9A84C] font-serif">{image.title}</DialogTitle>
        </DialogHeader>
        <img
          src={image.url} alt={image.alt}
          className="w-full rounded-lg border border-[#C9A84C]/20"
        />
        <div className="flex items-start gap-2 mt-2">
          <Info className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-[#ecfdf5]/70">{(image as BIRDImage & { description?: string }).description}</p>
        </div>
        <div className="flex gap-2 mt-1">
          <Badge variant="outline" className={`text-[10px] ${catStyle.border} ${catStyle.text} ${catStyle.bg}`}>
            {image.category}
          </Badge>
          <Badge variant="outline" className="text-[10px] border-[#C9A84C]/30 text-[#ecfdf5]/50">
            {image.section}
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/** External site link card */
const SiteLink: React.FC<{ site: BIRDSite }> = ({ site }) => (
  <a
    href={site.url} target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#022c22]/60 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/5 transition-all group"
  >
    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C]/20">
      <Globe className="w-5 h-5 text-[#C9A84C]" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-[#E8C560]">{site.title}</p>
      <p className="text-[10px] text-[#ecfdf5]/50 truncate">{site.description}</p>
    </div>
  </a>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export const ContextPanel: React.FC<ContextPanelProps> = ({
  sectionId, showAll = false, compact = false,
}) => {
  const sectionVideos = showAll
    ? Object.values(BIRD_VIDEOS)
    : sectionId
      ? getVideosForSection(sectionId)
      : [];
  const sectionImages = showAll
    ? Object.values(BIRD_IMAGES)
    : sectionId
      ? getImagesForSection(sectionId)
      : [];
  const hasContent = sectionVideos.length > 0 || sectionImages.length > 0;
  if (!hasContent && !showAll) return null;

  // Determine default tab
  const defaultTab = sectionVideos.length > 0 ? "videos" : sectionImages.length > 0 ? "images" : "sites";

  return (
    <div className={`rounded-xl border border-[#C9A84C]/20 bg-[#011a12]/50 backdrop-blur-sm ${compact ? "p-3" : "p-4"}`}>
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-[#C9A84C]" />
        <h4 className="text-sm font-bold text-[#C9A84C] uppercase tracking-wider">Context &amp; References</h4>
        {showAll && (
          <Badge variant="outline" className="text-[9px] border-[#C9A84C]/30 text-[#C9A84C]/70 ml-auto">
            {sectionVideos.length + sectionImages.length + Object.keys(BIRD_SITES).length} items
          </Badge>
        )}
      </div>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="bg-[#022c22]/60 border border-[#C9A84C]/20 w-full mb-3 flex-wrap h-auto py-1">
          {(sectionVideos.length > 0 || showAll) && (
            <TabsTrigger value="videos" className="text-xs data-[state=active]:bg-[#C9A84C] data-[state=active]:text-[#022c22]">
              <Play className="w-3 h-3 mr-1" /> Videos ({sectionVideos.length})
            </TabsTrigger>
          )}
          {(sectionImages.length > 0 || showAll) && (
            <TabsTrigger value="images" className="text-xs data-[state=active]:bg-[#C9A84C] data-[state=active]:text-[#022c22]">
              <ImageIcon className="w-3 h-3 mr-1" /> Images ({sectionImages.length})
            </TabsTrigger>
          )}
          <TabsTrigger value="sites" className="text-xs data-[state=active]:bg-[#C9A84C] data-[state=active]:text-[#022c22]">
            <Globe className="w-3 h-3 mr-1" /> Sites ({Object.keys(BIRD_SITES).length})
          </TabsTrigger>
        </TabsList>

        {(sectionVideos.length > 0 || showAll) && (
          <TabsContent value="videos">
            <ScrollArea className={compact ? "h-48" : "h-64"}>
              <div className={`grid ${compact ? "grid-cols-1 gap-2" : "grid-cols-1 sm:grid-cols-2 gap-3"}`}>
                {sectionVideos.map((v, i) => <VideoThumbnail key={i} video={v} compact={compact} />)}
              </div>
            </ScrollArea>
          </TabsContent>
        )}

        {(sectionImages.length > 0 || showAll) && (
          <TabsContent value="images">
            <ScrollArea className={compact ? "h-48" : "h-72"}>
              <div className={`grid ${compact ? "grid-cols-1 gap-2" : "grid-cols-2 sm:grid-cols-3 gap-3"}`}>
                {sectionImages.map((img, i) => <ImageCard key={i} image={img} compact={compact} />)}
              </div>
            </ScrollArea>
          </TabsContent>
        )}

        <TabsContent value="sites">
          <ScrollArea className={compact ? "h-48" : "h-72"}>
            <div className="space-y-2">
              {Object.values(BIRD_SITES).map((s, i) => <SiteLink key={i} site={s} />)}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPACT STRIP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export const ContextStrip: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const videos = getVideosForSection(sectionId);
  const images = getImagesForSection(sectionId);
  const total = videos.length + images.length;
  if (total === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {videos.map((v, i) => {
        const videoId = v.url.split("/").pop()?.split("?")[0];
        return (
          <Dialog key={`v-${i}`}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#E8C560] text-[10px] font-semibold hover:bg-[#C9A84C]/20 transition-colors">
                <Play className="w-3 h-3 fill-current" /> {v.duration}
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-[#022c22] border-[#C9A84C]/30">
              <DialogHeader>
                <DialogTitle className="text-[#C9A84C] font-serif">{v.title}</DialogTitle>
              </DialogHeader>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={v.title} frameBorder="0" allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="text-sm text-[#ecfdf5]/70">{v.description}</p>
            </DialogContent>
          </Dialog>
        );
      })}
      {images.map((img, i) => (
        <Dialog key={`img-${i}`}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#E8C560] text-[10px] font-semibold hover:bg-[#C9A84C]/20 transition-colors">
              <ImageIcon className="w-3 h-3" /> {img.category}
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl bg-[#022c22] border-[#C9A84C]/30">
            <DialogHeader>
              <DialogTitle className="text-[#C9A84C] font-serif">{img.title}</DialogTitle>
            </DialogHeader>
            <img src={img.url} alt={img.alt} className="w-full rounded-lg border border-[#C9A84C]/20" />
            {(img as BIRDImage & { description?: string }).description && (
              <div className="flex items-start gap-2 mt-2">
                <Info className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#ecfdf5]/70">{(img as BIRDImage & { description?: string }).description}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

/** Standalone media browser for modal/contextual use */
export const MediaBrowser: React.FC<{ category?: string; title?: string }> = ({ category, title }) => {
  const images = category
    ? Object.values(BIRD_IMAGES).filter(img => img.category === category)
    : Object.values(BIRD_IMAGES);

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-bold text-[#C9A84C] font-serif">{title}</h3>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => <ImageCard key={i} image={img} />)}
      </div>
    </div>
  );
};

export default ContextPanel;
