import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Building2, Wifi, GraduationCap, HeartPulse, AlertTriangle } from "lucide-react";

export interface SurveyData {
  q5_1: string;
  q5_2: string[];
  q5_3: string;
}

interface Section5Props {
  data: SurveyData;
  onChange: (field: keyof SurveyData, value: any) => void;
}

export const Section5_Enablers: React.FC<Section5Props> = ({ data, onChange }) => {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    const current = data.q5_2 || [];
    if (checked) {
      onChange('q5_2', [...current, value]);
    } else {
      onChange('q5_2', current.filter((v) => v !== value));
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl text-foreground">Section 5: Enablers Cluster</CardTitle>
            <CardDescription className="text-muted-foreground">
              Infrastructure, Human Capital, Digital & Health Systems
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Context Box */}
        <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Context:</strong> BARMM faces a binding constraint with a 59.3% functional literacy rate (lowest nationally), &lt;30% broadband in rural/island areas, and critical infrastructure gaps. The BIRD roadmap targets 75%+ literacy and 85% broadband by 2035.
          </div>
        </div>

        {/* Q5.1 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            5.1 How would you rate the current state of infrastructure in BARMM?
          </Label>
          <RadioGroup 
            value={data.q5_1} 
            onValueChange={(val) => onChange('q5_1', val)}
            className="grid grid-cols-5 gap-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2">
                <RadioGroupItem value={num.toString()} id={`q5_1_${num}`} className="peer sr-only" />
                <Label
                  htmlFor={`q5_1_${num}`}
                  className="flex flex-col items-center justify-center w-full h-16 rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all"
                >
                  <span className="text-2xl font-bold">{num}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {num === 1 ? 'Very Poor' : num === 5 ? 'Excellent' : ''}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q5.2 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            5.2 Which enabler sectors need the most investment? (Select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'roads', label: 'Farm-to-market roads & logistics', icon: Building2 },
              { id: 'digital', label: 'Digital broadband infrastructure', icon: Wifi },
              { id: 'education', label: 'Education & TVET alignment', icon: GraduationCap },
              { id: 'health', label: 'Healthcare & nutrition', icon: HeartPulse },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <Checkbox 
                  id={`q5_2_${item.id}`} 
                  checked={data.q5_2?.includes(item.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                />
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor={`q5_2_${item.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Q5.3 */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">
            5.3 How realistic is the target of 85% broadband penetration by 2035?
          </Label>
          <RadioGroup 
            value={data.q5_3} 
            onValueChange={(val) => onChange('q5_3', val)}
            className="grid grid-cols-5 gap-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2">
                <RadioGroupItem value={num.toString()} id={`q5_3_${num}`} className="peer sr-only" />
                <Label
                  htmlFor={`q5_3_${num}`}
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
