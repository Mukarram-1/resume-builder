import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { User, Briefcase, GraduationCap, Award, Heart } from "lucide-react";
import { cn } from "utils/utils";
import type { ResumeValues } from "utils/validations";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  currentSection?: string;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?:string;
  secondaryColor?:string;
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
  primaryColor?:string;
}

export default function Template5({
  resumeData,
  currentSection,
  contentRef,
  className,
  primaryColor = "#32325d",
}: ResumePreviewProps) {
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
    setVisibleSections((prev) => ({
      header: Boolean(
        resumeData.firstName ||
          resumeData.lastName ||
          currentSection === "header"
      ),
      summary: Boolean(resumeData.summary || currentSection === "summary"),
      personalInfo: Boolean(
        resumeData.email ||
          resumeData.phone ||
          currentSection === "personalInfo"
      ),
      skills: Boolean(resumeData.skills?.length || currentSection === "skills"),
      software: Boolean(currentSection === "software"),
      experience: Boolean(
        resumeData.workExperiences?.length || currentSection === "experience"
      ),
      education: Boolean(
        resumeData.educations?.length || currentSection === "education"
      ),
      certifications: Boolean(currentSection === "certifications"),
      languages: Boolean(currentSection === "languages"),
      interests: Boolean(currentSection === "interests"),
    }));
  }, [resumeData, currentSection]);

  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setZoom((1 / 794) * width);
    }
  }, [containerRef.current?.offsetWidth]);

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
        style={{ zoom }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {visibleSections.header && <HeaderSection resumeData={resumeData} />}
        {visibleSections.summary && <SummarySection resumeData={resumeData} />}

        <div className="grid grid-cols-[1fr_1.5fr] gap-6 mt-6">
          <div className="space-y-6">
            {visibleSections.personalInfo && (
              <PersonalInfoSection resumeData={resumeData} primaryColor={primaryColor} />
            )}
            {visibleSections.skills && (
              <SkillsSection resumeData={resumeData} primaryColor={primaryColor}/>
            )}
            {visibleSections.software && <SoftwareSection />}
            {(resumeData.languages?.length ?? 0) > 0 && (
              <>
                <LanguagesSection resumeData={resumeData} primaryColor={primaryColor}/>
                <hr className="border-t border-gray-300 my-4" />
              </>
            )}
          </div>
          <div className="space-y-6">
            {visibleSections.experience && (
              <ExperienceSection resumeData={resumeData} primaryColor={primaryColor}/>
            )}
            {visibleSections.education && (
              <EducationSection resumeData={resumeData} primaryColor={primaryColor}/>
            )}
            {(resumeData.certifications?.length ?? 0) > 0 && (
              <CertificationsSection resumeData={resumeData} primaryColor={primaryColor}/>
            )}
            {visibleSections.interests && <InterestsSection />}
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

function SectionIcon({ icon: Icon, primaryColor }: { icon: any,primaryColor?:string }) {
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center"
      style={{ backgroundColor:primaryColor }}
    >
      <Icon className="w-4 h-4 text-white" />
    </div>
  );
}

function HeaderSection({ resumeData }: { resumeData: ResumeValues }) {
  const { firstName, lastName, jobTitle } = resumeData;
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {firstName} {lastName}
      </h1>
      {jobTitle && <p className="text-xl text-gray-600">{jobTitle}</p>}
    </div>
  );
}

function SummarySection({ resumeData }: { resumeData: ResumeValues }) {
  return (
    // <div className="text-sm text-gray-600 break-all whitespace-pre-wrap">
    //   <p>{resumeData.summary}</p>
    // </div>
    <div
      className="text-sm text-gray-600 summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
    />
  );
}

function PersonalInfoSection({ resumeData,primaryColor }: ResumeSectionProps) {
  const { city, country, phone, email, linkedin } = resumeData;
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={User} primaryColor={primaryColor}/>
        <h2 className="text-lg font-bold">Personal Info</h2>
      </div>
      <div className="space-y-1 text-sm">
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

function SkillsSection({ resumeData,primaryColor }: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} primaryColor={primaryColor}/>
        <h2 className="text-lg font-bold">Skills</h2>
      </div>
      <ul className="space-y-1 text-sm">
        {resumeData.skills?.map((skill, index) => <li key={index}>{skill}</li>)}
      </ul>
    </section>
  );
}

function SoftwareSection({ resumeData }: ResumeSectionProps) {
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
        <h2 className="text-lg font-bold">Software</h2>
      </div>
      <div className="space-y-2">
        {software.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-sm">{item.name}</p>
            <div className="flex flex-col items-center space-y-2">
              <RatingDots rating={item.rating} />
              <span className="text-xs text-gray-500">{item.level}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function ExperienceSection({ resumeData,primaryColor }: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Briefcase} primaryColor={primaryColor}/>
        <h2 className="text-lg font-bold">Experience</h2>
      </div>
      <div className="space-y-6">
        {resumeData.workExperiences?.map((exp, index) => (
          <div key={index} className="flex">
            <div className="w-24 flex-shrink-0 text-gray-600 text-sm font-bold">
              {exp.startDate && formatDate(exp.startDate, "yyyy-MM")} -{" "}
              {exp.endDate ? formatDate(exp.endDate, "yyyy-MM") : "present"}
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-800">{exp.position}</div>
              <div className="text-gray-600 mb-2">{exp.company}</div>
              <ul className="list-disc ml-5 space-y-2 text-gray-700">
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

function EducationSection({ resumeData,primaryColor }: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={GraduationCap} primaryColor={primaryColor}/>
        <h2 className="text-lg font-bold">Education</h2>
      </div>
      {resumeData.educations?.map((edu, index) => (
        <div key={index} className="flex">
          <div className="w-24 flex-shrink-0 text-gray-600 text-sm font-bold">
            {edu.startDate && formatDate(edu.startDate, "yyyy-MM")} -{" "}
            {edu.endDate ? formatDate(edu.endDate, "yyyy-MM") : "present"}
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-800">{edu.school}</div>
            <div className="text-gray-600 mb-2">{edu.degree}</div>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              {edu.description
                ?.split("\n")
                .map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

function CertificationsSection({ resumeData,primaryColor }: ResumeSectionProps) {
  const { certifications } = resumeData;

  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} primaryColor={primaryColor}/>
        <h2 className="text-lg font-bold">Certifications</h2>
      </div>
      <div className="space-y-1">
        {certifications &&
          certifications.map((cert, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="w-24 font-bold flex-shrink-0 text-gray-600 text-sm">
                {cert.completionDate}
              </div>
              <div className="flex-1 ">
                <div className=" text-gray-800">{cert.name}</div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function LanguagesSection({ resumeData,primaryColor }: ResumeSectionProps) {
  const {languages} = resumeData;

  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Award} primaryColor={primaryColor}/>
        <h2 className="text-lg font-bold">Languages</h2>
      </div>
      <div className="space-y-2">
        {languages?.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-sm">{lang.name}</p>
            <div className="flex flex-col items-center space-y-2">
              {/* <RatingDots rating={lang.rating} /> */}
              <span className="text-xs text-gray-500">{lang.proficiency}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InterestsSection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300">
        <SectionIcon icon={Heart} />
        <h2 className="text-lg font-bold">Interests</h2>
      </div>
      <div className="space-y-1">
        <div className="flex">
          <div className="w-24 font-bold flex-shrink-0 text-gray-600 text-sm"></div>
          <ul className="list-disc list-inside text-sm flex-1 list-none">
            <li>Avid cross country skier and cyclist</li>
            <li>Member of the Parent Teacher Association</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
