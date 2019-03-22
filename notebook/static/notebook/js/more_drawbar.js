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
        $('#draw-bar-menu').click(function () {

            var form_variable = $('<div/>').addClass('form-group')
                .append(
                    $('<label/>').addClass('col-sm-2')
                        .addClass('control-label')
                        .attr('for', 'draw_bar_variable')
                        .attr('title', 'dataframe变量名称，必填')
                        .text('variable')
                ).append(
                    $('<div/>').addClass('col-sm-1')
                ).append(
                    $('<div/>').addClass('col-sm-8')
                        .append(
                            $('<input/>').addClass('form-control')
                                .addClass('input-sm')
                                .attr('id', 'draw_bar_variable')
                                .attr('type', 'text')
                                .attr('placeholder', 'dataframe变量名称，必填')
                        )
                );

            var form_x_field = $('<div/>').addClass('form-group')
                .append(
                    $('<label/>').addClass('col-sm-2')
                        .addClass('control-label')
                        .attr('for', 'draw_bar_x_field')
                        .attr('title', 'x字段名称，留空表示使用索引')
                        .text('x')
                ).append(
                    $('<div/>').addClass('col-sm-1')
                ).append(
                    $('<div/>').addClass('col-sm-8')
                        .append(
                            $('<input/>').addClass('form-control')
                                .addClass('input-sm')
                                .attr('id', 'draw_bar_x_field')
                                .attr('type', 'text')
                                .attr('placeholder', 'x字段名称，留空表示使用索引')
                        )
                );
            var form_y_field = $('<div/>').addClass('form-group')
                .append(
                    $('<label/>').addClass('col-sm-2')
                        .addClass('control-label')
                        .attr('for', 'draw_bar_y_field')
                        .attr('title', 'y字段名称，必填')
                        .text('y')
                ).append(
                    $('<div/>').addClass('col-sm-1')
                ).append(
                    $('<div/>').addClass('col-sm-8')
                        .append(
                            $('<input/>').addClass('form-control')
                                .addClass('input-sm')
                                .attr('id', 'draw_bar_y_field')
                                .attr('type', 'text')
                                .attr('placeholder', 'y字段名称，必填')
                        )
                );

            var form = $('<form/>').addClass('form-horizontal')
                .attr('id', 'draw_bar_form')
                .append(form_variable)
                .append(form_x_field)
                .append(form_y_field)
                .append(
                    $('<div/>').attr("id", "save_warning")
                        .css("color", "red")
                        .css("float", "right")
                        .css("padding-bottom", "5px")
                );


            dialog.modal({
                title: i18n.msg._('bar'),
                body: form,
                keyboard_manager: keyboard_manager,
                buttons: {
                    'Run': {
                        class: "btn-primary",
                        click: function () {
                            var Value = {
                                "variable": $("#draw_bar_variable").val(),
                                "x_field": $("#draw_bar_x_field").val(),
                                "y_field": $("#draw_bar_y_field").val(),
                                "target": "bar",
                            };


                            // 如果必选变量没有填写提交则无法提交
                            if (Value.variable === "" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.variable)) {
                                $("#save_warning").text("参数variable不能为空，应为不以数字开头且包含数字、字母、下划线的变量字符串");
                                $("#draw_bar_form div label").css("color", "#000");
                                $("[for=save-model]").css("color", "red");
                                return false;
                            }
                            if (Value.x_field === "") {

                            } else {
                                if (Value.x_field === "" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.x_field)) {
                                    $("#save_warning").text("参数x_field不能为空，应为不以数字开头且包含数字、字母、下划线的字符串");
                                    $("#draw_bar_form div label").css("color", "#000");
                                    $("[for=save-train]").css("color", "red");
                                    return false;
                                }
                            }

                            if (Value.y_field === "" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.y_field)) {
                                $("#save_warning").text("参数y_field不能为空，应为不以数字开头且包含数字、字母、下划线的字符串");
                                $("#draw_bar_form div label").css("color", "#000");
                                $("[for=save-train]").css("color", "red");
                                return false;
                            }

                            var content, content_1, content_2;
                            if (Value.x_field === "") {
                                content_1 = '# Draw Bar\n';
                                content_2 = 'sjs_load_data.draw_bar({0},y_field="{1}")\n'.format(Value.variable,Value.y_field);
                                content = content_1 + content_2
                            } else {
                                content_1 = '# Draw Bar\n';
                                content_2 = 'sjs_load_data.draw_bar({0},x_field="{1}",y_field="{2}")\n'.format(Value.variable,Value.x_field,Value.y_field);
                                content = content_1 + content_2
                            }

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