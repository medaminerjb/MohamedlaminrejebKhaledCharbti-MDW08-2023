<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\LigneController;
use App\Http\Controllers\Api\EmployeController;
use App\Http\Controllers\api\PaymentController;
use App\Http\Controllers\Api\StationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/page/role-id', [AuthController::class, 'getRoleId']);
    Route::middleware(['role:entreprise'])->group(function () {
        Route::apiResource('/stations',StationController::class);
        Route::apiResource('/lignes', LigneController::class);
    
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
  
});
Route::apiResource('/users', UserController::class);
Route::get('/st', function (Request $request) {
    return $request->station();
});
        /////Admin entreprise route ////// 
{
    //recuprer le utilisateur a partir de son id 
Route::get('getuser/{user}',[UserController::class,'show']);
    //modification de utilisateur 
Route::put('putuser/{id}',[UserController::class,'update']);
    // suprression de utilisateur 
Route::delete('deleteuser/{users}',[UserController::class,'deleteuser']);
    // ajouter une entreprise 


     //ajouter une voyagee
Route::post('postvoyage', [LigneController::class,'postvoyage']);

     //ouverir une reservation 
Route::post('newreserve', [LigneController::class,'newreserve']);
    //recuprer toutes le reservation d'une voyage 
Route::get('getrall/{id}', [LigneController::class,'getrall']);
    //recuperr toute les inforamtion de employé 
Route::get('getemploye/{user_id}', [EmployeController::class,'getemploye']);
   //ajoute une fiche de paie lorsque vous ajoute un employé
Route::post('newfiche/',[EmployeController::class,'newfiche']);
//resources de stations //
Route::apiResource('/stations',StationController::class);
  //change le etat de congé par reject le 
Route::put('rejectconji/{id}',[EmployeController::class,'rejectconji']);
    //change le etat de congé par accpté le 
Route::put('accpectconji/{id}',[EmployeController::class,'accpectconji']);

}
     //////employé route///// 
{
    //change les information de employé
Route::put('putemploye/{user}',[EmployeController::class,'putemploye']);
    //recuprere toutes les employés d'aprés son entreprise id 
Route::get('getallemploys/{entreprise}',[EmployeController::class,'getallemploys']);
    //ajouter de employé
Route::post('employeinf',[EmployeController::class,'newemploye']);
    // suppression de employé 
Route::delete('deleteemploy/{employe}',[EmployeController::class,'deleteemploy']);
  
    // ajouter un pointage a un utilisateur par le entreprise  
Route::post('pointage',[EmployeController::class,'pointage']);
     // recuprer tout les congés de cette entreprise par ses etat
Route::get('getconji/{etat}/{id}',[EmployeController::class,'getconji']);
      // une route de recuprer  tout les congés de le employé
Route::get('conjiemploye/{id}',[EmployeController::class,'getconji']);
Route::get('conjicheck/{id}',[EmployeController::class,'conjicheck']);
      // get pointage d'un employé 
Route::get('getpointage/{id}',[EmployeController::class,'getpointage']);
     //demande congé passe par cette route 
Route::post('conji', [EmployeController::class,'conji']);
     //le function pointé passé par cette route modificiation de pointage 
Route::put('pointe/{id}',[EmployeController::class,'pointe']);
      // recuprer le fiche de paie 
Route::get('getfichedp/{id}',[EmployeController::class,'getfichedp']);
      // chaque mois change le donnée de fiche paie d'aprés le pointage 
Route::put('fiche/{id}',[EmployeController::class,'fiche']);
}

 ////route pour le passage////// 
{
        //recuprer le ligne passe par deux methode
    Route::get('gligne/{ligne}', [LigneController::class,'show']);          
    Route::get('vm/{id_lignes}', [LigneController::class,'getligne']);
         //recuprer voyagee 
    Route::get('voyage/{id_lignes}', [LigneController::class,'showlignes']);
          //recuprer le date valable est no valide  
    Route::get('getdate/{voyage_id}/{entreprise}', [LigneController::class,'getdate']);
          //get all date 
    Route::get('getdateall/{voyage_id}', [LigneController::class,'getdateall']);
          //recuprer les information de reservation 
    Route::get('getreserve/{voyage_id},{reservation}', [LigneController::class,'getreservation']);
         //ajouter une reservation
         Route::put('reserveput/{id}',[LigneController::class,'reserveput']);
         //si le nombre de place est saturé change le etat 
         Route::put('reserveputetat/{id}',[LigneController::class,'reserveputetat']);
         // le paiment de reservation ce enregistrer dans le base de donnée pour test aprés 
         Route::post('/payments', [PaymentController::class, 'createPayment']);
         // recuprer le paiment pour test si valide ou non 
Route::get('/payments/{id}', [PaymentController::class, 'getPaymentDetails']);
        // le reponse d'apres le bank change l etat de paiment 
Route::patch('/payments/{id}', [PaymentController::class, 'updatePaymentStatus']);
     //si le paiment est validé ajouter une billet d'aprés cette route 
Route::post('newbillet', [LigneController::class,'newbillet']);
    // recuprer le billet d'aprés le base données 
Route::get('billet/{numero}', [LigneController::class,'getbillet']);
    // si le date est passé de billets changé le etat vers non validé 
Route::put('putbilletetat/{id}',[LigneController::class,'billetputetat']);

        }
Route::apiResource('/ligness', LigneController::class);







  /////admin Application ///// 
{
    Route::get('getentreall', [LigneController::class,'getentreall']);

    Route::post('entrepriseinf',[EmployeController::class,'newentreprise']);

}
Route::get('getrb/{id}', [LigneController::class,'getrb']);


Route::get('getvoyage/{voyage_id}', [LigneController::class,'getvoyage']);
Route::get('voyageall',[LigneController::class,'voyageall']);

//  toutes le utilisateur inclue dans l'application peut acceder //
{
    // login route 
Route::post('/login', [AuthController::class, 'login']);
}