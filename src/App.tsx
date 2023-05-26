import { ChakraProvider } from "@chakra-ui/react";
import { RoutesApp } from "./pages/routes";
import theme from "./themes/ChakraTheme";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <NavBar />
        <RoutesApp />
      </ChakraProvider>
    </>
  );
}

export default App;
