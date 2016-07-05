define(function (require) {
  return function FiltersAggDefinition(Private, Notifier) {
    var _ = require('lodash');
    var angular = require('angular');
    var BucketAggType = Private(require('components/agg_types/buckets/_bucket_agg_type'));
    var createFilter = Private(require('components/agg_types/buckets/create_filter/filters'));
    var decorateQuery = Private(require('components/courier/data_source/_decorate_query'));
    var notif = new Notifier({ location: 'Entities Agg' });

    return new BucketAggType({
      name: 'entities',
      dslName: 'filters',
      title: 'Entities',
      createFilter: createFilter,
      params: [
        {
          name: 'filters',
          editor: require('text!components/agg_types/controls/entities.html'),
          default: [ {input: {}} ],
          write: function (aggConfig, output) {
            var inFilters = aggConfig.params.filters;
            //console.log(output);
            var inTags = aggConfig.params.ngtags;
            if (!_.size(inFilters)) return;
//console.log(document.getElementsByName('ngtags0'));

//console.log(jQuery('[name="ngtags0"] ul.tag-list li span.ng-binding.ng-scope'));
var i =0;
            var outFilters = _.transform(inFilters, function (filters, filter) {
              var input = filter.input;
              //var tagsjson = angular.fromJson(filter.input.tags);
              //console.log(tagsjson);
              if (!input) return notif.log('malformed filter agg params, missing "input" query');

              var query = input.query;
var semantic_siblings = [];
$.each( jQuery('[name="ngtags'+i+'"] ul.tag-list li span.ng-binding.ng-scope'), function( key, value ) {
  semantic_siblings.push(value.innerText );
});
              //input.query = { query_string: { query: entityQueries.join(' AND ') } };              
              //input.query = { query_string: { query: tags.join(" OR ") } };   
              //var tags = input.ngtags;
              //alert(tags);
//console.log(filter);
              //var tagsLabel = _.deepGet(tags, '0.text')               

              if (!query) return notif.log('malformed filter agg params, missing "query" on input');
              decorateQuery(query);
              
              //var log = [];

              //angular.forEach(tags, function(value, key) {
                  //this.push(value.text);
              //}, log);

              //console.log(log.join(' OR '));
              _.deepSet(query, 'query_string.query', '"' + semantic_siblings.join('" OR "') + '"');
              //_.deepSet(query, 'query_string.query', "good OR nice");


             //_.remove(filter.input.tags);
             delete filter.input.tags;
             //delete filter.input.tags1;             
             //delete tags.input.ngtags;

              var label = semantic_siblings.join(", ");
              //console.log(input);
              filters[label] = input;
              i++;
            }, {});

           

            if (!_.size(outFilters)) return;

            var params = output.params || (output.params = {});
            //console.log(outFilters);
            params.filters = outFilters;
          }
        }
      ]
    });
  };
});
