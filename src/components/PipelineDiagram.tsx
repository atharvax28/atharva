/**
 * Card art for the projects that have no user interface to screenshot: the pipelines,
 * the crawler, the models. Rather than faking a UI or leaving a grey box, each renders
 * its own stages on the same near-black panel as the hero ledger, so the machine side of
 * the site carries one visual language throughout.
 *
 * Server component. No motion, no state.
 */

const PipelineDiagram = ({
  stages,
  label,
}: {
  stages: string[];
  label: string;
}) => (
  <div className="flex h-full w-full flex-col justify-between bg-machine p-6 font-mono sm:p-8">
    <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">{label}</p>

    <ol className="flex flex-col gap-0" aria-label={`Stages: ${stages.join(", ")}`}>
      {stages.map((stage, i) => (
        <li key={stage} className="flex items-center gap-3">
          <div className="flex flex-col items-center self-stretch">
            <span
              aria-hidden
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                i === stages.length - 1 ? "bg-signal" : "bg-white/40"
              }`}
            />
            {i < stages.length - 1 && (
              <span aria-hidden className="w-px flex-1 bg-white/15" />
            )}
          </div>

          <span
            className={`py-2 text-xs tracking-wide sm:text-sm ${
              i === stages.length - 1 ? "text-signal" : "text-white/70"
            }`}
          >
            {stage}
          </span>
        </li>
      ))}
    </ol>

    <span aria-hidden className="text-[10px] uppercase tracking-[0.22em] text-white/20">
      {stages.length} stages
    </span>
  </div>
);

export default PipelineDiagram;
