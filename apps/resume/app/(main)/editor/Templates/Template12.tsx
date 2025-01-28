import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import Link from "next/link";

import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function Template12({
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
          <>
            <HeaderSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}
        {resumeData.summary && (
          <>
            <SummarySection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}
        {(resumeData.workExperiences ?? []).length > 0 && (
          <>
            <WorkExperienceSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}
        {(resumeData.skills?.length ?? 0) > 0 && (
          <SkillsSection resumeData={resumeData} />
        )}
        {(resumeData.educations?.length ?? 0) > 0 && (
          <EducationSection resumeData={resumeData} />
        )}
        {(resumeData.projects?.length ?? 0) > 0 && (
          <ProjectsSection resumeData={resumeData} />
        )}
        {(resumeData.awards?.length ?? 0) > 0 && (
          <AwardsSection resumeData={resumeData} />
        )}
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function HeaderSection({ resumeData }: ResumeSectionProps) {
  const {
    firstName,
    lastName,
    city,
    country,
    phone,
    email,
    github,
    linkedin,
    website,
  } = resumeData;

  return (
    <header className="mb-6">
      {(firstName || lastName) && (
        <h1 className="text-2xl font-bold mb-1">
          {firstName} {lastName}
        </h1>
      )}
      <div className="text-sm">
        {city}, {country} | {phone} |{" "}
        <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
          {email}
        </a>
        <br />
        {github && (
          <div>
            <a href={github} className="text-blue-600 hover:underline">
              {github}
            </a>{" "}
            |{" "}
          </div>
        )}
        {linkedin && (
          <div>
            <a href={linkedin} className="text-blue-600 hover:underline">
              {linkedin}
            </a>{" "}
            |{" "}
          </div>
        )}
        {website && (
          <a href={website} className="text-blue-600 hover:underline">
            {website}
          </a>
        )}
      </div>
    </header>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;

  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold mb-2 uppercase">Professional Summary</h2>
      <p className="text-sm break-all whitespace-pre-wrap">{summary}</p>
    </section>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold mb-2 uppercase">Work Experience</h2>
      {workExperiences?.map((exp, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <div>
              <span className="font-bold">{exp.position}, </span>
              <span className="font-bold">{exp.company}</span>
            </div>
            <div>
              {exp.startDate && formatDate(exp.startDate, "MMM yyyy")} –{" "}
              {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
            </div>
          </div>
          <ul className="list-disc list-inside text-sm space-y-1">
            {exp.description
              ?.split("\n")
              .map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
    const {skills} = resumeData
  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold mb-2 uppercase">Skills</h2>
      <div className="text-sm space-y-1">
        <p>
          <span className="font-bold">Technologies: </span>
          {skills?.join(", ")}
        </p>
      </div>
    </section>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations } = resumeData;

  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold mb-2 uppercase">Education</h2>
      {educations?.map((edu, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between text-sm">
            <div>
              <span className="font-bold">{edu.degree}, </span>
              <span className="font-bold">{edu.school}</span>
            </div>
            <div>
              {edu.startDate && formatDate(edu.startDate, "MMMM yyyy")} -{" "}
              {edu.endDate ? formatDate(edu.endDate, "MMMM yyyy") : "Present"}
            </div>
          </div>
          <ul className="list-disc list-inside text-sm">
            <li>
              GPA (Only include if higher than 3.5 / 4.0), Class of Honors (Only
              include if good)
            </li>
            <li>
              Other school awards like Dean&apos;s List, scholarships, community
              awards, etc.
            </li>
            <li>
              Relevant Coursework: Advanced Class A, Advanced Class B, Advanced
              Class C
            </li>
          </ul>
        </div>
      ))}
    </section>
  );
}

function ProjectsSection({ resumeData }: ResumeSectionProps) {
  const { projects } = resumeData;

  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold mb-2 uppercase">Projects</h2>
      {projects?.map((project, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <div>
              <span className="font-bold">{project.role}, </span>
              <span className="font-bold">{project.name}</span>
            </div>
            <div>
              {project.startDate && formatDate(project.startDate, "MMM yyyy")} –{" "}
              {project.endDate
                ? formatDate(project.endDate, "MMM yyyy")
                : "Present"}
            </div>
          </div>
          <ul className="list-disc list-inside text-sm space-y-1">
            {project.description
              ?.split("\n")
              .map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}

function AwardsSection({ resumeData }: ResumeSectionProps) {
  const awards = [
    { name: "Hackathon - Prize", year: "YYYY" },
    { name: "Hackathon - Prize", year: "YYYY" },
    { name: "Hackathon - Prize", year: "YYYY" },
  ];

  return (
    <section>
      <h2 className="text-sm font-bold mb-2 uppercase">Awards and Accolades</h2>
      <ul className="list-disc list-inside text-sm space-y-1">
        {awards.map((award, index) => (
          <li key={index} className="flex justify-between">
            <span>{award.name}</span>
            <span>{award.year}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
