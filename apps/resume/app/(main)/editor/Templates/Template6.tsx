import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";
import { Award, Briefcase, GraduationCap, PuzzleIcon } from "lucide-react";
import { useResumeColors } from "@resume/ui/hooks/useResumeColors";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?:string
  secondaryColor?:string
}

export default function Template6({
  resumeData,
  contentRef,
  className,
  primaryColor = "#2D3748",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  useResumeColors(primaryColor);
  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
    >
      <div
        className={cn("flex flex-col", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: resumeData.fontStyle,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {resumeData.firstName && <HeaderSection resumeData={resumeData} />}
        <div className="p-8 space-y-6">
          {resumeData.summary && <SummarySection resumeData={resumeData} />}
          {(resumeData.workExperiences?.length ?? 0) > 0 && (
            <ExperienceSection resumeData={resumeData} />
          )}
          {(resumeData.educations?.length ?? 0) > 0 && (
            <EducationSection resumeData={resumeData} />
          )}
          {(resumeData.skills?.length ?? 0) > 0 && (
            <SkillsSection resumeData={resumeData} />
          )}
          {(resumeData.softwares?.length ?? 0) > 0 && (
            <SoftwareSection resumeData={resumeData} />
          )}
          {(resumeData.certifications?.length ?? 0) > 0 && (
            <CertificationsSection resumeData={resumeData} />
          )}
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
const DiamondIcon = ({ Icon }: { Icon: React.ElementType}) => (
  <div className="relative ml-[0.7%]">
    <div className="w-8 h-8 rotate-45 flex items-center justify-center bg-resume-primary">
      <Icon className="w-5 h-5 text-white rotate-[-45deg]" />
    </div>
  </div>
);

function RatingDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <div
          key={value}
          className={cn(
            "w-3 h-3 rotate-45",
            value <= rating ? "bg-[#2D3748]" : "border border-[#2D3748]"
          )}
        />
      ))}
    </div>
  );
}

function HeaderSection({ resumeData }: ResumeSectionProps) {
  const { firstName, lastName, jobTitle, phone, email,linkedin } = resumeData;

  return (
    <div className=" text-white p-8 bg-resume-primary">
      <div className="space-y-2">
        {(firstName || lastName) && (
          <h1 className="text-3xl font-bold">
            {firstName} {lastName}
          </h1>
        )}
        {jobTitle && <p className="text-xl">{jobTitle}</p>}
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            {phone && (
              <p>
                <span className="font-semibold">Phone:</span> {phone}
              </p>
            )}
            {email && (
              <p>
                <span className="font-semibold">E-mail:</span> {email}
              </p>
            )}
          </div>
          {linkedin && (
            <div>
              <p>
                <span className="font-semibold">LinkedIn:</span>{" "}
                {linkedin}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  return (
    // <div className="text-sm text-gray-700 break-all whitespace-pre-wrap">
    //   <p>{resumeData.summary}</p>
    // </div>
    <div
      className="text-sm text-gray-700 summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
    />
  );
}

const ExperienceSection = ({ resumeData }: ResumeSectionProps) => {
  return (
    <section className="relative">
      <div
        className="absolute left-5 top-12 bottom-0 w-[1px] bg-resume-primary"
      />
      <div className="flex items-center gap-3 mb-4">
        <DiamondIcon Icon={Briefcase} />
        <h2 className="text-xl font-bold text-resume-primary">EXPERIENCE</h2>
      </div>
      <div className="space-y-6 ml-4">
        {resumeData.workExperiences?.map((exp, index) => (
          <div key={index} className="flex relative pl-6">
            <div
              className="absolute left-0 top-2 w-2 h-2 rotate-45 bg-resume-primary"
            />
            <div className="w-24 flex-shrink-0 text-sm font-bold text-gray-600">
              {exp.startDate && formatDate(exp.startDate, "MMM yyyy")} -{" "}
              {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "present"}
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-600">{exp.position}</div>
              <div className="mb-2 text-gray-600">{exp.company}</div>
              <ul
                className="list-disc ml-5 space-y-2 "
              >
                {exp.description
                  ?.split("\n")
                  .map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

function EducationSection({ resumeData }: ResumeSectionProps) {
  return (
    <section className="relative">
      <div
        className="absolute left-5 top-12 bottom-0 w-[1px] bg-resume-primary"
      />
      <div className="flex items-center gap-3 mb-4">
        <DiamondIcon Icon={GraduationCap} />
        <h2 className="text-xl font-bold text-resume-primary">EDUCATION</h2>
      </div>
      <div className="space-y-6 ml-4">
        {resumeData.educations?.map((edu, index) => (
          <div key={index} className="flex relative pl-6">
            <div
              className="absolute left-0 top-2 w-2 h-2 rotate-45 bg-resume-primary"
            />
            <div className="w-24 flex-shrink-0 text-gray-600 text-sm font-bold">
              {edu.startDate && formatDate(edu.startDate, "MMM yyyy")} -{" "}
              {edu.endDate ? formatDate(edu.endDate, "MMM yyyy") : "present"}
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-800">
                {edu.degree}, {edu.school}
              </div>
              <ul className="list-disc ml-5 space-y-2 text-gray-700">
                {edu.description
                  ?.split("\n")
                  .map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection({ resumeData }: ResumeSectionProps) {
  const { certifications } = resumeData;

  return (
    <section className="relative">
      <div
        className="absolute left-5 top-12 bottom-0 w-[1px] bg-resume-primary"
      />
      <div className="flex items-center gap-3 mb-4">
        <DiamondIcon Icon={Award} />
        <h2 className="text-xl font-bold text-resume-primary">
          CERTIFICATIONS
        </h2>
      </div>
      <div className="space-y-3 ml-4">
        {certifications?.map((cert, index) => (
          <div key={index} className="relative pl-6">
            <div
              className="absolute left-0 top-2 w-2 h-2 rotate-45 bg-resume-primary"
            />
            <div className="flex justify-between">
              <p className="text-sm font-bold">{cert.name}</p>
              <p className="text-sm text-gray-600">{cert.completionDate}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills } = resumeData;

  return (
    <section className="relative">
      <div
        className="absolute left-5 top-12 bottom-0 w-[1px] bg-resume-primary"
        // style={{ backgroundColor: `${primaryColor}25` }}
      />
      <div className="flex items-center gap-3 mb-4">
        <DiamondIcon Icon={PuzzleIcon} />
        <h2 className="text-xl font-bold text-resume-primary">Skills</h2>
      </div>
      <div className="space-y-3 ml-4">
        {skills?.map((item, index) => (
          <div key={index} className="relative pl-6">
            <div
              className="absolute left-0 top-2 w-2 h-2 rotate-45 bg-resume-primary"
            />
            <p className="text-sm font-bold">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SoftwareSection({ resumeData }: ResumeSectionProps) {
  const software = [
    { name: "Microsoft Project", rating: 5, level: "Excellent" },
    { name: "Microsoft Windows Server", rating: 4, level: "Very Good" },
  ];

  return (
    <section className="relative">
      <div className="absolute left-5 top-12 bottom-0 w-[1px] bg-gray-200" />
      <div className="flex items-center gap-3 mb-4">
        <DiamondIcon Icon={Award} />
        <h2 className="text-xl font-bold text-[#2D3748]">Software</h2>
      </div>
      <div className="space-y-3 ml-4">
        {software.map((item, index) => (
          <div
            key={index}
            className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#2D3748] before:rotate-45"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">{item.name}</p>
              <div className="flex flex-col items-center gap-2">
                <RatingDots rating={item.rating} />
                <span className="text-xs text-gray-600">{item.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
