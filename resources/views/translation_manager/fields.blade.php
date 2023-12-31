<div class="card-header d-flex">
    {{--    <div class="d-flex mobile-mb">--}}
    {{--        {{  Form::select('translate_language', $allLanguagesArr, $selectedLang, ['class' => 'form-control translateLanguage w-100', 'placeholder' => __('messages.placeholder.select_language')]) }}--}}
    {{--    </div>--}}
    <div class="subFolderFiles">
        {{  Form::select('file_name', $allFiles, $selectedFile, ['class' => 'form-control w-100', 'placeholder' => __('messages.placeholder.select_file'),'id'=>'subFolderFiles']) }}
    </div>
    <div class="section-header-breadcrumb ml-auto mobile-btn-mt">
        <button type="submit" class="btn btn-primary form-btn">
            {{ __('messages.common.save') }}
        </button>
    </div>
</div>
<div class="card-body">
    <div class="row">
        @foreach($languages as $key => $value)
            @if(!is_array($value))
                <div class="col-lg-4 col-md-6 mb-4">
                    <label>{{ str_replace('_',' ',ucfirst($key)) }} :</label>
                    <input type="text" class="form-control" name="{{$key}}" value="{{ $value }}"/>
                </div>
            @else
                @foreach($value as $nestedKey => $nestedValue)
                    @if(!is_array($nestedValue))
                        <div class="col-lg-4 col-md-6 mb-4">
                            <label>{{ str_replace('_',' ',ucfirst($nestedKey)) }} :</label>
                            <input type="text" class="form-control" name="{{$key}}[{{$nestedKey}}]"
                                   value="{{ $nestedValue }}"/>
                        </div>
                    @endif
                @endforeach
            @endif
        @endforeach
    </div>
</div>
