<div class="row">
    <div class="form-group col-sm-6">
        {{ Form::label('subject', __('messages.contract.subject').':') }}<span class="required">*</span>
        {{ Form::text('subject', null, ['class' => 'form-control','required','autocomplete' => 'off','placeholder'=>__('messages.contract.subject')]) }}
    </div>
    <div class="form-group col-sm-6">
        {{ Form::label('contract_type_id', __('messages.contract.contract_type_id').':') }}<span
                class="required">*</span>
        <div class="input-group">
            {{ Form::select('contract_type_id',$contractType, null, ['id'=>'contractTypeId','required','class' => 'form-control','placeholder' => __('messages.placeholder.select_contract_type')]) }}
            <div class="input-group-append plus-icon-height">
                <div class="input-group-text">
                    <a href="#" data-toggle="modal" data-target="#addContractTypeModal"><i class="fa fa-plus"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="form-group col-sm-6">
        {{ Form::label('customer_id', __('messages.contract.customer_id').':') }}<span class="required">*</span>
        {{ Form::select('customer_id',$customer, isset($customerId) ? $customerId : null, ['id'=>'customer','class' => 'form-control','required','placeholder' => __('messages.placeholder.select_customer')]) }}
    </div>
    <div class="form-group col-sm-6">
        {{ Form::label('contract_value', __('messages.contract.contract_value').':') }}
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <i class="{{ getCurrencyClass() }}"></i>
                </div>
            </div>
            {{ Form::text('contract_value', null, ['class' => 'form-control price-input','autocomplete' => 'off','placeholder'=> __('messages.contract.contract_value')]) }}
        </div>
    </div>
</div>
<div class="row">
    <div class="form-group col-sm-12 col-lg-6 col-md-12">
        {{ Form::label('start_date', __('messages.contract.start_date').':') }}
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <i class="fas fa-calendar-alt"></i>
                </div>
            </div>
            {{ Form::text('start_date', isset($contract->start_date) ? $contract->start_date : null, ['class' => 'form-control startDate','autocomplete' => 'off','placeholder'=> __('messages.contract.start_date')]) }}
        </div>
    </div>
    <div class="form-group col-sm-12 col-lg-6 col-md-12">
        {{ Form::label('end_date', __('messages.contract.end_date').':') }}
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <i class="fas fa-calendar-alt"></i>
                </div>
            </div>
            {{ Form::text('end_date', isset($contract->end_date) ? $contract->end_date : null, ['class' => 'form-control endDate','autocomplete' => 'off','placeholder'=>__('messages.contract.end_date')]) }}
        </div>
    </div>
</div>
<div class="row">
    <div class="form-group col-sm-12 mb-0">
        {{ Form::label('description',__('messages.contract.description').':') }}
        {{ Form::textarea('description', null, ['class' => 'form-control summernote-simple', 'id' => 'contractDescription']) }}
    </div>
</div>
<div class="row">
    <div class="form-group col-sm-12">
        {{ Form::button(__('messages.common.save'), ['type'=>'submit','class' => 'btn btn-primary', 'id' => 'btnSave','data-loading-text'=>"<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}
        <a href="{{ route('contracts.index') }}"
           class="btn btn-secondary text-dark">{{ __('messages.common.cancel') }}</a>
    </div>
</div>

