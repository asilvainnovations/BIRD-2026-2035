// src/components/strategic/Section1_BEIE.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function Section1_BEIE() {
  const form = useFormContext();
  
  return (
    <div className="space-y-8">
      {/* Welcome Card — shown only on Step 1 */}
      <div className="rounded-xl border border-[#C9A84C]/30 bg-[#011a12] p-5 md:p-6 space-y-4">
        <h2 className="text-xl md:text-2xl font-serif text-[#C9A84C] text-center">
          Help Shape the Bangsamoro Investment Roadmap
        </h2>
        <p className="text-[#ecfdf5]/70 text-sm md:text-base text-center leading-relaxed">
          BARMM is charting its economic course for 2026–2035. This survey captures your ground-level knowledge — as a government partner, business owner, researcher, or community leader — to turn a ₱120–160 billion investment plan into action that works for the people it serves.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-[#022c22] border border-[#C9A84C]/20">
            <p className="text-[#C9A84C] font-bold text-base mb-1">Confirm</p>
            <p className="text-[#ecfdf5]/60 text-xs">Which priorities matter most on the ground</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#022c22] border border-[#C9A84C]/20">
            <p className="text-[#C9A84C] font-bold text-base mb-1">Strengthen</p>
            <p className="text-[#ecfdf5]/60 text-xs">Where BARMM is vulnerable to shocks and gaps</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#022c22] border border-[#C9A84C]/20">
            <p className="text-[#C9A84C] font-bold text-base mb-1">Guide</p>
            <p className="text-[#ecfdf5]/60 text-xs">How ₱120–160B gets allocated across provinces</p>
          </div>
        </div>
        <div className="border-t border-[#C9A84C]/20 pt-3">
          <h3 className="text-xs font-bold text-[#E8C560] uppercase tracking-wider mb-2">What you will do</h3>
          <ul className="text-sm text-[#ecfdf5]/70 space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-[#C9A84C] mt-0.5">✓</span><span>Answer focused questions across agriculture, halal industry, infrastructure, trade, and Islamic finance</span></li>
            <li className="flex items-start gap-2"><span className="text-[#C9A84C] mt-0.5">✓</span><span>Rate strategies and score investment options using the IEDS evaluation matrix</span></li>
            <li className="flex items-start gap-2"><span className="text-[#C9A84C] mt-0.5">✓</span><span>Share province-specific insights so the roadmap reflects real conditions</span></li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#ecfdf5]/50 border-t border-[#C9A84C]/20 pt-3">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Protected under the <a href="https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html" target="_blank" rel="noopener" className="text-[#C9A84C] hover:text-[#E8C560] underline underline-offset-2">Data Privacy Act of 2012</a>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Works offline. Saves automatically.
          </span>
        </div>
      </div>

      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">
          1. The BEIE Framework Context
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          The Bangsamoro Economic and Investment Ecosystem (BEIE) Framework organizes the region into five functional clusters anchored by Moral Governance.
        </CardDescription>
      </CardHeader>

      {/* Full-width BEIE header image */}
      <div className="w-full rounded-lg overflow-hidden border border-[#C9A84C]/20">
        <img
          src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/19.%20Bangsamoro%20BEIE%20Framework.png"
          alt="Bangsamoro BEIE Framework"
          className="w-full h-56 object-cover"
        />
      </div>

      {/* Provincial Context Section */}
      <CardContent className="space-y-6 p-0">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#ecfdf5]">Provincial Strategic Context</h3>
          
          {/* UAE & GCC Connectivity */}
          <div className="rounded-lg overflow-hidden border border-[#C9A84C]/20 bg-[#011a12]/40">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png"
              alt="BARMM Strategic Connectivity vis-à-vis UAE & GCC"
              className="w-full h-auto"
            />
            <div className="p-4">
              <p className="text-sm text-[#ecfdf5]/80">
                <strong>Halal Export Corridor:</strong> BARMM's strategic positioning to capture UAE/GCC halal market opportunities, 
                with Maguindanao del Norte and Lanao del Sur serving as primary production hubs for certified halal products.
              </p>
            </div>
          </div>

          {/* BIMP-EAGA Connectivity */}
          <div className="rounded-lg overflow-hidden border border-[#C9A84C]/20 bg-[#011a12]/40">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity%20%20.png"
              alt="BARMM Strategic Connectivity vis-à-vis BIMP-EAGA"
              className="w-full h-auto"
            />
            <div className="p-4">
              <p className="text-sm text-[#ecfdf5]/80">
                <strong>Regional Integration:</strong> Tawi-Tawi and Basilan serve as gateways to BIMP-EAGA markets, 
                leveraging proximity to Sabah (20km) and maritime trade routes for cross-border commerce.
              </p>
            </div>
          </div>

          {/* Provincial Endowments */}
          <div className="rounded-lg overflow-hidden border border-[#C9A84C]/20 bg-[#011a12]/40">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/13.%20Provincial%20Endowments-Mainlands.png"
              alt="Provincial Endowments - Mainlands (Lanao del Sur & Maguindanao)"
              className="w-full h-auto"
            />
            <div className="p-4">
              <p className="text-sm text-[#ecfdf5]/80">
                <strong>Mainland Advantages:</strong> Lanao del Sur (Lake Lanao watershed, SPDA agro-ecological zones) and 
                Maguindanao (Polloc Freeport, fertile plains) demonstrate heterogeneous endowments requiring tailored investment strategies.
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Cluster thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto py-3">
        {[
          {
            src: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/20.%20Operating%20Systems_%20Trust%20as%20the%20Currency.png",
            alt: "Operating Systems — Trust as the Currency",
          },
          { src: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/25.%20Cluster%201_%20Foundations.png", alt: "Cluster 1 — Foundations" },
          { src: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/26.%20Cluster%202%20_%20Transformers.png", alt: "Cluster 2 — Transformers" },
          { src: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/28.%20Cluster%203%20_%20Enablers.png", alt: "Cluster 3 — Enablers" },
          { src: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/33.%20Cluster%204_%20Connectors.png", alt: "Cluster 4 — Connectors" },
          { src: "https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/38.%20Cluster%205_%20Financiers.png", alt: "Cluster 5 — Financiers" },
        ].map((img) => (
          <div key={img.src} className="flex-shrink-0 w-56 h-28 rounded overflow-hidden border border-[#C9A84C]/10">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Video Embed Placeholder */}
      <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#C9A84C]/30 bg-black/40">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/0J491Vqya_4"
          title="BEIE Framework Video"
          allowFullScreen
        />
      </div>

      {/* Question 1.1 */}
      <FormField
        control={form.control}
        name="q1_1"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              1.1 How well do you understand the BEIE Framework after watching the video?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {[{ value: "5", label: "Very Well" }, { value: "4", label: "Well" }, { value: "3", label: "Moderately" }, { value: "2", label: "Slightly" }, { value: "1", label: "Not at All" }].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q1_1-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q1_1-${option.value}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
                      {option.label}
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormDescription className="text-sm text-[#ecfdf5]/60">
              Consider how the framework addresses provincial heterogeneity: Maguindanao's industrial capacity vs. Tawi-Tawi's seaweed production vs. Basilan's rubber plantations.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Question 1.2 */}
      <FormField
        control={form.control}
        name="q1_2"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              1.2 How relevant is this five-cluster framework to BARMM's development needs?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {[{ value: "5", label: "Highly Relevant" }, { value: "4", label: "Relevant" }, { value: "3", label: "Moderately Relevant" }, { value: "2", label: "Slightly Relevant" }, { value: "1", label: "Not Relevant" }].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q1_2-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q1_2-${option.value}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
                      {option.label}
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormDescription className="text-sm text-[#ecfdf5]/60">
              Reflect on how the framework addresses diverse provincial contexts: mainland provinces (Maguindanao, Lanao del Sur) vs. archipelagic provinces (Tawi-Tawi, Sulu, Basilan).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
