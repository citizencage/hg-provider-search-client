import BasicRatings from './basicratings';
import { apolloProvider } from "../../common";

export default el =>
    new Vue({
        el,
        apolloProvider,
        render: h => h(BasicRatings),
    });