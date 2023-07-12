import {
  MainContainer,
  FormContainer,
  ContactsContainer,
  Title,
  TitleContacts,
} from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { getError, getIsLoading } from 'redux/selectors';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/contactslist';
import Filter from './Filter/Filter';
import Loader from './Loader/Loader';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <MainContainer>
      <FormContainer>
        <Title>Phonebook</Title>
        <ContactForm />
      </FormContainer>
      <ContactsContainer>
        <TitleContacts>Contacts</TitleContacts>
        <Filter />
        <ContactsList />
        {isLoading && !error && <Loader />}
      </ContactsContainer>
    </MainContainer>
  );
}
