import { Link } from "react-router";
import { Logo } from "@/components/ui/logo";
import { discordUrl } from "@/lib/platform-download";

export function Footer() {
  return (
    <footer className="section-dark-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Logo />
            <p className="text-sm text-[#86868b]">
              Local speech-to-text. Your voice data never leaves your device.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex flex-col gap-4 text-xs text-[#86868b] sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link to="/#features" className="hover:text-[#f5f5f7] transition-colors">Features</Link>
              <Link to="/addons" className="hover:text-[#f5f5f7] transition-colors">Add-ons</Link>
              <Link to="/docs" className="hover:text-[#f5f5f7] transition-colors">Docs</Link>
              <Link to="/changelog" className="hover:text-[#f5f5f7] transition-colors">ChangeLog</Link>
              <a href="https://github.com/TypeWhisper/typewhisper-win/releases" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f5f7] transition-colors">Windows</a>
              <a href="https://testflight.apple.com/join/kcCS3hcZ" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f5f7] transition-colors">iOS Beta</a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f5f7] transition-colors">Discord</a>
              <a href="https://github.com/TypeWhisper" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f5f7] transition-colors">GitHub</a>
              <a href="https://github.com/sponsors/seofood" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f5f7] transition-colors">Sponsor</a>
              <a href="https://ko-fi.com/seofood" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f5f7] transition-colors">Ko-fi</a>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex flex-col items-start gap-3 text-xs text-[#86868b] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} TypeWhisper. Open source under GPLv3.</p>
            <div className="flex gap-x-6 gap-y-2 flex-wrap">
              <Link to="/privacy" className="hover:text-[#f5f5f7] transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-[#f5f5f7] transition-colors">Terms</Link>
              <Link to="/legal-notice" className="hover:text-[#f5f5f7] transition-colors">Legal Notice</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
