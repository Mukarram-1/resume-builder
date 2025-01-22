import ResumePreview from "../../../components/ResumePreview";
import { ResumeValues } from "utils/validations";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import cn from "@resume/ui/cn";
import Template1 from "app/(main)/editor/Templates/Template1";
import Template2 from "./Templates/Template2";
import Template3 from "./Templates/Template3";
import Template4 from "./Templates/Template4";
import Template5 from "./Templates/Template5";
import Template6 from "./Templates/Template6";
import Template7 from "./Templates/Template7";
import Template8 from "./Templates/Template8";
import Template9 from "./Templates/Template9";
import Template10 from "./Templates/Template10";
import Template11 from "./Templates/Template11";

interface ResumePreviewSectionProps {
    resumeData: ResumeValues;
    setResumeData: (data: ResumeValues) => void;
    className?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  selectedTemplate,
  className,
}: ResumePreviewSectionProps & { selectedTemplate: number }) {
    const templates = [
      ResumePreview,
      Template1,
      Template2,
      Template3,
      Template4,
      Template5,
      Template6,
      Template7,
      Template8,
      Template9,
      Template10,
      Template11,
    ];
    const TemplateComponent = templates[selectedTemplate] || Template1;
  return (
    // <div className={cn("group relative hidden w-1/2 md:flex", className)}>
    //   <div className="flex w-full justify-center overflow-y-auto bg-secondary">
    //     {/* <ResumePreview resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template1  resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template2 resumeData={resumeData} className={"max-w-2xl shadow-md"} /> */}
    //     {/* <Template3 resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template4 resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template5 resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template6 resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template7 resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template8 resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template9 resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     {/* <Template10 resumeData={resumeData} className={"max-w-2xl shadow-md"} /> */}
    //     {/* <Template11 resumeData={resumeData} className={"max-w-2xl shadow-md"}/> */}
    //     <TemplateComponent
    //       resumeData={resumeData}
    //       className={"max-w-2xl shadow-md"}
    //     />
    //   </div>
    // </div>
    <div
      className={cn(
        "group relative hidden w-1/2 md:flex bg-secondary",
        className
      )}
    >
      <div className="w-full h-full overflow-y-auto ">
        <div className="flex justify-center h-auto w-full">
          <TemplateComponent
            resumeData={resumeData}
            className="max-w-2xl shadow-md h-auto"
          />
        </div>
      </div>
    </div>
  );
}