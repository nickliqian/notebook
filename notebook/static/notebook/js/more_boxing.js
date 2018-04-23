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
          $('#boxing-menu').click(function () {


              var form_dataframe = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'boxing-dataframe')
                          .attr('title', '数据集名称，必填')
                          .text('dataframe')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'boxing-dataframe')
                                  .attr('type', 'text')
                                  .attr('placeholder', '数据集名称，必填')
                          )
                  );

              var form_variable = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'boxing-variable')
                          .attr('title', '分箱变量名，必填')
                          .text('variable')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'boxing-variable')
                                  .attr('type', 'text')
                                  .attr('placeholder', '分箱变量名，必填')
                          )
                  );

              var form_label = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'boxing-label')
                          .attr('title', '标签变量名，必填')
                          .text('label')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'boxing-label')
                                  .attr('type', 'text')
                                  .attr('placeholder', '标签变量名，必填')
                          )
                  );

              var form_no_default = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'boxing-no_default')
                          .attr('title', '非违约的值，必填')
                          .text('no_default')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'boxing-no_default')
                                  .attr('type', 'text')
                                  .attr('placeholder', '非违约的值，必填')
                          )
                  );

              var form_default = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'boxing-default')
                          .attr('title', '违约的值，必填')
                          .text('default')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'boxing-default')
                                  .attr('type', 'text')
                                  .attr('placeholder', '违约的值，必填')
                          )
                  );

              var form_bins = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'boxing-bins')
                          .attr('title', '分箱段数或者具体的分箱值，必填')
                          .text('bins')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'boxing-bins')
                                  .attr('type', 'text')
                                  .attr('placeholder', '分箱段数或者具体的分箱值，必填')
                          )
                  );


              var form = $('<form/>').addClass('form-horizontal')
                  .attr('id', 'feature-boxing-menu')
                  .append(form_dataframe)
                  .append(form_variable)
                  .append(form_label)
                  .append(form_no_default)
                  .append(form_default)
                  .append(form_bins);


              dialog.modal({
                  title: i18n.msg._('Boxing'),
                  body: form,
                  keyboard_manager: keyboard_manager,
                  buttons: {
                      'Run': {
                          class: "btn-primary",
                          click: function () {
                              var Value = {
                                  "dataframe": $("#boxing-dataframe").val(),
                                  "variable": $("#boxing-variable").val(),
                                  "label": $("#boxing-label").val(),
                                  "no_default": $("#boxing-no_default").val(),
                                  "default": $("#boxing-default").val(),
                                  "bins": $("#boxing-bins").val(),
                                  "target": "boxing",
                              };

                              var now_cell = notebook.get_selected_cell();

                              var content = '# Feature boxing\n' +
                                  'import six\n' +
                                  'print(six.PY2)\n' +
                                  'print(six.PY3)\n' +
                                  'params = dict(\n' +
                                  '    dataframe="' +
                                  Value.dataframe +
                                  '",\n' +
                                  '    variable="' +
                                  Value.variable +
                                  '",\n' +
                                  '    label="' +
                                  Value.label +
                                  '",\n' +
                                  '    no_default=' +
                                  Value.no_default +
                                  ',\n' +
                                  '    default=' +
                                  Value.default +
                                  ',\n' +
                                  '    bins=' +
                                  Value.bins +
                                  '\n' +
                                  ')\n' +
                                  'params';

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