import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

const fetchPartsStatistics = async () =>
  axios.get(`http://localhost:8000/api/report/price-per-condition`);

const PricePerCondition = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['PricePerCondition'],
    queryFn: fetchPartsStatistics,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data) {
      console.log('data ', data);
  }
  // We can assume by this point that `isSuccess === true`
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textColor={'blue'}>Price Per Condition Report</Th>
          </Tr>
          <Tr>
            <Th>Vehicle Type</Th>
            <Th>Excellent</Th>
            <Th>Very Good</Th>
            <Th>Good</Th>
            <Th>Fair</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((todo: any) => (
            <Tr>
              <Td>{todo.vehicle_type}</Td>
              <Td>{todo.excellent}</Td>
              <Td>{todo.very_good}</Td>
              <Td>{todo.good}</Td>
              <Td>{todo.fair}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PricePerCondition;
