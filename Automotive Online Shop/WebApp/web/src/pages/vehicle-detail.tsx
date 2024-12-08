import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { Divider, Center } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Box } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Stat, StatLabel, StatNumber, StatGroup } from '@chakra-ui/react'


const fetchVehiclesDetails = async () => axios.get(`http://localhost:8000/api/vehicles/details/MRHT53HXAKW856444`);

const VehicleDetail = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['VehiclesDetails'],
        queryFn: fetchVehiclesDetails,
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
        <div>
            <Grid
                h='400px'
                templateRows='repeat(4, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={1}
            >
                <GridItem colSpan={2} rowSpan={4} bg='gray'>
                    <Card variant='outline'>
                        <CardBody>
                            <Image boxSize='400px' src='http://surl.li/nnqad' />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={3} rowSpan={4} bg='papayawhip'>
                    <Card variant='filled'>
                        <CardHeader>
                            <Heading size='md'> {data.data.general_details.model_year}-{data.data.general_details.manufacturer}-{data.data.general_details.model_name}</Heading>
                        </CardHeader>
                        <CardBody>
                            <TableContainer>
                                <Table size='sm' variant="simple">
                                    <Tbody>
                                        <Tr>
                                            <Td>VIN</Td>
                                            <Td>{data.data.general_details.vin}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Manufacturer</Td>
                                            <Td>{data.data.general_details.manufacturer}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Model</Td>
                                            <Td>{data.data.general_details.model_name}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Year</Td>
                                            <Td>{data.data.general_details.model_year}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Type</Td>
                                            <Td>{data.data.general_details.type}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Color</Td>
                                            <Td>{data.data.general_details.color}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Fuel Type</Td>
                                            <Td>{data.data.general_details.fuel_type}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Mileage</Td>
                                            <Td>{data.data.general_details.mileage}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Description</Td>
                                            <Td>{data.data.general_details.description}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Sale Price</Td>
                                            <Td>{data.data.general_details.sale_price}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <Box as='button' borderRadius='4xlg' bg='tomato' color='white' px={8} h={12}>
                Sell
            </Box>
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <Box maxW='960px' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                <Center bg='gray' h='80px' color='white' fontSize='lg' fontWeight='bold'>
                    Cost Details (Clerk, managers, Owner)
                </Center>
                <Card variant='filled' size='sm'>
                    <CardBody>
                        <StatGroup size='lg'>
                            <Stat>
                                <StatLabel>Total of all parts costs</StatLabel>
                                <StatNumber>{data.data.parts_details.cost_total}</StatNumber>
                            </Stat>

                            <Stat>
                                <StatLabel>Original purchase price</StatLabel>
                                <StatNumber>{data.data.purchase_details.transaction_info.purchase_price}</StatNumber>
                            </Stat>
                        </StatGroup>
                        <Divider height='1px' bg='black' />
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Part#</Th>
                                        <Th>Status</Th>
                                        <Th>Description</Th>
                                        <Th>Cost</Th>
                                        <Th>Vendor</Th>
                                        <Th>Phone</Th>
                                        <Th>Address</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.data.parts_details.parts_list.map((todo: any) => (
                                        <Tr>
                                            <Td>{todo.part_number}</Td>
                                            <Td>{todo.state}</Td>
                                            <Td>{todo.description}</Td>
                                            <Td>{todo.cost}</Td>
                                            <Td>{todo.vendor_name}</Td>
                                            <Td>{todo.phone_number}</Td>
                                            <Td>{todo.street}, {todo.city}, {todo.state}, {todo.postal_code}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </Card>
            </Box>
            <Center height='25px'>
                <Divider orientation='vertical' />
            </Center>
            <Box maxW='960px' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                <Center bg='gray' h='80px' color='white' fontSize='lg' fontWeight='bold'>
                    Purchase Details (managers, Owner)
                </Center>
                <Grid
                    h='400px'
                    templateRows='repeat(4, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                    gap={4}
                >
                    <GridItem rowSpan={4} colSpan={2}>
                        <Card variant='outline' size='sm'>
                            <CardHeader>
                                <Heading size='md'>SELLER</Heading>
                            </CardHeader>
                            <CardBody>
                                <TableContainer>
                                    <Table size='sm' variant="simple">
                                        <Tbody>
                                            <Tr>
                                                <Td>First Name</Td>
                                                <Td>{data.data.purchase_details.seller_info.first_name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Last Name</Td>
                                                <Td>{data.data.purchase_details.seller_info.last_name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Title</Td>
                                                <Td>{data.data.purchase_details.seller_info.title}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Business Name</Td>
                                                <Td>{data.data.purchase_details.seller_info.business_name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Email</Td>
                                                <Td>{data.data.purchase_details.seller_info.email}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Phone Number</Td>
                                                <Td>{data.data.purchase_details.seller_info.phone_number}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Street</Td>
                                                <Td>{data.data.purchase_details.seller_info.street}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>City</Td>
                                                <Td>{data.data.purchase_details.seller_info.city}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>State</Td>
                                                <Td>{data.data.purchase_details.seller_info.state}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Postal Code</Td>
                                                <Td>{data.data.purchase_details.seller_info.postal_code}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem rowSpan={3} colSpan={3}>
                        <Card variant='outline' size='sm'>
                            <CardHeader>
                                <Heading size='md'> TRANSACTION</Heading>
                            </CardHeader>
                            <CardBody>
                                <TableContainer>
                                    <Table size='sm' variant="simple">
                                        <Tbody>
                                            <Tr>
                                                <Td>Purchase Date</Td>
                                                <Td>{data.data.purchase_details.transaction_info.purchase_date}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Purchase Price </Td>
                                                <Td>{data.data.purchase_details.transaction_info.purchase_price}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={3}>
                        <Card variant='outline' size='sm'>
                            <CardHeader>
                                <Heading size='md'>CLERK</Heading>
                            </CardHeader>
                            <CardBody>
                                <TableContainer>
                                    <Table size='sm' variant="simple">
                                        <Tbody>
                                            <Tr>
                                                <Td>First Name</Td>
                                                <Td>{data.data.purchase_details.clerk_info.first_name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Last Name</Td>
                                                <Td>{data.data.purchase_details.clerk_info.last_name}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    </Grid>
            </Box>
            <Center height='25px'>
                <Divider orientation='vertical' />
            </Center>
            <Box maxW='960px' borderWidth='2px' borderRadius='lg' overflow='hidden'>
                <Center bg='gray' h='80px' color='white' fontSize='lg' fontWeight='bold'>
                    Sale Details (managers, Owner)
                </Center>
                <Grid
                    h='400px'
                    templateRows='repeat(4, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                    gap={4}
                >
                    <GridItem rowSpan={4} colSpan={2}>
                        <Card variant='outline' size='sm'>
                            <CardHeader>
                                <Heading size='lg'>BUYER</Heading>
                            </CardHeader>
                            <CardBody>
                                <TableContainer>
                                    <Table size='sm' variant="simple">
                                        <Tbody>
                                            <Tr>
                                                <Td>First Name</Td>
                                                <Td>{data.data.sale_details.buyer_info.first_name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Last Name</Td>
                                                <Td>{data.data.sale_details.buyer_info.last_name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Title</Td>
                                                <Td>{data.data.sale_details.buyer_info.title}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Business Name</Td>
                                                <Td>{data.data.sale_details.buyer_info.business_name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Email</Td>
                                                <Td>{data.data.sale_details.buyer_info.email}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Phone Number</Td>
                                                <Td>{data.data.sale_details.buyer_info.phone_number}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Street</Td>
                                                <Td>{data.data.sale_details.buyer_info.street}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>City</Td>
                                                <Td>{data.data.sale_details.buyer_info.city}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>State</Td>
                                                <Td>{data.data.sale_details.buyer_info.state}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Postal Code</Td>
                                                <Td>{data.data.sale_details.buyer_info.postal_code}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem rowSpan={3} colSpan={3}>
                        <Card variant='outline' size='sm'>
                            <CardHeader>
                                <Heading size='lg'> TRANSACTION</Heading>
                            </CardHeader>
                            <CardBody>
                                <TableContainer>
                                    <Table size='sm' variant="simple">
                                        <Tbody>
                                            <Tr>
                                                <Td>Sale Date</Td>
                                                <Td>{data.data.sale_details.salesman_info.sale_date}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={3}>
                        <Card variant='outline' size='sm'>
                            <CardHeader>
                                <Heading size='lg'>SALESPERSON</Heading>
                            </CardHeader>
                            <CardBody>
                                <TableContainer>
                                    <Table size='sm' variant="simple">
                                        <Tbody>
                                            <Tr>
                                                <Td>First Name</Td>
                                                <Td>{data.data.sale_details.salesman_info.first_name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Last Name</Td>
                                                <Td>{data.data.sale_details.salesman_info.last_name}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
};

export default VehicleDetail;
