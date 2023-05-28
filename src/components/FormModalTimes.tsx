import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
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
import "../styles/FormModalTimes.css";

const apiService = new ApiService();

const schemaFormTimes = yup.object().shape({
  start_time: yup.string().required("Horario é obrigatório"),
  end_time: yup.string().required("Horario é obrigatório"),
  interval: yup.string().required("Intervalo é obrigatório"),
  start_time_interval: yup.string(),
  end_time_interval: yup.string(),
});

export function ModalTimes({ id }: { id: string | undefined }) {
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
  ]);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const dayWeeks = new Map();
  dayWeeks.set("Segunda-feira", "1");
  dayWeeks.set("Terça-feira", "2");
  dayWeeks.set("Quarta-feira", "3");
  dayWeeks.set("Quinta-feira", "4");
  dayWeeks.set("Sexta-feira", "5");
  dayWeeks.set("Sabádo", "6");
  dayWeeks.set("Domingo", "7");

  const isInterval = new Map();
  isInterval.set("Sim", true);
  isInterval.set("Não", false);
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
      if (
        response.interval === "Sim" &&
        response.start_time_interval === "" &&
        response.end_time_interval === ""
      ) {
        toast({
          title: "Mensagem.",
          description: `Você precisa Cadastrar o horario de intervalo`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      const daySelect = dayWeeks.get(response.day);
      const interval = isInterval.get(response.interval);

      const data = await apiService.createTimes({
        dayWeek: daySelect,
        end_time: response.end_time,
        interval: interval,
        restaurant_id: id,
        start_time: response.start_time,
        end_time_interval: response.end_time_interval,
        start_time_interval: response.end_time_interval,
      });
      if (data) {
        console.log(data);
        setDays((prevTimes) => prevTimes.filter((day) => day !== response.day));
        toast({
          title: "Mensagem.",
          description: `Foi adicionado o horario do dia de ${response.day}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        reset({
          day: "",
          end_time: "",
          interval: "",
          start_time: "",
          end_time_interval: "",
          start_time_interval: "",
        });
      } else {
        toast({
          title: "Mensagem.",
          description:
            "Não foi possivel cadastrar seu horario, verifique os dados.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Mensagem.",
        description:
          "Não foi possivel cadastrar seu horario, verifique os dados.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const closeButton = () => {
    if (days.length > 0) {
      toast({
        title: "Mensagem.",
        description: "Você precisa cadastrar as horas de todos os dias",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      onClose();
      window.location.reload();
    }
  };
  const CustonFormTimes = () => {
    return (
      <>
        <form className="form" onSubmit={handleSubmit(handleSubmitTimes)}>
          <HStack>
            <Box width={"30%"}>
              <FormControl id="day">
                <FormLabel>Dia da Semana</FormLabel>
                <Select id="day" {...register("day")}>
                  {days.map((day) => {
                    return <option>{day}</option>;
                  })}
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
                  id="start_time"
                  type="time"
                  min="07:00"
                  max="00:00"
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
          </HStack>
          <HStack>
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

          <Button type="submit" marginTop={"15px"} colorScheme="gray" mr={3}>
            {`Cadastrar Horario`}
          </Button>
          <Divider margin={"10px"} orientation="horizontal" />
        </form>
      </>
    );
  };
  return (
    <>
      <Button onClick={onOpen} marginLeft={"25%"}>
        Clique aqui
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
          <ModalBody pb={6}>
            <CustonFormTimes />
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => closeButton()} colorScheme="orange" mr={3}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
