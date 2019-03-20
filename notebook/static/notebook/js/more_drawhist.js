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
    var load = function (keyboard_manager, notebook) {
        $('#draw-hist-menu').click(function () {

            var form_variable = $('<div/>').addClass('form-group')
                .append(
                    $('<label/>').addClass('col-sm-2')
                        .addClass('control-label')
                        .attr('for', 'draw_hist_variable')
                        .attr('title', 'dataframe变量名称，必填')
                        .text('variable')
                ).append(
                    $('<div/>').addClass('col-sm-1')
                ).append(
                    $('<div/>').addClass('col-sm-8')
                        .append(
                            $('<input/>').addClass('form-control')
                                .addClass('input-sm')
                                .attr('id', 'draw_hist_variable')
                                .attr('type', 'text')
                                .attr('placeholder', 'dataframe变量名称，必填')
                        )
                );

            var form_y_field = $('<div/>').addClass('form-group')
                .append(
                    $('<label/>').addClass('col-sm-2')
                        .addClass('control-label')
                        .attr('for', 'draw_hist_y_field')
                        .attr('title', 'y字段名称，必填')
                        .text('y')
                ).append(
                    $('<div/>').addClass('col-sm-1')
                ).append(
                    $('<div/>').addClass('col-sm-8')
                        .append(
                            $('<input/>').addClass('form-control')
                                .addClass('input-sm')
                                .attr('id', 'draw_hist_y_field')
                                .attr('type', 'text')
                                .attr('placeholder', 'y字段名称，必填')
                        )
                );

            var form_bins = $('<div/>').addClass('form-group')
                .append(
                    $('<label/>').addClass('col-sm-2')
                        .addClass('control-label')
                        .attr('for', 'draw_hist_bins')
                        .attr('title', 'bins，必填')
                        .text('x')
                ).append(
                    $('<div/>').addClass('col-sm-1')
                ).append(
                    $('<div/>').addClass('col-sm-8')
                        .append(
                            $('<input/>').addClass('form-control')
                                .addClass('input-sm')
                                .attr('id', 'draw_hist_bins')
                                .attr('type', 'text')
                                .attr('placeholder', 'bins，必填').val("[0, 18, 37, 50, 95]")
                        )
                );

            var form_rwidth = $('<div/>').addClass('form-group')
                .append(
                    $('<label/>').addClass('col-sm-2')
                        .addClass('control-label')
                        .attr('for', 'draw_hist_rwidth')
                        .attr('title', 'rwidth，必填')
                        .text('x')
                ).append(
                    $('<div/>').addClass('col-sm-1')
                ).append(
                    $('<div/>').addClass('col-sm-8')
                        .append(
                            $('<input/>').addClass('form-control')
                                .addClass('input-sm')
                                .attr('id', 'draw_hist_rwidth')
                                .attr('type', 'text')
                                .attr('placeholder', 'rwidth，必填').val("0.8")
                        )
                );

            var form = $('<form/>').addClass('form-horizontal')
                .attr('id', 'draw_hist_form')
                .append(form_variable)
                .append(form_y_field)
                .append(form_bins)
                .append(form_rwidth)
                .append(
                    $('<div/>').attr("id", "save_warning")
                        .css("color", "red")
                        .css("float", "right")
                        .css("padding-bottom", "5px")
                );


            dialog.modal({
                title: i18n.msg._('hist'),
                body: form,
                keyboard_manager: keyboard_manager,
                buttons: {
                    'Run': {
                        class: "btn-primary",
                        click: function () {
                            var Value = {
                                "variable": $("#draw_hist_variable").val(),
                                "y_field": $("#draw_hist_y_field").val(),
                                "bins": $("#draw_hist_bins").val(),
                                "rwidth": $("#draw_hist_rwidth").val(),
                                "target": "hist",
                            };


                            // 如果必选变量没有填写提交则无法提交
                            if (Value.variable === "" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.variable)) {
                                $("#save_warning").text("参数variable不能为空，应为不以数字开头且包含数字、字母、下划线的变量字符串");
                                $("#draw_hist_form div label").css("color", "#000");
                                $("[for=save-model]").css("color", "red");
                                return false;
                            }

                            if (Value.y_field === "" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.y_field)) {
                                $("#save_warning").text("参数y_field不能为空，应为不以数字开头且包含数字、字母、下划线的字符串");
                                $("#draw_hist_form div label").css("color", "#000");
                                $("[for=save-train]").css("color", "red");
                                return false;
                            }

                            var content, content_1, content_2;

                            content_1 = '# Draw Hist\n';
                            content_2 = 'sjs_load_data.draw_hist({0},value_field="{1}",bins="{2}",rwidth="{3}")\n'.format(Value.variable, Value.y_field, Value.bins, Value.rwidth);
                            content = content_1 + content_2;

                            // 获取当前行的状态，是否有内容
                            var before_cell = notebook.get_selected_cell();
                            var result = before_cell.get_text();

                            // 如果当前行状态为空则新建一行，并且置为选中状态
                            if (result !== "") {
                                // 新建一行
                                notebook.insert_cell_below();
                                notebook.select_next(true);
                                notebook.focus_cell();
                            }

                            var now_cell = notebook.get_selected_cell();

                            now_cell.set_text(content);
                            notebook.execute_cell_and_select_below();
                            notebook.save_checkpoint();
                        }
                    }
                }
            });

        });
    };

    return {load: load};


});