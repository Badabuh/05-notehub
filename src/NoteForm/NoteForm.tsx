import css from "./NoteForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { NOTE_TAGS } from "../types/note";
import type { CreateNotePayload, NoteTag } from "../types/note";

interface NoteFormValues {
  title: string;
  content: string;
  tag: "" | NoteTag;
}

const noteValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(
      [...NOTE_TAGS],
      "Tag must be one of: Todo, Work, Personal, Meeting, Shopping",
    )
    .required("Tag is required"),
});

interface NoteFormProps {
  onSubmit: (values: CreateNotePayload) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  return (
    <Formik<NoteFormValues>
      initialValues={{ title: "", content: "", tag: "" }}
      validationSchema={noteValidationSchema}
      onSubmit={({ title, content, tag }) => {
        onSubmit({ title, content, tag: tag as NoteTag });
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field name="title" id="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            name="content"
            id="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="">Select tag</option>
            {NOTE_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>
        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
