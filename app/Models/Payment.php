<?php

namespace App\Models;

use App\Models\Reservation;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'paymentdate',
        'total',
        'etat',
        'methode',
        'transaction_id',
        'reservation_id',
        'email'
    ];
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->transaction_id = Str::uuid()->toString();
        });
    }
    public function reservation()
{
    return $this->belongsTo(Reservation::class);
}

}

