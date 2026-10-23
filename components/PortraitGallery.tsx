"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Sketch = { id: string; name: string; url: string };

export default function PortraitGallery() {
  const [open, setOpen] = useState(false);
  const [sketches, setSketches] = useState<Sketch[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const added = Array.from(files).filter((file) => file.type.startsWith("image/")).map((file) => {
      const url = URL.createObjectURL(file);
      urls.current.push(url);
      return { id: `${file.name}-${file.lastModified}-${Math.random()}`, name: file.name, url };
    });
    setSketches((current) => [...current, ...added]);
  }

  function removeSketch(sketch: Sketch) {
    URL.revokeObjectURL(sketch.url);
    urls.current = urls.current.filter((url) => url !== sketch.url);
    setSketches((current) => current.filter((item) => item.id !== sketch.id));
  }

  return <>
    <button type="button" onClick={() => setOpen(true)} className="group h-full w-full rounded-2xl border border-border bg-background/70 p-5 text-left transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-xl text-accent">✎</span>
      <span className="mt-4 block font-semibold">Portrait sketching</span>
      <span className="mt-1 block text-sm text-muted">Artist at heart · Open sketch gallery ↗</span>
      {sketches.length > 0 && <span className="mt-3 inline-flex rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">{sketches.length} {sketches.length === 1 ? "photo" : "photos"}</span>}
    </button>

    {open && <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="sketch-gallery-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-background p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-sm font-medium text-accent">Beyond the screen</p><h2 id="sketch-gallery-title" className="mt-1 text-2xl font-semibold">Portrait sketch gallery</h2><p className="mt-2 text-sm text-muted">Choose image files to preview your sketches in this browser.</p></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close sketch gallery" className="rounded-full border border-border px-3 py-2 text-sm text-muted hover:text-foreground">✕</button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(event) => { addPhotos(event.currentTarget.files); event.currentTarget.value = ""; }} />
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80">＋ Add sketch photos</button>
        {sketches.length ? <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{sketches.map((sketch) => <figure key={sketch.id} className="group relative overflow-hidden rounded-2xl border border-border bg-foreground/5"><Image src={sketch.url} alt={sketch.name} width={640} height={640} unoptimized className="aspect-square w-full object-cover" /><figcaption className="truncate px-3 py-2 text-xs text-muted">{sketch.name}</figcaption><button type="button" onClick={() => removeSketch(sketch)} aria-label={`Remove ${sketch.name}`} className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">Remove</button></figure>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-border bg-foreground/[0.02] px-6 py-12 text-center"><span aria-hidden="true" className="text-4xl">✎</span><p className="mt-3 font-medium">Your sketches will appear here</p><p className="mt-1 text-sm text-muted">Add portrait photos to build your gallery.</p></div>}
        <p className="mt-5 text-xs leading-relaxed text-muted">Photos are previewed locally in this browser and are not uploaded to a server.</p>
      </section>
    </div>}
  </>;
}
