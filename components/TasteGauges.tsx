import { tasteKeys, type Taste, type TasteKey } from "@/lib/types";

export default function TasteGauges({
  taste,
  labels,
}: {
  taste: Taste;
  labels: Record<TasteKey, string>;
}) {
  return (
    <dl className="taste">
      {tasteKeys.map((key) => (
        <div className="taste-row" key={key}>
          <dt>{labels[key]}</dt>
          <dd>
            <span className="ruler" role="img" aria-label={`${labels[key]}: ${taste[key]} out of 5`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <i key={n} className={n <= taste[key] ? "on" : ""} style={{ height: 8 + n * 3 }} />
              ))}
            </span>
            <span className="num" aria-hidden="true">
              {taste[key]}/5
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
