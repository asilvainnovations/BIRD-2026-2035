import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section5_Enablers } from "./Section5_Enablers";
import { Section6_Connectors } from "./Section6_Connectors";
import { Section7_Financiers } from "./Section7_Financiers";
import { FileCheck, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const ValidationSurvey: React.FC = () => {
  // Initialize state for all sections
  const [surveyData, setSurveyData] = useState({
    q5_1: '', q5_2: [], q5_3: '',
    q6_1: '', q6_2: [], q6_3: '',
    q7_1: '', q7_2: [], q7_3: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call to your Netlify/Vercel function
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production: await fetch('/api/submit', { method: 'POST', body: JSON.stringify({ surveyData }) });
      
      toast({
        title: "Validation Submitted",
        description: "Your insights have been securely recorded in the BIRD repository.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-3 mb-8">
        <FileCheck className="w-8 h-8 text-cyan-400" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">BIRD 2026–2035 Validation Survey</h1>
          <p className="text-muted-foreground">Batch 3: Enablers, Connectors, and Financiers Clusters</p>
        </div>
      </div>

      {/* Render Sections */}
      <Section5_Enablers 
        data={surveyData} 
        onChange={(field, val) => handleFieldChange(field, val)} 
      />
      
      <Section6_Connectors 
        data={surveyData} 
        onChange={(field, val) => handleFieldChange(field, val)} 
      />
      
      <Section7_Financiers 
        data={surveyData} 
        onChange={(field, val) => handleFieldChange(field, val)} 
      />

      {/* Submit Action */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Ready to submit your validation?</h3>
            <p className="text-sm text-muted-foreground">Your data will be encrypted and committed to the BIRD repository.</p>
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting} 
            className="bg-cyan-500 hover:bg-cyan-600 text-white min-w-[160px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Securing Data...
              </>
            ) : (
              'Submit Validation'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
