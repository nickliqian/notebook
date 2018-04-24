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
                                  .attr('placeholder', '随机种子，可选')
                          )
                  );

              var form = $('<form/>').addClass('form-horizontal')
                  .attr('id', 'feature-split-menu')
                  .append(form_dataframe)
                  .append(form_ratio)
                  .append(form_seed)
                  .append(
                      $('<div/>').attr("id", "split_warning")
                          .css("color", "red")
                          .css("float", "right")
                          .css("padding-bottom", "5px")
                  );


              dialog.modal({
                  title: i18n.msg._('Split'),
                  body: form,
                  keyboard_manager: keyboard_manager,
                  buttons: {
                      'Run': {
                          class: "btn-primary",
                          click: function () {
                              var Value = {
                                  "dataframe": $("#split-dataframe").val(),
                                  "ratio": $("#split-ratio").val() || "0.7",
                                  "seed": $("#split-seed").val() || "None",
                                  "target": "split",
                              };

                              function isInteger(obj){
                                  return typeof obj === 'number' && obj%1 === 0;      //是整数，则返回true，否则返回false
                              }


                              // 参数条件
                              var ratio = parseFloat(Value.ratio);
                              if(Value.ratio <=0 || Value.ratio>=1 || isNaN(ratio)){
                                  $("#split_warning").text("参数ratio取值范围在0~1之间的浮点数");
                                  $("#feature-split-menu div label").css("color", "#000");
                                  $("[for=split-ratio]").css("color", "red");
                                  return false;
                              }
                              if(!(/(^[1-9]\d*$)/.test(Value.seed)) || Value.seed === "None"){
                                  $("#split_warning").text("参数seed应为正整数");
                                  $("#feature-split-menu div label").css("color", "#000");
                                  $("[for=split-seed]").css("color", "red");
                                  return false;
                              }

                              // 如果必选变量没有填写提交则无法提交
                              if (Value.dataframe===""){
                                  $("#split_warning").text("参数dataframe不能为空");
                                  $("#feature-split-menu div label").css("color", "#000");
                                  $("[for=split-dataframe]").css("color", "red");
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

                              var content = '# Feature Split\n'+
                                  'import feature as ft\n'+
                                  'train,test=ft.split_data(dataframe=' +
                                  Value.dataframe +
                                  ',ratio=' +
                                  Value.ratio +
                                  ',seed=' +
                                  Value.seed +
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