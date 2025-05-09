import Content from "./components/Content";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const isLoggedIn = false;

  return (
    <Provider store={store}>
      <Content />
    </Provider>
  )
}

export default App
