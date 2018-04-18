/**
 * Created by python on 18-4-18.
 */
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
define([
    'jquery',
    'base/js/dialog',
    'base/js/i18n',
    'underscore',
], function ($, dialog, i18n, _) {
    'use strict';
      var load = function(keyboard_manager) {
          $('#split-menu').click(function () {

              var form_dataframe = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'split-dataframe')
                          .attr('title', '数据集名称，必填')
                          .text('dataframe')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'split-dataframe')
                                  .attr('type', 'text')
                                  .attr('placeholder', '数据集名称，必填')
                          )
                  );

              var form_2 = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'split-dataframe')
                          .attr('title', '数据集名称，必填')
                          .text('dataframe')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'split-dataframe')
                                  .attr('type', 'text')
                                  .attr('placeholder', '数据集名称，必填')
                          )
                  );


              var form = $('<form/>').addClass('form-horizontal')
                  .attr('id', 'feature-split-menu')
                  .append(form_dataframe)
                  .append(form_2);




              dialog.modal({
                  title: i18n.msg._('Split...'),
                  body: form,
                  keyboard_manager: keyboard_manager,
                  buttons: {'OK': {}}
              });

          });
      };

    return {load:load};


});
