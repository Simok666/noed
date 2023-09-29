<?php

namespace App\Http\Controllers\BackEnd;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Yajra\DataTables\DataTables;
use Carbon\Carbon;
use App\Exports\HistoryExport;
use Maatwebsite\Excel\Facades\Excel;

class HistoryTableControll extends Controller
{
    public function index(Request $request){
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field,$dir) = explode('|',$sortRules);

        $query =DB::table('history as hry')
            ->select(
                'hry.Id as id',
                'mdl.Name AS Nama_Modul',
                 DB::raw("JSON_VALUE(hry.description, '$.NOENumber') as DrafNoe"),
                 DB::raw("JSON_VALUE(hry.description, '$.NOENumberAcc') as Noenod"),
                 DB::raw("JSON_VALUE(hry.description, '$.Date') as Tanggal"),
                 DB::raw("JSON_VALUE(hry.description, '$.Date') as Jam"),
                 DB::raw("JSON_VALUE(hry.description, '$.BatchNo') as Nobatch"),
                'prd.Name AS Produkname',
                 DB::raw("IFNULL(IF(CONCAT('[',REPLACE(REPLACE(JSON_VALUE(hry.description, '$.IdTypeIncident'), '[', ''), ']', ''),']') = '[]',null, CONCAT('[',REPLACE(REPLACE(JSON_VALUE(hry.description, '$.IdTypeIncident'), '[', ''), ']', ''),']')), '[]') as Jeniskejadian"),
                'loc.Name AS Lokasikejadian',
                 DB::raw("JSON_VALUE(hry.description, '$.Status') as Status"),
                'usr.UserName as Dilaporkan_Oleh',
                'emp.Name as User',
                'hry.CreateAt as Createdate',
                'hry.UpdateAt as Modifiedate')
            ->leftjoin('module as mdl','mdl.Id','=','hry.IdModule')
            ->leftjoin('users as usr','usr.Id','=','hry.UserEntry')
            ->leftjoin('employee as emp','emp.Id','=','usr.Id')
            ->leftJoin('product AS prd', 'prd.Id', '=', DB::Raw("JSON_VALUE(hry.description, '$.IdProduct')"))
            ->leftJoin('location AS loc', 'loc.Id', '=', DB::Raw("JSON_VALUE(hry.description, '$.IdLocation')"))
            ->orderBy($field,$dir);

        if ($searchValue){
            $query->where(function($query) use ($searchValue){
                foreach($searchValue as $key=>$val){
                if ($val != '' && $val !== null) {
                  if ($key == 'Nama_Modul') {
                      $query->where('mdl.Name', 'LIKE', '%'.$val.'%' );
                  }
                  if ($key == 'DrafNoe') {
                      $query->where(DB::raw("JSON_VALUE(hry.description, '$.NOENumber')"), 'LIKE', '%'.$val.'%' );
                  }
                  if ($key == 'Noenod') {
                      $query->where(DB::raw("JSON_VALUE(hry.description, '$.NOENumberAcc')"), 'LIKE', '%'.$val.'%' );
                  }
                  if ($key == 'Tanggal') {
                      $val = date('Y-m-d', strtotime($val));
                      if($val!='' && $val!=null) $query->where(DB::raw("JSON_VALUE(hry.description, '$.Date')"), 'LIKE', '%'.$val.'%' );
                  }                                       
                  if ($key == 'Jam') {
                      $query->where(DB::raw("JSON_VALUE(hry.description, '$.Date')"), 'LIKE', '%'.$val.'%' );
                  }
                  if ($key == 'Nobatch') {
                      $query->where(DB::raw("JSON_VALUE(hry.description, '$.BatchNo')"), 'LIKE', '%'.$val.'%' );
                  }   
                  if ($key == 'Produkname') {
                      $query->where('prd.Name', 'LIKE', '%'.$val.'%' );
                  }  
                  if ($key == 'Jeniskejadian') {
                      $query->where(DB::raw("JSON_VALUE(hry.description, '$.IdTypeIncident')"), 'LIKE', '%'.$val.'%' );
                  } 
                  if ($key == 'Lokasikejadian') {
                      $query->where('loc.Name', 'LIKE', '%'.$val.'%' );
                  }  
                  if ($key == 'Status') {
                      $query->where(DB::raw("JSON_VALUE(hry.description, '$.Status')"), 'LIKE', '%'.$val.'%' );
                  } 
                  if ($key == 'Dilaporkan_Oleh') {
                      $query->where('usr.UserName', 'LIKE', '%'.$val.'%' );
                  }  
                  if ($key == 'User') {
                      $query->where('emp.Name', 'LIKE', '%'.$val.'%' );
                  }                    
                  if ($key == 'Createdate') {
                      $val = date('Y-m-d', strtotime($val));
                      $query->where('hry.CreateAt', 'LIKE', '%'.$val.'%' );
                  }  
                  if ($key == 'Modifiedate') {
                      $val = date('Y-m-d', strtotime($val));
                      $query->where('hry.UpdateAt', 'LIKE', '%'.$val.'%' );
                  }                    
                }//if val kosong
                }//akhir foreach
            });

       }//akhir if searchvalue

        $countLimit = DB::table('history')->count();
        if ($limit == 'all') {
         	$data = $query->paginate($countLimit);
        }else{
        	$data = $query->paginate($limit);
	    }  




        return $data;
    }




    public function show(Request $request){
        $item = DB::table('history as hry')
            ->select(
                'hry.Id as id',
                'hry.From',
                'hry.Action',
                'mdl.Name AS Nama_Modul',
                 DB::raw("JSON_VALUE(hry.description, '$.NOENumber') as DrafNoe"),
                 DB::raw("JSON_VALUE(hry.description, '$.NOENumberAcc') as Noenod"),
                 DB::raw("JSON_VALUE(hry.description, '$.Date') as Tanggal"),
                 DB::raw("JSON_VALUE(hry.description, '$.Date') as Jam"),
                 DB::raw("JSON_VALUE(hry.description, '$.BatchNo') as Nobatch"),
                'prd.Name AS Produkname',
                 DB::raw("IFNULL(IF(CONCAT('[',REPLACE(REPLACE(JSON_VALUE(hry.description, '$.IdTypeIncident'), '[', ''), ']', ''),']') = '[]',null, CONCAT('[',REPLACE(REPLACE(JSON_VALUE(hry.description, '$.IdTypeIncident'), '[', ''), ']', ''),']')), '[]') as Jeniskejadian"),
                'loc.Name AS Lokasikejadian',
                 DB::raw("JSON_VALUE(hry.description, '$.Status') as Status"),
                'usr.UserName as Dilaporkan_Oleh',
                'emp.Name as User',
                'hry.CreateAt as Createdate',
                'hry.UpdateAt as Modifiedate')
            ->leftjoin('module as mdl','mdl.Id','=','hry.IdModule')
            ->leftjoin('users as usr','usr.Id','=','hry.UserEntry')
            ->leftjoin('employee as emp','emp.Id','=','usr.Id')

            ->leftJoin('product AS prd', 'prd.Id', '=', DB::Raw("JSON_VALUE(hry.description, '$.IdProduct')"))
            ->leftJoin('location AS loc', 'loc.Id', '=', DB::Raw("JSON_VALUE(hry.description, '$.IdLocation')"))
            ->where('hry.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->Createdate = Carbon::parse($item->Createdate)->format('d.m.y');
            $item->Modifiedate = Carbon::parse($item->Modifiedate)->format('d.m.y');
        }
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

	public function export_excel()
	{



         $data =DB::table('history as hry')
            ->select(
                'hry.Id as id',
                'mdl.Name AS Nama_Modul',
                 DB::raw("JSON_VALUE(hry.description, '$.NOENumber') as DrafNoe"),
                 DB::raw("JSON_VALUE(hry.description, '$.NOENumberAcc') as Noenod"),
                 DB::raw("JSON_VALUE(hry.description, '$.Date') as Tanggal"),
                 DB::raw("JSON_VALUE(hry.description, '$.Date') as Jam"),
                 DB::raw("JSON_VALUE(hry.description, '$.BatchNo') as Nobatch"),
                'prd.Name AS Produkname',
                 DB::raw("IFNULL(IF(CONCAT('[',REPLACE(REPLACE(JSON_VALUE(hry.description, '$.IdTypeIncident'), '[', ''), ']', ''),']') = '[]',null, CONCAT('[',REPLACE(REPLACE(JSON_VALUE(hry.description, '$.IdTypeIncident'), '[', ''), ']', ''),']')), '[]') as Jeniskejadian"),
                'loc.Name AS Lokasikejadian',
                 DB::raw("JSON_VALUE(hry.description, '$.Status') as Status"),
                'usr.UserName as Dilaporkan_Oleh',
                'emp.Name as User',
                'hry.CreateAt as Createdate',
                'hry.UpdateAt as Modifiedate')
            ->leftjoin('module as mdl','mdl.Id','=','hry.IdModule')
            ->leftjoin('users as usr','usr.Id','=','hry.UserEntry')
            ->leftjoin('employee as emp','emp.Id','=','usr.Id')
            ->leftJoin('product AS prd', 'prd.Id', '=', DB::Raw("JSON_VALUE(hry.description, '$.IdProduct')"))
            ->leftJoin('location AS loc', 'loc.Id', '=', DB::Raw("JSON_VALUE(hry.description, '$.IdLocation')"))
            ->where('mdl.Name', 'LIKE', '%NOE REPORT%' )
            ->get();

$excelData = array();
$count = count($data);

    for( $i=0; $i<$count; $i++) {
       $hry = $data[$i];

      for( $j=0; $i<$data[$i]->Jeniskejadian;$j++){	
 

         $inn = json_decode($data[$i]->Jeniskejadian);


        $hry->jeniskejadian += $inn[$j]->TypeIncident.';';


      }

            $coba =   array_push($excelData,$hry);
    }







    	//    return Excel::download(new HistoryExport($data), 'History_210723.xlsx');




	}











}
