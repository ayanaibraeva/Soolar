import ReactDOM from 'react-dom/client'
import {App} from "./app/index.jsx";
import "../src/app/styles/global.sass";
import {I18nextProvider} from "react-i18next";
import i18n from "./app/i18n/i18n.js";


ReactDOM.createRoot(document.getElementById('root')).render(
    <I18nextProvider i18n={i18n}>
        <App/>
    </I18nextProvider>
);