import Image from "next/image";
import { useState } from "react";
import cn from "@resume/ui/cn";

interface TemplateSelectorProps {
    className?: string;
  onSelectTemplate: (templateNumber: number) => void;
}

const templates = [
  { number: 1, src: "/assets/images/template 1.jpg" },
  { number: 2, src: "/assets/images/template 2.jpg" },
  { number: 3, src: "/assets/images/template 3.jpg" },
  { number: 4, src: "/assets/images/template 4.jpg" },
  { number: 5, src: "/assets/images/template 5.jpg" },
  { number: 6, src: "/assets/images/template 6.jpg" },
  { number: 7, src: "/assets/images/template 7.jpg" },
  { number: 8, src: "/assets/images/template 8.jpg" },
  { number: 9, src: "/assets/images/template 9.jpg" },
  { number: 10, src: "/assets/images/template 10.jpg" },
  { number: 11, src: "/assets/images/template 11.jpg" },
];

export default function TemplateSelector({
    className,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const handleTemplateClick = (templateNumber: number) => {
    setSelectedTemplate(templateNumber);
    onSelectTemplate(templateNumber);
  };

  return (
    <div
      className={cn(
        `h-full overflow-y-auto p-4 bg-secondary [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-700 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full`,
        className
      )}
    >
      {/* <h2 className="text-lg mb-4">Choose Template</h2> */}
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <div
            key={template.number}
            className="cursor-pointer overflow-hidden"
            onClick={() => handleTemplateClick(template.number)}
          >
            <Image
              src={template.src || "/placeholder.svg"}
              alt={`Template ${template.number}`}
              width={141}
              height={200}
              className={cn(
                "w-full h-auto",
                selectedTemplate === template.number
                  ? "border-[3.5px] border-blue-500"
                  : "border-transparent"
              )}
            />
            <p className="font-white text-center border-none">
              {template.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
