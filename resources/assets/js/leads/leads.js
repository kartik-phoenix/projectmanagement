'use strict';

$(document).ready(function () {

    $('#filter_status').
        select2({
            width: '140px',
        });

    $('#leadSourceId').select2({
        width: '160px',
    });
});

$(document).on('click', '.delete-btn', function (event) {
    let leadId = $(event.currentTarget).data('id');
    deleteItemLiveWire(route('leads.destroy', leadId), Lang.get('messages.common.lead'));
});

document.addEventListener('livewire:load', function (event) {
    Livewire.hook('message.processed', (message, component) => {
        let $owl = $('.owl-carousel');
        $owl.trigger('destroy.owl.carousel');

        $owl.html($owl.find('.owl-stage-outer').html()).
            removeClass('owl-loaded');
        livewireLoadOwel($owl);
    });
});

$(document).on('mouseenter', '.livewire-card', function () {
    $(this).find('.action-dropdown').removeClass('d-none');
});

$(document).on('mouseleave', '.livewire-card', function () {
    $(this).find('.action-dropdown').addClass('d-none');
    $(this).parent().trigger('click');
});

$(document).on('change', '#filter_status', function () {
    window.livewire.emit('filterStatus', $(this).val());
});

$(document).on('change', '#leadSourceId', function () {
    window.livewire.emit('filterLeadSource', $(this).val());
});
