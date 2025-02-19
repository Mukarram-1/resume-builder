import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";
import { BorderStyles } from "app/(main)/editor/BorderStyleButton";
import { Github, Link, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useResumeColors } from "@resume/ui/hooks/useResumeColors";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}

export default function Template4({
  resumeData,
  contentRef,
  className,
  primaryColor = "#003366",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  useResumeColors(primaryColor);
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
    const closestSize = sizes.reduce((prev, curr) => {
      return Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev;
    });

    return sizeMap[closestSize] || "text-base";
  };

  const primaryFontSize = getFontSizeClass(
    Number(resumeData.primaryFontSize) || 20
  );
  const secondaryFontSize = getFontSizeClass(
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
        className={cn(
          "grid grid-cols-[1fr_2fr] gap-6 p-8",
          !width && "invisible"
        )}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: resumeData.fontStyle,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <div className="space-y-6">
          {resumeData.email && (
            <PersonalInfoSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSize}
              secondaryFontSizeClass={secondaryFontSize}
            />
          )}
          {(resumeData.skills?.length ?? 0) > 0 && (
            <SkillsSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSize}
              secondaryFontSizeClass={secondaryFontSize}
            />
          )}
          {(resumeData.languages?.length ?? 0) > 0 && (
            <>
              <LanguagesSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSize}
                secondaryFontSizeClass={secondaryFontSize}
              />
              <hr className="border-t border-gray-300 my-4" />
            </>
          )}
        </div>
        <div className="space-y-6">
          <SummarySection
            resumeData={resumeData}
            primaryFontSizeClass={primaryFontSize}
            secondaryFontSizeClass={secondaryFontSize}
          />
          {(resumeData.workExperiences?.length ?? 0) > 0 && (
            <ExperienceSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSize}
              secondaryFontSizeClass={secondaryFontSize}
            />
          )}
          {(resumeData.educations?.length ?? 0) > 0 && (
            <EducationSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSize}
              secondaryFontSizeClass={secondaryFontSize}
            />
          )}
          {(resumeData.certifications?.length ?? 0) > 0 && (
            <CertificatesSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSize}
              secondaryFontSizeClass={secondaryFontSize}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}

function RatingDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <div
          key={value}
          className={cn(
            "w-3 h-3 rounded-full",
            value <= rating ? "bg-[#003366]" : "border border-[#003366]"
          )}
        />
      ))}
    </div>
  );
}

function PersonalInfoSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section>
      <h2
        className={`font-bold mb-3 text-resume-primary ${primaryFontSizeClass}`}
      >
        • Personal Info
      </h2>
      <div className={`space-y-2 ${secondaryFontSizeClass}`}>
        {(resumeData.city || resumeData.country) && (
          <div className="flex items-center gap-1">
            <MapPin className="w-5 h-5 border-1 rounded-full text-white text-center p-[3px] bg-resume-primary" />
            <p>
              {resumeData.city}, {resumeData.country}
            </p>
          </div>
        )}
        {resumeData.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-5 h-5 border-1 rounded-full text-white text-center p-[3px] bg-resume-primary" />
            <p>{resumeData.phone}</p>
          </div>
        )}
        {resumeData.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-5 h-5 border-1 rounded-full text-white text-center p-[3px] bg-resume-primary" />
            <p>{resumeData.email}</p>
          </div>
        )}
        {resumeData.github && (
          <div className="flex items-center gap-1">
            <Github className="w-5 h-5 border-1 rounded-full text-white text-center p-[3px] bg-resume-primary" />
            <p>{resumeData.github}</p>
          </div>
        )}
        {resumeData.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="w-5 h-5 border-1 rounded-full text-white text-center p-[3px] bg-resume-primary" />
            <p>{resumeData.linkedin}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SummarySection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { firstName, lastName, jobTitle, photo, borderStyle } = resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) {
      setPhotoSrc(objectUrl);
    }
    if (photo === null) setPhotoSrc(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <section className="relative">
      {photoSrc && (
        <div className="mb-2">
          <div className="flex justify-start items-center gap-4">
            <Image
              src={photoSrc || "/placeholder.svg"}
              width={120}
              height={120}
              alt="Profile photo"
              className="aspect-square object-cover rounded-md"
              style={{
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "999px"
                      : "10%",
              }}
            />
            <div className="flex flex-col justify-center items-center">
              {(firstName || lastName) && (
                <h1 className={`font-bold mb-1 ${primaryFontSizeClass}`}>
                  {firstName} {lastName}
                </h1>
              )}
              {jobTitle && (
                <p className={`text-gray-800 mb-4 ${primaryFontSizeClass}`}>
                  {jobTitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {resumeData.summary && (
        <div className="max-w-full overflow-hidden">
          <div
            className={`text-gray-800 summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap ${secondaryFontSizeClass}`}
            dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
          />
        </div>
      )}
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
      <h2
        className={`font-bold mb-3 text-resume-primary ${primaryFontSizeClass}`}
      >
        • Skills
      </h2>
      <ul className="list-none space-y-2">
        {skills &&
          skills.map((skill, index) => (
            <li key={index} className={secondaryFontSizeClass}>
              {skill}
            </li>
          ))}
      </ul>
    </section>
  );
}

function ExperienceSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center mb-4">
        <div
          className={`font-bold text-resume-primary ${primaryFontSizeClass}`}
        >
          • Experience
        </div>
      </div>
      <div className="space-y-6">
        {resumeData.workExperiences?.map((exp, index) => (
          <div key={index} className="flex">
            <div
              className={`w-24 flex-shrink-0 text-gray-600 font-bold ${secondaryFontSizeClass}`}
            >
              {exp.startDate && formatDate(exp.startDate, "yyyy-MM")} -{" "}
              {exp.endDate ? formatDate(exp.endDate, "yyyy-MM") : "present"}
            </div>
            <div className="flex-1">
              <div
                className={`font-bold text-gray-800 ${primaryFontSizeClass}`}
              >
                {exp.position}
              </div>
              <div className={`text-gray-600 mb-2 ${secondaryFontSizeClass}`}>
                {exp.company}
              </div>
              <ul
                className={`list-disc ml-5 space-y-2 text-gray-700 break-all whitespace-pre-wrap ${secondaryFontSizeClass}`}
              >
                {exp.description
                  ?.split("\n")
                  .map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center mb-4">
        <div
          className={`font-bold text-resume-primary ${primaryFontSizeClass}`}
        >
          • Education
        </div>
      </div>
      {resumeData.educations?.map((edu, index) => (
        <div key={index} className="flex">
          <div
            className={`w-24 flex-shrink-0 text-gray-600 font-bold ${secondaryFontSizeClass}`}
          >
            {edu.startDate && formatDate(edu.startDate, "yyyy-MM")} -{" "}
            {edu.endDate ? formatDate(edu.endDate, "yyyy-MM") : "present"}
          </div>
          <div className="flex-1">
            <div className={`font-bold text-gray-800 ${primaryFontSizeClass}`}>
              {edu.school}
            </div>
            <div className={`text-gray-600 mb-2 ${secondaryFontSizeClass}`}>
              {edu.degree}
            </div>
            {/* <ul
              className={`list-disc ml-5 space-y-2 text-gray-700 ${secondaryFontSizeClass}`}
            >
              {edu.description
                ?.split("\n")
                .map((item, i) => <li key={i}>{item}</li>)}
            </ul> */}
          </div>
        </div>
      ))}
    </div>
  );
}

function CertificatesSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { certifications } = resumeData;

  return (
    <div className="mt-4">
      <div className="flex items-center mb-4">
        <div
          className={`font-bold text-resume-primary ${primaryFontSizeClass}`}
        >
          • Certificates
        </div>
      </div>
      <div className="space-y-2">
        {certifications &&
          certifications.map((cert, index) => (
            <div key={index} className="flex items-center justify-center">
              <div
                className={`w-24 flex-shrink-0 text-gray-600 ${secondaryFontSizeClass}`}
              >
                {cert.completionDate}
              </div>
              <div className={`flex-1 text-gray-700 ${secondaryFontSizeClass}`}>
                {cert.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function LanguagesSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { languages } = resumeData;

  return (
    <section>
      <h2
        className={`font-bold mb-3 text-resume-primary ${primaryFontSizeClass}`}
      >
        • Languages
      </h2>
      <div className="space-y-3">
        {languages?.map((lang, index) => (
          <div key={index} className="space-y-1">
            <p className={secondaryFontSizeClass}>{lang.name}</p>
            <p className={`text-xs text-gray-600 ${secondaryFontSizeClass}`}>
              {lang.proficiency}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
