<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $primaryKey = 'review_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'item_type',
        'tmdb_id',
        'rating',
        'review',
        'review_date',
    ];

    protected $casts = [
        'tmdb_id' => 'integer',
        'rating' => 'integer',
        'review_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
