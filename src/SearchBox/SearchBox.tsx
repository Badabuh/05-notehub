import css from "./SearchBox.module.css";

export default function SearchBox({
  setState,
}: {
  setState: (value: string) => void;
}) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e) => setState(e.target.value)}
    />
  );
}
