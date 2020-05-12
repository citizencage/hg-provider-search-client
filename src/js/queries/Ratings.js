import gql from 'graphql-tag';

export const GET_ALL_RATINGS = gql`
    query getAllRatings {
        getAllRatings {
            npi_number
            rating
        }
    }    
`;

export const GET_FILTERED_RATINGS = gql`
    query getFilteredRatings($RatingValue:Float!) {
        getFilteredRatings(RatingValue: $RatingValue) {
            npi_number
            rating
        }
    }    
`;

export const GET_RATINGS_BY_NPI = gql`
    query getRatingsByNpi($NpiArray: [String]!) {
        getRatingsByNpi(NpiArray: $NpiArray) {
            npi_number
            rating
        }
    }   
`;