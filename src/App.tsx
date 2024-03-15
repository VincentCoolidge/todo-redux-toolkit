import List from "components/List";
import "./App.css";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store } from "store/store";

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <List />
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
