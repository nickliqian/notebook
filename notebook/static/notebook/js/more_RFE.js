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
      var load = function(keyboard_manager, notebook) {
          $('#RFE-menu').click(function () {


              var form_dataframe = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'RFE-dataframe')
                          .attr('title', '数据集名称，必填')
                          .text('dataframe')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'RFE-dataframe')
                                  .attr('type', 'text')
                                  .attr('placeholder', '数据集名称，必填')
                          )
                  );

              var form_to_select = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'RFE-to_select')
                          .attr('title', '变量个数，必填')
                          .text('to_select')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'RFE-to_select')
                                  .attr('type', 'text')
                                  .attr('placeholder', '变量个数，必填')
                          )
                  );

              var form_label = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'RFE-label')
                          .attr('title', '标签变量名，必填')
                          .text('label')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'RFE-label')
                                  .attr('type', 'text')
                                  .attr('placeholder', '标签变量名，必填')
                          )
                  );

              var form_feature = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'RFE-feature')
                          .attr('title', '特征变量序列，可选')
                          .text('feature')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'RFE-feature')
                                  .attr('type', 'text')
                                  .attr('placeholder', '特征变量序列，可选')
                          )
                  );

              var form_estimator = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'RFE-estimator')
                          .attr('title', '筛选方法，必填')
                          .text('estimator')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'RFE-estimator')
                                  .attr('type', 'text')
                                  .attr('placeholder', '筛选方法，必填')
                          )
                  );

              var form = $('<form/>').addClass('form-horizontal')
                  .attr('id', 'model-RFE-menu')
                  .append(form_dataframe)
                  .append(form_to_select)
                  .append(form_label)
                  .append(form_feature)
                  .append(form_estimator);


              dialog.modal({
                  title: i18n.msg._('RFE'),
                  body: form,
                  keyboard_manager: keyboard_manager,
                  buttons: {
                      'Run': {
                          class: "btn-primary",
                          click: function () {
                              var Value = {
                                  "dataframe": $("#RFE-dataframe").val(),
                                  "to_select": $("#RFE-to_select").val(),
                                  "label": $("#RFE-label").val(),
                                  "feature": $("#RFE-feature").val(),
                                  "estimator": $("#RFE-estimator").val(),
                                  "target": "RFE",
                              };


                              var now_cell = notebook.get_selected_cell();

                              var content = '# Model RFE\n'+
                                  'import model as ml\n'+
                                  'ml.rfe_lr(' +
                                  Value.dataframe +
                                  ',' +
                                  Value.to_select +
                                  ',' +
                                  Value.label +
                                  ',' +
                                  Value.feature +
                                  ')';

                              now_cell.set_text(content);
                              notebook.execute_cell_and_select_below();
                              notebook.save_checkpoint();
                          }
                      }
                  }
              });

          });
      };

    return {load:load};


});