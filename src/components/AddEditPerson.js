import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PhonebookContext } from '../utils/PhonebookContext';

const AddEditPerson = ({ isOpen, onClose, editUser }) => {
  const { tableData, setTableData } = useContext(PhonebookContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    console.log(phone);

    if (editUser) {
      const result = tableData.map(el => {
        if (el.id === editUser.id) {
          return {
            ...el,
            firstName: firstName,
            lastName: lastName,
            company: company,
            phoneNumber: phone,
            notes: notes,
          };
        }
        return el;
      });

      setTableData(result);
    } else {
      const newPerson = {
        id: uuidv4(),
        firstName: firstName,
        lastName: lastName,
        company: company,
        phoneNumber: phone,
        notes: notes,
      };

      setTableData([...tableData, newPerson]);
    }

    // resetting the form
    setFirstName('');
    setLastName('');
    setCompany('');
    setPhone('');
    setNotes('');

    // closing the modal
    onClose();
  };

  useEffect(() => {
    if (editUser) {
      setFirstName(editUser.firstName);
      setLastName(editUser.lastName);
      setCompany(editUser.company);
      setPhone(editUser.phoneNumber);
      setNotes(editUser.notes);
    } else {
      setFirstName('');
      setLastName('');
      setCompany('');
      setPhone('');
      setNotes('');
    }
  }, [editUser]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editUser ? 'Edit Contact' : 'Add Contact'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="First Name"
              mb={4}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />

            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last Name"
              mb={4}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />

            <FormLabel>Company</FormLabel>
            <Input
              placeholder="Company"
              mb={4}
              value={company}
              onChange={e => setCompany(e.target.value)}
            />

            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="Phone Number"
              mb={4}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />

            <FormLabel>Notes</FormLabel>
            <Textarea
              placeholder="Notes"
              mb={4}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" type="submit" value="Submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEditPerson;
