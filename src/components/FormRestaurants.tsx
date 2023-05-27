import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ModalTimes } from "./FormModalTimes";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const schemaFormRestaurants = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  type: yup.string().required("Tipo é obrigatório"),
  street: yup.string().required("Rua é obrigatório"),
  number: yup.number().required("Name é obrigatório"),
  state: yup.string().required("Estado é obrigatório"),
  password: yup.string().min(6).required("Senha é obrigatória"),
  cellphone: yup.string().required("Telefone é obrigatório"),
  midias: yup.string(),
  link: yup.string()
});


export default function FormRestaurants() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schemaFormRestaurants),
  });
  const handleSubmitRestaurant: SubmitHandler<FieldValues> = async (response) => {
    return console.log(response)
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Formulário de Cadastro de Restaurantes
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Bem vindo, preencha o formulário e cadastre-se ✌️
          </Text>
        </Stack>
       <form onSubmit={handleSubmit(handleSubmitRestaurant)}>
       <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" 
                  {...register("name")}
                  />
                  <div style={{color: 'red'}}>{errors.name?.message?.toString()}</div>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="type" isRequired>
                  <FormLabel>Tipo</FormLabel>
                  <Input placeholder="Ex: Sorveteria" type="text"
                   {...register("type")} />
                   <div style={{color: 'red'}}>{errors.type?.message?.toString()}</div>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="street" isRequired>
                  <FormLabel>Rua</FormLabel>
                  <Input type="text"
                   {...register("street")} />
                   <div style={{color: 'red'}}>{errors.street?.message?.toString()}</div>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="number" isRequired>
                  <FormLabel>Numero</FormLabel>
                  <Input type="number"
                   {...register("number")} />
                   <div style={{color: 'red'}}>{errors.number?.message?.toString()}</div>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="state" isRequired>
                  <FormLabel>Estado</FormLabel>
                  <Input type="text" 
                   {...register("state")}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="password" isRequired>
                  <FormLabel>Senha para acesso</FormLabel>
                  <Input type="password"
                   {...register("password")} />
                   <div style={{color: 'red'}}>{errors.password?.message?.toString()}</div>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="cellphone" isRequired>
                  <FormLabel>Telefone para contato</FormLabel>
                  <Input type="tel"
                   {...register("cellphone")} />
                   <div style={{color: 'red'}}>{errors.cellphone?.message?.toString()}</div>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="midias">
                  <FormLabel>Instagram</FormLabel>
                  <Input type="text" 
                   {...register("midias")}/>
                   <div style={{color: 'red'}}>{errors.midias?.message?.toString()}</div>
                </FormControl>
              </Box>
            </HStack>

            <Box>
              <FormControl id="link">
                <FormLabel>Link Cardapio Digital</FormLabel>
                <Input type="text"
                 {...register("link")} />
                 <div style={{color: 'red'}}>{errors.link?.message?.toString()}</div>
              </FormControl>
            </Box>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                type="submit"
                size="lg"
                bg={'orange.900'}
                color={"white"}
                _hover={{
                  bg: "orange.800",
                }}
              >
                Cadastrar
              </Button>
            </Stack>
          </Stack>
        </Box>
       </form>
      </Stack>
    </Flex>
  );
}
