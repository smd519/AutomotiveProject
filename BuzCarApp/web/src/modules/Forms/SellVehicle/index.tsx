import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';
import Input from 'src/modules/FormComponents/Input';
import {sellVehicleLabel,saleDateLabel,vinLabel} from 'src/content.json';

// TODO: make sure this follows all requirements
type SellVehicleType = {
  onSubmit: (body: any) => void;
};

const SellVehicle = ({ onSubmit }: SellVehicleType) => {
    const { handleSubmit, register, control } = useForm();

    return (
        <form
            onSubmit={handleSubmit((values) => {
                onSubmit(values);
            })}
        >
            <Input label={vinLabel} isRequired registration={register('vin')} />
            <Input label={saleDateLabel} type="date" isRequired registration={register('sale_date')} />
            <Button width="full" my={6} type="submit">
                {sellVehicleLabel}
            </Button>
        </form>
  );
};

export default SellVehicle;
