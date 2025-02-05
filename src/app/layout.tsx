import {
  ClerkProvider,
  SignInButton,
  SignedOut,
} from '@clerk/nextjs'
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  )
}