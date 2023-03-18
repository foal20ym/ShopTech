import './app.css'
import App from './App.svelte'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const app = new App({
  target: document.getElementById('app'),
})

/*const app = new App({
  target: document.body,
});*/

export default app
