import axios from "axios";
import { createTimes, updateTimes } from "../types/timesTypes";
import { createRestaurant, updateRestaurant } from "../types/restaurantsTypes";

export class ApiService {
  axios: any;
  constructor() {
    this.axios = axios.create({
      baseURL: "http://3.16.22.129:8080/"
    });
  }

  async createRestaurant(dados: createRestaurant) {
    console.log(dados, "dados");
    const customConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const ret = await this.axios.post(
      "/restaurants",
      JSON.stringify(dados),
      customConfig
    );
    console.log(ret);
    return ret;
  }

  async getAllRestaurants() {
    const ret = await this.axios.get("/restaurants");
    return ret;
  }

  async updateRestaurants(dados: updateRestaurant, id: string | undefined) {
    console.log(dados);
    const customConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const ret = await this.axios.patch(
      `/restaurants/${id}`,
      JSON.stringify(dados),
      customConfig
    );
    return ret;
  }

  async deleteRestaurants(id: string | undefined, password: any) {
    console.log(id);
    console.log(password, "password api");
    const customConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const postData = {
      password: password,
    };

    const ret = await this.axios.delete(
      `/restaurants/${id}`,
      { data: postData },
      customConfig
    );
    console.log(ret);
    return ret;
  }

  async getAllTimes() {
    const ret = await this.axios.get("/times");
    return ret;
  }

  async createTimes(dados: createTimes) {
    console.log(dados);
    const customConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const ret = await this.axios.post(
      "/times",
      JSON.stringify(dados),
      customConfig
    );
    console.log(ret);
    return ret;
  }

  async updateTimes(dados: updateTimes, id: string) {
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const ret = await this.axios.patch(
      `/times/${id}`,
      JSON.stringify(dados),
      customConfig
    );
    return ret;
  }

  async deleteTimes(id: string) {
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const ret = await this.axios.delete(`/times/${id}`, customConfig);
    return ret;
  }
}
