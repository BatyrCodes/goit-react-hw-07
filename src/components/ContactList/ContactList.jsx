import { useDispatch, useSelector } from "react-redux";
import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { deleteContact } from "../../redux/contactsOps";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const delContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
          delContact={delContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;
