import { useEffect, useRef } from "react";
import { formatDate } from "date-fns";
import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";
import {
  Award,
  Briefcase,
  ComputerIcon,
  GraduationCap,
  Heart,
  LinkIcon,
  User,
} from "lucide-react";
import { useResumeColors } from "@resume/ui/hooks/useResumeColors";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}

export default function Template8({
  resumeData,
  contentRef,
  className,
  primaryColor = "#003366",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  useResumeColors(primaryColor);

  // Helper to map a numeric size to a Tailwind CSS font size class.
  const getFontSizeClass = (size: number) => {
    const sizeMap: Record<number, string> = {
      12: "text-xs",
      14: "text-sm",
      16: "text-base",
      18: "text-lg",
      20: "text-xl",
      24: "text-2xl",
      30: "text-3xl",
      36: "text-4xl",
    };
    const sizes = Object.keys(sizeMap).map(Number);
    const closestSize = sizes.reduce((prev, curr) =>
      Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
    );
    return sizeMap[closestSize] || "text-base";
  };

  const primaryFontSizeClass = getFontSizeClass(
    Number(resumeData.primaryFontSize) || 20
  );
  const secondaryFontSizeClass = getFontSizeClass(
    Number(resumeData.secondaryFontSize) || 16
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
    >
      <div
        className={cn("p-8", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: resumeData.fontStyle,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <HeaderSection
          resumeData={resumeData}
          primaryFontSizeClass={primaryFontSizeClass}
          secondaryFontSizeClass={secondaryFontSizeClass}
        />
        <div className="grid grid-cols-[2fr_1fr] gap-8 mt-6">
          <div className="space-y-6">
            {(resumeData.workExperiences?.length ?? 0) > 0 && (
              <ExperienceSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.educations?.length ?? 0) > 0 && (
              <EducationSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.certifications?.length ?? 0) > 0 && (
              <CertificationsSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {resumeData.interests && (
              <InterestsSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
          </div>
          <div className="space-y-6">
            {(resumeData.city ||
              resumeData.country ||
              resumeData.phone ||
              resumeData.email) && (
              <PersonalInfoSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.skills?.length ?? 0) > 0 && (
              <SkillsSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {resumeData.softwares && (
              <SoftwareSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionIcon({ icon: Icon }: { icon: any }) {
  return (
    <div className="w-6 h-6 flex items-center justify-center bg-resume-primary">
      <Icon className="w-4 h-4 text-white" />
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-gray-200">
      <div className="h-full bg-[#003366]" style={{ width: `${value}%` }} />
    </div>
  );
}

function HeaderSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { firstName, lastName, jobTitle, summary } = resumeData;
  return (
    <div className="space-y-4">
      <h1 className={`${primaryFontSizeClass} font-bold text-resume-primary`}>
        {firstName} {lastName}
      </h1>
      <h2 className={`${primaryFontSizeClass} font-bold text-resume-primary`}>
        {jobTitle}
      </h2>
      <div
        className={`${secondaryFontSizeClass} text-sm text-gray-700 summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap`}
        dangerouslySetInnerHTML={{ __html: summary || "" }}
      />
    </div>
  );
}

function ExperienceSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { workExperiences } = resumeData;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Briefcase} />
        <h2 className={`${primaryFontSizeClass} font-bold`}>Experience</h2>
      </div>
      <div className={`space-y-6 ${secondaryFontSizeClass}`}>
        {workExperiences?.map((exp, index) => (
          <div key={index} className="flex">
            <div className="w-24 flex-shrink-0 text-gray-600 text-sm font-bold">
              {exp.startDate && formatDate(exp.startDate, "yyyy-MM")} -{" "}
              {exp.endDate ? formatDate(exp.endDate, "yyyy-MM") : "present"}
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-800">{exp.position}</div>
              <div className="text-gray-600 mb-2">{exp.company}</div>
              <ul className="list-disc ml-5 space-y-2 text-gray-700 break-all whitespace-pre-wrap">
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
}

function EducationSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { educations } = resumeData;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={GraduationCap} />
        <h2 className={`${primaryFontSizeClass} font-bold`}>Education</h2>
      </div>
      {educations?.map((edu, index) => (
        <div key={index} className="flex">
          <div className="w-24 flex-shrink-0 text-gray-600 text-sm font-bold">
            {edu.startDate && formatDate(edu.startDate, "yyyy-MM")} -{" "}
            {edu.endDate ? formatDate(edu.endDate, "yyyy-MM") : "present"}
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-800">{edu.school}</div>
            <div className="text-gray-600 mb-2">{edu.degree}</div>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              {edu.description?.split("\n").map((item, i) => (
                <li key={i} className="break-all whitespace-pre-wrap">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

function PersonalInfoSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { city, country, phone, email, linkedin } = resumeData;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={User} />
        <h2 className={`${primaryFontSizeClass} font-bold`}>Personal Info</h2>
      </div>
      <div className="space-y-4">
        {(city || country) && (
          <div>
            <h3 className="font-bold mb-1">Address</h3>
            <p className={`${secondaryFontSizeClass} text-sm text-gray-600`}>
              {city} {country}
            </p>
          </div>
        )}
        {phone && (
          <div>
            <h3 className="font-bold mb-1">Phone</h3>
            <p className={`${secondaryFontSizeClass} text-sm text-gray-600`}>
              {phone}
            </p>
          </div>
        )}
        {email && (
          <div>
            <h3 className="font-bold mb-1">E-mail</h3>
            <p className={`${secondaryFontSizeClass} text-sm text-gray-600`}>
              {email}
            </p>
          </div>
        )}
        {linkedin && (
          <div>
            <h3 className="font-bold mb-1">LinkedIn</h3>
            <p
              className={`${secondaryFontSizeClass} text-sm text-gray-600 break-all whitespace-pre-wrap`}
            >
              {linkedin}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SkillsSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { skills } = resumeData;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} />
        <h2 className={`${primaryFontSizeClass} font-bold`}>Skills</h2>
      </div>
      <ul className={`space-y-1 text-sm ${secondaryFontSizeClass}`}>
        {skills && skills.map((skill, index) => <li key={index}>{skill}</li>)}
      </ul>
    </section>
  );
}

function SoftwareSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const software = [
    { name: "Microsoft Project", level: 100 },
    { name: "Windows Server", level: 80 },
    { name: "Linux/Unix", level: 80 },
    { name: "Microsoft Excel", level: 60 },
  ];
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={ComputerIcon} />
        <h2 className={`${primaryFontSizeClass} font-bold`}>Software</h2>
      </div>
      <div className="space-y-4">
        {software.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col mb-1">
              <p className={`${secondaryFontSizeClass} text-sm`}>{item.name}</p>
              <ProgressBar value={item.level} />
              <span className="text-xs text-gray-500 text-end">
                {item.level === 100
                  ? "Excellent"
                  : item.level === 80
                    ? "Very Good"
                    : "Good"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { certifications } = resumeData;
  if (!certifications || certifications.length === 0) return null;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} />
        <h2 className={`${primaryFontSizeClass} font-bold`}>Certifications</h2>
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-4">
        {certifications.flatMap((cert, index) => [
          <div
            key={`${index}-date`}
            className={`${secondaryFontSizeClass} text-sm text-gray-800 font-bold`}
          >
            {cert.completionDate?.slice(0, 7)}
          </div>,
          <div
            key={`${index}-details`}
            className={`${secondaryFontSizeClass} text-sm`}
          >
            <div className="font-medium">
              {cert.name}
              {cert.source && ` - ${cert.source}`}
            </div>
          </div>,
        ])}
      </div>
    </section>
  );
}

function InterestsSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Heart} />
        <h2 className={`${primaryFontSizeClass} font-bold`}>Interests</h2>
      </div>
      <div className="space-y-1">
        <div className="flex">
          <div className="w-24 font-bold flex-shrink-0 text-gray-600 text-sm"></div>
          <ul
            className={`list-disc list-inside text-sm flex-1 ${secondaryFontSizeClass}`}
          >
            <li>Avid cross country skier and cyclist</li>
            <li>Member of the Parent Teacher Association</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
