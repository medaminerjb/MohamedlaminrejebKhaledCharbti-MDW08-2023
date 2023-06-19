<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Conji;
use App\Models\Ligne;
use App\Models\Voyage;
use App\Models\Employe;
use App\Models\Fichedp;
use App\Models\Pointage;
use App\Models\Entreprise;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\LigneResource;
use App\Http\Requests\AddLigneRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UpdateLigneRequest;

class EmployeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    //ajouter une nouvelle congé 
    public function conji(Request $request)
    {
        $data = new Conji;
        $data->name = $request->input('name');
        $data->reason = $request->input('reason');
        $data->nbrjr = $request->input('nbrjr');
        $data->dateconji = $request->input('date');
        $data->user_id = $request->input('user_id');
        $data->etat = $request->input('etat');
        $data->entreprise_id = $request->input('entreprise_id');
        $data->save();

        return response()->json(['message' => 'Data saved successfully']);
    }
    //recuprer le congé d'un employé
    public function conjicheck($id)
    {
        $conji = Conji::where('user_id',$id)->get();
        return response()->json($conji);
    }
    //recuprer le demande de congé des employés d'un entreprise 
    public function getconji($etat,$id)
    {
        $conji = Conji::where('etat',$etat)->where('entreprise_id',$id)->get();
        return response()->json($conji);
    }
    //refuse une demande 
    public function rejectconji(Request $request, $id)
{
    $reservation = Conji::findOrFail($id);
    
    
    $reservation->etat ='Reject conji ';
    $reservation->save();

    // Return a response
    return response()->json(['message' => 'Reservation updated successfully']);
}

//accpté une demande de congé 
public function accpectconji(Request $request, $id)
{
    $reservation = Conji::findOrFail($id);
    
    // Update the number of occupied spots
    $reservation->etat ='accept conji ';
    $reservation->save();

    // Return a response
    return response()->json(['message' => 'Reservation updated successfully']);
}
//recuprer les information de employés 
public function getemploye($user_id)
    {
        $employe = Employe::where('user_id', $user_id)->get();
        return response()->json($employe);
    }
    //ajouter un nouvelle employé 
public function newemploye(Request $request)
{
    $data = new Employe;
    $data->name = $request->input('name');
    $data->telephone = $request->input('telephone');
    $data->adresse = $request->input('adresse');
    $data->poste = $request->input('poste');
    $data->cin = $request->input('cin');
    $data->salaire = $request->input('salaire');
    $data->user_id = $request->input('user_id');
    $data->nombredejour = $request->input('nombredejour');
    $data->currentjour = $request->input('currentjour');
    $data->currentmois = $request->input('currentmois');
    $data->conjirestant= $request->input('conjirestant');
    $data->entreprise_id = $request->input('entreprise_id');
    $data->save();

    return response()->json(['message' => 'Data saved successfully']);
}
  //change le les information de employé 
public function putemploye(Request $request, $id)
{
    $data = Employe::findOrFail($id);
    
    $data->name = $request->input('name');
    $data->telephone = $request->input('telephone');
    $data->adresse = $request->input('adresse');
    $data->poste = $request->input('poste');
    $data->salaire = $request->input('salaire');
  
    $data->save();

    return response()->json(['message' => 'employe updated successfully']);
}
//recuprer toutes les employés d'un entreprsie 
public function getallemploys($entreprise)
{
    $ent = Employe::where('entreprise_id',$entreprise)->get();
    return response()->json($ent);
}
// suppression de employé 
public function deleteemploy($employe)
{
    $employ = Employe::findOrFail($employe);
    $employ->delete();

    return response("", 204);
}
// ajouter une  entreprise 
public function newentreprise(Request $request)
{
    $data = new Entreprise;
    $data->name = $request->input('name');
    $data->pays = $request->input('pays');
    $data->telephone = $request->input('telephone');
    $data->adresse = $request->input('adresse');
    $data->user_id = $request->input('user_id');
    $data->save();

    return response()->json(['message' => 'Data saved successfully']);
}
  //recuprer le donées d'un pointge 

    public function getpointage($id)
    {
        $pointage = Pointage::where('user_id',$id)->get();
        return response()->json($pointage);
    }
    //une function de pointage
    public function pointe(Request $request, $id)
{
    $pointage = Pointage::findOrFail($id);
    $pointage->nombredejour = $request->input('nombredejour'); 
    
    $pointage->currentjour = $request->input('currentjour');
    $pointage->currentmois = $request->input('currentmois');
   
    $pointage->save();

    // Return a response
    return response()->json(['message' => 'Reservation updated successfully']);
}
//quand ajouter un nouveau employé en ouvert le pointage pour lui  
/*public function pointage(Request $request)
{
    $data = new Pointage;
    $data->nombredejour = $request->input('nombredejour');
    $data->currentjour = $request->input('currentjour');
    $data->currentmois = $request->input('currentmois');
    $data->conjirestant= $request->input('conjirestant');
    $data->entreprise_id = $request->input('entreprise_id');
    $data->user_id = $request->input('user_id');
    $data->save();

    return response()->json(['message' => 'Data saved successfully']);
}*/
// recuprer le fiche de paie 
public function getfichedp($id)
{
    $pointage = Fichedp::where('user_id',$id)->get();
    return response()->json($pointage);
}
//le modification de fiche chque mois
public function fiche(Request $request, $id)
{
    $fiche = Fichedp::findOrFail($id);
    $fiche->nombredejour = $request->input('nombredejour'); ;
    
    $fiche->salaire = $request->input('salaire');
    $fiche->conjirestant = $request->input('conjirestant');
   
    $fiche->save();

    // Return a response
    return response()->json(['message' => 'Reservation updated successfully']);
}
// en ajouter un fiche de paie pour chaque nouveau employé 
public function newfiche(Request $request)
{
    $data = new Fichedp;
    $data->nombredejour = $request->input('nombredejour');
    $data->salaire = $request->input('salaire');
    $data->conjirestant = $request->input('conjirestant');
    $data->user_id = $request->input('user_id');
    $data->entreprise_id = $request->input('entreprise_id');
    $data->save();

    return response()->json(['message' => 'Data saved successfully']);
}


}
