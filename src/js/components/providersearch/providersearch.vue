<template>
    <div>

        <div class="form-search">
            <div class="form-label-group">
                <input type="text" id="inputSearch" class="form-control" placeholder="Enter your search term" required autofocus v-model="keywords" v-on:keyup.enter="updateKeywords">
                <label for="inputSearch">Enter your search term</label>
            </div>

            <button class="btn btn-lg btn-primary btn-block" type="button" v-on:click="updateKeywords">Search</button>
        </div>

        <div class="row">
            <div class="col-md-8 results-list">
                <div v-if="$apollo.queries.getProvidersBySimpleQuery.loading">Loading . . .</div>
                <div v-if="error">{{ error }}</div>
                <transition name="fade">
                    <ul class="list-group" v-if="results.length > 0">
                        <li class="list-group-item" v-for="(item, index) in results" :id="item.npi_number" v-bind:key="item.npi_number">
                            {{item.title}}<br>
                            <strong>{{item.npi_number}}</strong><br>
                            <em>Gender: {{item.gender}}</em><br>
                            <em>Rating: {{item.rating}}</em><br><br>
                            <em>{{item.education}}</em>
                        </li>

                    </ul>
                </transition>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <Pagination :alignment="paginationAlignment" :number-of-links="numberOfLinks" :per-page="size" v-on:updatePage="updatePage"></Pagination>
            </div>
        </div>


    </div>
</template>

<script>
    import { GET_PROVIDERS_BY_SIMPLE_QUERY } from '../../queries/Providers';
    import {EventBus} from '../../common';
    import Pagination from '../pagination/pagination';

    export default {
        name: 'ProviderSearch',
        components: {
            Pagination
        },
        data() {
            return {
                total: 0,
                paginationAlignment: 'center',
                size: 5,
                numberOfLinks: 2,
                currentPage: 1,
                offset: 0,
                keywords: '',
                searchQuery: '',
                results: [],
                error: null,
                skipQuery: true,
            }
        },
        apollo: {
            getProvidersBySimpleQuery: {
                query: GET_PROVIDERS_BY_SIMPLE_QUERY,
                variables() {
                    return {
                        searchQuery: this.searchQuery,
                        size: this.size,
                        offset: this.offset
                    }
                },
                // Disable the query
                skip() {
                    return this.skipQuery
                },
                update(data) {
                    this.total = data.getProvidersBySimpleQuery.total;
                    this.results = data.getProvidersBySimpleQuery.providers;
                    EventBus.$emit('initPagination', this.offset, this.total);
                }
            }
        },
        methods: {
            updatePage(number, offset) {
                this.currentPage = number;
                this.offset = offset;
                this.invokeGetSearchResults();

            },
          updateKeywords() {
              if(this.keywords.length) {
                  this.offset = 0;
                  this.searchQuery = this.keywords;
                  this.invokeGetSearchResults();
              }
          },
          invokeGetSearchResults() {
              if(this.searchQuery.length) {
                this.$apollo.queries.getProvidersBySimpleQuery.skip = false;
                this.$apollo.queries.getProvidersBySimpleQuery.refetch();
              }
          }
        },
    }
</script>