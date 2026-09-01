export default function SectionHeading({ eyebrow, title, sub, center = true, light = false, as: Tag = 'h2' }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className={`eyebrow ${light ? '!text-orange-300' : ''}`}>
          {eyebrow}
        </span>
      )}
      <Tag className={`mt-3 text-3xl sm:text-4xl ${light ? 'text-white' : ''}`}>
        {title}
      </Tag>
      {sub && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-slate-300' : 'text-ink-500'}`}>
          {sub}
        </p>
      )}
      {center && <div className="mx-auto mt-5 h-1 w-16 rounded-full" style={{ background: 'var(--accent)' }} />}
    </div>
  );
}