<?php

namespace App\Traits\Auth;

use App\Helpers\ExceptionHandlerHelper;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Models\PasswordReset;

trait ForgotPasswordTrait
{
    public function forgotPassword(ForgotPasswordRequest $forgotPasswordRequest)
    {
        return ExceptionHandlerHelper::tryCatch(function () use ($forgotPasswordRequest) {
            $status = PasswordReset::sendResetLink($forgotPasswordRequest->only('email'));

            return $status === true
                ? $this->sendResponse([], 'Password reset email sent')
                : $this->sendError('Unable to send password reset email', [], 400);
        });
    }
}
