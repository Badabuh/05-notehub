import css from "./App.module.css";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData } from "@tanstack/react-query";

const NOTES_PER_PAGE = 12;

export default function App() {
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "notes",
      { search: text, page: currentPage, perPage: NOTES_PER_PAGE },
    ],
    queryFn: () =>
      fetchNotes({ search: text, page: currentPage, perPage: NOTES_PER_PAGE }),
    placeholderData: keepPreviousData,
  });
  const pageCount = Math.max(data?.totalPages ?? 0, 1);

  const debouncedSetText = useDebouncedCallback(setText, 300);

  const handleSearchChange = (value: string) => {
    debouncedSetText(value);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        {data && typeof data.totalPages === "number" && data.totalPages > 1 && (
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isLoading && !isError && <NoteList notes={data?.notes ?? []} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
