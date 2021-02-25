import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Game from "./pages/Game"
import GameOver from "./pages/GameOver"
import HighScores from "./pages/HighScores"
import Home from "./pages/Home"
import Navbar from './Component/Navbar';
import {Container} from './styled/Container'
import {Main} from './styled/Main'
import Globlal from './styled/Globlal'



function App() {
  return (
    <Router>
      <Globlal/>
      <Main>
      <Container>
        <Navbar></Navbar>
        <Switch>
          <Route path="/game" component={Game}/>
          <Route path="/highScores" component={HighScores}/>
          <Route path="/gameOver" component={GameOver}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Container>
      </Main>
    </Router>
  );
}

export default App;
