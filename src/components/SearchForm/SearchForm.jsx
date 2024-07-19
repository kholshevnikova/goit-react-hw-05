import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const query = form.elements.query.value.trim();

    if (query === "") {
      alert("Please enter a search term");
      return;
    }

    onSubmit(query);
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search movie"
        className={css.input}
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
