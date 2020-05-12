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