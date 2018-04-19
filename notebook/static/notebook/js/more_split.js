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

              var form_ratio = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'split-ratio')
                          .attr('title', '拆分比例，默认0.7，可选')
                          .text('ratio')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'split-ratio')
                                  .attr('type', 'text')
                                  .attr('placeholder', '拆分比例，默认0.7，可选')
                          )
                  );

              var form_seed = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'split-seed')
                          .attr('title', '随机种子，可选')
                          .text('seed')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'split-seed')
                                  .attr('type', 'text')
                                  .attr('placeholder', '标签变量名，必填')
                          )
                  );


              var form = $('<form/>').addClass('form-horizontal')
                  .attr('id', 'feature-split-menu')
                  .append(form_dataframe)
                  .append(form_ratio)
                  .append(form_seed);


              dialog.modal({
                  title: i18n.msg._('Split'),
                  body: form,
                  keyboard_manager: keyboard_manager,
                  buttons: {
                      'Run': {
                          class: "btn-primary",
                          click: function () {
                              var boxingValue = {
                                  "dataframe": $("#split-dataframe").val(),
                                  "variable": $("#split-ratio").val(),
                                  "label": $("#split-seed").val(),
                              };

                              // notebook.insert_cell_below("code", null);

                              // notebook.select_next(true);
                              // notebook.focus_cell();
                              // var cell = notebook.get_selected_cell();
                              // notebook.edit_mode();
                              // notebook.handle_edit_mode(cell);

                              // var select_div = $("div[class='cell'][class='code_cell'][class='unrendered'][class='selected']");
                              // var e = $.Event("keypress");
                              // e.keyCode = 13;
                              // select_div.trigger(e);

                              $.get("/api/importDefault", boxingValue, function (data) {

                                  // notebook.restart_run_all(true);
                                  // window.location.reload();

                              });

                              window.location.reload();
                          }
                      }
                  }
              });

          });
      };

    return {load:load};


});