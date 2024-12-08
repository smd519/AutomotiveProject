import map from 'lodash/map';
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';
import {
  addVehicleLabel,
  colorLabel,
  conditionLabel,
  descriptionLabel,
  fuelTypeLabel,
  manufacturerLabel,
  mileageLabel,
  modelNameLabel,
  modelYearLabel,
  vehicleTypeLabel,
  vinLabel,
} from 'src/content.json';
import SelectAutoComplete from 'src/modules/FormComponents/SelectAutoComplete';
import Input from 'src/modules/FormComponents/Input';
import { COLOR, CONDITION, FUEL_TYPE, MANUFACTURERS, VEHICLE_TYPE } from 'src/constants';

// TODO: make sure this follows all requirements
type AddVehicleType = {
  onSubmit: (body: any) => void;
};

const AddVehicle = ({ onSubmit }: AddVehicleType) => {
  const { handleSubmit, register, control } = useForm();

  return (
    <form
      onSubmit={handleSubmit((values) => {
        const { color, condition, fuel_type, manufacturer, type, ...rest } = values;

        onSubmit({
          ...rest,
          color: map(color, 'value'),
          condition: condition?.value,
          fuel_type: fuel_type?.value,
          manufacturer: manufacturer?.value,
          type: type?.value,
        });
      })}
    >
      <Input label={vinLabel} isRequired registration={register('vin')} />
      <Input label={modelNameLabel} isRequired registration={register('model_name')} />
      <SelectAutoComplete
        label={manufacturerLabel}
        isRequired
        control={control}
        name="manufacturer"
        options={MANUFACTURERS}
      />
      <Input
        label={modelYearLabel}
        type="number"
        isRequired
        registration={register('model_year')}
      />
      <SelectAutoComplete
        label={fuelTypeLabel}
        isRequired
        control={control}
        name="fuel_type"
        options={FUEL_TYPE}
      />
      <Input label={mileageLabel} type="number" isRequired registration={register('mileage')} />
      <SelectAutoComplete
        label={colorLabel}
        isRequired
        control={control}
        name="color"
        options={COLOR}
        isMulti
      />
      {/* note: description is an optional field */}
      <Input label={descriptionLabel} registration={register('description')} />
      <SelectAutoComplete
        label={conditionLabel}
        isRequired
        control={control}
        name="condition"
        options={CONDITION}
      />
      <SelectAutoComplete
        label={vehicleTypeLabel}
        isRequired
        control={control}
        name="type"
        options={VEHICLE_TYPE}
      />
      <Button width="full" my={6} type="submit">
        {addVehicleLabel}
      </Button>
    </form>
  );
};

export default AddVehicle;
