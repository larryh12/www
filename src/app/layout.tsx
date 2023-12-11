import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Theme, Container } from "@radix-ui/themes";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NavBar } from "@/components/navigation/nav-bar";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title: "Larry Huynh",
  description: "Larry Huynh's Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" enableSystem={true}>
          <Theme accentColor="gray" grayColor="slate" panelBackground="solid">
            <Container size="2" px="4">
              <NavBar />
              {children}
              <Footer />
            </Container>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const revalidate = 60;
