import { Button, Input, Select, useToast } from "@chakra-ui/react";
import "../styles/SearchRestaurants.css";
import * as yup from "yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { createRestaurant } from "../types/restaurantsTypes";
import { ApiService } from "../service/api";
import { createTimes } from "../types/timesTypes";
import moment from "moment";
import { AlertStatus } from "./AlertStatus";

const shemaSearch = yup.object().shape({
  restaurant: yup.string().required("Restaurante é obrigatório"),
  day: yup.string().required("Dia é obrigatório"),
  time: yup.string().required("Hora é obrigatório"),
});

const apiService = new ApiService();

export const SearchRestaurants = () => {
  const [restaurants, setRestaurants] = useState<createRestaurant[]>([]);
  const [times, setTimes] = useState<createTimes[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState<FieldValues>();
  const [timesRestaurantsForDays, setTimesRestaurantsForDays] = useState<
    createTimes[]
  >([]);
  const toast = useToast();
  const dayWeeks = new Map();
  dayWeeks.set("Monday", "1");
  dayWeeks.set("Tuesday", "2");
  dayWeeks.set("Wednesday", "3");
  dayWeeks.set("Thursday", "4");
  dayWeeks.set("Friday", "5");
  dayWeeks.set("Saturday", "6");
  dayWeeks.set("Sunday", "7");

  useEffect(() => {
    const getAllRestaurants = async () => {
      const data = await apiService.getAllRestaurants();
      console.log(data);
      setRestaurants(data.data.data);
    };
    const getAllTimes = async () => {
      const data = await apiService.getAllTimes();
      console.log(data);
      setTimes(data.data.data);
    };
    getAllRestaurants();
    getAllTimes();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shemaSearch),
  });

  const IsOpen = () => {
    const endTime = moment(timesRestaurantsForDays[0].end_time, "HH:mm");
    const openTime = moment(timesRestaurantsForDays[0].start_time, "HH:mm");
    const time = moment(response?.time, "HH:mm");
    const openHours = moment.duration(openTime.diff(time));
    const closeHours = moment.duration(time.diff(endTime));
    const hoursOpenHours = openHours.hours();
    const hoursOpenMinutis = openHours.minutes();
    const hoursCloseHours = closeHours.hours();
    const hoursCloseMinutis = closeHours.minutes();

    console.log(closeHours);
    return (
      <div>
        {response?.time >= timesRestaurantsForDays[0].start_time &&
        response?.time <= timesRestaurantsForDays[0].end_time &&
        !(
          response?.time > timesRestaurantsForDays[0].start_time_interval &&
          response?.time < timesRestaurantsForDays[0].end_time_interval
        ) ? (
          <AlertStatus message="O Restaurante está aberto!" />
        ) : response?.time < timesRestaurantsForDays[0].start_time ? (
          <AlertStatus
            message={`Fechado, estará aberto em ${hoursOpenHours} horas e ${hoursOpenMinutis} minutos`}
          />
        ) : response?.time > timesRestaurantsForDays[0].end_time ? (
          <AlertStatus
            message={`Fechado, estava aberto a ${hoursCloseHours} horas e ${hoursCloseMinutis} minutos`}
          />
        ) : (
          <AlertStatus
            message={`Fechado, em intervalo, retorna as ${timesRestaurantsForDays[0].end_time_interval}`}
          />
        )}
      </div>
    );
  };

  const handleSubmitSearchRestaurant: SubmitHandler<FieldValues> = async (
    response
  ) => {
    try {
      const day = moment(response.day).format("dddd");
      const daySelect = dayWeeks.get(day);
      const selectRestaurant = restaurants.filter(
        (restaraunt) => restaraunt.name === response.restaurant
      );
      const timesRestaurantsForDays = times.filter(
        (time) =>
          time.dayWeek === daySelect &&
          time.restaurant_id === selectRestaurant[0].id
      );
      setResponse(response);
      setTimesRestaurantsForDays(timesRestaurantsForDays);
      setIsOpen(true);
    } catch (error) {
      toast({
        title: "Mensagem.",
        description: "Não foi possivel fazer a pesquisa",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSubmitSearchRestaurant)}
        className="divSelect"
      >
        <Select {...register("restaurant")} className="select">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => {
              return <option key={restaurant.id}>{restaurant.name}</option>;
            })
          ) : (
            <option>Ainda não existe restaurantes cadastrados</option>
          )}
        </Select>
        <div style={{ color: "red" }}>
          {errors.restaurant?.message?.toString()}
        </div>
        <Input {...register("day")} type="date" />
        <div style={{ color: "red" }}>{errors.day?.message?.toString()}</div>
        <Input {...register("time")} type="time" />
        <div style={{ color: "red" }}>{errors.time?.message?.toString()}</div>
        <Button type="submit" background={"wheat"} width={"30%"}>
          Pesquisar
        </Button>
      </form>
      {isOpen && <IsOpen />}
    </div>
  );
};
