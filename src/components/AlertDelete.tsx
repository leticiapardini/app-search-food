import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
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

const apiService = new ApiService();
const schemaPassword = yup.object().shape({
  password: yup.string().min(6).required("Senha é obrigatório"),
});
export function AlertDelete({ id }: { id: string | undefined }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaPassword),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<FocusableElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleSubmitDeleteRestaurant: SubmitHandler<FieldValues> = async (
    response
  ) => {
    try {
      onClose();
      console.log(response.password);
      const data = await apiService.deleteRestaurants(id, response.password);
      if (data) {
        toast({
          title: "Mensagem.",
          description: "Seu restaurante foi deletado com sucesso!!.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        reset({
          password : ""
        })
      }
      else {
        toast({
          title: "Mensagem.",
          description: "Não foi possivel deletar seu restaurante",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Mensagem.",
        description: "Não foi possivel deletar seu restaurante",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Deletar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(handleSubmitDeleteRestaurant)}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogBody>
                Tem certeza que deseja deletar? Para isso digite a sua senha a
                baixo
                <Input
                  {...register("password")}
                  id="password"
                  name="password"
                  marginTop={"10px"}
                  type="text"
                />
                {errors.password && (
                  <p style={{ color: "red" }}>
                    {errors.password.message?.toString()}
                  </p>
                )}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelButtonRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="red" ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </form>
      </AlertDialog>
    </>
  );
}
