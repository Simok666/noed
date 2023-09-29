<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ChatRoom;
use App\ChatMessage;
use Illuminate\Support\Facades\Auth;
use App\Events\NewChatMessage;
use DB;


class ChatController extends Controller
{
    public function rooms(Request $request)
    {
        return ChatRoom::all();
    }

    public function messages(Request $request, $roomId)
    {
        $data = ChatMessage::query()
        ->from('chat_messages as cri')
        ->select('cri.*','emp.Name as name')
        ->leftJoin('users as usr', 'usr.Id', '=', 'cri.user_id')
        ->leftJoin('employee as emp', 'emp.Id', '=', 'usr.IdEmployee')
        ->where('cri.chat_room_id', $roomId)
        ->orderBy('cri.created_at', 'DESC')
        ->get();
        
        $getSessionUserId = session('adminvue')->Id;
        
        return response()->json([
            'data' => $data,
            'userId' => $getSessionUserId
        ]);
    }
    
    public function newMessage(Request $request, $roomId)
    {
        $newMessage = new ChatMessage;
        $newMessage->user_id = session('adminvue')->Id;
        $newMessage->chat_room_id = $roomId;
        $newMessage->message = $request->input('message');
        $newMessage->save();

        broadcast(new NewChatMessage($newMessage))->toOthers();

        return $newMessage;
    }

    public function teams(Request $request)
    {
        $getTeam = DB::table('request_chat as rc')
        ->select(
            'rc.id_team as Team'
        )
        ->leftjoin('chat_rooms as cr','cr.nod_number','=','rc.nod_number')
        ->where('cr.nod_number', $request->input('NumberNod'))
        ->where('cr.Id', $request->input('Id'))
        ->first();
        
        $teams = json_decode($getTeam->Team);
        
        return response()->json([ 
            'teams' => $teams
        ]); 
    }
}
