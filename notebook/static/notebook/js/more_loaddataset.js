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

            // var result = function (success, error) {
            //     utils.ajax("http://127.0.0.1:8888/api/dataset_list", {
            //         processData: false,
            //         cache: false,
            //         type: "GET",
            //         dataType: "json",
            //         success: success,
            //         error: error,
            //     });
            // };

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

                    var form = $('<form/>').addClass('form-horizontal')
                        .attr('id', 'dataset-load-menu')
                        .append(form_variable)
                        .append(form_data_choose)
                        .append(
                            $('<div/>').attr("id", "load_warning")
                                .css("color", "red")
                                .css("float", "right")
                                .css("padding-bottom", "5px")
                        );


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
                                        "target": "save",
                                    };

                                    // 如果必选变量没有填写提交则无法提交
                                    if (Value.variable === "" || !/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(Value.model)) {
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
                                    var con_params = JSON.parse(item_data.connParams);  // 连接信息

                                    var host = /sqlserver:\/\/(.*?):/.exec(con_params.url)[1];
                                    var port = /:\/\/.*?:(.*?);database/.exec(con_params.url)[1];
                                    var username = con_params.user;
                                    var password = con_params.password;
                                    var database = /database=(.*?)$/.exec(con_params.url)[1];
                                    var tablename = item_data.tableName;

                                    var content = '# load dataset\n' +
                                        'import pymssql\n' +
                                        'conn = pymssql.connect(host="' + host + '", port=' + port + ' ,user="' + username + '", password="' + password + '", database="' + database + '")\n' +
                                        '' + Value.variable + ' = pd.read_sql("select * from ' + tablename + '",con=conn)\n' +
                                        'conn.close()\n';

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


                },
                dataType: "json"
            });


        });
    };

    return {load: load};


});