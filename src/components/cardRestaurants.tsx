import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  CardFooter,
  Button,
  Link,
} from "@chakra-ui/react";
import { ModalTimes } from "./FormModalTimes";
import { AddIcon } from "@chakra-ui/icons";

export const CardRestaurant = () => {
  return (
    <div style={{ background: "#786b3f", paddingTop: "10px" }}>
      <Link  background={'#391C16'}
      fontSize={'1.5rem'}
      padding={'0.2rem'}
      margin={'0.6rem'}
      borderRadius={'6px'} href="/newRestaurants"><AddIcon/></Link>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        padding={"10px"}
      >
        <Card background={"#391C16"} marginTop={'5px'}>
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <Text background={'#EBBF26'} color={'black'}>
            ALERTA!! Seu restaurante ainda não possui horarios cadastrados,
            <ModalTimes/> para cadastrar, so assim ele aparecerá para os clientes
          </Text>
          <CardFooter justifyContent={"space-around"}>
            <Button color={"#f4f4f4"}>Editar</Button>
            <Button color={"#f4f4f4"}>Deletar</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </div>
  );
};
