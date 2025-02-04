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

export default function Template10({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

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
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {(resumeData.firstName || resumeData.lastName) && (
          <HeaderSection resumeData={resumeData} />
        )}
        {resumeData.email && <ContactSection resumeData={resumeData} />}
        <div className="grid grid-cols-[1.5fr_1fr] gap-8 mt-8">
          {(resumeData.workExperiences?.length ?? 0) > 0 && (
            <WorkExperienceSection resumeData={resumeData} />
          )}
          <div>
            {(resumeData.skills?.length ?? 0) > 0 && (
              <SkillsSection resumeData={resumeData} />
            )}
            {(resumeData.certifications?.length ?? 0) > 0 && (
              <CertificatesSection resumeData={resumeData} />
            )}
            {(resumeData.educations?.length ?? 0) > 0 && (
              <EducationSection resumeData={resumeData} />
            )}
            {(resumeData.languages?.length ?? 0) > 0 && (
              <LanguagesSection resumeData={resumeData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function HeaderSection({ resumeData }: ResumeSectionProps) {
  const { firstName, lastName, jobTitle, summary } = resumeData;

  return (
    <header className="mb-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-1">
        {firstName} {lastName}
      </h1>
      <h2 className="text-xl text-gray-600 mb-4">{jobTitle}</h2>
      {/* <p className="leading-relaxed break-all whitespace-pre-wrap">{summary}</p> */}
      <div
        className="text-sm summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
      />
    </header>
  );
}

function ContactSection({ resumeData }: ResumeSectionProps) {
  const { email, phone, city,country, linkedin } = resumeData;

  return (
    <div className="flex items-center justify-center gap-6 border-t border-b border-black py-3">
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

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">WORK EXPERIENCE</h2>
      {resumeData.workExperiences?.map((exp, index) => (
        <div key={index} className="mb-8">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
            <div className="flex items-center gap-2 text-gray-800">
              <span className="font-semibold text-lg">{exp.company}</span>
              {<Link2 className="w-4 h-4" />}
            </div>
            <div className="flex justify-between text-gray-600 text-sm italic">
              <span>
                {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
              </span>
              <span>
                {resumeData.city}, {resumeData.country}
              </span>
            </div>
          </div>
          <ul className="list-['-_'] list-inside space-y-2 text-gray-800 break-all whitespace-pre-wrap">
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

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const {skills}=resumeData

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">SKILLS</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {skills && skills.map((skill, index) => (
          <div key={index} className="text-gray-700">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificatesSection({ resumeData }: ResumeSectionProps) {
  const {certifications} = resumeData

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">CERTIFICATES</h2>
      <div className="space-y-3">
        {certifications?.map((cert, index) => (
          <div key={index}>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">{cert.name}</span>
              <Link2 className="w-4 h-4 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600 italic">{cert.source}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
    const {educations} = resumeData
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">EDUCATION</h2>
      {educations?.map((edu, index) => (
        <div key={index}>
          <h3 className="font-bold text-gray-800">{edu.school}</h3>
          <p className="text-gray-700">{edu.degree}</p>
          <p className="text-gray-600 text-sm">
            {edu.startDate && formatDate(edu.startDate, "MMMM yyyy")} -{" "}
            {edu.endDate ? formatDate(edu.endDate, "MMMM yyyy") : "Present"}
          </p>
        </div>
      ))}
    </section>
  );
}

function LanguagesSection({ resumeData }: ResumeSectionProps) {
  const {languages} = resumeData;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">LANGUAGES</h2>
      <div className="grid grid-cols-2 gap-4">
        {languages?.map((lang, index) => (
          <div key={index}>
            <h3 className="font-semibold text-gray-800">{lang.name}</h3>
            <p className="text-sm text-gray-600 italic">{lang.proficiency}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
