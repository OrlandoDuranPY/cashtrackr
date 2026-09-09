<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols(),
                // ->uncompromised()
            ],
        ];
    }

    public function messages(): array
    {
        return [
            // name
            'name.required' => 'El campo nombre es obligatorio.',
            'name.string' => 'El campo nombre debe ser una cadena de texto.',
            'name.max' => 'El campo nombre no debe exceder los 255 caracteres.',
            // email
            'email.required' => 'El campo email es obligatorio.',
            'email.string' => 'El campo email debe ser una cadena de texto.',
            'email.email' => 'El campo email debe ser una dirección de correo electrónico válida.',
            'email.max' => 'El campo email no debe exceder los 255 caracteres.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            // password
            'password.required' => 'El campo contraseña es obligatorio.',
            'password.string' => 'El campo contraseña debe ser una cadena de texto.',
            'password.min' => 'El campo contraseña debe tener al menos :min caracteres.',
            'password.confirmed' => 'La confirmación de la contraseña no coincide.',
            'password.mixed' => 'El campo contraseña debe contener al menos una letra mayúscula y una letra minúscula.',
            'password.letters' => 'El campo contraseña debe contener al menos una letra.',
            'password.numbers' => 'El campo contraseña debe contener al menos un número.',
            'password.symbols' => 'El campo contraseña debe contener al menos un símbolo. (Ejemplo: !@#$%^&*)',
            'password.uncompromised' => 'La contraseña proporcionada ha sido comprometida en alguna filtración de datos.',
        ];
    }
}
