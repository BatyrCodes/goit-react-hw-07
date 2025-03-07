import React from "react";
import styles from "./ContactForm.module.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const initialValues = { name: "", number: "" };
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("This field is required."),
    number: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Format: XXX-XX-XX")
      .required("This field is required."),
  });

  const onSubmit = (values, options) => {
    const { name, number } = values;

    const isDuplicate = contacts.some(
      (contact) => contact.name === name || contact.number === number
    );

    if (isDuplicate) {
      alert("A contact with that name or number already exists.");
      return;
    }

    dispatch(addContact({ name, number }));
    options.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Phone Book</h2>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              className={styles.formInput}
              placeholder="Name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorText}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="number" className={styles.formLabel}>
              Number
            </label>
            <Field
              id="number"
              name="number"
              type="text"
              className={styles.formInput}
              placeholder="Format: XXX-XX-XX"
            />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.errorText}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
