import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import useDimensions from "@resume/ui/hooks/use-dimensions";
import cn from "@resume/ui/cn";
import type { ResumeValues } from "utils/validations";
import { BorderStyles } from "app/(main)/editor/BorderStyleButton";
import { Link, Linkedin, Mail, MapPin, Phone } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function Template4({
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
        className={cn(
          "grid grid-cols-[1fr_2fr] gap-6 p-8",
          !width && "invisible"
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <div className="space-y-6">
          {resumeData.email && <PersonalInfoSection resumeData={resumeData} />}
          {(resumeData.skills?.length ?? 0) > 0 && (
            <SkillsSection resumeData={resumeData} />
          )}
          {(resumeData.softwares?.length??0)>0 && <SoftwareSection resumeData={resumeData} />}
          {(resumeData.languages?.length??0)>0 && <LanguagesSection resumeData={resumeData} />}
        </div>
        <div className="space-y-6">
          <SummarySection resumeData={resumeData} />
          {(resumeData.workExperiences?.length??0)>0 && (
            <ExperienceSection resumeData={resumeData} />
          )}
          {(resumeData.educations?.length??0)>0 && (
            <EducationSection resumeData={resumeData} />
          )}
          {(resumeData.cerfiticates?.length??0)>0 && (
            <CertificatesSection resumeData={resumeData} />
          )}
          {(resumeData.interests?.length??0)>0 && <InterestsSection resumeData={resumeData} />}
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function RatingDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <div
          key={value}
          className={cn(
            "w-3 h-3 rounded-full",
            value <= rating ? "bg-[#003366]" : "border border-[#003366]"
          )}
        />
      ))}
    </div>
  );
}

function PersonalInfoSection({ resumeData }: ResumeSectionProps) {
  return (
    <section>
      <h2 className="text-[#003366] font-bold text-lg mb-3">• Personal Info</h2>
      <div className="space-y-2 text-sm">
        {(resumeData.city || resumeData.country) && (
          <div className="flex items-center gap-1">
            <MapPin className="w-5 h-5 border-1 rounded-full text-white bg-blue-950 text-center p-[3px]" />
            <p>
              {resumeData.city}, {resumeData.country}
            </p>
          </div>
        )}
        {resumeData.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-5 h-5 border-1 rounded-full text-white bg-blue-950 text-center p-[3px]" />
            <p>{resumeData.phone}</p>
          </div>
        )}
        {resumeData.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-5 h-5 border-1 rounded-full text-white bg-blue-950 text-center p-[3px]" />
            <p>{resumeData.email}</p>
          </div>
        )}
        {resumeData.website && (
          <div className="flex items-center gap-1">
            <Link className="w-5 h-5 border-1 rounded-full text-white bg-blue-950 text-center p-[3px]" />
            <p>{resumeData.website}</p>
          </div>
        )}
        {resumeData.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="w-5 h-5 border-1 rounded-full text-white bg-blue-950 text-center p-[3px]" />
            <p>{resumeData.linkedin}</p>
          </div>
        )}
      </div>
    </section>
  );
}
function SummarySection({ resumeData }: ResumeSectionProps) {
     const {
       firstName,
       lastName,
       jobTitle,
       photo,
       borderStyle,
     } = resumeData;
    const [photoSrc, setPhotoSrc] = useState(
      photo instanceof File ? "" : photo
    );

    useEffect(() => {
      const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
      if (objectUrl) {
        setPhotoSrc(objectUrl);
      }
      if (photo === null) setPhotoSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }, [photo]);
  return (
    <section className="relative">
      {photoSrc && (
        <div className="mb-2">
          <div className="flex justify-start items-center gap-4">
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
            <div className="flex flex-col justify-center items-center">
              {(firstName || lastName) && (
                <h1 className="text-3xl font-bold mb-1">
                  {firstName} {lastName}
                </h1>
              )}
              {jobTitle && (
                <p className="text-xl text-gray-800 mb-4">{jobTitle}</p>
              )}
            </div>
          </div>
        </div>
      )}
      {resumeData.summary && (
        <div className="max-w-full overflow-hidden">
          <p className="text-sm text-gray-800 break-all whitespace-pre-wrap">
            {resumeData.summary}
          </p>
        </div>
      )}
    </section>
  );
}
function SkillsSection({ resumeData }: ResumeSectionProps) {
  const {skills} = resumeData

  return (
    <section>
      <h2 className="text-[#003366] font-bold text-lg mb-3">• Skills</h2>
      <ul className="list-none space-y-2">
        {skills &&
          skills.map((skill, index) => (
            <li key={index} className="text-sm">
              {skill}
            </li>
          ))}
      </ul>
    </section>
  );
}

function SoftwareSection({ resumeData }: ResumeSectionProps) {
  const software = [
    { name: "Microsoft Project", rating: 5 },
    { name: "Microsoft Office (Word, Excel)", rating: 4 },
    { name: "Windows Server", rating: 4 },
    { name: "Git", rating: 3 },
  ];

  return (
    <section>
      <h2 className="text-[#003366] font-bold text-lg mb-3">• Software</h2>
      <div className="space-y-3">
        {software.map((item, index) => (
          <div key={index} className="space-y-1">
            <p className="text-sm">{item.name}</p>
            <RatingDots rating={item.rating} />
            <p className="text-xs text-gray-600">
              {item.rating === 5
                ? "Excellent"
                : item.rating === 4
                  ? "Very Good"
                  : item.rating === 3
                    ? "Good"
                    : item.rating === 2
                      ? "Basic"
                      : "Beginner"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection({ resumeData }: ResumeSectionProps) {
 return (
   <div className="mt-4">
     {/* Section Header */}
     <div className="flex items-center mb-4">
       <div className="text-blue-900 font-bold">• Experience</div>
     </div>

     {/* Experience Items */}
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
             <ul className="list-disc ml-5 space-y-2 text-gray-700 break-all whitespace-pre-wrap">
               {exp.description
                 ?.split("\n")
                 .map((item, i) => <li key={i}>{item}</li>)}
             </ul>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
   return (
     <div className="mt-4">
       {/* Section Header */}
       <div className="flex items-center mb-4">
         <div className="text-blue-900 font-bold">• Education</div>
       </div>

       {/* Education Items */}
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
     </div>
   );
}

function CertificatesSection({ resumeData }: ResumeSectionProps) {
  const certificates = [
    { name: "PMP - Project Management Institute", year: "2010-05" },
    { name: "CAPM - Project Management Institute", year: "2007-11" },
    { name: "PRINCE2® Foundation", year: "2003-04" },
  ];

  return (
    <div className="mt-4">
      {/* Section Header */}
      <div className="flex items-center mb-4">
        <div className="text-blue-900 font-bold">• Certificates</div>
      </div>

      {/* Certificates Items */}
      <div className="space-y-2">
        {certificates.map((cert, index) => (
          <div key={index} className="flex">
            <div className="w-24 flex-shrink-0 text-gray-600 text-sm">
              {cert.date}
            </div>
            <div className="flex-1 text-gray-700">{cert.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguagesSection({ resumeData }: ResumeSectionProps) {
  const languages = [
    { name: "English", level: "Native", rating: 5 },
    { name: "Spanish", level: "Basic", rating: 2 },
  ];

  return (
    <section>
      <h2 className="text-[#003366] font-bold text-lg mb-3">• Languages</h2>
      <div className="space-y-3">
        {languages.map((lang, index) => (
          <div key={index} className="space-y-1">
            <p className="text-sm">{lang.name}</p>
            <RatingDots rating={lang.rating} />
            <p className="text-xs text-gray-600">{lang.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InterestsSection({ resumeData }: ResumeSectionProps) {
  return (
    <div className="mt-4">
      {/* Section Header */}
      <div className="flex items-center mb-4">
        <div className="text-blue-900 font-bold">• Interests</div>
      </div>

      {/* Interests Items */}
      <div className="flex">
        <div className="flex-1">
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            <li>Member of the PTA</li>
            <li>Avid cross country skier and cyclist</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
