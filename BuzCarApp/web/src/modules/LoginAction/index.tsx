import { Button, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { LockIcon } from '@chakra-ui/icons';
import { login } from 'src/axios';
import Modal from 'src/modules/Modal';
import LoginForm from 'src/modules/Forms/Login';
import { loginLabel } from 'src/content.json';
import { useUserData } from 'src/contexts/UserData';

const LoginAction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUserData();
  const { mutate, isSuccess, isError, error, data } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('login call result', data);
      // setUser(
    },
  });
  console.log('login', { isSuccess, isError, error, data });
  console.log('user data from hook', user);
  //TODO: after log in form is implemented, call setUser from useUserData with appropriate vals upon log in/out
  // Then we can grab firstName, lastName, role, allowedActions from anywhere in the app and write logic like:
  // if (allowedActions.includes(SOME_ACTION)) { do/show something}
  // TODO: Also, if user is logged in, render username and log out button instead of login button
  return (
    <>
      <Button
        variant={'solid'}
        colorScheme={'teal'}
        size={'sm'}
        mr={4}
        leftIcon={<LockIcon />}
        onClick={onOpen}
      >
        {loginLabel}
      </Button>
      <Modal id="login-modal" isOpen={isOpen} onClose={onClose} header={loginLabel}>
        <LoginForm onSubmit={mutate} />
      </Modal>
    </>
  );
};

export default LoginAction;
