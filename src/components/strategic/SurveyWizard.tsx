// src/components/SurveyWizard.tsx
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema, type SurveySchemaType } from "@/lib/survey-schema";
import { Section1_BEIE } from "./strategic/Section1_BEIE";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SurveyWizardProps {
  onSubmit?: (data: SurveySchemaType) => void;
}

export function SurveyWizard({ onSubmit }: SurveyWizardProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SurveySchemaType>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues: {
      q1_1: undefined,
      q1_2: undefined,
      // ... other default values
    },
  });

  const sections = [
    { title: "BEIE Framework Context", component: Section1_BEIE },
    // ... other sections
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleNext = async () => {
    const fields = getCurrentSectionFields(currentSection);
    const isValid = await form.trigger(fields as any);
    
    if (isValid) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async (data: SurveySchemaType) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await onSubmit?.(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentSectionFields = (sectionIndex: number): string[] => {
    // Map sections to their respective form fields
    const fieldMap: Record<number, string[]> = {
      0: ["q1_1", "q1_2"],
      // ... other sections
    };
    return fieldMap[sectionIndex] || [];
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <FormProvider {...form}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#C9A84C]">
              BIRD 2026-2035 Validation Survey
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-[#ecfdf5]/70">
                <span>Section {currentSection + 1} of {sections.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {submitError && (
              <Alert variant="destructive">
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <CurrentComponent />

              <div className="flex justify-between pt-6 border-t border-[#C9A84C]/20">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  className="border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10"
                >
                  Previous
                </Button>

                {currentSection === sections.length - 1 ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#C9A84C] text-[#011a12] hover:bg-[#C9A84C]/90"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Survey"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#C9A84C] text-[#011a12] hover:bg-[#C9A84C]/90"
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
}
