import './App.css'
import { AuthContextProvider } from './context/AuthContext';
import Router from './Router'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
