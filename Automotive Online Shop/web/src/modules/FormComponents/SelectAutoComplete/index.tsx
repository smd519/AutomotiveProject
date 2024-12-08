import map from 'lodash/map';
import { Select } from 'chakra-react-select';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

type SelectAutoCompleteProps = {
  control: any;
  name: string;
  label: string;
  options: any; // TODO: add type
  isRequired?: boolean;
  isMulti?: boolean;
};
const SelectAutoComplete = ({
  isRequired,
  control,
  name,
  label,
  options = [],
  isMulti = false,
}: SelectAutoCompleteProps) => {
  const resolvedOptions =
    typeof options[0] === 'string' ? map(options, (v) => ({ label: v, value: v })) : options;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormControl isRequired={isRequired}>
          <FormLabel>{label}</FormLabel>
          <Select {...field} isMulti={isMulti} options={resolvedOptions} />
        </FormControl>
      )}
    />
  );
};
export default SelectAutoComplete;
