/**
 * Created by python on 2019-03-18.
 */
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
define([
    'jquery',
    'base/js/dialog',
    'base/js/i18n',
    'underscore',
    'base/js/utils',
], function ($, dialog, i18n, _, utils) {
    'use strict';
    var load = function (keyboard_manager, notebook) {
        $('#load-dataset').click(function () {

            var result = {};
            $.ajax({
                type: 'GET',
                url: "/api/dataset_list",
                success: function (data) {
                    result = data;
                    var items = data.list;

                    var form_table = $('<table border="1" id="load_dataset_table" width="100%"/>');
                    form_table.append(
                        $('<th style="text-align:center;vertical-align:middle;padding:5px;"/>').text("选择数据源")
                    ).append(
                        $('<th style="text-align:center;vertical-align:middle;padding:5px;"/>').text("数据源名称")
                    ).append(
                        $('<th style="text-align:center;vertical-align:middle;padding:5px;"/>').text("数据源类别")
                    ).append(
                        $('<th style="text-align:center;vertical-align:middle;padding:5px;"/>').text("创建时间")
                    ).append(
                        $('<th style="text-align:center;vertical-align:middle;padding:5px;"/>').text("更新时间")
                    );

                    for (var i = 0; i < items.length; i++) {
                        form_table.append(
                            $('<tr/>').append(
                                $('<td/>').append(
                                    $('<input type="radio" name="radioSource" id="radioSource" style="text-align:center;"/>').val(i)
                                )
                            ).append(
                                $('<td style="padding:5px;text-align:center;"/>').text(items[i].sourceName)
                            ).append(
                                $('<td style="padding:5px;text-align:center;"/>').text(items[i].category)
                            ).append(
                                $('<td style="padding:5px;text-align:center;"/>').text(items[i].createTime)
                            ).append(
                                $('<td style="padding:5px;text-align:center;"/>').text(items[i].updateTime)
                            )
                        );
                    }


                    var form_data_choose = $('<div/>').addClass('form-group').append(
                        $('<div/>').addClass('col-sm-1')
                    ).append(
                        $('<div/>').addClass('col-sm-10').append(
                            form_table
                        )
                    ).append(
                        $('<div/>').addClass('col-sm-1')
                    );

                    var form_variable = $('<div/>').addClass('form-group')
                        .append(
                            $('<label/>').addClass('col-sm-2')
                                .addClass('control-label')
                                .attr('for', 'variable-load-dataset')
                                .attr('title', 'dataframe变量名称，必填')
                                .text('variable')
                        ).append(
                            $('<div/>').addClass('col-sm-1')
                        ).append(
                            $('<div/>').addClass('col-sm-8')
                                .append(
                                    $('<input/>').addClass('form-control')
                                        .addClass('input-sm')
                                        .attr('id', 'variable-load-dataset')
                                        .attr('type', 'text')
                                        .attr("value", "mydf")
                                        .attr('placeholder', 'dataframe变量名称，必填')
                                )
                        );

                    var form_select = $('<select style="text-align:center;vertical-align:middle;padding:5px;"/>');
                    var type_list = ["ALL", "File", "MySQL", "Hbase", "sqlserver", "hive", "kafka", "neo4j"];
                    for (var i = 0; i < type_list.length; i++) {
                        form_select.append(
                            $("<option/>").val(type_list[i]).text(type_list[i])
                        )
                    }

                    var form_search = $('<div/>').addClass('form-group')
                        .append(
                            $('<label/>').addClass('col-sm-2')
                                .addClass('control-label')
                                .attr('for', 'variable-load-dataset')
                                .attr('title', '按数据源名称进行搜索')
                                .text('search')
                        ).append(
                            $('<div/>').addClass('col-sm-1')
                        ).append(
                            $('<div/>').addClass('col-sm-4')
                                .append(
                                    $('<input/>').addClass('form-control')
                                        .addClass('input-sm')
                                        .attr('id', 'variable-load-dataset')
                                        .attr('type', 'text')
                                        .attr('placeholder', '按数据源名称进行搜索')
                                )
                        ).append(
                            $('<div/>').addClass('col-sm-1')
                        ).append(
                            $('<div/>').addClass('col-sm-1')
                                .append(form_select)
                        ).append(
                            $('<div/>').addClass('col-sm-1')
                        ).append(
                            $('<div/>').addClass('col-sm-1').attr('id', 'dataset-search-button')
                                .append(
                                    $('<button/>')
                                        .addClass("btn btn-default btn-sm btn-primary")
                                        .text("Search")
                                )
                        );

                    var form = $('<form/>').addClass('form-horizontal')
                        .attr('id', 'dataset-load-menu')
                        .append(form_variable)
                        // .append(form_search)
                        .append(form_data_choose)
                        .append(
                            $('<div/>').attr("id", "load_warning")
                                .css("color", "red")
                                .css("float", "right")
                                .css("padding-bottom", "5px")
                        );

                    // $('#dataset-search-button').click(function () {
                    //     console.log("test search");
                    // });

                    dialog.modal({
                        title: i18n.msg._('load'),
                        body: form,
                        keyboard_manager: keyboard_manager,
                        buttons: {
                            'Run': {
                                class: "btn-primary",
                                click: function () {
                                    var Value = {
                                        "variable": $("#variable-load-dataset").val(),
                                        "data_source": $("input[name='radioSource']:checked").val(),
                                        "target": "load",
                                    };

                                    // 如果必选变量没有填写提交则无法提交
                                    if (Value.variable === "" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.variable)) {
                                        $("#load_warning").text("参数data_source不能为空，应为不以数字开头且包含数字、字母、下划线的变量字符串");
                                        $("#dataset-load-menu div label").css("color", "#000");
                                        $("[for=variable-load-dataset]").css("color", "red");
                                        return false;
                                    }
                                    if (Value.data_source === undefined) {
                                        $("#load_warning").text("请选择数据源");
                                        return false;
                                    }

                                    var item_data = items[Value.data_source];  // 数据源相关信息
                                    var source_id = item_data.sourceId;

                                    var content, content1, content2, content3;
                                    content1 = '# load dataset\n';
                                    content2 = '{0}=sjs_load_data.load_data_set({1})\n'.format(Value.variable, source_id);
                                    content3 = '{0}\n'.format(Value.variable);
                                    content = content1 + content2 + content3;
                                    console.log(content);

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
                                    notebook.select_next(true);
                                    notebook.focus_cell();
                                }
                            }
                        }
                    });


                },
                dataType: "json"
            });

        });
    };

    return {load: load};


});