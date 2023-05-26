import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useColorModeValue,
Divider 
} from "@chakra-ui/react";
import { useRef } from "react";

export function ModalTimes() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const daysWeeks = ["Segunda-Feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira",
  "Sabádo", "Domingo"]
  return (
    <>
      <Button color={"#f4f4f4"} onClick={onOpen}>
        Formulário
      </Button>
      <Modal
        size={'6xl'}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
          {
            daysWeeks.map((day) => {
              return (
                <>
                <HStack key={day}>
                <Box width={'15%'}>
                  <FormControl ref={initialRef} id="firstName" isRequired>
                    <FormLabel>{day}</FormLabel>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Horario de Abertura</FormLabel>
                    <Input type="time" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Horario de Fechamento</FormLabel>
                    <Input type="time" />
                  </FormControl>
                </Box>
  
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Tem pausa no expediente?</FormLabel>
                    <Input type="checkbox" checked />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Horario de Inicio de Pausa</FormLabel>
                    <Input type="time" />
                  </FormControl>
                </Box>
  
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Horario de Final da Pausa</FormLabel>
                    <Input type="time" />
                  </FormControl>
                 
                </Box>
               
              </HStack>
               <Divider margin={'10px'} orientation='horizontal' />
               </>
              )
            })
          }
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
