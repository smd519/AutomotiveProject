import { Container } from '@chakra-ui/react';
import NavBar from 'src/modules/NavBar';
import LoginAction from 'src/modules/LoginAction';
import { PAGES } from './constants';
import {
  vehicleSeachLabel,
  buzzCarsLabel,
  averageTimeInInventoryLabel,
  pricePerConditionLabel,
  partsStatisticsLabel,
  monthlySalesLabel,
  sellerHistoryLabel,
} from './content.json';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  //TODO: use useUserData to conditionally show nav links
  return (
    <>
      <NavBar
        logo={buzzCarsLabel}
        links={[{ to: PAGES.VEHICLE_SEARCH, label: vehicleSeachLabel }]}
        action={<LoginAction />}
        menuItems={[
          { to: PAGES.REPORT_PARTS_STATISTICS, label: partsStatisticsLabel },
          { to: PAGES.REPORT_PRICE_PER_CONDITION, label: pricePerConditionLabel },
          { to: PAGES.REPORT_AVG_TIME_IN_INVENTORY, label: averageTimeInInventoryLabel },
          { to: PAGES.REPORT_SELLER_HISTORY, label: sellerHistoryLabel },
          { to: PAGES.REPORT_MONTHLY_SALES, label: monthlySalesLabel },
        ]}
      />
      <Container maxW="container.xl" p={16}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
