import { Routes, Route } from "react-router";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import LandingPage from "@/pages/landing";
import DocsIndex from "@/pages/docs/index";
import DocsInstallation from "@/pages/docs/installation";
import DocsFeatures from "@/pages/docs/features";
import DocsAPI from "@/pages/docs/api";
import DocsProfiles from "@/pages/docs/profiles";
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
          <Route path="/docs/installation" element={<DocsInstallation />} />
          <Route path="/docs/features" element={<DocsFeatures />} />
          <Route path="/docs/api" element={<DocsAPI />} />
          <Route path="/docs/profiles" element={<DocsProfiles />} />
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
