import store from "../store/configureStore";
import { addArticle } from "../actions/index";

window.store = store;
window.addArticle = addArticle;
