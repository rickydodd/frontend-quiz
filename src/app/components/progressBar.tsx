export default function ProgressBar(props: {
  max: number;
  now: number;
  outerBarClassName: string;
  innerBarClassName: string;
}) {
  const { now, max, outerBarClassName, innerBarClassName } = props;
  const percentage = (now / max) * 100;
  const progressBarStyle = {
    width: `${percentage}%`,
  };
  return (
    <div
      role="progressbar"
      aria-valuenow={now}
      aria-valuemax={max}
      className={`${outerBarClassName} overflow-hidden rounded-xl`}
    >
      <div
        aria-hidden
        style={progressBarStyle}
        className={`${innerBarClassName} h-full w-full rounded-xl`}
      ></div>
    </div>
  );
}
