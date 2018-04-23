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
                              var Value = {
                                  "dataframe": $("#split-dataframe").val() || "None",
                                  "ratio": $("#split-ratio").val() || "None",
                                  "seed": $("#split-seed").val() || "None",
                                  "target": "split",
                              };

                              // 获取当前行的状态，是否有内容
                              var before_cell = notebook.get_selected_cell();
                              var result = before_cell.get_text();

                              // 如果当前行状态为空则新建一行，并且置为选中状态
                              if (result!=="") {
                                  // 新建一行
                                  notebook.insert_cell_below();
                                  notebook.select_next(true);
                                  notebook.focus_cell();
                              }

                              var now_cell = notebook.get_selected_cell();

                              var content = '# Feature Split\n'+
                                  'import feature as ft\n'+
                                  'train,test=ft.split_data(' +
                                  Value.dataframe +
                                  ',' +
                                  Value.ratio +
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