<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;

    const MASTER_ACCESS = 'master_access';

    const UK_ACCESS = 'uk_access';

    const MOLDOVA_ACCESS = 'moldova_access';

    const PERMINENT_ROLES = [self::MASTER_ACCESS, self::UK_ACCESS, self::MOLDOVA_ACCESS];

    protected static function boot()
    {
        parent::boot();

//        static::addGlobalScope(fn(Builder $builder) => $builder->whereNotIn('name', self::PERMINENT_ROLES));

        self::creating(fn($model) => $model->guard_name = 'web');
    }
}