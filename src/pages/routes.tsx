import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Clients } from "./clients";
import { Restaurant } from "./restaurants";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/restaurants" element={<Restaurant/>} />
      </Routes>
    </BrowserRouter>
  );
}