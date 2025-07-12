<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;

class AuthenticateWithToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $header = $request->header("Authorization");

        if (!$header || !str_starts_with($header, "Bearer ")):

            return response()->json([
              "message" => "Unauthorized",
              "success" => false,
              "data" => null
            ], 401);

        endif;

        $plainToken = substr($header, 7);

        $token = PersonalAccessToken::findToken($plainToken);

        if (!$token):

            return response()->json([
              "message" => "Invalid token!",
              "success" => false,
              "data" => null
            ], 401);

        endif;

        $request->setUserResolver(fn () => $token->tokenable);

        return $next($request);
    }
}
