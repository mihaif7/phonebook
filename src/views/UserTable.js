import {
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  chakra,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useMemo, useState, useRef } from 'react';
import { useSortBy, useTable } from 'react-table';
import { PhonebookContext } from '../utils/PhonebookContext';
import { useNavigate } from 'react-router-dom';
import AddEditPerson from '../components/AddEditPerson';
import DeleteAlert from '../components/DeleteAlert';

const UserTable = () => {
  const { tableData } = useContext(PhonebookContext);
  
  const [searchVal, setSearchVal] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [editUser, setEditUser] = useState('');
  const [deleteId, setDeleteId] = useState('');
  
  // edit modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // delete modal
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const cancelRef = useRef();
  const navigate = useNavigate();

  // companies filter
  const companies = useMemo(
    () => [...new Set(tableData.map(data => data.company))],
    [tableData]
  );

  // table data
  const data = useMemo(
    () =>
      tableData.filter(data => {
        return (
          (data.firstName
            .toLocaleLowerCase()
            .includes(searchVal.toLocaleLowerCase()) ||
            data.lastName
              .toLocaleLowerCase()
              .includes(searchVal.toLocaleLowerCase())) &&
          (filterCompany !== '' ? data.company === filterCompany : true)
        );
      }),
    [tableData, searchVal, filterCompany]
  );

  // table columns 
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Company',
        accessor: 'company',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        disableSortBy: true,
      },
      {
        Header: 'Notes',
        accessor: 'notes',
        disableSortBy: true,
      },
      {
        Header: 'Action',
        accessor: 'buttons',
        disableSortBy: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const handleCompanyFilter = event => {
    setFilterCompany(event.target.value);
  };

  const edit = user => {
    setEditUser(user);
    onOpen();
  };

  const removePerson = id => {
    setDeleteId(id);
    onOpenDelete();
    // setTableData(tableData.filter(person => person.id !== id));
  };

  return (
    <>
      <Box m={4}>
        <Flex>
          <Input
            placeholder="Search"
            onChange={e => setSearchVal(e.target.value)}
            mr={4}
          />

          <Select
            placeholder="Filter by Company"
            onChange={handleCompanyFilter}
          >
            {companies.map(company => {
              return (
                <option value={company} key={company}>
                  {company}
                </option>
              );
            })}
          </Select>
        </Flex>

        <Box
          borderRadius="xl"
          border="1px"
          borderColor="gray.200"
          p={4}
          mt={4}
          overflowY="auto"
        >
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map(headerGroup => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      isNumeric={column.isNumeric}
                    >
                      {column.render('Header')}
                      <chakra.span pl="4">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <Td
                          {...cell.getCellProps()}
                          isNumeric={cell.column.isNumeric}
                        >
                          {cell.column.id === 'buttons' ? (
                            <Flex justifyContent="end">
                              <Button
                                mr={2}
                                onClick={() =>
                                  navigate(`details/${row.original.id}`)
                                }
                              >
                                <ViewIcon />
                              </Button>
                              <Button
                                mr={2}
                                colorScheme="yellow"
                                onClick={() => edit(row.original)}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                mr={2}
                                colorScheme="red"
                                onClick={() => removePerson(row.original.id)}
                              >
                                <DeleteIcon />
                              </Button>
                            </Flex>
                          ) : (
                            cell.render('Cell')
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <AddEditPerson isOpen={isOpen} onClose={onClose} editUser={editUser} />
      <DeleteAlert
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        cancelRef={cancelRef}
        deleteId={deleteId}
      />
    </>
  );
};

export default UserTable;
