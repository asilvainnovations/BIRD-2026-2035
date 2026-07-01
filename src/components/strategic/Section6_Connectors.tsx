import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Globe, Ship, Plane, TrendingUp, AlertTriangle } from "lucide-react";

export interface SurveyData {
  q6_1: string;
  q6_2: string[];
  q6_3: string;
}

interface Section6Props {
  data: SurveyData;
  onChange: (field: keyof SurveyData, value: any) => void;
}

export const Section6_Connectors: React.FC<Section6Props> = ({ data, onChange }) => {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    const current = data.q6_2 || [];
    if (checked) onChange('q6_2', [...current, value]);
    else onChange('q6_2', current.filter((v) => v !== value));
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl text-foreground">Section 6: Connectors Cluster</CardTitle>
            <CardDescription className="text-muted-foreground">
              Trade, BIMP-EAGA Integration & Export Corridors
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Context:</strong> BARMM's strategic location within the BIMP-EAGA corridor and cultural proximity to Muslim-majority export destinations create unique trade advantages. The roadmap targets ₱40B+ in exports by 2035 via the UAE/GCC Halal Corridor.
          </div>
        </div>

        {/* Q6.1 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            6.1 How critical is BIMP-EAGA integration for BARMM's trade competitiveness?
          </Label>
          <RadioGroup 
            value={data.q6_1} 
            onValueChange={(val) => onChange('q6_1', val)}
            className="grid grid-cols-5 gap-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2">
                <RadioGroupItem value={num.toString()} id={`q6_1_${num}`} className="peer sr-only" />
                <Label
                  htmlFor={`q6_1_${num}`}
                  className="flex flex-col items-center justify-center w-full h-16 rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all"
                >
                  <span className="text-2xl font-bold">{num}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {num === 1 ? 'Low' : num === 5 ? 'Critical' : ''}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q6.2 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            6.2 Which export markets should be prioritized for halal products? (Select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'gcc', label: 'UAE / GCC (Middle East)', icon: Plane },
              { id: 'asean', label: 'Other ASEAN Markets', icon: Globe },
              { id: 'malaysia', label: 'Malaysia (BIMP-EAGA)', icon: Ship },
              { id: 'indonesia', label: 'Indonesia (BIMP-EAGA)', icon: Ship },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <Checkbox 
                  id={`q6_2_${item.id}`} 
                  checked={data.q6_2?.includes(item.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                />
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor={`q6_2_${item.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Q6.3 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            6.3 How realistic is the ₱40B+ export target by 2035?
          </Label>
          <RadioGroup 
            value={data.q6_3} 
            onValueChange={(val) => onChange('q6_3', val)}
            className="grid grid-cols-5 gap-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2">
                <RadioGroupItem value={num.toString()} id={`q6_3_${num}`} className="peer sr-only" />
                <Label
                  htmlFor={`q6_3_${num}`}
                  className="flex flex-col items-center justify-center w-full h-16 rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all"
                >
                  <span className="text-2xl font-bold">{num}</span>
                  <span className="text-xs text-muted-foreground mt-1 text-center">
                    {num === 1 ? 'Unrealistic' : num === 5 ? 'Highly Realistic' : ''}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
