'use strict';

let tableName = '#articleGroupsTable';
$(tableName).DataTable({
    oLanguage: {
        'sEmptyTable': Lang.get('messages.common.no_data_available_in_table'),
        'sInfo': Lang.get('messages.common.data_base_entries'),
        sLengthMenu: Lang.get('messages.common.menu_entry'),
        sInfoEmpty: Lang.get('messages.common.no_entry'),
        sInfoFiltered: Lang.get('messages.common.filter_by'),
        sZeroRecords: Lang.get('messages.common.no_matching'),
    },
    processing: true,
    serverSide: true,
    'order': [[4, 'asc']],
    ajax: {
        url: route('article-groups.index'),
    },
    columnDefs: [
        {
            'targets': [5],
            'orderable': false,
            'className': 'text-center',
            'width': '2%',
        },
        {
            'targets': [2],
            render: function (data) {
                return data.length > 60 ?
                    data.substr(0, 60) + '...' :
                    data;
            },
        },
        {
            'targets': [3],
            'width': '2%',
            'className': 'text-center',
            'searchable': false,
        },
        {
            'targets': [4],
            'width': '2%',
            'className': 'text-right',
        },
        {
            'targets': [1],
            'width': '3%',
            'orderable': false,
        },
        {
            'targets': [0],
            'width': '10%',
        },
        {
            'targets': [2],
            'width': '25%',
        },
        {
            targets: '_all',
            defaultContent: 'N/A',
        },
    ],
    columns: [
        {
            data: function (row) {
                let element = document.createElement('textarea');
                element.innerHTML = row.group_name;
                return element.value;
            },
            name: 'group_name',
        },
        {
            data: function (row) {
                let data = [{ 'color': row.color ,'colorStyle' : 'style'}];
                return prepareTemplateRender('#articleGroupColorBox', data);
            }, name: 'color',
        },
        {
            data: function (row) {
                if (!isEmpty(row.description)) {
                    let element = document.createElement('textarea');
                    element.innerHTML = row.description;
                    return element.value;
                } else
                    return 'N/A';
            },
            name: 'description',
        },
        {
            data: 'articles_count',
            name: 'articles_count',
        },
        {
            data: 'order',
            name: 'order',
        },
        {
            data: function (row) {
                let data = [{ 'id': row.id }];
                return prepareTemplateRender('#articleGroupActionTemplate',
                    data);
            }, name: 'id',
        },
    ],
});

const pickr = Pickr.create({
    el: '.color-wrapper',
    theme: 'nano', // or 'monolith', or 'nano'
    closeWithKey: 'Enter',
    autoReposition: true,
    defaultRepresentation: 'HEX',
    position: 'bottom-end',
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(3, 169, 244, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)',
    ],

    components: {
        // Main components
        preview: true,
        hue: true,

        // Input / output Options
        interaction: {
            input: true,
            clear: false,
            save: false,
        },
    },
});

const editPickr = Pickr.create({
    el: '.color-wrapper',
    theme: 'nano', // or 'monolith', or 'nano'
    closeWithKey: 'Enter',
    autoReposition: true,
    defaultRepresentation: 'HEX',
    position: 'bottom-end',
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(3, 169, 244, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)',
    ],

    components: {
        // Main components
        preview: true,
        hue: true,

        // Input / output Options
        interaction: {
            input: true,
            clear: false,
            save: false,
        },
    },
});

pickr.on('change', function () {
    const color = pickr.getColor().toHEXA().toString();
    if (wc_hex_is_light(color)) {
        $('#validationErrorsBoxForColor').
            addClass('d-block').
            text('Pick a different color');
        $(':input[id="btnSave"]').prop('disabled', true);
        return;
    }
    $('#validationErrorsBoxForColor').removeClass('d-block');
    $(':input[id="btnSave"]').prop('disabled', false);
    pickr.setColor(color);
    $('#color').val(color);
});

editPickr.on('change', function () {
    const editColor = editPickr.getColor().toHEXA().toString();
    if (wc_hex_is_light(editColor)) {
        $('#editValidationErrorsBoxForColor').
            addClass('d-block').
            text('Pick a different color');
        $(':input[id="btnEditSave"]').prop('disabled', true);
        return;
    }
    $('#editValidationErrorsBoxForColor').removeClass('d-block');
    $(':input[id="btnEditSave"]').prop('disabled', false);
    editPickr.setColor(editColor);
    $('#edit_color').val(editColor);
});

function wc_hex_is_light (color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 240;
}

let picked = false;

$(document).on('click', '#color', function () {
    picked = true;
});

$(document).on('submit', '#addNewForm', function (e) {

    if ($('#color').val() == '') {
        displayErrorMessage('Please select your color.');
        return false;
    }

    e.preventDefault();
    processingBtn('#addNewForm', '#btnSave', 'loading');

    let description = $('<div />').
        html($('#createDescription').summernote('code'));
    let empty = description.text().trim().replace(/ \r\n\t/g, '') === '';

    if ($('#createDescription').summernote('isEmpty')) {
        $('#createDescription').val('');
    } else if (empty) {
        displayErrorMessage(
            'Description field is not contain only white space');
        processingBtn('#addNewForm', '#btnSave', 'reset');
        return false;
    }

    $.ajax({
        url: route('article-groups.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addModal').modal('hide');
                $('#articleGroupsTable').DataTable().ajax.reload(null, false);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addNewForm', '#btnSave');
        },
    });
});

$(document).on('click', '.edit-btn', function (event) {
    let articleGroupId = $(event.currentTarget).data('id');
    renderData(articleGroupId);
});

window.renderData = function (id) {
    $.ajax({
        url: route('article-groups.edit', id),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#articleGroupId').val(result.data.id);
                let element = document.createElement('textarea');
                element.innerHTML = result.data.group_name;
                $('#editGroupName').val(element.value);
                editPickr.setColor(result.data.color);
                $('#editDescription').
                    summernote('code', result.data.description);
                $('#editOrder').val(result.data.order);
                $('#editModal').appendTo('body').modal('show');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};

$(document).on('submit', '#editForm', function (event) {
    event.preventDefault();
    processingBtn('#editForm', '#btnEditSave', 'loading');

    let editDescription = $('<div />').
        html($('#editDescription').summernote('code'));
    let empty = editDescription.text().trim().replace(/ \r\n\t/g, '') === '';

    if ($('#editDescription').summernote('isEmpty')) {
        $('#editDescription').val('');
    } else if (empty) {
        displayErrorMessage(
            'Description field is not contain only white space');
        processingBtn('#editForm', '#btnEditSave', 'reset');
        return false;
    }

    let id = $('#articleGroupId').val();

    $.ajax({
        url: route('article-groups.update', id),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editModal').modal('hide');
                $('#articleGroupsTable').DataTable().ajax.reload(null, false);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editForm', '#btnEditSave');
        },
    });
});

$(document).on('click', '.delete-btn', function (event) {
    let articleGroupId = $(event.currentTarget).data('id');
    deleteItem(route('article-groups.destroy', articleGroupId),
        '#articleGroupsTable',
        Lang.get('messages.common.article_group'));
});

$('#addModal').on('show.bs.modal', function () {
    $('.note-toolbar-wrapper').removeAttr('style');
    $('.note-toolbar').removeAttr('style');
    pickr.setColor('#3F51B5');
});

$('#editModal').on('show.bs.modal', function () {
    $('.note-toolbar-wrapper').removeAttr('style');
    $('.note-toolbar').removeAttr('style');
});

$('#addModal').on('hidden.bs.modal', function () {
    pickr.setColor('#000');
    resetModalForm('#addNewForm', '#validationErrorsBox');
    $('#createDescription').summernote('code', {
        placeholder:Lang.get('messages.common.description'),
    });
    pickr.hide();
});

$('#editModal').on('hidden.bs.modal', function () {
    resetModalForm('#editForm', '#editValidationErrorsBox');
    editPickr.hide();
});
