"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import type { ResumeValues } from "utils/validations";
import ResumePreviewSection from "./ResumePreviewSection";
import cn from "@resume/ui/cn";
import useAutoSaveReume from "./useAutoSaveResume";
import useUnloadWarning from "@resume/ui/hooks/use-unload-warning";
import type { ResumeServerData } from "utils/types";
import { mapToResumeValues } from "utils/utils";
import TemplateSelector from "./TemplateSelector";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {}
  );
  const [showResumePreviewOnSmallScreen, setShowResumePreviewOnSmallScreen] =
    useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const { isSaving, hasUnsavedData } = useAutoSaveReume(resumeData);
  console.log(isSaving, hasUnsavedData);

  useUnloadWarning(hasUnsavedData);

  const currentStep = searchParams.get("step") || steps[0]!.key;

  function setCurrentStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex grow flex-col">
      <main className="relative grow w-full">
        <div className="absolute bottom-0 top-0 flex w-full gap-4">
          <div
            className={cn(
              "w-full p-3 overflow-y-auto space-y-12 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-700 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full",
              showResumePreviewOnSmallScreen && "hidden"
            )}
          >
            <Breadcrumbs
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(
              //   "w-[calc(50%-1rem)]",
              showResumePreviewOnSmallScreen && "flex"
            )}
            selectedTemplate={selectedTemplate}
          />
          <TemplateSelector
            onSelectTemplate={setSelectedTemplate}
            className="w-[calc(25%-1rem)]"
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        showResumePreviewOnSmallScreen={showResumePreviewOnSmallScreen}
        setShowResumePreviewOnSmallScreen={setShowResumePreviewOnSmallScreen}
        resumeData={resumeData}
        setResumeData={setResumeData}
        isSaving={isSaving}
      />
    </div>
  );
}
