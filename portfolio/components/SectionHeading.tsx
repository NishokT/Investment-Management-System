type Props = {
  id: string;
  label: string;
  title: string;
  lead?: string;
};

/** Heading above a bento section: a small label pill, a headline and an optional lead line. */
export function SectionHeading({ id, label, title, lead }: Props) {
  return (
    <div className="section-head" data-reveal>
      <div>
        <p className="pill">{label}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
