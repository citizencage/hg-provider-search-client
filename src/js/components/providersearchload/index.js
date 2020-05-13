import ProviderSearchLoad from './providersearchload';
import { apolloProvider } from "../../common";

export default el =>
    new Vue({
        el,
        apolloProvider,
        render: h => h(ProviderSearchLoad),
    });