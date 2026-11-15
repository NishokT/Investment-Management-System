type Props = {
  eyebrow: string;
  title: string;
  id: string;
  lead?: string;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, id, lead, center = false }: Props) {
  return (
    <div className={center ? 'section-head center' : 'section-head'} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}
