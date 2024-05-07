import { Router } from "./router/Router";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { Store } from "./contexts/stores/Store";
import { Theme } from "./theme/Theme";

export const App = () => {
  return (
    <ChakraProvider theme={Theme}>
        <Provider store={Store}>
          <Router />
        </Provider>
    </ChakraProvider>
  );
};
