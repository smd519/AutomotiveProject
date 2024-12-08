import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

const fetchSellerHistory = async () => axios.get(`http://localhost:8000/api/report/seller-history`);

const SellerHistory = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['SellerHistory'],
    queryFn: fetchSellerHistory,
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
            <Th textColor={'blue'}>Seller History</Th>
          </Tr>
          <Tr>
            <Th>Customer Name</Th>
            <Th>Number of Vehicles Sold</Th>
            <Th>Average Purchase Price</Th>
            <Th>Average Number of Parts</Th>
            <Th>Average Cost of Parts</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((todo: any) => (
            <Tr
              {...(parseInt(todo.avg_parts_cost) >= 500 || parseInt(todo.avg_quantity) >= 5
                ? { bg: 'red' }
                : {})}
            >
              <Td>{todo.customer_name}</Td>
              <Td>{todo.vehicles_sold}</Td>
              <Td>{todo.avg_purchase_price}</Td>
              <Td>{todo.avg_quantity}</Td>
              <Td>{todo.avg_parts_cost}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SellerHistory;
