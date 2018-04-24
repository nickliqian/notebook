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
                              $('<select/>').addClass('form-control')
                                  .attr('id', 'RFE-estimator')
                                  .attr('name', 'RFE-estimator')
                                  .css("margin-left", "0px")
                                  .append(
                                      $('<option/>').text("LogisticRegression")
                                          .attr("value", "LogisticRegression")
                                  )
                          )
                  );

              var form = $('<form/>').addClass('form-horizontal')
                  .attr('id', 'model-RFE-menu')
                  .append(form_dataframe)
                  .append(form_to_select)
                  .append(form_label)
                  .append(form_feature)
                  .append(form_estimator)
                  .append(
                      $('<div/>').attr("id", "RFE_warning")
                          .css("color", "red")
                          .css("float", "right")
                          .css("padding-bottom", "5px")
                  );

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
                                  "feature": $("#RFE-feature").val() || "None",
                                  "estimator": $("#RFE-estimator").val(),
                                  "target": "RFE",
                              };

                              if(!(/(^[1-9]\d*$)/.test(Value.to_select))){
                                  $("#RFE_warning").text("参数to_select应为正整数");
                                  $("#feature-RFE-menu div label").css("color", "#000");
                                  $("[for=RFE-to_select]").css("color", "red");
                                  return false;
                              }

                              // 如果必选变量没有填写提交则无法提交
                              if (Value.dataframe===""){
                                  $("#RFE_warning").text("参数dataframe不能为空");
                                  $("#model-RFE-menu div label").css("color", "#000");
                                  $("[for=RFE-dataframe]").css("color", "red");
                                  return false;
                              }
                              if (Value.to_select===""){
                                  $("#RFE_warning").text("参数to_select不能为空");
                                  $("#model-RFE-menu div label").css("color", "#000");
                                  $("[for=RFE-to_select]").css("color", "red");
                                  return false;
                              }
                              if (Value.label===""){
                                  $("#RFE_warning").text("参数label不能为空");
                                  $("#model-RFE-menu div label").css("color", "#000");
                                  $("[for=RFE-label]").css("color", "red");
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

                              var content = '# Model RFE\n'+
                                  'import model as ml\n'+
                                  'ml.rfe_lr(dataframe=' +
                                  Value.dataframe +
                                  ',to_select="' +
                                  Value.to_select +
                                  '",label="' +
                                  Value.label +
                                  '",feature=' +
                                  Value.feature +
                                  ',estimator="' +
                                  Value.estimator +
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