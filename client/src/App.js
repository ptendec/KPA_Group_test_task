import './App.css';
import {BrowserRouter, Routes as Switch, Route} from "react-router-dom"
import Main from "./pages/Main/Main"

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} element={<Main />}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
