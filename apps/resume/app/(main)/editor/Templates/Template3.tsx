import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import {
  MapPin,
  Phone,
  Mail,
  Link2,
  Linkedin,
  Github,
  Link,
} from "lucide-react";

import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";
import { BorderStyles } from "app/(main)/editor/BorderStyleButton";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function Template3({
  resumeData,
  contentRef,
  className,
  primaryColor = "#00A572",
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
              <PersonalInfoHeader resumeData={resumeData} primaryColor={primaryColor} />
            )}
            {(resumeData.linkedin || resumeData.github) && (
              <ProfilesSection resumeData={resumeData} primaryColor={primaryColor} />
            )}
            {resumeData.summary && (
              <SummarySection resumeData={resumeData} primaryColor={primaryColor} />
            )}
            {(resumeData.workExperiences?.length ?? 0) > 0 && (
              <ExperienceSection resumeData={resumeData} primaryColor={primaryColor} />
            )}
            {(resumeData.educations?.length ?? 0) > 0 && (
              <EducationSection resumeData={resumeData} primaryColor={primaryColor} />
            )}
            {(resumeData.projects?.length ?? 0) > 0 && (
              <ProjectsSection resumeData={resumeData} primaryColor={primaryColor} />
            )}
          </div>
        )}
        {hasSidebarContent && (
          <div
            className="text-white p-8 space-y-6"
            style={{ backgroundColor: primaryColor }}
          >
            <div className={cn(!hasMainContent && "mt-0", "mt-[65%]")}>
              {(resumeData.skills?.length ?? 0) > 0 && (
                <SkillsSection resumeData={resumeData} primaryColor={primaryColor} />
              )}
              {(resumeData.certifications?.length ?? 0) > 0 && (
                <CertificationsSection resumeData={resumeData} primaryColor={primaryColor} />
              )}
              {(resumeData.languages?.length ?? 0) > 0 && (
                <>
                  <LanguagesSection resumeData={resumeData} primaryColor={primaryColor} />
                  <hr className="border-t border-gray-300 my-4" />
                </>
              )}
              {/* {(resumeData.references?.length??0) > 0 && (
                <ReferencesSection resumeData={resumeData} primaryColor={primaryColor} />
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
  primaryColor: string;
}

function PersonalInfoHeader({ resumeData, primaryColor }: ResumeSectionProps) {
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
              <MapPin className="w-4 h-4" style={{ color:primaryColor }} />
              <span>
                {city}
                {city && country && ", "}
                {country}
              </span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" style={{ color:primaryColor }} />
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" style={{ color:primaryColor }} />
              <span>{email}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-1">
              <Link2 className="w-4 h-4" style={{ color:primaryColor }} />
              <span>{website}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfilesSection({ resumeData, primaryColor }: ResumeSectionProps) {
  const { linkedin, github } = resumeData;

  return (
    <section>
      <h2
        className="text-lg font-bold mb-3 border-b"
        style={{ borderColor: primaryColor }}
      >
        Profiles
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" style={{ color:primaryColor }} />
            <span className="text-sm">johndoe</span>
          </div>
          <span className="text-sm text-gray-800">LinkedIn</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" style={{ color:primaryColor }} />
            <span className="text-sm">johndoe</span>
          </div>
          <span className="text-sm text-gray-800">GitHub</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link className="w-4 h-4" style={{ color:primaryColor }} />
          <div className="flex items-center gap-2">
            <span className="text-sm">johndoe</span>
          </div>
          <span className="text-sm text-gray-800">StackOverflow</span>
        </div>
      </div>
    </section>
  );
}

function SummarySection({ resumeData, primaryColor }: ResumeSectionProps) {
  return (
    <section>
      <h2
        className="font-semibold text-lg mb-3 border-b"
        style={{ borderColor: primaryColor }}
      >
        Summary
      </h2>
      <div className="max-w-full overflow-hidden">
        {/* <p className="text-sm text-gray-800 break-all whitespace-pre-wrap">
          {resumeData.summary}
        </p> */}
        <div
          className="text-sm text-gray-800 summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
        />
      </div>
    </section>
  );
}

function ExperienceSection({ resumeData, primaryColor }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  return (
    <section>
      <h2
        className="text-lg font-bold mb-3 border-b"
        style={{ borderColor: primaryColor }}
      >
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

function EducationSection({ resumeData, primaryColor }: ResumeSectionProps) {
  const { educations } = resumeData;

  return (
    <section>
      <h2
        className="text-lg font-bold mb-3 border-b"
        style={{ borderColor: primaryColor }}
      >
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
              {/* <p className="text-sm text-gray-600">{edu.location}</p> */}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function ProjectsSection({ resumeData, primaryColor }: ResumeSectionProps) {
  const { projects } = resumeData;

  return (
    <section>
      <h2
        className="text-lg font-bold mb-3 border-b"
        style={{ borderColor: primaryColor }}
      >
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

function SkillsSection({ resumeData, primaryColor }: ResumeSectionProps) {
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

function CertificationsSection({ resumeData, primaryColor }: ResumeSectionProps) {
  const { certifications } = resumeData;
  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-white">
        Certifications
      </h2>
      <div className="space-y-2">
        {certifications?.map((cert, index) => (
          <div key={index}>
            {cert.name && <h3 className="font-bold text-md">{cert.name}</h3>}
            {cert.source && <p className="text-md text-white">{cert.source}</p>}
            {cert.completionDate && (
              <p className="text-md text-white font-bold">
                {formatDate(cert.completionDate, "yyyy")}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function LanguagesSection({ resumeData, primaryColor }: ResumeSectionProps) {
  const { languages } = resumeData;
  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-white">
        Languages
      </h2>
      <div className="space-y-2">
        {languages?.map((lang, index) => (
          <div key={index}>
            <h3 className="font-bold text-md">{lang.name}</h3>
            <p className="text-md text-white">{lang.proficiency}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReferencesSection({ resumeData, primaryColor }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-white">
        References
      </h2>
      <p className="text-sm">Available upon request</p>
    </section>
  );
}
