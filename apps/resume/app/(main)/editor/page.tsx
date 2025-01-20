import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "utils/prisma";
import { auth } from "utils/auth";
import { resumeDataIncludes } from "utils/types";

interface PageProps {
    searchParams: Promise<{ resumeId?: string}>
}

export const metadata: Metadata = {
    title: 'Build your resume'
}

export default async function Home({ searchParams } : PageProps) {
    const { resumeId } = await searchParams;

    const session = await auth();
    

    // if(!session?.user) toast('Please login') 

    const resumeToEdit = resumeId
      ? await prisma.resume.findUnique({
          where: { id: resumeId, userid: "cm5zfpun50000oc5k59uqz5lh" },
          include: resumeDataIncludes,
        })
      : null;
    console.log("resume to edit",resumeToEdit);
    return (
        <ResumeEditor resumeToEdit={resumeToEdit}/>
    )
}