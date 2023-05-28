import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  CardFooter,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import { ModalTimes } from "./FormModalTimes";
import { useEffect, useState } from "react";
import { ApiService } from "../service/api";
import { createRestaurant } from "../types/restaurantsTypes";
import { getTimes } from "../types/timesTypes";
import { AlertDelete } from "./AlertDelete";
import { AlertEdit } from "./AlertEdit";

const apiService = new ApiService();

export const CardRestaurant = () => {
  const [restaurants, setRestaurants] = useState<createRestaurant[]>([]);
  const [timeRestaurant, setTimeRestaurant] = useState<getTimes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllRestaurants = async () => {
      setLoading(true);
      const data = await apiService.getAllRestaurants();
      setRestaurants(data.data.data);
      const times = await apiService.getAllTimes();
      setTimeRestaurant(times.data.data);
      setLoading(false);
    };
    getAllRestaurants();
  }, []);

  return (
    <div style={{ background: "#1A202C", paddingTop: "10px" }}>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => {
          return (
            <div key={restaurant.id}>
              <Link
                background={"#391C16"}
                fontSize={"1rem"}
                padding={"0.3rem"}
                margin={"0.7rem"}
                borderRadius={"6px"}
                href="/newRestaurants"
              >
                Cadastrar
              </Link>
              <SimpleGrid
                spacing={3}
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                padding={"10px"}
              >
                <Card
                  background={"#391C16"}
                  marginTop={"5px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <CardHeader>
                    <Heading size="md">{restaurant.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      {`Endereço: ${restaurant.street}, ${restaurant.number}`}
                    </Text>
                    <Text>
                      {restaurant.socialMidea && (
                        <p>{`Instagram: ${restaurant.socialMidea}`}</p>
                      )}
                    </Text>
                    <Text>
                      {restaurant.link && (
                        <p>{`Cardapio: ${restaurant.link}`}</p>
                      )}
                    </Text>
                  </CardBody>
                  <div>
                    {timeRestaurant.length > 0 ? (
                      timeRestaurant.map((time) => {
                        return (
                          time.restaurant.id !== restaurant.id && (
                            <Text background={"#EBBF26"} color={"black"}>
                              ALERTA!! Seu restaurante ainda não possui horarios
                              cadastrados,
                              <ModalTimes id={restaurant.id} /> para cadastrar,
                              so assim ele aparecerá para os clientes
                            </Text>
                          )
                        );
                      })
                    ) : (
                      <Text
                        background={"#a98919"}
                        padding={"5px"}
                        fontSize={"12px"}
                        color={"black"}
                      >
                        ALERTA!! Seu restaurante ainda não possui horarios
                        cadastrados, clique no botão abaixo para cadastrar, so
                        assim ele aparecerá para os clientes
                        <div>
                          <ModalTimes id={restaurant.id} />
                        </div>
                      </Text>
                    )}
                  </div>
                  <CardFooter gap={"2rem"} justifyContent={"space-around"}>
                    <AlertEdit id={restaurant.id} />
                    <AlertDelete id={restaurant.id} />
                  </CardFooter>
                </Card>
              </SimpleGrid>
            </div>
          );
        })
      ) : loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.500"
          size="xl"
        />
      ) : (
        <>
          <Link
            background={"#391C16"}
            fontSize={"1.1rem"}
            padding={"0.2rem"}
            margin={"2rem"}
            marginBottom={"5rem"}
            borderRadius={"6px"}
            href="/newRestaurants"
          >
            Cadastrar
          </Link>
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            marginTop={"2rem"}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Bem vindo(a)!
              <p style={{ marginTop: "3%", marginBottom: "7%" }}>
                Ainda não existe nenhum restaurante cadastrado
              </p>
            </AlertTitle>
          </Alert>
        </>
      )}
    </div>
  );
};
