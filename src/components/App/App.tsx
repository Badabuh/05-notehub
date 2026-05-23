import css from "./App.module.css";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import {
  useNotes,
  useCreateNote,
  useDeleteNote,
} from "../../services/noteService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import NoteList from "../NoteList/NoteList";
import type { CreateNotePayload } from "../../types/note";

const NOTES_PER_PAGE = 12;

export default function App() {
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useNotes({
    search: text,
    page: currentPage,
    perPage: NOTES_PER_PAGE,
  });
  const pageCount = Math.max(data?.totalPages ?? 0, 1);

  const debouncedSetText = useDebouncedCallback(setText, 300);
  const createNoteMutation = useCreateNote();
  const deleteNoteMutation = useDeleteNote();

  const handleCreateNote = (values: CreateNotePayload) => {
    createNoteMutation.mutate(values, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  const handleSearchChange = (value: string) => {
    debouncedSetText(value);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox setState={handleSearchChange} />
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isLoading && !isError && (
        <NoteList notes={data?.notes ?? []} onDelete={handleDeleteNote} />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onSubmit={handleCreateNote} />
      </Modal>
    </div>
  );
}
