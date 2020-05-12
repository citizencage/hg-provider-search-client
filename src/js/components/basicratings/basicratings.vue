<template>
    <div>

        <div class="row">
            <div class="col-md-8 results-list">
                <div v-if="$apollo.queries.ratings.loading">Loading . . .</div>
                <div v-if="error">{{ error }}</div>
                <transition name="fade">
                    <ul class="list-group" v-if="ratings.length > 0">
                        <li class="list-group-item" v-for="(item, index) in ratings" :id="item.npi_number" v-bind:key="item.npi_number">
                            NPI Number: <strong>{{item.npi_number}}</strong> <em>Rating: {{item.rating}}</em>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>

</template>

<script>
    import { GET_ALL_RATINGS } from '../../queries/Ratings';

    export default {
        name: 'BasicRatings',
        data() {
            return {
                ratings: [],
                error: null
            }
        },

        apollo: {
            ratings: {
                // graphQL query to fetch all ratings
                query: GET_ALL_RATINGS,
                update: data => data.getAllRatings,
                error(error) {
                    this.error = JSON.stringify(error.message);
                }
            }
        }
    }
</script>