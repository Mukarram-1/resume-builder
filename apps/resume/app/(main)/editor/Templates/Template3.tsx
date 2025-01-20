import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import { MapPin, Phone, Mail, Link2, Linkedin, Github, Link } from "lucide-react";

import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import { ResumeValues } from "utils/validations";
import { BorderStyles } from "app/(main)/editor/BorderStyleButton";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function Template3({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const hasMainContent = !!(
    resumeData.firstName ||
    resumeData.lastName ||
    resumeData.jobTitle ||
    resumeData.linkedin ||
    resumeData.github ||
    resumeData.summary ||
    resumeData.workExperiences?.length ||
    resumeData.educations?.length ||
    resumeData.projects?.length
  );

  const hasSidebarContent = !!(
    resumeData.skills?.length ||
    resumeData.certifications?.length ||
    resumeData.languages?.length ||
    resumeData.references?.length
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
          "grid",
          hasMainContent && hasSidebarContent
            ? "grid-cols-[2fr_1fr]"
            : "grid-cols-1",
          !width && "invisible"
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {hasMainContent && (
          <div className="p-8 space-y-6">
            {(resumeData.firstName ||
              resumeData.lastName ||
              resumeData.jobTitle) && (
              <PersonalInfoHeader resumeData={resumeData} />
            )}
            {(resumeData.linkedin || resumeData.github) && (
              <ProfilesSection resumeData={resumeData} />
            )}
            {resumeData.summary && <SummarySection resumeData={resumeData} />}
            {resumeData.workExperiences?.length > 0 && (
              <ExperienceSection resumeData={resumeData} />
            )}
            {resumeData.educations?.length > 0 && (
              <EducationSection resumeData={resumeData} />
            )}
            {resumeData.projects?.length > 0 && (
              <ProjectsSection resumeData={resumeData} />
            )}
          </div>
        )}
        {hasSidebarContent && (
          <div className="bg-[#00A572] text-white p-8 space-y-6">
            <div className={cn(!hasMainContent && "mt-0", "mt-[65%]")}>
              {resumeData.skills?.length > 0 && (
                <SkillsSection resumeData={resumeData} />
              )}
              {resumeData.certifications?.length > 0 && (
                <CertificationsSection resumeData={resumeData} />
              )}
              {resumeData.languages?.length > 0 && (
                <LanguagesSection resumeData={resumeData} />
              )}
              {resumeData.references?.length > 0 && (
                <ReferencesSection resumeData={resumeData} />
              )}
            </div>
          </div>
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
    photo,
    email,
    website,
    borderStyle,
  } = resumeData;
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
    <div className="flex gap-6">
      {photoSrc && (
        <Image
          src={photoSrc || "/placeholder.svg"}
          width={120}
          height={120}
          alt="Profile photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2">
        {(firstName || lastName) && (
          <h1 className="text-3xl font-bold">
            {firstName} {lastName}
          </h1>
        )}
        {jobTitle && <p className="text-xl text-gray-800">{jobTitle}</p>}
        <div className="flex flex-wrap gap-4 text-sm text-gray-800">
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
      </div>
    </div>
  );
}

function ProfilesSection({ resumeData }: ResumeSectionProps) {
  const { linkedin, github } = resumeData;

  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-gray-800">
        Profiles
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">johndoe</span>
          </div>
          <span className="text-sm text-gray-800">LinkedIn</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            <span className="text-sm">johndoe</span>
          </div>
          <span className="text-sm text-gray-800">GitHub</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <span className="text-sm">johndoe</span>
          </div>
          <span className="text-sm text-gray-800">StackOverflow</span>
        </div>
      </div>
    </section>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="font-semibold text-lg mb-3 border-b border-gray-800">
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

function ExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-gray-800">
        Experience
      </h2>
      <div className="space-y-4">
        {workExperiences?.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <div>
                <h3 className="font-bold">{exp.company}</h3>
                <p className="text-sm text-gray-800">{exp.position}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  {exp.startDate && formatDate(exp.startDate, "MMMM yyyy")} -{" "}
                  {exp.endDate
                    ? formatDate(exp.endDate, "MMMM yyyy")
                    : "Present"}
                </p>
                <p className="text-sm text-gray-800">{exp.location}</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-800">
              {exp.description
                ?.split("\n")
                .map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations } = resumeData;

  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-gray-800">
        Education
      </h2>
      {educations?.map((edu, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold">{edu.school}</h3>
              <p className="text-sm text-gray-800">{edu.degree}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                {edu.startDate && formatDate(edu.startDate, "MMMM yyyy")} -{" "}
                {edu.endDate ? formatDate(edu.endDate, "MMMM yyyy") : "Present"}
              </p>
              <p className="text-sm text-gray-600">{edu.location}</p>
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
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-gray-800">
        Projects
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {projects?.map((project, index) => (
          <div key={index}>
            <h3 className="font-bold">{project.name}</h3>
            <p className="text-sm text-gray-800">{project.role}</p>
            <p className="text-sm text-gray-800 break-all whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills } = resumeData;

  return (
    <section>
      <h2 className="text-xl font-bold mb-3 border-b border-white">Skills</h2>
      <div className="space-y-4">
        {Array.isArray(skills) &&
          skills.map((skill, index) => {
            if (typeof skill === "string") {
              return (
                <div key={index}>
                  <p className="text-sm">{skill}</p>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <h3 className="font-bold mb-1">{skill.category}</h3>
                  <p className="text-sm">{skill.level}</p>
                  <p className="text-sm">{skill.items.join(", ")}</p>
                </div>
              );
            }
          })}
      </div>
    </section>
  );
}



function CertificationsSection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-white">
        Certifications
      </h2>
      <div className="space-y-2">
        <div>
          <h3 className="font-bold">Full-Stack Web Development</h3>
          <p className="text-sm">CodeAcademy</p>
          <p className="text-sm">2020</p>
        </div>
        <div>
          <h3 className="font-bold">AWS Certified Developer</h3>
          <p className="text-sm">Amazon Web Services</p>
          <p className="text-sm">2019</p>
        </div>
      </div>
    </section>
  );
}

function LanguagesSection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-white">
        Languages
      </h2>
      <div className="space-y-2">
        <div>
          <h3 className="font-bold">English</h3>
          <p className="text-sm">Native Speaker</p>
        </div>
        <div>
          <h3 className="font-bold">Spanish</h3>
          <p className="text-sm">Intermediate</p>
        </div>
      </div>
    </section>
  );
}

function ReferencesSection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-white">
        References
      </h2>
      <p className="text-sm">Available upon request</p>
    </section>
  );
}
