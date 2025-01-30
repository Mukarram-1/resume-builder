"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  GraduationCap,
  BookOpen,
  Globe2,
  Briefcase,
  PuzzleIcon,
} from "lucide-react";
import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function Template9({
  resumeData,
  contentRef,
  className,
  primaryColor = "#2D3748",
  secondaryColor = "#4FD1C5",
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
        className={cn("grid grid-cols-[280px_1fr]", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <div
          className="text-white p-8 relative"
          style={
            {
              backgroundColor: primaryColor,
              "--secondary-color": secondaryColor,
            } as React.CSSProperties
          }
        >
          <div
            className="absolute top-0 right-0 w-2 h-full"
            style={{ backgroundColor: secondaryColor }}
          ></div>
          <div className="space-y-8">
            {resumeData.phone && (
              <ProfileSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            )}
            {(resumeData.skills?.length ?? 0) > 0 && (
              <SkillsSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            )}
            {(resumeData.educations?.length ?? 0) > 0 && (
              <EducationSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            )}
            {(resumeData.languages?.length ?? 0) > 0 && (
              <LanguagesSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            )}
            {(resumeData.interests?.length ?? 0) > 0 && (
              <InterestsSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            )}
          </div>
        </div>
        <div className="p-8 bg-white">
          <div className="space-y-6">
            {(resumeData.firstName ||
              resumeData.lastName ||
              resumeData.jobTitle) && (
              <HeaderSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            )}
            {(resumeData.phone ||
              resumeData.email ||
              resumeData.city ||
              resumeData.country) && (
              <ContactSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            )}
            {(resumeData.workExperiences?.length ?? 0) > 0 && (
              <WorkExperienceSection
                resumeData={resumeData}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionIcon({
  icon: Icon,
  primaryColor,
  secondaryColor,
}: {
  icon: any;
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center"
      style={{ backgroundColor: primaryColor }}
    >
      <Icon className="w-5 h-5" style={{ color: secondaryColor }} />
    </div>
  );
}

function LeftSectionIcon({
  icon: Icon,
  primaryColor,
  secondaryColor,
}: {
  icon: any;
  primaryColor?: string;
  secondaryColor?: string;
}) {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center border"
      style={{ backgroundColor: primaryColor }}
    >
      <Icon className="w-5 h-5" style={{ color: secondaryColor }} />
    </div>
  );
}

function ProfileSection({
  resumeData,
  primaryColor,
  secondaryColor,
}: ResumePreviewProps) {
  const { photo } = resumeData;
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
    <div className="flex justify-center">
      <div className="relative">
        <div
          className="w-32 h-32 rounded-full border-4 overflow-hidden"
          style={{ borderColor: secondaryColor }}
        >
          {photoSrc && (
            <Image
              src={photoSrc || "/placeholder.svg"}
              width={128}
              height={128}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function HeaderSection({
  resumeData,
  primaryColor,
  secondaryColor,
}: ResumePreviewProps) {
  const { firstName, lastName, jobTitle, summary } = resumeData;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-1">
        {firstName} {lastName}
      </h1>
      <h2 className="text-xl mb-4" style={{ color: secondaryColor }}>
        {jobTitle}
      </h2>
      <div
        className="text-sm text-gray-600 summary-content [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic break-all whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: resumeData.summary || "" }}
      />
    </div>
  );
}

function ContactSection({
  resumeData,
  primaryColor,
  secondaryColor,
}: ResumePreviewProps) {
  const { email, phone, city, country, linkedin } = resumeData;

  return (
    <div
      className="text-white p-4 rounded"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="grid grid-cols-2 gap-4">
        {email && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 flex-shrink-0" color={secondaryColor} />
            <span className="truncate">{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 flex-shrink-0" color={secondaryColor} />
            <span className="truncate">{phone}</span>
          </div>
        )}
        {(city || country) && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" color={secondaryColor} />
            <span className="truncate">
              {city}, {country}
            </span>
          </div>
        )}
        {linkedin && (
          <div className="flex items-center gap-2 text-sm">
            <Linkedin
              className="w-4 h-4 flex-shrink-0"
              color={secondaryColor}
            />
            <span className="truncate">{linkedin}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillsSection({
  resumeData,
  primaryColor,
  secondaryColor,
}: ResumePreviewProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <LeftSectionIcon
          icon={BookOpen}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
        <h2 className="text-xl font-bold">SKILLS</h2>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        {resumeData.skills?.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-300 bg-opacity-40 rounded px-3 py-1.5 text-sm w-fit"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection({
  resumeData,
  primaryColor,
  secondaryColor,
}: ResumePreviewProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <LeftSectionIcon
          icon={GraduationCap}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
        <h2 className="text-xl font-bold">EDUCATION</h2>
      </div>
      {resumeData.educations?.map((edu, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-bold text-sm">{edu.degree}</h3>
          <p className="text-white text-sm">{edu.school}</p>
          <p className="text-xs text-gray-300">
            {edu.startDate && formatDate(edu.startDate, "yyyy")} -{" "}
            {edu.endDate ? formatDate(edu.endDate, "yyyy") : "Present"}
          </p>
        </div>
      ))}
    </section>
  );
}

function LanguagesSection({
  resumeData,
  primaryColor,
  secondaryColor,
}: ResumePreviewProps) {
  const { languages } = resumeData;
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <LeftSectionIcon
          icon={Globe2}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
        <h2 className="text-xl font-bold">LANGUAGES</h2>
      </div>
      <div className="space-y-2">
        {languages?.map((lang, index) => (
          <div key={index} className="text-sm">
            <h3 className="font-bold">{lang.name}</h3>
            <p className="text-xs text-gray-300 italic">{lang.proficiency}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InterestsSection({
  resumeData,
  primaryColor,
  secondaryColor,
}: ResumePreviewProps) {
  const interests = [
    { name: "Blockchain Technologies", icon: "🔗" },
    { name: "Sailing", icon: "⛵" },
    { name: "Web 3.0", icon: "🌐" },
    { name: "Sustainability", icon: "🌱" },
  ];

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <LeftSectionIcon
          icon={PuzzleIcon}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
        <h2 className="text-xl font-bold">INTERESTS</h2>
      </div>
      <div className="space-y-2">
        {interests.map((interest, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span>{interest.icon}</span>
            <span>{interest.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkExperienceSection({
  resumeData,
  primaryColor,
  secondaryColor,
}: ResumePreviewProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <SectionIcon
          icon={Briefcase}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
        <h2 className="text-xl font-bold">WORK EXPERIENCE</h2>
      </div>
      <div className="relative before:absolute before:left-[3px] before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200">
        {resumeData.workExperiences?.map((exp, index) => (
          <div key={index} className="mb-6 relative pl-6">
            <div
              className="absolute left-0 top-2 w-2 h-2 rounded-full z-10"
              style={{ backgroundColor: secondaryColor }}
            />
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                <p className="text-gray-800 text-md">{exp.company}</p>
                <p className="text-sm" style={{ color: secondaryColor }}>
                  {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ color: secondaryColor }}>
                  {exp.location}
                </p>
              </div>
            </div>
            <p
              className="text-sm mb-2 italic"
              style={{ color: secondaryColor }}
            >
              Achievements
            </p>
            <ul
              className="list-disc list-inside space-y-1"
              style={
                { "--tw-marker-color": secondaryColor } as React.CSSProperties
              }
            >
              {exp.description?.split("\n").map((item, i) => (
                <li key={i} className="text-gray-600 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
