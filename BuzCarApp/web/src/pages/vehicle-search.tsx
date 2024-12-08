// Example of button that opens a modal with a form that adds a vehicle

import { useDisclosure, Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { addVehicle } from 'src/axios';
import Modal from 'src/modules/Modal';
import AddVehicleForm from 'src/modules/Forms/AddVehicle';
import { useUserData } from 'src/contexts/UserData';
import { addVehicleLabel } from 'src/content.json';
import { CLERK_ALLOWED_ACTIONS } from 'src/constants';

type AddVehicleProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen?: boolean;
  allowedActions: string[];
};
// TODO: add inputs to match comment, move to content, move to modules/forms, submit with react query,  validations,
const AddVehicle = ({ isOpen, onOpen, onClose, allowedActions }: AddVehicleProps) => {
  // Docs: https://tanstack.com/query/latest/docs/react/guides/mutations
  const { mutate, isSuccess, isError, error } = useMutation({
    mutationFn: addVehicle,
  });
  console.log('addVehicle', { isSuccess, isError, error });
  return (
    <>
      {allowedActions.includes(CLERK_ALLOWED_ACTIONS.ADD_VEHICLE) && (
        <Button onClick={onOpen}>{addVehicleLabel}</Button>
      )}
      <Modal id="add-vehicle-modal" isOpen={isOpen} onClose={onClose} header={addVehicleLabel}>
        <AddVehicleForm onSubmit={mutate} />
      </Modal>
    </>
  );
};

const VehicleSearch = () => {
  const { user } = useUserData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { allowedActions } = user || {};

  allowedActions.push('ADD_VEHICLE'); //TODO: remove this dummy val once user endpoints ready
  console.log({ allowedActions });
  return (
    <>
      <AddVehicle {...{ isOpen, onOpen, onClose, allowedActions }} />
      <p>
        vehicle search page!!! for diff functionality here besides the main search, modal or
        accordian would be easiest imo
      </p>
    </>
  );
};

export default VehicleSearch;
