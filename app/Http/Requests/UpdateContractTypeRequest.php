<?php

namespace App\Http\Requests;

use App\Models\ContractType;
use Illuminate\Foundation\Http\FormRequest;

class UpdateContractTypeRequest extends FormRequest
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
        $rules = ContractType::$rules;
        $rules['name'] = 'required|unique:contract_types,name,'.$this->route('contractType')->id;

        return $rules;
    }
}
