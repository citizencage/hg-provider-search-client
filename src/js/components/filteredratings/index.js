import FilteredRatings from './filteredratings';
import { apolloProvider } from "../../common";

export default el =>
    new Vue({
        el,
        apolloProvider,
        render: h => h(FilteredRatings),
    });