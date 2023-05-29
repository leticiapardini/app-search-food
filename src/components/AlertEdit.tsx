import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FocusableElement } from "@chakra-ui/utils";
import * as yup from "yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiService } from "../service/api";
import { updateRestaurant } from "../types/restaurantsTypes";

const apiService = new ApiService();

const schemaFormEditRestaurants = yup.object().shape({
  name: yup.string(),
  type: yup.string(),
  street: yup.string(),
  city: yup.string(),
  password: yup.string().min(6).required("Senha é obrigatória"),
  cellphone: yup.string(),
  midias: yup.string(),
  link: yup.string(),
});

export function AlertEdit({ id }: { id: string | undefined }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaFormEditRestaurants),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<FocusableElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  function removePropriedadesVazias(response: any) {
    return Object.keys(response).reduce((acc, key) => {
      const value = response[key];
  
      if (value !== null && value !== undefined && value !== '' && !isEmptyArray(value) && !isEmptyObject(value)) {
        acc[key] = value;
      }
  
      return acc;
    }, {});
  }
  
  function isEmptyArray(arr: any) {
    return Array.isArray(arr) && arr.length === 0;
  }
  
  function isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  const handleSubmitEditRestaurant: SubmitHandler<FieldValues> = async (
    response: updateRestaurant
  ) => {
    try {
      onClose();
      
     const newObj  = removePropriedadesVazias(response)
      const data = await apiService.updateRestaurants({
       ...newObj
      }, id);
      if (data) {
        toast({
          title: "Mensagem.",
          description: "Seu restaurante foi atualizado com sucesso!!.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        reset({
          password : "",
          link: "",
          midias: "",
          cellphone: "",
          city: "",
          street: "",
          type: "",
          name: ""

        })
        window.location.reload();
      }
      else {
        toast({
          title: "Mensagem.",
          description: "Não foi possivel atualizar seu restaurante",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Mensagem.",
        description: "Não foi possivel atualizar seu restaurante",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button colorScheme="gray" onClick={onOpen}>
        Editar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(handleSubmitEditRestaurant)}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogBody>
                Escolha os campos que deseja editar, a senha é obrigatória
                <FormLabel marginTop={'15px'}>Senha</FormLabel>
                <Input
                  {...register("password")}
                  id="password"
                  name="password"
                  marginTop={"10px"}
                  type="password"
                />
                {errors.password && (
                  <p style={{ color: "red" }}>
                    {errors.password.message?.toString()}
                  </p>
                )}
                <FormLabel marginTop={'15px'}>Nome</FormLabel>
                <Input
                  {...register("name")}
                  id="name"
                  name="name"
                  marginTop={"10px"}
                  type="text"
                />
                {errors.name && (
                  <p style={{ color: "red" }}>
                    {errors.name.message?.toString()}
                  </p>
                )}
                <FormLabel marginTop={'15px'}>Tipo</FormLabel>
                <Input
                  {...register("type")}
                  id="type"
                  name="type"
                  marginTop={"10px"}
                  type="text"
                />
                {errors.type && (
                  <p style={{ color: "red" }}>
                    {errors.type.message?.toString()}
                  </p>
                )}
                <FormLabel marginTop={'15px'}>Rua</FormLabel>
                <Input
                  {...register("street")}
                  id="street"
                  name="street"
                  marginTop={"10px"}
                  type="text"
                />
                {errors.street && (
                  <p style={{ color: "red" }}>
                    {errors.street.message?.toString()}
                  </p>
                )}
                <FormLabel marginTop={'15px'}>Cidade</FormLabel>
                <Input
                  {...register("city")}
                  id="city"
                  name="city"
                  marginTop={"10px"}
                  type="text"
                />
                {errors.city && (
                  <p style={{ color: "red" }}>
                    {errors.city.message?.toString()}
                  </p>
                )}
                <FormLabel marginTop={'15px'}>Telefone</FormLabel>
                <Input
                  {...register("cellphone")}
                  id="cellphone"
                  name="cellphone"
                  marginTop={"10px"}
                  type="tel"
                />
                {errors.cellphone && (
                  <p style={{ color: "red" }}>
                    {errors.cellphone.message?.toString()}
                  </p>
                )}
                <FormLabel marginTop={'15px'}>Instagram</FormLabel>
                <Input
                  {...register("midias")}
                  id="midias"
                  name="midias"
                  marginTop={"10px"}
                  type="text"
                />
                {errors.midias && (
                  <p style={{ color: "red" }}>
                    {errors.midias.message?.toString()}
                  </p>
                )}
                <FormLabel marginTop={'15px'}>Cardapio</FormLabel>
                <Input
                  {...register("link")}
                  id="link"
                  name="link"
                  marginTop={"10px"}
                  type="text"
                />
                {errors.link && (
                  <p style={{ color: "red" }}>
                    {errors.link.message?.toString()}
                  </p>
                )}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelButtonRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="red" ml={3}>
                  Editar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </form>
      </AlertDialog>
    </>
  );
}
