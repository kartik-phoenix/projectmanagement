<?php

namespace App\Http\Requests;

use App\Models\ItemGroup;
use Illuminate\Foundation\Http\FormRequest;

class UpdateItemGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = ItemGroup::$rules;
        $rules['name'] = 'required|unique:item_groups,name,'.$this->route('itemGroup')->id;

        return $rules;
    }
}
