import Content from "./components/Content";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  )
}

export default App
