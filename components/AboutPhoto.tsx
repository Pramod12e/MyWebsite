import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

export default function AboutPhoto() {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "about.jpg"));

  return (
    <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border shadow-xl shadow-accent/10 md:aspect-auto md:h-full md:min-h-64">
      {exists ? (
        <Image
          src="/about.jpg"
          alt="Pramod Kumar Bindhani"
          fill
          sizes="(min-width: 768px) 320px, 90vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 border-2 border-dashed border-border p-6 text-center text-sm text-muted">
          <span className="text-2xl">📷</span>
          <p>Add your photo</p>
          <p className="font-mono text-xs">public/about.jpg</p>
        </div>
      )}
    </div>
  );
}
