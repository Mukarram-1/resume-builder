import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { MapPin, Phone, Mail, Linkedin, Link2 } from "lucide-react";

import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}

export default function Template10({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Helper: Map a numeric value to a Tailwind CSS font size class.
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
        {(resumeData.firstName || resumeData.lastName) && (
          <HeaderSection
            resumeData={resumeData}
            primaryFontSizeClass={primaryFontSizeClass}
            secondaryFontSizeClass={secondaryFontSizeClass}
          />
        )}
        {resumeData.email && (
          <ContactSection
            resumeData={resumeData}
            primaryFontSizeClass={primaryFontSizeClass}
            secondaryFontSizeClass={secondaryFontSizeClass}
          />
        )}
        <div className="grid grid-cols-[1.5fr_1fr] gap-8 mt-8">
          {(resumeData.workExperiences?.length ?? 0) > 0 && (
            <WorkExperienceSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
          )}
          <div>
            {(resumeData.skills?.length ?? 0) > 0 && (
              <SkillsSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.certifications?.length ?? 0) > 0 && (
              <CertificatesSection
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
            {(resumeData.languages?.length ?? 0) > 0 && (
              <LanguagesSection
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

function HeaderSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { firstName, lastName, jobTitle, summary } = resumeData;

  return (
    <header className="mb-6">
      <h1 className={`${primaryFontSizeClass} font-bold text-gray-800 mb-1`}>
        {firstName} {lastName}
      </h1>
      <h2 className={`${primaryFontSizeClass} font-bold text-gray-600 mb-4`}>
        {jobTitle}
      </h2>
      <div
        className={`${secondaryFontSizeClass} text-sm summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap`}
        dangerouslySetInnerHTML={{ __html: summary || "" }}
      />
    </header>
  );
}

function ContactSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { email, phone, city, country, linkedin } = resumeData;

  return (
    <div
      className={`flex items-center justify-center gap-6 border-t border-b border-black py-3 ${secondaryFontSizeClass}`}
    >
      {email && (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{email}</span>
        </div>
      )}
      {phone && (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{phone}</span>
        </div>
      )}
      {(city || country) && (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>
            {city}, {country}
          </span>
        </div>
      )}
      {linkedin && (
        <div className="flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          <span className="break-all whitespace-pre-wrap">{linkedin}</span>
        </div>
      )}
    </div>
  );
}

function WorkExperienceSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section>
      <h2 className={`${primaryFontSizeClass} font-bold text-gray-800 mb-6`}>
        WORK EXPERIENCE
      </h2>
      {resumeData.workExperiences?.map((exp, index) => (
        <div key={index} className="mb-8">
          <div className="mb-2">
            <h3 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
              {exp.position}
            </h3>
            <div
              className={`flex items-center gap-2 ${secondaryFontSizeClass} text-gray-800`}
            >
              <span className="font-semibold text-lg">{exp.company}</span>
              <Link2 className="w-4 h-4" />
            </div>
            <div
              className={`flex justify-between ${secondaryFontSizeClass} text-gray-600 text-sm italic`}
            >
              <span>
                {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
              </span>
              <span>
                {resumeData.city}, {resumeData.country}
              </span>
            </div>
          </div>
          <ul
            className={`list-['-_'] list-inside space-y-2 ${secondaryFontSizeClass} text-gray-800 break-all whitespace-pre-wrap`}
          >
            {exp.description?.split("\n").map((item, i) => (
              <li key={i} className="pl-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
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
    <section className="mb-8">
      <h2 className={`${primaryFontSizeClass} font-bold text-gray-800 mb-4`}>
        SKILLS
      </h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {skills &&
          skills.map((skill, index) => (
            <div
              key={index}
              className={`${secondaryFontSizeClass} text-gray-700`}
            >
              {skill}
            </div>
          ))}
      </div>
    </section>
  );
}

function CertificatesSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { certifications } = resumeData;

  return (
    <section className="mb-8">
      <h2 className={`${primaryFontSizeClass} font-bold text-gray-800 mb-4`}>
        CERTIFICATES
      </h2>
      <div className="space-y-3">
        {certifications?.map((cert, index) => (
          <div key={index}>
            <div className="flex items-center gap-2">
              <span
                className={`${secondaryFontSizeClass} font-semibold text-gray-800`}
              >
                {cert.name}
              </span>
              <Link2 className="w-4 h-4 text-gray-600" />
            </div>
            <p
              className={`${secondaryFontSizeClass} text-sm text-gray-600 italic`}
            >
              {cert.source}
            </p>
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
    <section className="mb-8">
      <h2 className={`${primaryFontSizeClass} font-bold text-gray-800 mb-4`}>
        EDUCATION
      </h2>
      {educations?.map((edu, index) => (
        <div key={index}>
          <h3 className={`${secondaryFontSizeClass} font-bold text-gray-800`}>
            {edu.school}
          </h3>
          <p className={`${secondaryFontSizeClass} text-gray-700`}>
            {edu.degree}
          </p>
          <p className={`${secondaryFontSizeClass} text-gray-600 text-sm`}>
            {edu.startDate && formatDate(edu.startDate, "MMMM yyyy")} -{" "}
            {edu.endDate ? formatDate(edu.endDate, "MMMM yyyy") : "Present"}
          </p>
        </div>
      ))}
    </section>
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
      <h2 className={`${primaryFontSizeClass} font-bold text-gray-800 mb-4`}>
        LANGUAGES
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {languages?.map((lang, index) => (
          <div key={index}>
            <h3
              className={`${secondaryFontSizeClass} font-semibold text-gray-800`}
            >
              {lang.name}
            </h3>
            <p
              className={`${secondaryFontSizeClass} text-sm text-gray-600 italic`}
            >
              {lang.proficiency}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
