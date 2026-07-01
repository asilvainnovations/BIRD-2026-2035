import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Landmark, Shield, HandCoins, Users, AlertTriangle } from "lucide-react";

export interface SurveyData {
  q7_1: string;
  q7_2: string[];
  q7_3: string;
}

interface Section7Props {
  data: SurveyData;
  onChange: (field: keyof SurveyData, value: any) => void;
}

export const Section7_Financiers: React.FC<Section7Props> = ({ data, onChange }) => {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    const current = data.q7_2 || [];
    if (checked) onChange('q7_2', [...current, value]);
    else onChange('q7_2', current.filter((v) => v !== value));
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl text-foreground">Section 7: Financiers Cluster</CardTitle>
            <CardDescription className="text-muted-foreground">
              Islamic Banking, Takaful, Waqf & Microfinance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 flex gap-3">
          <HandCoins className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Context:</strong> Despite RA 11439 (Islamic Banking Law), formal financial penetration remains minimal (&lt;₱2B assets) relative to BARMM's 5.69M Muslim-majority demographic. The roadmap targets ₱20B+ in Islamic assets and 25% adult financial inclusion by 2035.
          </div>
        </div>

        {/* Q7.1 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            7.1 How critical is Islamic finance development for BARMM's economic transformation?
          </Label>
          <RadioGroup 
            value={data.q7_1} 
            onValueChange={(val) => onChange('q7_1', val)}
            className="grid grid-cols-5 gap-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2">
                <RadioGroupItem value={num.toString()} id={`q7_1_${num}`} className="peer sr-only" />
                <Label
                  htmlFor={`q7_1_${num}`}
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

        {/* Q7.2 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            7.2 Which Islamic finance instruments should be prioritized? (Select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'banking', label: 'Islamic Banking Expansion', icon: Landmark },
              { id: 'takaful', label: 'Takaful (Climate/Agri Insurance)', icon: Shield },
              { id: 'waqf', label: 'Waqf (Community Endowments)', icon: Users },
              { id: 'micro', label: 'Islamic Microfinance', icon: HandCoins },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <Checkbox 
                  id={`q7_2_${item.id}`} 
                  checked={data.q7_2?.includes(item.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                />
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor={`q7_2_${item.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Q7.3 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            7.3 How realistic is the target of 25% adult financial inclusion by 2035?
          </Label>
          <RadioGroup 
            value={data.q7_3} 
            onValueChange={(val) => onChange('q7_3', val)}
            className="grid grid-cols-5 gap-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2">
                <RadioGroupItem value={num.toString()} id={`q7_3_${num}`} className="peer sr-only" />
                <Label
                  htmlFor={`q7_3_${num}`}
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
