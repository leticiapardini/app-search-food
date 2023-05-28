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
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { ApiService } from "../service/api";

const apiService = new ApiService();
type array = {
  day: string
  start_time: string
}
const schemaFormTimes = yup.object().shape({
  start_time: yup.string().required("Horario é obrigatório"),
  end_time: yup.string().required("Horario é obrigatório"),
  interval: yup.string().required("Intervalo é obrigatório"),
  start_time_interval: yup.string(),
  end_time_interval: yup.string(),
});

export function ModalTimes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [days, setDays] = useState([
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabádo",
    "Domingo",
  ])
  const [daysSelect, setDaysSelect] = useState<string[]>([])
  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(false)
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const dayWeeks = new Map();
  dayWeeks.set("Segunda-feira" , 1) 
  dayWeeks.set("Terça-feira" , 2)
  dayWeeks.set("Quarta-feira" , 3)
  dayWeeks.set("Quinta-feira" , 4)
  dayWeeks.set("Sexta-feira" , 5)
  dayWeeks.set("Sabádo" , 6)
  dayWeeks.set("Domingo" , 7)      
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaFormTimes),
  });


  const handleSubmitTimes: SubmitHandler<FieldValues> = async (response) => {
    try {
      console.log(response);
      console.log(dayWeeks.get(response.day))
      setDays((prevTimes) => prevTimes.filter((day) => day !== response.day))
      
      // if(response.day === "Segunda-feira") {
      //   console.log('if', monday)
      //   setMonday(true)
      //   //setDaysSelect(...daysSelect, response.day)
       

      // }
      // if(response.day === "Terça-Feira") {
      //   console.log('if', monday)
      //   setTuesday(true)
      //   //setDaysSelect(...daysSelect, response.day)
      //   setDays((prevTimes) => prevTimes.filter((day) => day !== response.day))

      // }
      // const data = await apiService.createRestaurant({

      // });
      // if (data) {
      //   toast({
      //     title: "Mensagem.",
      //     description:
      //       "Seu restaurante foi Criado com sucesso!!. Lembre-se de guardar sua senha, vc precisará dela para fazer outras modificações",
      //     status: "success",
      //     duration: 4000,
      //     isClosable: true,
      //   });
      //   reset({
      //     password: "",
      //     name: "",
      //     number: "",
      //     street: "",
      //     cellphone: "",
      //     city: "",
      //     type: "",
      //     link: "",
      //     midias: "",
      //   });
      // }else {
      //   toast({
      //     title: "Mensagem.",
      //     description: "Não foi possivel cadastrar seu restaurante, verifique os dados.",
      //     status: "error",
      //     duration: 2000,
      //     isClosable: true,
      //   });
      // }
    } catch (error) {
      toast({
        title: "Mensagem.",
        description:
          "Não foi possivel cadastrar seu restaurante, verifique os dados.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const CustonFormTimes = () => {
    return (
      <>
      <form onSubmit={handleSubmit(handleSubmitTimes)}>
      <HStack>
      <Box>
        <FormControl id="day">
          <FormLabel>Dia da Semana</FormLabel>
          <Select id="day" {...register("day")}>
            {
              days.map((day) => {
                return (
                  
                  <option>{day}</option>
                )
              })
            }
          </Select>
          <div style={{ color: "red" }}>
            {errors.interval?.message?.toString()}
          </div>
        </FormControl>
      </Box>
      <Box>
        <FormControl id="start_time">
          <FormLabel>Horario de Abertura</FormLabel>
          <Input
            {...register("start_time")}
            name="start_time"
            id='start_time'
            type="time"
            min="07:00" max="00:00" 
          />
          <div style={{ color: "red" }}>
            {errors.start_time?.message?.toString()}
          </div>
        </FormControl>
      </Box>
      <Box>
        <FormControl id="end_time">
          <FormLabel>Horario de Fechamento</FormLabel>
          <Input
            {...register("end_time")}
            id="end_time"
            name="end_time"
            type="time"
          />
          <div style={{ color: "red" }}>
            {errors.end_time?.message?.toString()}
          </div>
        </FormControl>
      </Box>

      <Box>
        <FormControl id="interval">
          <FormLabel>Tem pausa no expediente?</FormLabel>
          <Select id="interval" {...register("interval")}>
            <option>Não</option>
            <option>Sim</option>
          </Select>
          <div style={{ color: "red" }}>
            {errors.interval?.message?.toString()}
          </div>
        </FormControl>
      </Box>
      <Box>
        <FormControl id="start_time_interval">
          <FormLabel>Horario de Inicio de Pausa</FormLabel>
          <Input
            id="start_time_interval"
            {...register("start_time_interval")}
            type="time"
          />
          <div style={{ color: "red" }}>
            {errors.start_time_interval?.message?.toString()}
          </div>
        </FormControl>
      </Box>

      <Box>
        <FormControl id="end_time_interval">
          <FormLabel>Horario de Final da Pausa</FormLabel>
          <Input
            id="end_time_interval"
            {...register("end_time_interval")}
            type="time"
          />
          <div style={{ color: "red" }}>
            {errors.end_time_interval?.message?.toString()}
          </div>
        </FormControl>
      </Box>
    </HStack>
    <Button  type="submit" colorScheme="blue" mr={3}>
      {`Cadastrar Horario`}
      </Button>
    <Divider margin={"10px"} orientation="horizontal" />
    </form>
   </>
    )
  }
  return (
    <>
      <Button onClick={onOpen}>clique aqui</Button>
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
              <CustonFormTimes/>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Ok
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  );
}
