<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponse
{
    /**
     * Successful JSON response.
     *
     * @param  array<string, mixed>|object|null  $data
     */
    protected function successResponse(string $message, array|object|null $data = null, int $status = Response::HTTP_OK): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    /**
     * Failed JSON response. Internal details are exposed only outside production.
     *
     * @param  array<string, mixed>|null  $errors
     */
    protected function errorResponse(string $message, ?array $errors = null, int $status = Response::HTTP_INTERNAL_SERVER_ERROR, ?\Throwable $exception = null): JsonResponse
    {
        $payload = [
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ];

        if ($exception !== null && ! app()->isProduction()) {
            $payload['debug'] = [
                'exception' => $exception::class,
                'message' => $exception->getMessage(),
                'file' => $exception->getFile().':'.$exception->getLine(),
            ];
        }

        return response()->json($payload, $status);
    }
}
