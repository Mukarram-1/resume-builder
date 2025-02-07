import { useRef } from "react";
import { formatDate } from "date-fns";
import { MapPin, Phone, Mail, Link2, Linkedin, Github } from "lucide-react";

import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}

const fontSizeClasses = {
  small: "text-sm",
  medium: "text-xl",
  large: "text-3xl",
};

const secondaryFontSizeClasses = {
  small: "text-sm",
  medium: "text-lg",
  large: "text-xl",
};

export default function Template2({
  resumeData,
  contentRef,
  className,
  primaryColor = "#000000",
  secondaryColor = "#666666",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const primaryFontSizeClass =
    fontSizeClasses[
      (resumeData.primaryFontSize as keyof typeof fontSizeClasses) || "medium"
    ];
  const secondaryFontSizeClass =
    secondaryFontSizeClasses[
      (resumeData.secondaryFontSize as keyof typeof fontSizeClasses) || "medium"
    ];

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
        {(resumeData.firstName ||
          resumeData.lastName ||
          resumeData.jobTitle) && (
          <>
            <PersonalInfoHeader
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {(resumeData.linkedin || resumeData.github) && (
          <>
            <ProfilesSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {resumeData.summary && (
          <>
            <SummarySection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {(resumeData.workExperiences?.length ?? 0) > 0 && (
          <>
            <WorkExperienceSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {(resumeData.educations?.length ?? 0) > 0 && (
          <>
            <EducationSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {(resumeData.projects?.length ?? 0) > 0 && (
          <>
            <ProjectsSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {(resumeData.skills?.length ?? 0) > 0 && (
          <>
            <SkillsSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {(resumeData.certifications?.length ?? 0) > 0 && (
          <>
            <CertificationsSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}

        {(resumeData.languages?.length ?? 0) > 0 && (
          <>
            <LanguagesSection
              resumeData={resumeData}
              primaryFontSizeClass={primaryFontSizeClass}
              secondaryFontSizeClass={secondaryFontSizeClass}
            />
            <hr className="border-t border-gray-300 my-4" />
          </>
        )}
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
  primaryFontSizeClass: string;
  secondaryFontSizeClass: string;
}

function PersonalInfoHeader({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
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
        <h1 className={`${primaryFontSizeClass} font-bold mb-1`}>
          {firstName} {lastName}
        </h1>
      )}
      {jobTitle && (
        <p className={`${secondaryFontSizeClass} mb-3`}>{jobTitle}</p>
      )}
      <div
        className={`flex items-center justify-center gap-4 ${secondaryFontSizeClass}`}
      >
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

function ProfilesSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { linkedin, github } = resumeData;

  return (
    <section className="mb-6">
      <h2 className={`${primaryFontSizeClass} font-bold mb-2`}>Profiles</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          <span className={secondaryFontSizeClass}>LinkedIn</span>
          <span
            className={`${secondaryFontSizeClass} break-all whitespace-pre-wrap`}
          >
            {linkedin}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4" />
          <span className={secondaryFontSizeClass}>GitHub</span>
          <span
            className={`${secondaryFontSizeClass} break-all whitespace-pre-wrap`}
          >
            {github}
          </span>
        </div>
      </div>
    </section>
  );
}

function SummarySection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section>
      <h2 className={`${primaryFontSizeClass} font-semibold mb-3`}>Summary</h2>
      <div className="max-w-full overflow-hidden">
        <div
          className={`${secondaryFontSizeClass} text-gray-800 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap`}
          dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
        />
      </div>
    </section>
  );
}

function WorkExperienceSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  return (
    <section className="mb-6">
      <h2 className={`${primaryFontSizeClass} font-bold mb-2`}>Experience</h2>
      {workExperiences?.map((exp, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className={`${secondaryFontSizeClass} font-bold`}>
                {exp.company}
              </h3>
              <p className={secondaryFontSizeClass}>{exp.position}</p>
            </div>
            <div className="text-right">
              <p className={secondaryFontSizeClass}>
                {exp.startDate && formatDate(exp.startDate, "MMMM yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MMMM yyyy") : "Present"}
              </p>
              <p className={secondaryFontSizeClass}>{exp.location}</p>
            </div>
          </div>
          <ul
            className={`list-disc list-inside ${secondaryFontSizeClass} space-y-1`}
          >
            {exp.description
              ?.split("\n")
              .map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      ))}
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
    <section className="mb-6">
      <h2 className={`${primaryFontSizeClass} font-bold mb-2`}>Education</h2>
      {educations?.map((edu, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`${secondaryFontSizeClass} font-bold`}>
                {edu.school}
              </h3>
              <p className={secondaryFontSizeClass}>{edu.degree}</p>
            </div>
            <div className="text-right">
              <p className={secondaryFontSizeClass}>
                {edu.startDate && formatDate(edu.startDate, "MMMM yyyy")} -{" "}
                {edu.endDate ? formatDate(edu.endDate, "MMMM yyyy") : "Present"}
              </p>
              <p className={secondaryFontSizeClass}>{edu.location}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function ProjectsSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { projects } = resumeData;

  return (
    <section className="mb-6">
      <h2 className={`${primaryFontSizeClass} font-bold mb-2`}>Projects</h2>
      <div className="grid grid-cols-2 gap-4">
        {projects?.map((project, index) => (
          <div key={index}>
            <h3 className={`${secondaryFontSizeClass} font-bold`}>
              {project.name}
            </h3>
            <p className={secondaryFontSizeClass}>{project.role}</p>
            <p
              className={`${secondaryFontSizeClass} break-all whitespace-pre-wrap`}
            >
              {project.description}
            </p>
          </div>
        ))}
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
    <section className="mb-6">
      <h2 className={`${primaryFontSizeClass} font-bold mb-2`}>Skills</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className={`${secondaryFontSizeClass} font-bold mb-1`}>
            Web Technologies
          </h3>
          <p className={secondaryFontSizeClass}>Advanced</p>
          <p className={`${secondaryFontSizeClass} text-gray-800`}>
            {skills?.join(", ") || ""}
          </p>
        </div>
        <div>
          <h3 className={`${secondaryFontSizeClass} font-bold mb-1`}>
            Web Frameworks
          </h3>
          <p className={secondaryFontSizeClass}>Intermediate</p>
          <p className={`${secondaryFontSizeClass} text-gray-800`}>
            {skills?.join(", ") || ""}
          </p>
        </div>
        <div>
          <h3 className={`${secondaryFontSizeClass} font-bold mb-1`}>Tools</h3>
          <p className={secondaryFontSizeClass}>Intermediate</p>
          <p className={`${secondaryFontSizeClass} text-gray-800`}>
            {skills?.join(", ") || ""}
          </p>
        </div>
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
  return (
    <section className="mb-6">
      <h2 className={`${primaryFontSizeClass} font-bold mb-2`}>
        Certifications
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {certifications?.map((cert, index) => (
          <div key={index}>
            <div className="flex items-center justify-center gap-4">
              {cert.name && (
                <h3 className={`${secondaryFontSizeClass} font-bold`}>
                  {cert.name}
                </h3>
              )}
            </div>
            {cert.source && (
              <p className={`${secondaryFontSizeClass} text-gray-800`}>
                {cert.source}
              </p>
            )}
            {cert.completionDate && (
              <p className={`${secondaryFontSizeClass} text-gray-800`}>
                {formatDate(cert.completionDate, "yyyy")}
              </p>
            )}
          </div>
        ))}
      </div>
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
    <section className="mb-6">
      <h2 className={`${primaryFontSizeClass} font-bold mb-2`}>Languages</h2>
      <div className="grid grid-cols-2 gap-4">
        {languages?.map((lang, index) => (
          <div key={index}>
            <h3 className={`${secondaryFontSizeClass} font-bold`}>
              {lang.name}
            </h3>
            <p className={secondaryFontSizeClass}>{lang.proficiency}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
