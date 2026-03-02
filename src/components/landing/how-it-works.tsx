export function HowItWorks() {
  return (
    <section className="section-light-gray py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl">
          See it in action.
        </h2>

        <div className="mt-12 reveal-scale-hidden">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <video
              className="w-full"
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              poster="/og-image.png"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="mt-6 text-center text-sm text-[#86868b]">
            Press a hotkey. Speak. Text appears.
          </p>
        </div>
      </div>
    </section>
  );
}
