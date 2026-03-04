import type { Metadata, Viewport } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/lib/context'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
})

export const metadata: Metadata = {
  title: 'SmartAdmit - Votre avenir universitaire en pilote automatique',
  description: 'SmartAdmit utilise l\'IA pour analyser vos documents, suggerer les meilleures filieres, selectionner les universites parfaites et preparer vos candidatures. Par Eazy-Visa.',
}

export const viewport: Viewport = {
  themeColor: '#4F46E5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${dmSans.variable} ${syne.variable} font-sans antialiased`}>
        <AppProvider>
          {children}
          <Analytics />
        </AppProvider>
      </body>
    </html>
  )
}
