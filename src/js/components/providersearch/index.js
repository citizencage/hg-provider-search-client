import ProviderSearch from './providersearch';
import { apolloProvider } from "../../common";

export default el =>
    new Vue({
        el,
        apolloProvider,
        render: h => h(ProviderSearch),
    });