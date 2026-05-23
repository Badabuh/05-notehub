import css from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={css.wrapper} role="status" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <p className={css.text}>Loading notes...</p>
    </div>
  );
}
