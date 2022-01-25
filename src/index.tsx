import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { App } from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

import './scss/app.scss'

// {
//   breakpoints: {
//     values: {
      
//     }
//   }
// }
const theme = createTheme();

ReactDOM.render(
    <BrowserRouter>
      <Provider store = {store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider> 
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
