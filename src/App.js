import {BrowserRouter , Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpages from "./pages/Coinpages";
import { makeStyles } from '@material-ui/core';

function App() {

  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor:"#14161a",
      color:"white",
      minHeight:"100vh",
    },
  }));
  const classes = useStyles()


  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header></Header>
      <Route path="/" component={Homepage} exact></Route>
      <Route path="/coins/:id" component ={Coinpages}></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
