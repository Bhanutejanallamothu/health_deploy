
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ClientLayout } from '@/components/layout/client-layout'
import { FirebaseClientProvider } from '@/firebase/client-provider'

export const metadata: Metadata = {
  title: 'Hospital Management System',
  description: 'Efficient Hospital Management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Nunito+Sans:wght@400;500&family=Inter:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground dark">
        <FirebaseClientProvider>
          <ClientLayout>{children}</ClientLayout>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
