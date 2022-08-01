import { SmallAddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Spacer,
  theme,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import AddEditPerson from './components/AddEditPerson';
import { PhonebookContext } from './utils/PhonebookContext';

function App() {
  const [tableData, setTableData] = useState([
    {
      id: uuidv4(),
      firstName: 'Mihai',
      lastName: 'Fizedean',
      company: 'SnapJump SRL',
      phoneNumber: '0735539994',
      notes: 'Smart',
    },
    {
      id: uuidv4(),
      firstName: 'Radu',
      lastName: 'Fizedean',
      company: 'Uni Wien',
      phoneNumber: '0735539993',
      notes: 'Not Smart',
    },
    {
      id: uuidv4(),
      firstName: 'Marcel',
      lastName: 'Grigorescu',
      company: 'SnapJump SRL',
      phoneNumber: '0735539994',
      notes: 'CEO',
    },
    {
      id: uuidv4(),
      firstName: 'Raul',
      lastName: 'Lile',
      company: 'Uni Wien',
      phoneNumber: '0735539993',
      notes: 'Student',
    },
    {
      id: uuidv4(),
      firstName: 'Razavan',
      lastName: 'Popescu',
      company: 'SnapJump SRL',
      phoneNumber: '0735539994',
      notes: 'CFO',
    },
    {
      id: uuidv4(),
      firstName: 'Vasilescu',
      lastName: 'George',
      company: 'Uni Wien',
      phoneNumber: '0735539993',
      notes: '',
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  return (
    <ChakraProvider theme={theme}>
      <Box d="flex" minH="100vh" flexDirection="column">
        <Flex p="4" minWidth="max-content" justifyContent={'space-between'}>
          <Button onClick={() => navigate('/')} variant="ghost" mr={4}>
            Phonebook
          </Button>
          <Button onClick={onOpen}>
            Add Person
            <SmallAddIcon ml={1} />
          </Button>
          <Spacer />
          <ColorModeSwitcher />
        </Flex>

        <PhonebookContext.Provider value={{ tableData, setTableData }}>
          <Outlet />
          <AddEditPerson isOpen={isOpen} onClose={onClose} />
        </PhonebookContext.Provider>
      </Box>
    </ChakraProvider>
  );
}

export default App;
