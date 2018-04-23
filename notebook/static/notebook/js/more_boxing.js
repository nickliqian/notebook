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

                              // 选择并移动到下一格 insert cell below
                              // notebook.insert_cell_below("code", null);
                              // notebook.select_next(true);
                              // notebook.focus_cell();

                              var abc = notebook.get_selected_cell();
                              // console.log(cell);
                              // console.log(cell.metadata);
                              // console.log(cell.source);
                              // console.log("===");
                              // console.log(abc);
                              // console.log(abc.source);
                              // console.log(JSON.stringify(abc));
                              // console.log("-==-==");


                              var content = '# Feature boxing\n' +
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

                              abc.set_text(content);
                              notebook.execute_cell_and_select_below();
                              notebook.save_checkpoint();


                              // console.log("=");
                              // console.log(notebook.get_selected_cell());
                              // console.log(notebook.get_selected_index());
                              // console.log(notebook.mode);
                              //
                              // // 选择并移动到下一格 insert cell below
                              // notebook.insert_cell_below("code", null);
                              // notebook.select_next(true);
                              // notebook.focus_cell();
                              //
                              // console.log("==");
                              // console.log(notebook.get_selected_cell());
                              // console.log(notebook.get_selected_index());
                              // console.log(notebook.mode);
                              //
                              // // 进入编辑模式 enter edit mode
                              // notebook.edit_mode();
                              // notebook.handle_edit_mode();
                              //
                              // console.log("===");
                              // console.log(notebook.get_selected_cell());
                              // console.log(notebook.get_selected_index());
                              // console.log(notebook.mode);

                              // notebook.ensure_focused();
                              // var cm = notebook.get_selected_cell().code_mirror;
                              // cm.setCursor(0, 0);

                              // notebook.select_next(true);
                              // notebook.focus_cell();
                              // var cell = notebook.get_selected_cell();
                              // notebook.edit_mode();
                              // notebook.handle_edit_mode(cell);

                              // var select_div = $("div[class='cell'][class='code_cell'][class='unrendered'][class='selected']");
                              // var e = $.Event("keypress");
                              // e.keyCode = 13;
                              // select_div.trigger(e);

                              // $.get("/api/importDefault", Value, function (data) {

                                  // notebook.restart_run_all(true);
                                  // window.location.reload();

                              // });

                              // window.location.reload();
                          }
                      }
                  }
              });

          });
      };

    return {load:load};


});