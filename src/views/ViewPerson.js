import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PhonebookContext } from '../utils/PhonebookContext';

const ViewPerson = () => {
  const { tableData } = useContext(PhonebookContext);
  let params = useParams();

  const foundUser = tableData.filter(el => el.id === params.id)[0];

  return (
    <Box m={4} p={6} borderWidth="1px" borderRadius="lg" maxW="sm">
      {foundUser ? (
        <>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
          >
            Name
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {foundUser.firstName + ' ' + foundUser.lastName}
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            mt={4}
          >
            Company
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {foundUser.company}
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            mt={4}
          >
            Phone Number
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {foundUser.phoneNumber}
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            mt={4}
          >
            Notes
          </Box>

          <Box mt="1" as="h4" lineHeight="tight">
            {foundUser.notes.length === 0 ? '-' : foundUser.notes}
          </Box>
        </>
      ) : (
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          No user found
        </Box>
      )}
    </Box>
  );
};

export default ViewPerson;
