import { useEffect, useRef, useState } from "react";
import { format as formatDate } from "date-fns";
import { User, Briefcase, GraduationCap, Award, Heart } from "lucide-react";
import { cn } from "utils/utils";
import type { ResumeValues } from "utils/validations";
import { useResumeColors } from "@resume/ui/hooks/useResumeColors";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  currentSection?: string;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}

interface SectionVisibility {
  header: boolean;
  summary: boolean;
  personalInfo: boolean;
  skills: boolean;
  software: boolean;
  experience: boolean;
  education: boolean;
  certifications: boolean;
  languages: boolean;
  interests: boolean;
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}

export default function Template5({
  resumeData,
  currentSection,
  contentRef,
  className,
  primaryColor = "#32325d",
}: ResumePreviewProps) {
  useResumeColors(primaryColor);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<SectionVisibility>({
    header: false,
    summary: false,
    personalInfo: false,
    skills: false,
    software: false,
    experience: false,
    education: false,
    certifications: false,
    languages: false,
    interests: false,
  });

  useEffect(() => {
    setVisibleSections(() => ({
      header:
        Boolean(resumeData.firstName || resumeData.lastName) ||
        currentSection === "header",
      summary: Boolean(resumeData.summary) || currentSection === "summary",
      personalInfo:
        Boolean(resumeData.email || resumeData.phone) ||
        currentSection === "personalInfo",
      skills: Boolean(resumeData.skills?.length) || currentSection === "skills",
      software: currentSection === "software",
      experience:
        Boolean(resumeData.workExperiences?.length) ||
        currentSection === "experience",
      education:
        Boolean(resumeData.educations?.length) ||
        currentSection === "education",
      certifications: currentSection === "certifications",
      languages: currentSection === "languages",
      interests: currentSection === "interests",
    }));
  }, [resumeData, currentSection]);

  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setZoom((1 / 794) * width);
    }
  }, [containerRef.current?.offsetWidth]);

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
        className="p-8"
        style={{ zoom, fontFamily: resumeData.fontStyle }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {visibleSections.header && (
          <HeaderSection
            resumeData={resumeData}
            primaryFontSizeClass={primaryFontSize}
            secondaryFontSizeClass={secondaryFontSize}
          />
        )}
        {visibleSections.summary && (
          <SummarySection
            resumeData={resumeData}
            primaryFontSizeClass={primaryFontSize}
            secondaryFontSizeClass={secondaryFontSize}
          />
        )}
        <div className="grid grid-cols-[1fr_1.5fr] gap-6 mt-6">
          <div className="space-y-6">
            {visibleSections.personalInfo && (
              <PersonalInfoSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSize}
                secondaryFontSizeClass={secondaryFontSize}
              />
            )}
            {visibleSections.skills && (
              <SkillsSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSize}
                secondaryFontSizeClass={secondaryFontSize}
              />
            )}
            {visibleSections.software && (
              <SoftwareSection
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
            {visibleSections.experience && (
              <ExperienceSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSize}
                secondaryFontSizeClass={secondaryFontSize}
              />
            )}
            {visibleSections.education && (
              <EducationSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSize}
                secondaryFontSizeClass={secondaryFontSize}
              />
            )}
            {(resumeData.certifications?.length ?? 0) > 0 && (
              <CertificationsSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSize}
                secondaryFontSizeClass={secondaryFontSize}
              />
            )}
            {visibleSections.interests && (
              <InterestsSection
                resumeData={resumeData}
                primaryFontSizeClass={primaryFontSize}
                secondaryFontSizeClass={secondaryFontSize}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RatingDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <div
          key={value}
          className={cn(
            "w-3 h-3 rounded-full",
            value <= rating ? "bg-gray-700" : "border border-gray-400"
          )}
        />
      ))}
    </div>
  );
}

function SectionIcon({ icon: Icon }: { icon: any }) {
  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-resume-primary">
      <Icon className="w-4 h-4 text-white" />
    </div>
  );
}

function HeaderSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: {
  resumeData: ResumeValues;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}) {
  const { firstName, lastName, jobTitle } = resumeData;
  return (
    <div className="mb-6">
      <h1 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
        {firstName} {lastName}
      </h1>
      {jobTitle && (
        <p className={`${secondaryFontSizeClass} text-gray-600`}>{jobTitle}</p>
      )}
    </div>
  );
}

function SummarySection({
  resumeData,
  secondaryFontSizeClass,
}: {
  resumeData: ResumeValues;
  primaryFontSizeClass?: string;
  secondaryFontSizeClass?: string;
}) {
  return (
    <div
      className={`${secondaryFontSizeClass} text-gray-600 summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap`}
      dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
    />
  );
}

function PersonalInfoSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const { city, country, phone, email, linkedin } = resumeData;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={User} />
        <h2 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
          Personal Info
        </h2>
      </div>
      <div className={`${secondaryFontSizeClass} text-gray-600 space-y-1`}>
        {(city || country) && (
          <p>
            <strong>Address</strong>
            <br />
            {city && country ? `${city}, ${country}` : city || country}
          </p>
        )}
        {phone && (
          <p>
            <strong>Phone</strong>
            <br />
            {phone}
          </p>
        )}
        {email && (
          <p>
            <strong>E-mail</strong>
            <br />
            {email}
          </p>
        )}
        {linkedin && (
          <p>
            <strong>LinkedIn</strong>
            <br />
            {linkedin}
          </p>
        )}
      </div>
    </section>
  );
}

function SkillsSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} />
        <h2 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
          Skills
        </h2>
      </div>
      <ul className={`${secondaryFontSizeClass} text-gray-600 space-y-1`}>
        {resumeData.skills?.map((skill, index) => <li key={index}>{skill}</li>)}
      </ul>
    </section>
  );
}

function SoftwareSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  const software = [
    { name: "Microsoft Project", rating: 5, level: "Excellent" },
    { name: "Windows Server", rating: 4, level: "Very Good" },
    { name: "Linux/Unix", rating: 4, level: "Very Good" },
    { name: "Microsoft Excel", rating: 3, level: "Good" },
  ];

  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} />
        <h2 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
          Software
        </h2>
      </div>
      <div className="space-y-2">
        {software.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className={secondaryFontSizeClass}>{item.name}</p>
            <div className="flex flex-col items-center space-y-2">
              <RatingDots rating={item.rating} />
              <span className={`${secondaryFontSizeClass} text-gray-500`}>
                {item.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Briefcase} />
        <h2 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
          Experience
        </h2>
      </div>
      <div className="space-y-6">
        {resumeData.workExperiences?.map((exp, index) => (
          <div key={index} className="flex">
            <div
              className={`w-24 flex-shrink-0 ${secondaryFontSizeClass} text-gray-600 font-bold`}
            >
              {exp.startDate && formatDate(exp.startDate, "yyyy-MM")} -{" "}
              {exp.endDate ? formatDate(exp.endDate, "yyyy-MM") : "present"}
            </div>
            <div className="flex-1">
              <div
                className={`font-bold text-gray-800 ${secondaryFontSizeClass}`}
              >
                {exp.position}
              </div>
              <div className={`text-gray-600 mb-2 ${secondaryFontSizeClass}`}>
                {exp.company}
              </div>
              <ul
                className={`list-disc ml-5 space-y-2 text-gray-700 ${secondaryFontSizeClass}`}
              >
                {exp.description
                  ?.split("\n")
                  .map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
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
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={GraduationCap} />
        <h2 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
          Education
        </h2>
      </div>
      {resumeData.educations?.map((edu, index) => (
        <div key={index} className="flex">
          <div
            className={`w-24 flex-shrink-0 ${secondaryFontSizeClass} text-gray-600 font-bold`}
          >
            {edu.startDate && formatDate(edu.startDate, "yyyy-MM")} -{" "}
            {edu.endDate ? formatDate(edu.endDate, "yyyy-MM") : "present"}
          </div>
          <div className="flex-1">
            <div
              className={`font-bold text-gray-800 ${secondaryFontSizeClass}`}
            >
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
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} />
        <h2 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
          Certifications
        </h2>
      </div>
      <div className={`${secondaryFontSizeClass} space-y-1`}>
        {certifications &&
          certifications.map((cert, index) => (
            <div key={index} className="flex items-center justify-center">
              <div
                className={`w-24 font-bold flex-shrink-0 text-gray-600 ${secondaryFontSizeClass}`}
              >
                {cert.completionDate}
              </div>
              <div className="flex-1">
                <div className={`${secondaryFontSizeClass} text-gray-800`}>
                  {cert.name}
                </div>
              </div>
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
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} />
        <h2 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
          Languages
        </h2>
      </div>
      <div className="space-y-2">
        {languages?.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className={secondaryFontSizeClass}>{lang.name}</p>
            <div className="flex flex-col items-center space-y-2">
              <span className={`${secondaryFontSizeClass} text-gray-500`}>
                {lang.proficiency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InterestsSection({
  resumeData,
  primaryFontSizeClass,
  secondaryFontSizeClass,
}: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Heart} />
        <h2 className={`${primaryFontSizeClass} font-bold text-gray-800`}>
          Interests
        </h2>
      </div>
      <div className={`${secondaryFontSizeClass} space-y-1`}>
        <div className="flex">
          <div className="w-24 font-bold flex-shrink-0 text-gray-600"></div>
          <ul className="list-disc list-inside flex-1">
            <li>Avid cross country skier and cyclist</li>
            <li>Member of the Parent Teacher Association</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
