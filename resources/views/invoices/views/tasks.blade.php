@extends('invoices.show')
@section('section')
    <section class="section">
        <div class="section-body">
            @include('flash::message')
            <div class="card">
                <div class="card-header">
                    <div class="row w-100 justify-content-end">
                        <div class="justify-content-end">
                            {{ Form::select('status',$status,null,['class' => 'form-control', 'id' => 'filter_status', 'placeholder' => __('messages.placeholder.select_status')]) }}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    @include('tasks.table')
                </div>
            </div>
        </div>
    </section>
@endsection
