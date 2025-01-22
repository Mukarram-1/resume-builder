import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import {
  Phone,
  Mail,
  MapPin,
  Link2,
  Zap,
  Trophy,
  Star,
  Heart,
  GraduationCap,
} from "lucide-react";
import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function Template7({
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
        className={cn("grid grid-cols-[2fr_1fr]", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <div className="p-8 space-y-6">
          {resumeData.firstName && <HeaderSection resumeData={resumeData} />}
          {resumeData.summary && <SummarySection resumeData={resumeData} />}
          {(resumeData.workExperiences?.length ?? 0) > 0 && (
            <ExperienceSection resumeData={resumeData} />
          )}
          {(resumeData.educations?.length ?? 0) > 0 && (
            <EducationSection resumeData={resumeData} />
          )}
          {(resumeData.languages?.length??0)>0 && <LanguagesSection resumeData={resumeData} />}
        </div>
        <div className="bg-[#008080] text-white">
          <div className="p-8 space-y-8">
            {(resumeData.keyachievements?.length??0)>0 && <KeyAchievementsSection />}
            {(resumeData.skills?.length ?? 0) > 0 && (
            <SkillsSection resumeData={resumeData} />
          )}
            {(resumeData.courses?.length??0)>0 && <CoursesSection />}
            {(resumeData.interests?.length??0)>0 && <InterestsSection />}
          </div>
        </div>
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
     jobTitle,
     city,
     country,
     phone,
     photo,
     email,
     website,
     borderStyle,
   } = resumeData;

  return (
    <div className="space-y-3">
      {(firstName || lastName) && (
        <h1 className="text-3xl font-bold text-gray-800">
          {firstName} {lastName}
        </h1>
      )}
      <div className="space-y-1">
        {jobTitle && (
          <h2 className="text-[#00B4B4] font-medium text-md">{jobTitle}</h2>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            {phone && (
              <>
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </>
            )}
          </div>
          {email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </div>
          )}
          {resumeData.linkedin && (
            <div className="flex items-center gap-1">
              <Link2 className="w-4 h-4" />
              <span>{linkedin}</span>
            </div>
          )}
          {(city || country) && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>
                {city}, {country}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3 border-b border-gray-300">SUMMARY</h2>
      <p className="text-sm text-gray-600 leading-relaxed break-all whitespace-pre-wrap">
        {resumeData.summary}
      </p>
    </section>
  );
}

function ExperienceSection({ resumeData }: ResumeSectionProps) {
    const { workExperiences } = resumeData;
  return (
    <section>
      <h2 className="text-lg font-bold mb-4 border-b border-gray-300">
        EXPERIENCE
      </h2>
      <div className="space-y-6">
        {workExperiences?.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <div className="w-12 h-12 shrink-0">
                <Image
                  src="/placeholder.svg"
                  alt="KPMG"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-bold">{exp.company}</h3>
                <p className="text-sm text-[#00B4B4]">{exp.position}</p>
                <div>
                  <ul className="list-disc list-inside text-sm text-gray-800 break-all whitespace-pre-line">
                    {exp.description
                      ?.split("\n")
                      .map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
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
          </div>
        ))}

        {/* Additional experience entries with similar structure */}
      </div>
    </section>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
    const { educations } = resumeData;
  return (
    <section>
      <h2 className="text-lg font-bold mb-4 border-b border-gray-300">
        EDUCATION
      </h2>
      <div className="space-y-4">
        {educations?.map((edu, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <div className="w-12 h-12 shrink-0">
                <Image
                  src="/placeholder.svg"
                  alt="KPMG"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-sm text-[#00B4B4]">{edu.school}</p>
                <div>
                  <ul className="list-disc list-inside text-sm text-gray-800">
                    {edu.description
                      ?.split("\n")
                      .map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  {edu.startDate && formatDate(edu.startDate, "MMMM yyyy")} -{" "}
                  {edu.endDate
                    ? formatDate(edu.endDate, "MMMM yyyy")
                    : "Present"}
                </p>
                <p className="text-sm text-gray-800">{edu.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LanguagesSection({ resumeData }: ResumeSectionProps) {
  const languages = [
    { name: "English", level: "Native", rating: 5 },
    { name: "Spanish", level: "Advanced", rating: 3 },
  ];

  return (
    <section>
      <h2 className="text-lg font-bold mb-4">LANGUAGES</h2>
      <div className="flex gap-12">
        {languages.map((lang, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="text-sm font-medium">{lang.name}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    i < lang.rating ? "bg-[#00B4B4]" : "border border-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{lang.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function KeyAchievementsSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-md font-bold border-b border-white">KEY ACHIEVEMENTS</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <h3 className="font-bold text-md">
              Led Major Retail Salesforce Integration
            </h3>
          </div>
          <p className="text-sm">
            Successfully orchestrated an end-to-end Salesforce integration for a
            key retail client, achieving a 40% boost in their operational
            efficiency.
          </p>
        </div>
        {/* Additional achievements */}
      </div>
    </section>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const skills = resumeData?.skills || [];

  return (
    <section className="space-y-4">
      <h2 className="text-md font-bold border-b border-white">SKILLS</h2>
      <div className="space-y-2 text-sm">
        {skills.length > 0 ? (
          <p>{skills.join(", ")}</p>
        ) : (
          <p className="text-gray-500">No skills added yet.</p>
        )}
      </div>
    </section>
  );
}


function CoursesSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-md font-bold border-b border-white">COURSES</h2>
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-bold">Certified Salesforce PMP</h3>
          <p className="text-sm">
            Project Management Professional certification specializing in
            Salesforce dynamics, offered by PMI.
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="font-bold">Advanced Salesforce Administration</h3>
          <p className="text-sm">
            Focused on the development of advanced Salesforce admin skills,
            provided by Salesforce University.
          </p>
        </div>
      </div>
    </section>
  );
}

function InterestsSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-md font-bold border-b border-white">INTERESTS</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <h3 className="font-bold">Innovative CRM Solutions</h3>
          </div>
          <p className="text-sm">
            Passionate about leveraging CRM technology like Salesforce to
            redefine user interaction and drive business growth.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <h3 className="font-bold">Mentoring Aspiring PMs</h3>
          </div>
          <p className="text-sm">
            Dedicated to mentoring aspiring project managers, sharing knowledge
            and experiences to foster industry growth.
          </p>
        </div>
      </div>
    </section>
  );
}
