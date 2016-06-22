define(function (require) {
  var _ = require('lodash');

  require('components/notify/notify');

  var module = require('modules').get('queries_editor/services/saved_queries', [
    'kibana/notify',
    'kibana/courier'
  ]);

  module.factory('SavedQuery', function (courier) {
    _(SavedQuery).inherits(courier.SavedObject);

    function SavedQuery(id) {
      courier.SavedObject.call(this, {
        type: SavedQuery.type,

        id: id,

        mapping: {
          title: 'string',
          description: 'string',
          st_activationQuery: 'string',
          st_resultQuery: 'string',
          st_datasourceId: 'string',
          _previewTemplateId: 'string', // used only to temporary store template id for preview
          st_tags: 'string',
          rest_params: 'json',
          rest_headers: 'json',
          rest_body: 'string',
          rest_method: 'string',
          rest_path: 'string',
          rest_resp_status_code: 'long',
          rest_resp_restriction_path: 'string',
          activation_rules: 'json',
          version: 'long'
        },

        defaults: {
          title: 'New Saved Query',
          description: '',
          st_activationQuery: '',
          st_resultQuery: '',
          st_datasourceId: '',
          _previewTemplateId: '',
          st_tags: '',
          rest_params: '[]',
          rest_headers: '[]',
          rest_body: '',
          rest_method: 'GET',
          rest_path: '',
          rest_resp_status_code: 200,
          rest_resp_restriction_path: '$',
          activation_rules: '[]',
          version: 1
        },
        init: function () {
          try {
            if (this.rest_params && typeof this.rest_params === 'string') {
              this.rest_params = JSON.parse(this.rest_params);
            }
          } catch (e) {
            throw new Error('Could not parse rest_params for query [' + this.id + ']');
          }
          try {
            if (this.rest_headers && typeof this.rest_headers === 'string') {
              this.rest_headers = JSON.parse(this.rest_headers);
            }
          } catch (e) {
            throw new Error('Could not parse rest_headers for query [' + this.id + ']');
          }
          try {
            if (this.activation_rules && typeof this.activation_rules === 'string') {
              this.activation_rules = JSON.parse(this.activation_rules);
            }
          } catch (e) {
            throw new Error('Could not parse activation_rules for query [' + this.id + ']');
          }
        },

        searchSource: true
      });
    }

    SavedQuery.type = 'query';



    return SavedQuery;
  });
});
