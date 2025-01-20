import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import { MapPin, Phone, Mail, Link2, Linkedin, Github } from "lucide-react";

import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import { ResumeValues } from "utils/validations";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function Template2({
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
        {(resumeData.firstName ||
          resumeData.lastName ||
          resumeData.jobTitle) && (
          <>
            <PersonalInfoHeader resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {(resumeData.linkedin || resumeData.github) && (
          <>
            <ProfilesSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.summary && (
          <>
            <SummarySection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.workExperiences?.length > 0 && (
          <>
            <WorkExperienceSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.educations?.length > 0 && (
          <>
            <EducationSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.projects?.length > 0 && (
          <>
            <ProjectsSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.skills?.length > 0 && (
          <>
            <SkillsSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.certifications?.length > 0 && (
          <>
            <CertificationsSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.languages?.length > 0 && (
          <>
            <LanguagesSection resumeData={resumeData} />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.references?.length > 0 && (
          <ReferencesSection resumeData={resumeData} />
        )}
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    website,
  } = resumeData;

  return (
    <header className="text-center mb-6">
      {(firstName || lastName) && (
        <h1 className="text-2xl font-bold mb-1">
          {firstName} {lastName}
        </h1>
      )}
      {jobTitle && <p className="text-lg mb-3">{jobTitle}</p>}
      <div className="flex items-center justify-center gap-4 text-sm">
        {(city || country) && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>
              {city}
              {city && country && ", "}
              {country}
            </span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-1">
            <Link2 className="w-4 h-4" />
            <span>{website}</span>
          </div>
        )}
      </div>
    </header>
  );
}

function ProfilesSection({ resumeData }: ResumeSectionProps) {
  const { linkedin, github } = resumeData;

  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">Profiles</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          <span className="text-sm">LinkedIn</span>
          <span className="text-sm">{linkedin}</span>
        </div>
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4" />
          <span className="text-sm">GitHub</span>
          <span className="text-sm">{github}</span>
        </div>
      </div>
    </section>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="font-semibold text-lg mb-3">
        Summary
      </h2>
      <div className="max-w-full overflow-hidden">
        <p className="text-sm text-gray-800 break-all whitespace-pre-wrap">
          {resumeData.summary}
        </p>
      </div>
    </section>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">Experience</h2>
      {workExperiences?.map((exp, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="font-bold text-sm">{exp.company}</h3>
              <p className="text-sm">{exp.position}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                {exp.startDate && formatDate(exp.startDate, "MMMM yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MMMM yyyy") : "Present"}
              </p>
              <p className="text-sm">{exp.location}</p>
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

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations } = resumeData;

  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">Education</h2>
      {educations?.map((edu, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-sm">{edu.school}</h3>
              <p className="text-sm">{edu.degree}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                {edu.startDate && formatDate(edu.startDate, "MMMM yyyy")} -{" "}
                {edu.endDate ? formatDate(edu.endDate, "MMMM yyyy") : "Present"}
              </p>
              <p className="text-sm">{edu.location}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function ProjectsSection({ resumeData }: ResumeSectionProps) {
  const { projects } = resumeData;

  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">Projects</h2>
      <div className="grid grid-cols-2 gap-4">
        {projects?.map((project, index) => (
          <div key={index}>
            <h3 className="font-bold text-sm">{project.name}</h3>
            <p className="text-sm">{project.role}</p>
            <p className="text-sm break-all whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const {skills}=resumeData;
  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">Skills</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="font-bold text-sm mb-1">Web Technologies</h3>
          <p className="text-sm">Advanced</p>
          <p className="text-sm text-gray-800">{skills?.join(", ") || ""}</p>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-1">Web Frameworks</h3>
          <p className="text-sm">Intermediate</p>
          <p className="text-sm text-gray-800">{skills?.join(", ") || ""}</p>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-1">Tools</h3>
          <p className="text-sm">Intermediate</p>
          <p className="text-sm text-gray-800">{skills?.join(", ") || ""}</p>
        </div>
      </div>
    </section>
  );
}

function CertificationsSection({ resumeData }: ResumeSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">Certifications</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm">Full-Stack Web Development</h3>
          <p className="text-sm">CodeAcademy</p>
          <p className="text-sm">2020</p>
        </div>
        <div>
          <h3 className="text-sm">AWS Certified Developer</h3>
          <p className="text-sm">Amazon Web Services</p>
          <p className="text-sm">2019</p>
        </div>
      </div>
    </section>
  );
}

function LanguagesSection({ resumeData }: ResumeSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="font-bold mb-2">Languages</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm">English</h3>
          <p className="text-sm">Native Speaker</p>
        </div>
        <div>
          <h3 className="text-sm">Spanish</h3>
          <p className="text-sm">Intermediate</p>
        </div>
      </div>
    </section>
  );
}

function ReferencesSection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="font-bold mb-2">References</h2>
      <p className="text-sm">Available upon request</p>
    </section>
  );
}
