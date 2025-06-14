<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given user can update the user.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $targetUser
     * @return bool
     */
    public function update(User $user, User $targetUser)
    {
        // Los administradores pueden actualizar cualquier usuario
        if ($user->is_admin) {
            return true;
        }

        // Los usuarios normales solo pueden actualizar sus propios datos
        // y no pueden modificar el campo is_admin
        return $user->id === $targetUser->id;
    }
} 