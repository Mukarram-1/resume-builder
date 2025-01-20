import ResumePreview from "../../../components/ResumePreview";
import { ResumeValues } from "utils/validations";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import cn from "@resume/ui/cn";
import Template1 from "app/(main)/editor/Templates/Template1";
import Template2 from "./Templates/Template2";
import Template3 from "./Templates/Template3";

interface ResumePreviewSectionProps {
    resumeData: ResumeValues;
    setResumeData: (data: ResumeValues) => void;
    className?: string;
}

export default function ResumePreviewSection({
    resumeData,
    setResumeData,
    className
}: ResumePreviewSectionProps) {
    
    return (
      <div className={cn("group relative hidden w-1/2 md:flex", className)}>
        <div className="flex w-full justify-center overflow-y-auto bg-secondary">
          {/* <ResumePreview resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
          {/* <Template1  resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
          {/* <Template2 resumeData={resumeData} className={"max-w-2xl shadow-md"} /> */}
          <Template3 resumeData={resumeData} className={"max-w-2xl shadow-md"}/>
        </div>
      </div>
    );
}