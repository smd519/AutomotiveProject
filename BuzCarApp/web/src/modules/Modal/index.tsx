import {
  // ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

// interface ModalBaseProps extends ModalProps {
type ModalBaseProps = {
  children: React.ReactNode;
  header?: string;
  onClose: () => void;
  isOpen?: boolean;
  id: string;
};

const ModalBase = ({ id, isOpen = false, onClose, header, children }: ModalBaseProps) => {
  return (
    <Modal {...{ id, isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalBase;
