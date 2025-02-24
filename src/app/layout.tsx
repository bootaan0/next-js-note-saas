import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "saas",
};

async function getData(userId: string){
  if(userId){
    const data = await prisma.user.findUnique({
      where:{
        id: userId,
      },
      select: {
        colorSchema: true,
      },
    });
    return data;
  }
 
  
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string)
  return (
    <html lang="en">
      <body className={`${inter.className} ${data?.colorSchema ?? "theme-orange"}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Navbar />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
