import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Briefcase,
  GraduationCap,
  Book,
  Globe2,
  Award,
  Heart,
} from "lucide-react";

import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";
import { useResumeColors } from "@resume/ui/hooks/useResumeColors";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function Template11({
  resumeData,
  contentRef,
  className,
  primaryColor = "#2D3748",
  secondaryColor = "#40C4AA",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  useResumeColors(primaryColor, secondaryColor);
  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
    >
      <div
        className={cn("", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: resumeData.fontStyle,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {resumeData.firstName && <HeaderSection resumeData={resumeData} />}
        {resumeData.email && <ContactSection resumeData={resumeData} />}
        <div className="grid grid-cols-[1.6fr_1fr] gap-8 p-8">
          <div className="space-y-8">
            {(resumeData.workExperiences?.length ?? 0) > 0 && (
              <WorkExperienceSection resumeData={resumeData} />
            )}
            {resumeData.volunteer && (
              <VolunteerSection resumeData={resumeData} />
            )}
            {(resumeData.educations?.length ?? 0) > 0 && (
              <EducationSection resumeData={resumeData} />
            )}
          </div>
          <div className="bg-gray-100 p-6 rounded space-y-8">
            {(resumeData.skills?.length ?? 0) > 0 && (
              <ExpertiseSection resumeData={resumeData} />
            )}
            {(resumeData.certifications?.length ?? 0) > 0 && (
              <CoursesSection resumeData={resumeData} />
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
function SectionIcon({ icon: Icon }: { icon: any}) {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-resume-primary">
      <Icon className="w-6 h-6 text-white" />
    </div>
  );
}
function HeaderSection({ resumeData }: ResumePreviewProps) {
  const { firstName, lastName, jobTitle } = resumeData;

  return (
    <header className="p-8 pb-0">
      <h1 className="text-4xl text-gray-800 mb-2">
        {firstName} {lastName}
      </h1>
      <h2 className={`text-xl text-resume-secondary`}>{jobTitle}</h2>
    </header>
  );
}

function ContactSection({ resumeData }: ResumePreviewProps) {
  const { email, phone, city, linkedin, summary,country } = resumeData;

  return (
    <div className="space-y-0 p-2">
      {summary && (
        <div className=" text-white p-4 rounded-lg rounded-b-none bg-resume-primary">
          {/* <p className="leading-relaxed break-all whitespace-pre-wrap">
            {summary}
          </p> */}
          <div
            className="text-sm summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
          />
        </div>
      )}
      <div className=" text-white mt-6 p-4 flex items-center justify-center gap-8 rounded-b-lg bg-resume-secondary">
        {email && (
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>{phone}</span>
          </div>
        )}
        {(city || country) && (
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>
              {city}, {country}
            </span>
          </div>
        )}
        {linkedin && (
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5" />
            <span className="break-all whitespace-pre-wrap">{linkedin}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkExperienceSection({ resumeData }: ResumePreviewProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <SectionIcon icon={Briefcase} />
        <h2 className="text-xl font-bold">WORK EXPERIENCE</h2>
      </div>
      {resumeData.workExperiences?.map((exp, index) => (
        <div key={index} className="mb-6">
          <h3 className="font-bold text-lg">{exp.position}</h3>
          <div className="font-medium mb-1 text-lg">{exp.company}</div>
          <div className="flex justify-between text-sm mb-2 italic text-resume-secondary">
            <span>
              {exp.startDate && formatDate(exp.startDate, "MMMM yyyy")} -{" "}
              {exp.endDate ? formatDate(exp.endDate, "MMMM yyyy") : "Present"}
            </span>
            <span>
              {resumeData.city}, {resumeData.country}
            </span>
          </div>
          <ul
            className="list-disc list-inside space-y-2 text-gray-600 break-all whitespace-pre-wrap"
            style={
              { "--tw-marker-color": 'text-resume-secondary' } as React.CSSProperties
            }
          >
            {exp.description?.split("\n").map((item, i) => (
              <li key={i}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function VolunteerSection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <SectionIcon icon={Heart} />
        <h2 className="text-xl font-bold">VOLUNTEER EXPERIENCE</h2>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">Media Manager</h3>
        <div className="text-[#40C4AA] font-medium mb-1">Meals on Wheels</div>
        <div className="flex justify-between text-gray-600 text-sm mb-2">
          <span>2019 - Present</span>
          <span>San Francisco, CA</span>
        </div>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-[#40C4AA] mt-1.5">•</span>
            <span>
              Hold a volunteer position as a Media Manager, developing &
              implementing all targeted content for various media platforms.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function EducationSection({ resumeData }: ResumePreviewProps) {
    const { educations } = resumeData;
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <SectionIcon icon={GraduationCap}/>
        <h2 className="text-xl font-bold">EDUCATION</h2>
      </div>
      {educations?.map((edu, index) => (
        <div key={index}>
          <h3 className="font-bold text-gray-800">{edu.school}</h3>
          <p className="text-gray-700">{edu.degree}</p>
          <p className="text-sm italic text-resume-secondary">
            {edu.startDate && formatDate(edu.startDate, "MMMM yyyy")} -{" "}
            {edu.endDate ? formatDate(edu.endDate, "MMMM yyyy") : "Present"}
          </p>
        </div>
      ))}
    </section>
  );
}

function ExpertiseSection({ resumeData }: ResumePreviewProps) {
  const {skills} = resumeData;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <SectionIcon icon={Award}/>
        <h2 className="text-xl font-bold">AREAS OF EXPERTIES</h2>
      </div>
      <ul className="space-y-2">
        {skills &&
          skills.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
      </ul>
    </section>
  );
}

function CoursesSection({ resumeData}: ResumePreviewProps) {
  const {certifications} = resumeData;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <SectionIcon icon={Book}/>
        <h2 className="text-xl font-bold">COURSE & TRAINING</h2>
      </div>
      <div className="space-y-3">
        {certifications?.map((course, index) => (
          <div key={index}>
            <div className="font-medium text-resume-secondary">{course.name}</div>
            <div className="text-sm text-gray-600 italic">
              {course.source}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LanguagesSection({ resumeData }: ResumePreviewProps) {
  const {languages} = resumeData;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <SectionIcon icon={Globe2}/>
        <h2 className="text-xl font-bold">LANGUAGES</h2>
      </div>
      <div className="space-y-3">
        {languages?.map((lang, index) => (
          <div key={index}>
            <div className="font-medium">{lang.name}</div>
            <div className="text-sm text-resume-secondary">{lang.proficiency}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
