import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import { MapPin, Phone, Mail, Link2, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";
import { BorderStyles } from "app/(main)/editor/BorderStyleButton";
import {useResumeColors} from "@resume/ui/hooks/useResumeColors";
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

export default function Template1({
  resumeData,
  contentRef,
  className,
  primaryColor = "#DAA520",
}: ResumePreviewProps) {
  // console.log("Font style", resumeData.fontStyle);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  useResumeColors(primaryColor);
  
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
        <HeaderSection
          resumeData={resumeData}
          primaryColor={primaryColor}
          primaryFontSizeClass={primaryFontSizeClass}
          secondaryFontSizeClass={secondaryFontSizeClass}
        />
        <div className="grid grid-cols-[1fr_2fr] gap-8 mt-8">
          <div className="space-y-6">
            {(resumeData.linkedin || resumeData.github) && (
              <ProfilesSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.skills?.length ?? 0) > 0 && (
              <SkillsSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.certifications?.length ?? 0) > 0 && (
              <CertificationsSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.projects?.length ?? 0) > 0 && (
              <ProjectsSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
          </div>
          <div className="space-y-6">
            {resumeData.summary && (
              <SummarySection
                resumeData={resumeData}
                primaryColor={primaryColor}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.workExperiences?.length ?? 0) > 0 && (
              <ExperienceSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                primaryFontSizeClass={primaryFontSizeClass}
                secondaryFontSizeClass={secondaryFontSizeClass}
              />
            )}
            {(resumeData.educations?.length ?? 0) > 0 && (
              <EducationSection
                resumeData={resumeData}
                primaryColor={primaryColor}
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

interface ResumeSectionProps {
  resumeData: ResumeValues;
  primaryColor: string;
  primaryFontSizeClass: string;
  secondaryFontSizeClass: string;
}

function HeaderSection({
  resumeData,
  primaryColor,
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
    <div className="text-center space-y-4">
      {photoSrc && (
        <div className="flex justify-center">
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
        </div>
      )}
      <div>
        {(firstName || lastName) && (
          <h1 className={`${primaryFontSizeClass} font-bold mb-1`}>
            {firstName} {lastName}
          </h1>
        )}
        {jobTitle && (
          <p className={`${secondaryFontSizeClass} text-gray-800 mb-4`}>
            {jobTitle}
          </p>
        )}
        <div
          className={`${secondaryFontSizeClass} flex items-center justify-center gap-4 text-gray-800`}
        >
          {(city || country) && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-resume-primary" />
              <span>
                {city}
                {city && country && ", "}
                {country}
              </span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-resume-primary" />
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-resume-primary" />
              <span>{email}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-1">
              <Link2
                className="w-4 h-4 text-resume-primary"
              />
              <span>{website}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfilesSection({
  resumeData,
  primaryColor,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { linkedin, github } = resumeData;

  return (
    <section>
      <h2
        className={`font-semibold ${primaryFontSizeClass} mb-3 text-center text-resume-primary`}
      >
        &#7506; Profiles &#7506;
      </h2>
      <div className="space-y-2">
        {linkedin && (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-resume-primary" />
              <span
                className={`${secondaryFontSizeClass} break-all whitespace-pre-wrap`}
              >
                {linkedin}
              </span>
            </div>
            <span className={`${secondaryFontSizeClass} text-resume-primary`}>
              LinkedIn
            </span>
          </div>
        )}
        {github && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-resume-primary" />
              <span
                className={`${secondaryFontSizeClass} break-all whitespace-pre-wrap`}
              >
                {github}
              </span>
            </div>
            <span className={`${secondaryFontSizeClass} text-resume-primary`}>
              GitHub
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

function SummarySection({
  resumeData,
  primaryColor,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section className="relative">
      <div
        className="absolute left-[-3px] top-[50px] w-2 h-2 rounded-full z-10"
        style={{ backgroundColor: primaryColor }}
      />
      <h2
        className={`font-semibold ${primaryFontSizeClass} mb-3 text-resume-primary`}
      >
        Summary
      </h2>
      <div
        className="max-w-full overflow-hidden border-l-2 pl-4 border-resume-primary"
      >
        <div
          className={`${secondaryFontSizeClass} text-gray-800 summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap`}
          dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
        />
      </div>
    </section>
  );
}

function ExperienceSection({
  resumeData,
  primaryColor,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section className="relative">
      <div
        className="absolute left-[-3px] top-[50px] w-2 h-2 rounded-full z-10 bg-resume-primary"
        // style={{ backgroundColor: primaryColor }}
      />
      <h2
        className={`font-semibold ${primaryFontSizeClass} mb-3 text-resume-primary`}
        // style={{ color: primaryColor }}
      >
        Experience
      </h2>
      <div
        className="border-l-2 border-[#DAA520] pl-4 space-y-4 border-resume-primary"
        // style={{ borderColor: primaryColor }}
      >
        {resumeData.workExperiences?.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <div>
                {exp.company && (
                  <h3 className={`font-bold ${secondaryFontSizeClass}`}>
                    {exp.company}
                  </h3>
                )}
                {exp.position && (
                  <p
                    className={`${secondaryFontSizeClass} text-gray-800 font-bold`}
                  >
                    {exp.position}
                  </p>
                )}
              </div>
              <div className="text-right">
                {(exp.startDate || exp.endDate) && (
                  <p className={secondaryFontSizeClass}>
                    {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} -{" "}
                    {exp.endDate
                      ? formatDate(exp.endDate, "MM/yyyy")
                      : "Present"}
                  </p>
                )}
                {(resumeData.city || resumeData.country) && (
                  <p className={`${secondaryFontSizeClass} text-gray-800`}>
                    {resumeData.city}, {resumeData.country}
                  </p>
                )}
              </div>
            </div>
            {exp.description && (
              <ul
                className={`list-disc list-inside ${secondaryFontSizeClass} text-gray-800 break-all whitespace-pre-wrap`}
              >
                {exp.description
                  .split("\n")
                  .map((item, i) => item && <li key={i}>{item}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection({
  resumeData,
  primaryColor,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section className="relative">
      <div
        className="absolute left-[-3px] top-[50px] w-2 h-2 rounded-full z-10 bg-resume-primary"
        // style={{ backgroundColor: primaryColor }}
      />
      <h2
        className={`font-semibold ${primaryFontSizeClass} mb-3 text-resume-primary`}
        // style={{ color: primaryColor }}
      >
        Education
      </h2>
      <div className="border-l-2 pl-4 border-resume-primary">
        {resumeData.educations?.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <div>
                {edu.school && (
                  <h3 className={`font-bold ${secondaryFontSizeClass}`}>
                    {edu.school}
                  </h3>
                )}
                {edu.degree && (
                  <p className={`${secondaryFontSizeClass} text-gray-800`}>
                    {edu.degree}
                  </p>
                )}
              </div>
              <div className="text-right">
                {(edu.startDate || edu.endDate) && (
                  <p className={secondaryFontSizeClass}>
                    {edu.startDate && formatDate(edu.startDate, "MM/yyyy")} -{" "}
                    {edu.endDate
                      ? formatDate(edu.endDate, "MM/yyyy")
                      : "Present"}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({
  resumeData,
  primaryColor,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { skills } = resumeData;

  return (
    <section>
      <h2
        className={`font-semibold ${primaryFontSizeClass} mb-3 text-center text-resume-primary`}
        // style={{ color: primaryColor }}
      >
        &#7506; Skills &#7506;
      </h2>
      <div className="space-y-4 text-center">
        <div>
          <h3 className={`font-bold ${secondaryFontSizeClass} mb-1`}>
            Technical Skills
          </h3>
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
  primaryColor,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { certifications } = resumeData;

  return (
    <section className="text-center">
      <h2
        className={`font-semibold ${primaryFontSizeClass} mb-3 text-resume-primary`}
        // style={{ color: primaryColor }}
      >
        &#7506; Certifications &#7506;
      </h2>
      <div className="space-y-2">
        {certifications?.map((cert, index) => (
          <div key={index}>
            <div className="flex items-center justify-center gap-4">
              {cert.name && (
                <h3 className={`font-bold ${secondaryFontSizeClass}`}>
                  {cert.name}
                </h3>
              )}
              {cert.link && (
                <Link href={cert.link}>
                  <Link2 className="w-4 h-4 text-gray-600" />
                </Link>
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

function ProjectsSection({
  resumeData,
  primaryColor,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { projects } = resumeData;

  return (
    <section className="text-center">
      <h2
        className={`font-semibold ${primaryFontSizeClass} mb-3 text-resume-primary`}
        // style={{ color: primaryColor }}
      >
        &#7506; Projects &#7506;
      </h2>
      <div className="space-y-4">
        {projects?.map((project, index) => (
          <div key={index}>
            {project.name && (
              <h3
                className={`font-bold ${secondaryFontSizeClass} break-all whitespace-pre-wrap`}
              >
                {project.name}
              </h3>
            )}
            {project.role && (
              <p
                className={`${secondaryFontSizeClass} text-gray-800 break-all whitespace-pre-wrap`}
              >
                {project.role}
              </p>
            )}
            {project.description && (
              <p
                className={`${secondaryFontSizeClass} text-gray-800 break-all whitespace-pre-wrap`}
              >
                {project.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
