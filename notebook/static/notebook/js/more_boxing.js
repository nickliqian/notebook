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
                          .attr('title', '数据集，必填')
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
                  .append(form_bins)
                  .append(
                      $('<div/>').attr("id", "boxing_warning")
                          .css("color", "red")
                          .css("float", "right")
                          .css("padding-bottom", "5px")
                  );


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


                              // 参数条件
                              if(isNaN(Number(Value.no_default))){
                                  Value.no_default='"'+ Value.no_default +'"';
                              }
                              if(isNaN(Number(Value.default))){
                                  Value.default='"'+ Value.default +'"';
                              }
                              if(/^[a-zA-Z]/.test(Value.bins)){
                                  $("#boxing_warning").text("参数bins应为int或list类型");
                                  $("#feature-boxing-menu div label").css("color", "#000");
                                  $("[for=boxing-bins]").css("color", "red");
                                  return false;
                              }

                              // 如果必选变量没有填写提交则无法提交
                              if (Value.dataframe===""){
                                  $("#boxing_warning").text("参数dataframe不能为空和包含非法字符");
                                  $("#feature-boxing-menu div label").css("color", "#000");
                                  $("[for=boxing-dataframe]").css("color", "red");
                                  return false;
                              }
                              if (Value.variable===""){
                                  $("#boxing_warning").text("参数variable不能为空");
                                  $("#feature-boxing-menu div label").css("color", "#000");
                                  $("[for=boxing-variable]").css("color", "red");
                                  return false;
                              }
                              if (Value.label===""){
                                  $("#boxing_warning").text("参数label不能为空");
                                  $("#feature-boxing-menu div label").css("color", "#000");
                                  $("[for=boxing-label]").css("color", "red");

                                  return false;
                              }
                              if (Value.no_default===""){
                                  $("#boxing_warning").text("参数no_default不能为空");
                                  $("#feature-boxing-menu div label").css("color", "#000");
                                  $("[for=boxing-no_default]").css("color", "red");
                                  return false;
                              }
                              if (Value.default===""){
                                  $("#boxing_warning").text("参数default不能为空");
                                  $("#feature-boxing-menu div label").css("color", "#000");
                                  $("[for=boxing-default]").css("color", "red");
                                  return false;
                              }
                              if (Value.bins===""){
                                  $("#boxing_warning").text("参数bins不能为空");
                                  $("#feature-boxing-menu div label").css("color", "#000");
                                  $("[for=boxing-bins]").css("color", "red");
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

                              // 选中当前行cell对象
                              var now_cell = notebook.get_selected_cell();

                              var content = '# Feature Boxing\n'+
                                  'import feature as ft\n' +
                                  'ft.split_box(dataframe=' +
                                  Value.dataframe +
                                  ',variable="' +
                                  Value.variable +
                                  '",label="' +
                                  Value.label +
                                  '",no_default=' +
                                  Value.no_default +
                                  ',default="' +
                                  Value.default +
                                  '",bins="' +
                                  Value.bins +
                                  '")';

                              now_cell.set_text(content);

                              // 执行当前选中行并保存
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