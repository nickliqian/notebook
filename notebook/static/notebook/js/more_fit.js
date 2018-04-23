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
          $('#fit-menu').click(function () {


              var form_train = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'fit-train')
                          .attr('title', '训练数据集名称，必填')
                          .text('train')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'fit-train')
                                  .attr('type', 'text')
                                  .attr('placeholder', '训练数据集名称，必填')
                          )
                  );

              var form_test = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'fit-test')
                          .attr('title', '测试数据集名称，必填')
                          .text('test')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'fit-test')
                                  .attr('type', 'text')
                                  .attr('placeholder', '测试数据集名称，必填')
                          )
                  );

              var form_label = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'fit-label')
                          .attr('title', '标签变量名，必填')
                          .text('label')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'fit-label')
                                  .attr('type', 'text')
                                  .attr('placeholder', '标签变量名，必填')
                          )
                  );

              var form_algo = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'fit-algo')
                          .attr('title', '建模算法，必填')
                          .text('algo')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'fit-algo')
                                  .attr('type', 'text')
                                  .attr('placeholder', '建模算法，必填')
                          )
                  );

              var form_path = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'fit-path')
                          .attr('title', '上一个版本的模型结果文件路径，必填')
                          .text('path')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'fit-path')
                                  .attr('type', 'text')
                                  .attr('placeholder', '上一个版本的模型结果文件路径，必填')
                          )
                  );


              var form = $('<form/>').addClass('form-horizontal')
                  .attr('id', 'model-fit-menu')
                  .append(form_train)
                  .append(form_test)
                  .append(form_label)
                  .append(form_algo)
                  .append(form_path);


              dialog.modal({
                  title: i18n.msg._('fit'),
                  body: form,
                  keyboard_manager: keyboard_manager,
                  buttons: {
                      'Run': {
                          class: "btn-primary",
                          click: function () {
                              var Value = {
                                  "train": $("#fit-train").val() || "None",
                                  "test": $("#fit-test").val() || "None",
                                  "label": $("#fit-label").val() || "None",
                                  "algo": $("#fit-algo").val() || "None",
                                  "path": $("#fit-path").val() || "None",
                                  "target": "fit",
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

                              var content = '# Model Fit\n'+
                                  'import model as ml\n'+
                                  'ml.fit(' +
                                  Value.train +
                                  ',' +
                                  Value.test +
                                  ',' +
                                  Value.label +
                                  ',' +
                                  Value.algo +
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