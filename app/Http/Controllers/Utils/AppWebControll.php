<?php

namespace App\Http\Controllers\Utils;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Session;
use DB;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;
use Carbon\Carbon;
use Crypt;
use Validator;

class AppWebControll extends Controller {

    public function diffDateApprove($date) {
        $now = Carbon::now();

        $dayOff = DB::table('day_off')
            ->select('Id')
            ->whereBetween('Date', [$date, $now])
            ->where('Actived',1)
            ->count();

        $diff = $now->diffInDaysFiltered(function(Carbon $dt) {
           return !$dt->isWeekend();
        }, $date);

        return $diff-$dayOff;
    }

    public function checkDataOneCol($table, $column, $value) {
    	if($table!='' && $column!='' && $value!=''){
	    	$data =DB::table($table)
	            ->where($column, $value)
	            ->where('Actived','>',0)
	            ->count();
        	return $data;
        }else{
        	return 0;
        }
    }

    public function checkDataManyCol($table, $columns=array()) {
    	if( $table!='' && !empty($columns) ) {
	    	$query = DB::table($table)->where('Actived','>',0);
	    	$query->where(function($query) use ($columns) {
                foreach ($columns as $key=>$val) {
                    $query->where($key, $val);
                }
            });
        	return $query->count();
        }else{
        	return 0;
        }
    }

    public function checkDataOrManyCol($table, $columns=array()) {
    	if( $table!='' && !empty($columns) ) {
	    	$query = DB::table($table)->where('Actived','>',0);
	    	$query->where(function($query) use ($columns) {
                foreach ($columns as $key=>$val) {
                    $query->orWhere($key, $val);
                }
            });
        	return $query->count();
        }else{
        	return 0;
        }
    }

    public function FormatDate($from, $date, $format) {
    	return Carbon::createFromFormat($from, $date)->format($format);
    }

    public function getNumeric($value) {
        if($value == '' || $value == null) return null;
        $output = str_replace('.', '', $value);
        $output = str_replace(',', '.', $output);
        return $output;
    }

    public function checkDataOneColMainDB($table, $column, $value) {
        if($table!='' && $column!='' && $value!=''){
            $data = DB::connection('main_db')->table($table)
                ->where($column, $value)
                ->where('Actived','>',0)
                ->count();
            return $data;
        }else{
            return 0;
        }
    }

    public function checkDataManyColMainDB($table, $columns=array()) {
        if( $table!='' && !empty($columns) ) {
            $query = DB::connection('main_db')->table($table)->where('Actived','>',0);
            $query->where(function($query) use ($columns) {
                foreach ($columns as $key=>$val) {
                    $query->where($key, $val);
                }
            });
            return $query->count();
        }else{
            return 0;
        }
    }

    public function convertMonthRomawi($value) {
        $result = '';
        if($value == 1) $result = 'I';
        if($value == 2) $result = 'II';
        if($value == 3) $result = 'III';
        if($value == 4) $result = 'IV';
        if($value == 5) $result = 'V';
        if($value == 6) $result = 'VI';
        if($value == 7) $result = 'VII';
        if($value == 8) $result = 'VIII';
        if($value == 9) $result = 'IX';
        if($value == 10) $result = 'X';
        if($value == 11) $result = 'XI';
        if($value == 12) $result = 'XII';
        return $result;
    }

    public function convertRomawiMonth($value,$month) {
        $result = '';
        if($value == 'I') {
            if($month == true) $result = 'Januari';
            if($month == false) $result = 1;
        }
        if($value == 'II') {
            if($month == true) $result = 'Februari';
            if($month == false) $result = 2;
        }
        if($value == 'III') {
            if($month == true) $result = 'Maret';
            if($month == false) $result = 3;
        }
        if($value == 'IV') {
            if($month == true) $result = 'April';
            if($month == false) $result = 4;
        }
        if($value == 'V') {
            if($month == true) $result = 'Mei';
            if($month == false) $result = 5;
        }
        if($value == 'VI') {
            if($month == true) $result = 'Juni';
            if($month == false) $result = 6;
        }
        if($value == 'VII') {
            if($month == true) $result = 'Juli';
            if($month == false) $result = 7;
        }
        if($value == 'VIII') {
            if($month == true) $result = 'Agustus';
            if($month == false) $result = 8;
        }
        if($value == 'IX') {
            if($month == true) $result = 'September';
            if($month == false) $result = 9;
        }
        if($value == 'X') {
            if($month == true) $result = 'Oktober';
            if($month == false) $result = 10;
        }
        if($value == 'XI') {
            if($month == true) $result = 'November';
            if($month == false) $result = 11;
        }
        if($value == 'XII') {
            if($month == true) $result = 'Desember';
            if($month == false) $result = 12;
        }
        return $result;
    }

    public function unitLocation($month,$id,$year,$department) {
        $result = DB::table('noe_report')
            ->select('Id')
            ->whereYear('Date',$year)
            ->where('IdLocation',$id)
            ->where(function($query) use ($department,$month) {
                if(session('adminvue')->IdDepartment==67) {
                    if($department!=0)
                        $query->where('IdDepartment', $department);
                } else {
                    $query->where('IdDepartment', session('adminvue')->IdDepartment);
                }

                if($month!=0) $query->whereMonth('Date',$month);
            })
            ->where('Actived',1)
            ->count();
        
        return $result;
    }

    public function deviationLevel($month,$id,$year,$department=0) {
        $item = DB::table('noe_report')
            ->select('Id')
            ->whereMonth('Date',$month)
            ->whereYear('Date',$year)
            ->where(function ($query) use ($department) {
                if(session('adminvue')->IdDepartment==67) {
                    if($department!=0)
                        $query->where('IdDepartment', $department);
                } else {
                    $query->where('IdDepartment', session('adminvue')->IdDepartment);
                }
            })
            ->where('Actived',1)
            ->get();

        $result = 0;
        if($item) {
            foreach ($item as $key => $val) {
                $itemVerif = DB::table('noe_verif_evaluation')
                ->select('DeviationLevel')
                ->where('IdNOEReport',$val->Id)
                ->where('DeviationLevelQA',$id)
                ->where('Actived',1)
                ->count();
                $result += $itemVerif;
            }
        }

        return $result;
    }

    public function checkDateRange($dateStart,$dateEnd,$dateValue) {
        $start = strtotime($dateStart);
        $end = strtotime($dateEnd);
        $check = strtotime($dateValue);

        return (($start <= $check ) && ($check <= $end));
    }

    public function checkCaretaker($department,$employee,$user) {
        $isCaretaker = false;
        $item = DB::table('caretaker')
            ->select('DateStart','DateEnd')
            ->where('IdDepartment',$department)
            ->where('IdEmployee',$employee)
            ->where('IdUser',$user)
            ->where('Status',1)
            ->where('Actived',1)
            ->first();

        if($item) {
            if($this->checkDateRange($item->DateStart,$item->DateEnd,date('Y-m-d'))) $isCaretaker = true;
        }

        return $isCaretaker;
    }
}
