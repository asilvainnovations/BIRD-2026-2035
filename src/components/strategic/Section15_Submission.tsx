import { useFormContext } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2 } from "lucide-react";

interface SubmissionProps {
  isSubmitting: boolean;
  isSuccess: boolean;
}

export function Section15_Submission({ isSubmitting, isSuccess }: SubmissionProps) {
  const form = useFormContext();

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
        <CheckCircle2 className="w-20 h-20 text-[#6ee7b7] animate-pulse" />
        <h2 className="text-3xl font-serif text-[#C9A84C]">Validation Received</h2>
        <p className="text-[#ecfdf5]/80 text-lg max-w-md">
          Thank you for shaping the Emerging Bangsamoro. Your insights have been securely recorded and will feed directly into the Strat Planner Pro MEL Dashboard.
        </p>
        <Button variant="outline" className="border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10" onClick={() => window.location.reload()}>
          Submit Another Response
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CardHeader className="p-0">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs border-[#C9A84C]/40 text-[#C9A84C]">Final Step</Badge>
        </div>
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">15. Review & Submission</CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          Please review your responses. By submitting, you agree to the anonymized use of this data for the BIRD 2026-2035 roadmap validation.
        </CardDescription>
      </CardHeader>

      {/* BIRD Vision — Wide Format Context */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/18.%20Vision.png"
          alt="BIRD Vision 2026-2035 — The future we are building together"
          className="w-full h-auto max-h-[400px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            Source: BIRD 2026-2035 — Strategic Vision: An Emerging Bangsamoro
          </p>
        </div>
      </div>

      {/* BEIE Framework Overview — Wide Format Context */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/20 shadow-lg group">
        <img
          src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/19.%20Bangsamoro%20BEIE%20Framework.png"
          alt="Bangsamoro BEIE Framework — Complete ecosystem overview"
          className="w-full h-auto max-h-[500px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            Source: BIRD 2026-2035 — Bangsamoro BEIE Framework Overview
          </p>
        </div>
      </div>

      <div className="bg-[#011a12]/40 border border-[#C9A84C]/30 rounded-lg p-6 space-y-4">
        <h3 className="font-serif text-[#C9A84C] text-lg">Data Privacy & Usage</h3>
        <ul className="list-disc list-inside text-[#ecfdf5]/80 space-y-2 text-sm">
          <li>Your individual responses will be aggregated with other stakeholders.</li>
          <li>No personally identifiable information (PII) will be published in the final BIRD report.</li>
          <li>Data will be stored securely in the BIRD repository for Strat Planner Pro analysis.</li>
        </ul>
      </div>

      <FormField
        control={form.control}
        name="consent_final"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-[#C9A84C]/30 p-4 bg-[#011a12]/40">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-[#C9A84C]/50 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:border-[#C9A84C]" />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-[#ecfdf5] font-semibold cursor-pointer">
                I confirm that my responses are accurate and consent to their use for strategic planning.
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] font-bold text-lg py-6 shadow-lg shadow-[#C9A84C]/20 transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Securing Data to Repository...
            </>
          ) : (
            "Submit Final Validation"
          )}
        </Button>
      </div>
    </div>
  );
}
