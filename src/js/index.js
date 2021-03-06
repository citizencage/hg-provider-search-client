require('../scss/index.scss');

import 'bootstrap';
import common from './common';
import utilities from './utilities';

// instantiate VueJS components
import BasicRatings from 'Components/basicratings';
import FilteredRatings from 'Components/filteredratings';
import ProviderSearch from 'Components/providersearch';
import ProviderSearchLoad from 'Components/providersearchload';

utilities.elementReady('#basicRatingsApp').then( () => {
    BasicRatings('#basicRatingsApp');
});

utilities.elementReady('#filteredRatingsApp').then( () => {
    FilteredRatings('#filteredRatingsApp');
});

utilities.elementReady('#providerSearchApp').then( () => {
    ProviderSearch('#providerSearchApp');
});

utilities.elementReady('#providerSearchLoadApp').then( () => {
    ProviderSearchLoad('#providerSearchLoadApp');
});