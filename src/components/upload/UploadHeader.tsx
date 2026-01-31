'use client'

export const UploadHeader = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-border bg-background-page/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-4 text-white">
        <div className="size-8 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">psychology</span>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-tight">RunWise AI</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[20px]">help</span>
          <span>Help Center</span>
        </button>
        <div className="h-8 w-[1px] bg-surface-border hidden md:block"></div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-surface-border"
          aria-label="User profile picture with a gradient background"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmkckFzeksn30sFL7yZqTomh6Z7e4yfPvyFAClDLiX2mglxyGnwTtXICFs64_XMVjZ9mtkhPRCPJLAsX_EG-G4WMeawKKhqeyvbPY0BpoK4CcftrUAhXwZ0rFenJl5jwGsNx7RVUyliOWWUJNsPjc_eaOiK19BcAHg8hCgoPvWg6rtBETC-p4rPbyl825AUHCZMPY14bp_KzpnAHoZt3xD2IH4dlRNKPA3xKZ7uvanDnAP6i-AvmpR77TPSQ6gsHudO2Zgq1f6b9A")',
          }}
        ></div>
      </div>
    </header>
  )
}
