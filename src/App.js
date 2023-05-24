import AppContextProvider from "./context";
import Navigation from "./navigation";

const App = () => (
    <AppContextProvider>
        <Navigation />
    </AppContextProvider>
);

export default App;
