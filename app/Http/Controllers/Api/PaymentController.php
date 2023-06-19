<?php

namespace App\Http\Controllers\Api;

use App\Models\Payment;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'paymentdate' => 'required|date',
        'total' => 'required|numeric',
        'etat' => 'required|string',
        'methode' => 'required|string',
        'email'=>'required|email',
        'reservation_id'=>'required|numeric',
       
    ]);

    // Create a new payment record using the validated data
    $payment = Payment::create([
        'paymentdate' => $validatedData['paymentdate'],
        'total' => $validatedData['total'],
        'etat' => $validatedData['etat'],
        'methode' => $validatedData['methode'],
        'transaction_id' => Str::uuid()->toString(),
        'email' => $validatedData['email'],
        'reservation_id'=> $validatedData['reservation_id'],
        
    ]);

    // Return a response indicating the success of the operation
    return response()->json($payment);


}
    public function getPaymentDetails($id)
    {
        // Logic for retrieving payment details based on the ID

            $payment = Payment::where('id',$id)->get(['etat']);
            return response()->json($payment);
    }

    public function updatePaymentStatus(Request $request, $id)
    {
        // Logic for updating payment status based on the ID
    }

    // Other methods...

}