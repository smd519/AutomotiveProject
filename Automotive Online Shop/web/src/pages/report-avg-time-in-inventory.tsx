import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

const fetchAvgTimeInInventory = async () =>
  axios.get(`http://localhost:8000/api/report/avg-time-in-inventory`);

const AvgTimeInInventory = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['AvgTimeInInventory'],
    queryFn: fetchAvgTimeInInventory,
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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textColor={'blue'}>Average Time In Inventory</Th>
          </Tr>
          <Tr>
            <Th>Vehicle Type</Th>
            <Th>Average Days</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((todo: any) => (
            <Tr>
              <Td>{todo.vehicle_type}</Td>
              <Td>{todo.average_days}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AvgTimeInInventory;
