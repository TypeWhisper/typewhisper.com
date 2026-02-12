export default function LegalNotice() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Legal Notice
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Impressum</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Information pursuant to &sect; 5 TMG
          </h2>
          <p className="mt-2">
            TypeWhisper is an open source project. For contact information and
            responsible parties, please refer to the project&apos;s{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub repository
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Dispute Resolution
          </h2>
          <p className="mt-2">
            The European Commission provides a platform for online dispute
            resolution (OS). We are not willing or obliged to participate in
            dispute resolution proceedings before a consumer arbitration board.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Liability for Content
          </h2>
          <p className="mt-2">
            As a service provider, we are responsible for our own content on
            these pages in accordance with general legislation pursuant to
            &sect; 7 (1) TMG. However, according to &sect;&sect; 8 to 10 TMG,
            we are not obligated to monitor transmitted or stored third-party
            information or to investigate circumstances that indicate illegal
            activity.
          </p>
        </section>
      </div>
    </div>
  );
}
