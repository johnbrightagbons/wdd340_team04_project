// handcrafted-haven/src/app/page.tsx
export const metadata = {
  title: "Handcrafted Haven - Dashboard",
  description: "Your personalized dashboard for managing your handcrafted items and orders.",
};

// This is the main dashboard page for the Handcrafted Haven application.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      {children}
    </html>
  )
 }
