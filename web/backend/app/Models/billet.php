<?php

namespace App\Models;

use App\Models\Entreprise;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class billet extends Model
{
    use HasFactory;
    
    protected $fillable = ['id','numero','validite','reservations_id','entreprise_id'];
    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }
    
    
}

