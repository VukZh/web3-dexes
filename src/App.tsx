import "@mantine/core/styles.css";
import {MantineProvider} from "@mantine/core";
import {ContextProvider} from "./state/ContextProvider.tsx";
import {RootComponent} from "./components/RootComponent.tsx";

import "./App.css";

function App() {

  return (
    <MantineProvider defaultColorScheme="dark">
      <ContextProvider>
        <RootComponent/>
      </ContextProvider>
    </MantineProvider>

  );
}

export default App;
