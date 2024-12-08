import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

const fetchPartsStatistics = async () =>
  axios.get(`http://localhost:8000/api/report/parts-statistics`);

const PartsStatistics = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['PartsStatistics'],
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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textColor={'blue'}>Parts Statistics Report</Th>
          </Tr>
          <Tr>
            <Th>Vendor Name</Th>
            <Th>Total Parts</Th>
            <Th>Total Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((todo: any) => (
            <Tr>
              <Td>{todo.vendor_name}</Td>
              <Td>{todo.total_parts}</Td>
              <Td>{todo.total_cost}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PartsStatistics;
