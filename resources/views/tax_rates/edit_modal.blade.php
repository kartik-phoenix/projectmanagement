<div class="modal fade" tabindex="-1" role="dialog" id="editModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('messages.tax_rate.edit_tax_rate') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            {{ Form::open(['id' => 'editForm']) }}
            <div class="modal-body">
                <div class="alert alert-danger d-none" id="editValidationErrorsBox"></div>
                {{ Form::hidden('taxRateId', null, ['id' => 'taxRateId']) }}
                <div class="row">
                    <div class="form-group col-sm-12">
                        {{ Form::label('name',__('messages.common.name').':') }}<span class="required">*</span>
                        {{ Form::text('name', null, ['class' => 'form-control', 'required', 'id' => 'editName','autocomplete' => 'off','placeholder'=>__('messages.common.name')]) }}
                    </div>
                    <div class="form-group col-sm-12 mb-0">
                        {{ Form::label('taxRate', __('messages.tax_rate.tax_rate').'(%):') }}<span
                                class="required">*</span>
                        {{ Form::number('tax_rate', null, ['class' => 'form-control tax-rate', 'id' => 'editTaxRate', 'required', 'min' => '0', 'max' => '100', 'step'=>'any','placeholder'=>__('messages.tax_rate.tax_rate')]) }}
                    </div>
                </div>
                <div class="text-right mt-3">
                    {{ Form::button(__('messages.common.save'), ['type' => 'submit', 'class' => 'btn btn-primary', 'id' => 'btnEditSave', 'data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}
                    <button type="button" id="btnEditCancel" class="btn btn-light ml-1"
                            data-dismiss="modal">{{ __('messages.common.cancel') }}
                    </button>
                </div>
            </div>
            {{ Form::close() }}
        </div>
    </div>
</div>
