<?php

namespace App\Traits\Auth;

use App\Helpers\ExceptionHandlerHelper;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\PasswordReset;

trait ResetPasswordTrait
{
    public function resetPassword(ResetPasswordRequest $resetPasswordRequest)
    {
        return ExceptionHandlerHelper::tryCatch(function () use ($resetPasswordRequest) {
            $response = PasswordReset::reset($resetPasswordRequest->only(
                 'password', 'password_confirmation', 'token'
            ));

            return $response == true
                ? $this->sendResponse([], 'Password reset successful')
                : $this->sendError('Unable to reset password', [], 400);
        });


    }

}
