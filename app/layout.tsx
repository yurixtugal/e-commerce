import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import ModalProvider from '@/provider/modal-provider'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
