import gql from 'graphql-tag';

export const GET_PROVIDERS_BY_SIMPLE_QUERY = gql`
    query getProvidersBySimpleQuery($searchQuery: String!, $size: Int!, $offset: Int!) {
        getProvidersBySimpleQuery(searchQuery: $searchQuery, size: $size, offset: $offset) {
            total
            providers {
                title
                npi_number
                gender
                rating
                education
            }
        }
    }   
`;

export const GET_PROVIDERS_QUERY_SEARCH_AFTER = gql`
    query getProvidersQuerySearchAfter($searchQuery: String!, $size: Int!, $searchAfter: [String]) {
        getProvidersQuerySearchAfter(searchQuery: $searchQuery, size: $size, searchAfter: $searchAfter) {
            total
            providers {
                last_name
                title
                npi_number
                gender
                rating
                education
            }
        }
    }   
`;