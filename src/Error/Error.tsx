import css from "./Error.module.css";

interface ErrorProps {
  message?: string;
}

export default function Error({
  message = "Failed to load notes. Check token and restart dev server.",
}: ErrorProps) {
  return (
    <div className={css.wrapper} role="alert" aria-live="assertive">
      <p className={css.title}>Something went wrong</p>
      <p className={css.message}>{message}</p>
    </div>
  );
}
