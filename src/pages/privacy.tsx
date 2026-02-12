export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: February 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Overview</h2>
          <p className="mt-2">
            TypeWhisper is a local-only macOS application. We are committed to
            your privacy and designed TypeWhisper to process all data entirely on
            your device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Data Collection
          </h2>
          <p className="mt-2">
            <strong>TypeWhisper does not collect any data.</strong> All audio
            processing, transcription, and storage happens locally on your Mac.
            No audio, transcription text, or usage data is ever sent to any
            server.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Local Storage
          </h2>
          <p className="mt-2">
            TypeWhisper stores the following data locally in your Application
            Support directory:
          </p>
          <ul className="mt-2 space-y-1 list-disc pl-5">
            <li>Transcription history (text, timestamps, app context)</li>
            <li>User profiles and settings</li>
            <li>Downloaded AI models</li>
          </ul>
          <p className="mt-2">
            This data is stored only on your device and is not accessible to us
            or any third party.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Network Access
          </h2>
          <p className="mt-2">
            TypeWhisper connects to the internet only to download AI models from
            Hugging Face. After models are downloaded, the app can function
            entirely offline.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Third-Party Services
          </h2>
          <p className="mt-2">
            TypeWhisper does not integrate with any analytics, advertising, or
            tracking services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Open Source
          </h2>
          <p className="mt-2">
            TypeWhisper is open source under the GPLv3 license. You can audit
            the entire source code on{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2">
            If you have questions about this privacy policy, please open an
            issue on our{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-mac/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub repository
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
