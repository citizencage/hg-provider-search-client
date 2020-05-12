<template>
    <div>

        <div class="form-search">

            <div class="form-label-group">
                <label for="filterRatings" class="sr-only">Filter by rating</label>
                <select id="filterRatings" class="form-control" v-model="ratingFilterValue" @change="fetchFilteredRatings">
                    <option value="">Filter by Rating</option>
                    <option value="4.1">4.1 or more</option>
                    <option value="4.2">4.2 or more</option>
                    <option value="4.3">4.3 or more</option>
                    <option value="4.4">4.4 or more</option>
                    <option value="4.5">4.5 or more</option>
                    <option value="4.6">4.6 or more</option>
                    <option value="4.7">4.7 or more</option>
                    <option value="4.8">4.8 or more</option>
                    <option value="4.9">4.9 or more</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 results-list">
                <div v-if="$apollo.loading">Loading . . .</div>
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
    import { GET_ALL_RATINGS, GET_FILTERED_RATINGS } from '../../queries/Ratings';

    export default {
        name: 'FilteredRatings',
        data() {
            return {
                ratingFilterValue: '',
                ratings: [],
                error: null
            }
        },
        methods: {
          fetchFilteredRatings() {
              if(this.ratingFilterValue.length) {
                  this.$apollo.query({
                     query: GET_FILTERED_RATINGS, // fetch filtered ratings
                      variables: {
                          RatingValue: parseFloat(this.ratingFilterValue)
                      },
                      error(error) {
                         this.error = JSON.stringify(error.message);
                      }
                  })
                  .then(data => {
                    this.ratings = data.data.getFilteredRatings;
                  });
              }
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