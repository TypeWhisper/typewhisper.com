import { Routes, Route } from "react-router";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import LandingPage from "@/pages/landing";
import DocsIndex from "@/pages/docs/index";
import DocsMacIndex from "@/pages/docs/mac/index";
import DocsMacInstallation from "@/pages/docs/mac/installation";
import DocsMacFeatures from "@/pages/docs/mac/features";
import DocsMacAPI from "@/pages/docs/mac/api";
import DocsMacCLI from "@/pages/docs/mac/cli";
import DocsMacProfiles from "@/pages/docs/mac/profiles";
import DocsWindowsIndex from "@/pages/docs/windows/index";
import DocsWindowsInstallation from "@/pages/docs/windows/installation";
import DocsWindowsFeatures from "@/pages/docs/windows/features";
import DocsWindowsAPI from "@/pages/docs/windows/api";
import DocsWindowsProfiles from "@/pages/docs/windows/profiles";
import DocsIOS from "@/pages/docs/ios";
import BlogIndex from "@/pages/blog/index";
import PrivacyPolicy from "@/pages/privacy";
import TermsOfService from "@/pages/terms";
import LegalNotice from "@/pages/legal-notice";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsIndex />} />
          <Route path="/docs/mac" element={<DocsMacIndex />} />
          <Route path="/docs/mac/installation" element={<DocsMacInstallation />} />
          <Route path="/docs/mac/features" element={<DocsMacFeatures />} />
          <Route path="/docs/mac/api" element={<DocsMacAPI />} />
          <Route path="/docs/mac/cli" element={<DocsMacCLI />} />
          <Route path="/docs/mac/profiles" element={<DocsMacProfiles />} />
          <Route path="/docs/windows" element={<DocsWindowsIndex />} />
          <Route path="/docs/windows/installation" element={<DocsWindowsInstallation />} />
          <Route path="/docs/windows/features" element={<DocsWindowsFeatures />} />
          <Route path="/docs/windows/api" element={<DocsWindowsAPI />} />
          <Route path="/docs/windows/profiles" element={<DocsWindowsProfiles />} />
          <Route path="/docs/ios" element={<DocsIOS />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
