<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class VerifyIfIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $user = $request->user();

        if (!$user):

            return response()->json([
              "message" => "User Not Found",
               "data" => null,
               "success" => false
            ], 400);

        endif;

        if ($user->role !== "admin"):

            return response()->json([
              "message" => "Not Authorized",
              "data" => null,
              "success" => false
            ], 401);

        endif;

        return $next($request);
    }
}
