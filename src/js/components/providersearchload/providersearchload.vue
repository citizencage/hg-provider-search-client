<template>
    <div>

        <div class="form-search">
            <div class="form-label-group">
                <input type="text" id="inputSearch" class="form-control" placeholder="Enter your search term" required autofocus v-model="keywords" v-on:keyup.enter="updateKeywords">
                <label for="inputSearch">Enter your search term</label>
            </div>

            <button class="btn btn-lg btn-primary btn-block" type="button" v-on:click="updateKeywords">Search</button>
        </div>


        <div class="results-wrapper">
            <div class="loading" v-if="$apollo.queries.getProvidersQuerySearchAfter.loading"></div>
            <div v-if="error">{{ error }}</div>
            <div class="results" v-if="results.length > 0">
            <transition-group name="search-item-wrapper" tag="div" class="search-inner">
                <div class="search-item-wrapper" v-for="(item, index) in results" :id="item.npi_number" v-bind:key="item.npi_number">
                    <div class="row">
                        <div class="col-md-2 avatar"><img src="images/avatar.png" /></div>
                        <div class="col-md-10 details">
                            <div class="title">{{item.title}}</div>
                            <div class="meta">Gender: <strong>{{item.gender}}</strong> Rating: <strong>{{item.rating}}</strong></div>
                            <div class="education">{{item.education}}</div>
                        </div>
                    </div>
                </div>
            </transition-group>
            </div><!-- results -->
        </div>


        <!--<div class="row">-->
            <!--<div class="col-md-8 results-list">-->
                <!--<div v-if="$apollo.queries.getProvidersQuerySearchAfter.loading">Loading . . .</div>-->
                <!--<div v-if="error">{{ error }}</div>-->
                <!--<transition name="fade">-->
                    <!--<ul class="list-group" v-if="results.length > 0">-->
                        <!--<li class="list-group-item" v-for="(item, index) in results" :id="item.npi_number" v-bind:key="item.npi_number">-->
                            <!--{{item.title}}<br>-->
                            <!--<strong>{{item.npi_number}}</strong><br>-->
                            <!--<em>Gender: {{item.gender}}</em><br>-->
                            <!--<em>Rating: {{item.rating}}</em><br><br>-->
                            <!--<em>{{item.education}}</em>-->
                        <!--</li>-->

                    <!--</ul>-->
                <!--</transition>-->
            <!--</div>-->
        <!--</div>-->

        <div class="row">
            <div class="col-md-8" style="margin: 25px auto; text-align: center;">
                <button v-if="loadMoreResults" class="btn btn-info" @click="loadMore">Show More</button>
            </div>
        </div>

    </div>
</template>

<script>
    import { GET_PROVIDERS_QUERY_SEARCH_AFTER } from '../../queries/Providers';

    export default {
        name: 'ProviderSearchLoad',
        data() {
            return {
                total: 0,
                size: 4,
                keywords: '',
                searchQuery: '',
                results: [],
                error: null,
                skipQuery: true,
                searchAfter: [],
                lastResult: [],
            }
        },
        computed: {
          loadMoreResults() {
              return this.results.length < this.total;
          }
        },
        apollo: {
            getProvidersQuerySearchAfter: {
                query: GET_PROVIDERS_QUERY_SEARCH_AFTER,
                variables() {
                    return {
                        searchQuery: this.searchQuery,
                        size: this.size,
                        searchAfter: this.searchAfter
                    }
                },
                // Disable the query
                skip() {
                    return this.skipQuery
                },
                update(data) {
                    this.total = data.getProvidersQuerySearchAfter.total;
                    data.getProvidersQuerySearchAfter.providers.forEach((element) => {
                        this.results.push(
                            {
                                ['last_name']: element.last_name,
                                ['title']: element.title,
                                ['npi_number']: element.npi_number,
                                ['gender']: element.gender,
                                ['rating']: (element.rating === null) ? 'NA' : element.rating,
                                ['education']: element.education
                            }
                        );
                    });
                }
            }
        },
        methods: {
            loadMore() {
                this.lastResult = this.results[this.results.length - 1];
                this.searchAfter = [
                    this.lastResult.last_name,
                    this.lastResult.npi_number.toString()
                ];
                this.invokeGetSearchResults();
            },
            updateKeywords() {
                if(this.keywords.length) {
                    this.searchQuery = this.keywords;
                    this.results = [];
                    this.lastResult = [];
                    this.searchAfter = [];
                    this.invokeGetSearchResults();
                }
            },
            invokeGetSearchResults() {
                if(this.searchQuery.length) {
                    this.$apollo.queries.getProvidersQuerySearchAfter.skip = false;
                    this.$apollo.queries.getProvidersQuerySearchAfter.refetch();
                }
            }
        }
    }
</script>