export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: February 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">License</h2>
          <p className="mt-2">
            TypeWhisper is free and open source software, distributed under the
            GNU General Public License v3.0 (GPLv3). By using TypeWhisper, you
            agree to the terms of this license.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Disclaimer of Warranties
          </h2>
          <p className="mt-2">
            TypeWhisper is provided &quot;as is&quot;, without warranty of any
            kind, express or implied, including but not limited to the warranties
            of merchantability, fitness for a particular purpose, and
            noninfringement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Limitation of Liability
          </h2>
          <p className="mt-2">
            In no event shall the authors or copyright holders be liable for any
            claim, damages, or other liability, whether in an action of
            contract, tort, or otherwise, arising from, out of, or in connection
            with the software or the use or other dealings in the software.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Third-Party Models
          </h2>
          <p className="mt-2">
            TypeWhisper downloads AI models from third-party sources (Hugging
            Face). These models are subject to their own licenses (e.g., MIT,
            Apache 2.0). Please review the respective model licenses before use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Commercial Licensing
          </h2>
          <p className="mt-2">
            If the GPLv3 license does not meet your needs, commercial licensing
            is available. See the{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-mac/blob/main/LICENSE-COMMERCIAL.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              commercial license
            </a>{" "}
            for details.
          </p>
        </section>
      </div>
    </div>
  );
}
