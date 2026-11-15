type Props = {
  index: string;
  eyebrow: string;
  title: string;
  id: string;
  lead?: string;
};

/** Section title block: a numbered label above a large headline, with an optional lead line. */
export function SectionHeading({ index, eyebrow, title, id, lead }: Props) {
  return (
    <div className="section-head" data-reveal>
      <p className="section-label">
        <span>{index}</span>
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
