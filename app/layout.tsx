"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import "../src/index.css";

import { useEffect } from "react";
import { setBaseUrl } from "@workspace/api-client-react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Prevent double /api prefix in Next.js
    setBaseUrl("");
  }, []);

  return (
    <html lang="id">
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Layout>
              {children}
            </Layout>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
