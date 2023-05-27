import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Divider,
  Select,
} from "@chakra-ui/react";
import { useRef } from "react";

export function ModalTimes() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const daysWeeks = [
    "Segunda-Feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabádo",
    "Domingo",
  ];
  return (
    <>
      <Button onClick={onOpen}>
        clique aqui
      </Button>
      <Modal
        size={"6xl"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {daysWeeks.map((day) => {
              return (
                <div key={day}>
                  <HStack>
                    <Box width={"15%"}>
                      <FormControl ref={initialRef} id="day" isRequired>
                        <FormLabel>{day}</FormLabel>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="firstTime">
                        <FormLabel>Horario de Abertura</FormLabel>
                        <Input type="time" />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastTime">
                        <FormLabel>Horario de Fechamento</FormLabel>
                        <Input type="time" />
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl id="stop">
                        <FormLabel>Tem pausa no expediente?</FormLabel>
                        <Select>
                          <option>Não</option>
                          <option>Sim</option>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="firstTimeStop">
                        <FormLabel>Horario de Inicio de Pausa</FormLabel>
                        <Input type="time" />
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl id="lastTimeStop">
                        <FormLabel>Horario de Final da Pausa</FormLabel>
                        <Input type="time" />
                      </FormControl>
                    </Box>
                  </HStack>
                  <Divider margin={"10px"} orientation="horizontal" />
                </div>
              );
            })}
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
