<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            if ($request->expectsJson()) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
            return back()->withErrors([
                'email' => 'Las credenciales proporcionadas son incorrectas.',
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        if ($request->expectsJson()) {
            return response()->json([
                'token' => $token,
                'user' => $user,
                'is_admin' => $user->is_admin,
            ]);
        }

        // Para solicitudes de formulario HTML
        session(['auth_token' => $token]);
        return redirect()->away(env('FRONTEND_URL'));
    }

    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Logged out successfully']);
        }

        // Para solicitudes de formulario HTML
        session()->forget('auth_token');
        return redirect()->away(env('FRONTEND_URL'));
    }

    public function isAdmin(Request $request)
    {
        return response()->json(['is_admin' => $request->user()->is_admin]);
    }
} 