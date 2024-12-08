import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';
import { loginLabel, usernameLabel, passwordLabel } from 'src/content.json';
import Input from 'src/modules/FormComponents/Input';

type LoginType = {
  onSubmit: (body: any) => void;
};

const Login = ({ onSubmit }: LoginType) => {
  const { register, handleSubmit } = useForm();
  return (
    <form
      onSubmit={handleSubmit((values) => {
        onSubmit(values);
      })}
    >
      <Input label={usernameLabel} isRequired registration={register('username')} />
      <Input label={passwordLabel} type="password" isRequired registration={register('password')} />
      <Button width="full" my={6} type="submit">
        {loginLabel}
      </Button>
    </form>
  );
};
export default Login;
