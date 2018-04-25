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
          $('#save-menu').click(function () {


              var form_model = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'save-model')
                          .attr('title', '建模完的模型变量，必填')
                          .text('model')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'save-model')
                                  .attr('type', 'text')
                                  .attr('placeholder', '建模完的模型变量，必填')
                          )
                  );

              var form_train = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'save-train')
                          .attr('title', '训练数据集名称，必填')
                          .text('train')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'save-train')
                                  .attr('type', 'text')
                                  .attr('placeholder', '训练数据集名称，必填')
                          )
                  );

              var form_test = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'save-test')
                          .attr('title', '测试数据集名称，必填')
                          .text('test')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'save-test')
                                  .attr('type', 'text')
                                  .attr('placeholder', '测试数据集名称，必填')
                          )
                  );

              var form_label = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'save-label')
                          .attr('title', '标签变量名，必填')
                          .text('label')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'save-label')
                                  .attr('type', 'text')
                                  .attr('placeholder', '标签变量名，必填')
                          )
                  );

              var form_path = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'save-path')
                          .attr('title', '保存模型结果的文件路径，必填')
                          .text('path')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'save-path')
                                  .attr('type', 'text')
                                  .attr('placeholder', '保存模型结果的文件路径，必填')
                          )
                  );


              var form = $('<form/>').addClass('form-horizontal')
                  .attr('id', 'model-save-menu')
                  .append(form_model)
                  .append(form_train)
                  .append(form_test)
                  .append(form_label)
                  .append(form_path)
                  .append(
                      $('<div/>').attr("id", "save_warning")
                          .css("color", "red")
                          .css("float", "right")
                          .css("padding-bottom", "5px")
                  );


              dialog.modal({
                  title: i18n.msg._('save'),
                  body: form,
                  keyboard_manager: keyboard_manager,
                  buttons: {
                      'Run': {
                          class: "btn-primary",
                          click: function () {
                              var Value = {
                                  "model": $("#save-model").val(),
                                  "train": $("#save-train").val(),
                                  "test": $("#save-test").val(),
                                  "label": $("#save-label").val(),
                                  "path": $("#save-path").val(),
                                  "target": "save",
                              };


                              // 如果必选变量没有填写提交则无法提交
                              if (Value.model==="" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.model)){
                                  $("#save_warning").text("参数model不能为空，应为不以数字开头且包含数字、字母、下划线的变量字符串");
                                  $("#model-save-menu div label").css("color", "#000");
                                  $("[for=save-model]").css("color", "red");
                                  return false;
                              }
                              if (Value.train==="" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.train)){
                                  $("#save_warning").text("参数train不能为空，应为不以数字开头且包含数字、字母、下划线的字符串");
                                  $("#model-save-menu div label").css("color", "#000");
                                  $("[for=save-train]").css("color", "red");
                                  return false;
                              }
                              if (Value.test==="" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.test)){
                                  $("#save_warning").text("参数test不能为空，应为不以数字开头且包含数字、字母、下划线的字符串");
                                  $("#model-save-menu div label").css("color", "#000");
                                  $("[for=save-test]").css("color", "red");
                                  return false;
                              }
                              if (Value.label==="" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.label)){
                                  $("#save_warning").text("参数label不能为空，应为不以数字开头且包含数字、字母、下划线的字符串");
                                  $("#model-save-menu div label").css("color", "#000");
                                  $("[for=save-label]").css("color", "red");
                                  return false;
                              }
                              if (Value.path===""){
                                  $("#save_warning").text("参数path不能为空");
                                  $("#model-save-menu div label").css("color", "#000");
                                  $("[for=save-path]").css("color", "red");
                                  return false;
                              }


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

                              var content = '# Model Save\n'+
                                  'import model as ml\n'+
                                  'ml.save(model=' +
                                  Value.model +
                                  ',train=' +
                                  Value.train +
                                  ',test=' +
                                  Value.test +
                                  ',label="' +
                                  Value.label +
                                  '",path="' +
                                  Value.path +
                                  '")';

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