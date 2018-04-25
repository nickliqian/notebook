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


              var form_data = $('<div/>').addClass('form-group')
                  .append(
                      $('<label/>').addClass('col-sm-2')
                          .addClass('control-label')
                          .attr('for', 'split-data')
                          .attr('title', '数据集名称，必填')
                          .text('data')
                  ).append(
                      $('<div/>').addClass('col-sm-1')
                  ).append(
                      $('<div/>').addClass('col-sm-8')
                          .append(
                              $('<input/>').addClass('form-control')
                                  .addClass('input-sm')
                                  .attr('id', 'split-data')
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
                  .append(form_data)
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
                                  "data": $("#split-data").val(),
                                  "ratio": $("#split-ratio").val() || "0.7",
                                  "seed": $("#split-seed").val() || "None",
                                  "target": "split",
                              };

                              function isInteger(obj){
                                  return typeof obj === 'number' && obj%1 === 0;      //是整数，则返回true，否则返回false
                              }

                              // 参数条件
                              // 如果必选变量没有填写提交则无法提交
                              if (Value.data==="" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.data)){
                                  $("#split_warning").text("参数data不能为空，应为不以数字开头且包含数字、字母、下划线的变量字符串");
                                  $("#feature-split-menu div label").css("color", "#000");
                                  $("[for=split-data]").css("color", "red");
                                  return false;
                              }
                              var ratio = parseFloat(Value.ratio);
                              if(Value.ratio <=0 || Value.ratio>=1 || isNaN(ratio)){
                                  $("#split_warning").text("参数ratio取值范围在0~1之间的浮点数，不填默认为0.7");
                                  $("#feature-split-menu div label").css("color", "#000");
                                  $("[for=split-ratio]").css("color", "red");
                                  return false;
                              }

                              if(!/^[0-9]+$/.test(Value.seed) && (Value.seed !== "None")){
                                  $("#split_warning").text("参数seed应为正整数");
                                  $("#feature-split-menu div label").css("color", "#000");
                                  $("[for=split-seed]").css("color", "red");
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
                                  'train,test=ft.split_data(data=' +
                                  Value.data +
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