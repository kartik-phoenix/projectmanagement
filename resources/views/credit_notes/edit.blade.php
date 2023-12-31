@extends('layouts.app')
@section('title')
    {{ __('messages.credit_notes') }}
@endsection
@section('page_css')
    <link href="{{ asset('assets/css/jquery.dataTables.min.css') }}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ asset('assets/css/bs4-summernote/summernote-bs4.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/select2.min.css') }}">
    <link href="{{ asset('css/bootstrap-datetimepicker.css') }}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ mix('assets/css/credit_notes/credit_notes.css') }}">
@endsection
@section('content')
    <section class="section">
        <div class="section-header">
            <h1>{{ __('messages.credit_note.edit_credit_note') }}</h1>
            <div class="section-header-breadcrumb">
                <a href="{{ url()->previous() }}" class="btn btn-primary form-btn float-right-mobile">
                    {{ __('messages.common.back') }}
                </a>
            </div>
        </div>
        <div class="section-body">
            @include('layouts.errors')
            <div class="card">
                {{ Form::open(['route' => ['credit-notes.update', $creditNote->id], 'validated' => false, 'method' => 'POST', 'id' => 'editCreditNoteForm']) }}
                @include('credit_notes.address_modal')
                @include('credit_notes.edit_fields')
                {{ Form::close() }}
            </div>
        </div>
    </section>
    @include('credit_notes.address_modal')
    @include('credit_notes.templates.templates')
@endsection
@section('page_scripts')
    <script src="{{ asset('assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ mix('assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ mix('assets/js/bs4-summernote/summernote-bs4.js') }}"></script>
    <script src="{{ asset('js/bootstrap-datetimepicker.min.js') }}"></script>
    <script src="{{ mix('assets/js/select2.min.js') }}"></script>
@endsection
@section('scripts')
    <script>
        let editData = true;
        let creditNoteEdit = true;
        let taxData = JSON.parse('@json($data['taxes'])');
        let editCreditNoteAddress = true;
        let customerURL = "{{ route('get.customer.address') }}";
    </script>
    <script src="{{ mix('assets/js/sales/sales.js') }}"></script>
    <script src="{{ mix('assets/js/custom/input-price-format.js') }}"></script>
    <script src="{{ mix('assets/js/credit-notes/credit-notes.js') }}"></script>
@endsection
