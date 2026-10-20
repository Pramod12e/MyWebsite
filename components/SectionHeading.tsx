type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="text-sm font-medium text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}