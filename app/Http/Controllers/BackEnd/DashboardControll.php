<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Carbon\Carbon;
use App\Http\Controllers\Utils\AppWebControll;
use Illuminate\Support\Facades\Log;

class DashboardControll extends Controller
{
    protected $AppWeb;
    protected $MainDB;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->MainDB = DB::connection('mysql');
        $this->logger = \Log::channel('customlog');
    }

    public function index(Request $request) {

    }

    public function generateYear() {
        $item = [];
        $dateNow = Carbon::now()->format('Y');
        for ($i=2015; $i <= (int)$dateNow; $i++) {
            $arr = [];
            $arr['value'] = $i;
            $arr['text'] = (string)$i;
            array_push($item, $arr);
        }

        $dtDept = $this->MainDB->table('department')
            ->select('Id','Department')
            ->where('Parent','<>',0)
            ->where('Actived',1)
            ->get();
        $opsDept[] = (object)['Id'=>0, 'Department'=>'ALL'];
        foreach ($dtDept as $key => $value) {
            $opsDept[] = $value;
        }

        return json_encode(array(
            'data'=>json_encode($item),
            'access'=>$this->cekAccessDashboard(),
            'dtDept'=>$opsDept,
            'idDepartment'=> session('adminvue')->IdDepartment
        ));
    }

    public function getLocation(Request $request) {
        if($request->filter == "" || $request->filter == null) $request->filter = Carbon::now()->format('Y');

        $headerUnit = $this->MainDB->table('location as loc')
            ->select('loc.Id','loc.Name','loc.LocationColor')
            ->join('noe_report as noe','noe.IdLocation','=','loc.Id')
            ->where('noe.Actived',1)
            ->where('loc.Actived',1)
            ->where(function($query) use ($request) {
                if(session('adminvue')->IdDepartment==67) {
                    if($request->Department!=0)
                        $query->where('noe.IdDepartment', $request->Department);
                } else {
                    $query->where('noe.IdDepartment', session('adminvue')->IdDepartment);
                }
            })
            ->whereYear('noe.Date',$request->filter)
            ->groupBy('noe.IdLocation')
            ->groupBy('loc.Id')
            ->groupBy('loc.Name')
            ->groupBy('loc.LocationColor')
            ->get();

        // pie chart unit
        $valHeaderUnit = [];
        $valUnitColor = [];
        $valUnitLocation = [];
        foreach ($headerUnit as $key => $val) {
            $valColor = '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
            if($val) {
                array_push($valHeaderUnit, $val->Name);
                array_push($valUnitColor, $valColor);
            }
        }
        // end pie chart unit

        $resultUnit = [];
        $arrJanuari = [];
        $arrFebruari = [];
        $arrMaret = [];
        $arrApril = [];
        $arrMei = [];
        $arrJuni = [];
        $arrJuli = [];
        $arrAgustus = [];
        $arrSeptember = [];
        $arrOktober = [];
        $arrNovember = [];
        $arrDesember = [];
        $arrTotal = [];
        $arrPersen = [];
        $totalJanuari = 0;
        $totalFebruari = 0;
        $totalMaret = 0;
        $totalApril = 0;
        $totalMei = 0;
        $totalJuni = 0;
        $totalJuli = 0;
        $totalAgustus = 0;
        $totalSeptember = 0;
        $totalOktober = 0;
        $totalNovember = 0;
        $totalDesember = 0;
        $totalUnit = 0;
        $month = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember','TOTAL','PERSEN (%)'];

        array_push($arrJanuari, $month[0]);
        foreach ($headerUnit as $key => $val) {
            $valJanuari = $this->AppWeb->unitLocation(1,$val->Id,$request->filter,$request->Department);
            $totalJanuari += $valJanuari;
            array_push($arrJanuari, $valJanuari);
        }
        array_push($arrJanuari, $totalJanuari);

        array_push($arrFebruari, $month[1]);
        foreach ($headerUnit as $key => $val) {
            $valFebruari = $this->AppWeb->unitLocation(2,$val->Id,$request->filter,$request->Department);
            $totalFebruari += $valFebruari;
            array_push($arrFebruari, $valFebruari);
        }
        array_push($arrFebruari, $totalFebruari);

        array_push($arrMaret, $month[2]);
        foreach ($headerUnit as $key => $val) {
            $valMaret = $this->AppWeb->unitLocation(3,$val->Id,$request->filter,$request->Department);
            $totalMaret += $valMaret;
            array_push($arrMaret, $valMaret);
        }
        array_push($arrMaret, $totalMaret);

        array_push($arrApril, $month[3]);
        foreach ($headerUnit as $key => $val) {
            $valApril = $this->AppWeb->unitLocation(4,$val->Id,$request->filter,$request->Department);
            $totalApril += $valApril;
            array_push($arrApril, $valApril);
        }
        array_push($arrApril, $totalApril);

        array_push($arrMei, $month[4]);
        foreach ($headerUnit as $key => $val) {
            $valMei = $this->AppWeb->unitLocation(5,$val->Id,$request->filter,$request->Department);
            $totalMei += $valMei;
            array_push($arrMei, $valMei);
        }
        array_push($arrMei, $totalMei);

        array_push($arrJuni, $month[5]);
        foreach ($headerUnit as $key => $val) {
            $valJuni = $this->AppWeb->unitLocation(6,$val->Id,$request->filter,$request->Department);
            $totalJuni += $valJuni;
            array_push($arrJuni, $valJuni);
        }
        array_push($arrJuni, $totalJuni);

        array_push($arrJuli, $month[6]);
        foreach ($headerUnit as $key => $val) {
            $valJuli = $this->AppWeb->unitLocation(7,$val->Id,$request->filter,$request->Department);
            $totalJuli += $valJuli;
            array_push($arrJuli, $valJuli);
        }
        array_push($arrJuli, $totalJuli);

        array_push($arrAgustus, $month[7]);
        foreach ($headerUnit as $key => $val) {
            $valAgustus = $this->AppWeb->unitLocation(8,$val->Id,$request->filter,$request->Department);
            $totalAgustus += $valAgustus;
            array_push($arrAgustus, $valAgustus);
        }
        array_push($arrAgustus, $totalAgustus);

        array_push($arrSeptember, $month[8]);
        foreach ($headerUnit as $key => $val) {
            $valSeptember = $this->AppWeb->unitLocation(9,$val->Id,$request->filter,$request->Department);
            $totalSeptember += $valSeptember;
            array_push($arrSeptember, $valSeptember);
        }
        array_push($arrSeptember, $totalSeptember);

        array_push($arrOktober, $month[9]);
        foreach ($headerUnit as $key => $val) {
            $valOktober = $this->AppWeb->unitLocation(10,$val->Id,$request->filter,$request->Department);
            $totalOktober += $valOktober;
            array_push($arrOktober, $valOktober);
        }
        array_push($arrOktober, $totalOktober);

        array_push($arrNovember, $month[10]);
        foreach ($headerUnit as $key => $val) {
            $valNovember = $this->AppWeb->unitLocation(11,$val->Id,$request->filter,$request->Department);
            $totalNovember += $valNovember;
            array_push($arrNovember, $valNovember);
        }
        array_push($arrNovember, $totalNovember);

        array_push($arrDesember, $month[11]);
        foreach ($headerUnit as $key => $val) {
            $valDesember = $this->AppWeb->unitLocation(12,$val->Id,$request->filter,$request->Department);
            $totalDesember += $valDesember;
            array_push($arrDesember, $valDesember);
        }
        array_push($arrDesember, $totalDesember);

        $totalMonth = $totalJanuari + $totalFebruari + $totalMaret + $totalApril + $totalMei + $totalJuni + $totalJuli + $totalAgustus + $totalSeptember + $totalOktober + $totalNovember + $totalDesember;
        if($totalMonth == 0) $totalMonth = 1;
        $percentJanuari = ($totalJanuari*100)/$totalMonth;
        array_push($arrJanuari, round($percentJanuari,2).' %');
        $percentFebruari = ($totalFebruari*100)/$totalMonth;
        array_push($arrFebruari, round($percentFebruari,2).' %');
        $percentMaret = ($totalMaret*100)/$totalMonth;
        array_push($arrMaret, round($percentMaret,2).' %');
        $percentApril = ($totalApril*100)/$totalMonth;
        array_push($arrApril, round($percentApril,2).' %');
        $percentMei = ($totalMei*100)/$totalMonth;
        array_push($arrMei, round($percentMei,2).' %');
        $percentJuni = ($totalJuni*100)/$totalMonth;
        array_push($arrJuni, round($percentJuni,2).' %');
        $percentJuli = ($totalJuli*100)/$totalMonth;
        array_push($arrJuli, round($percentJuli,2).' %');
        $percentAgustus = ($totalAgustus*100)/$totalMonth;
        array_push($arrAgustus, round($percentAgustus,2).' %');
        $percentSeptember = ($totalSeptember*100)/$totalMonth;
        array_push($arrSeptember, round($percentSeptember,2).' %');
        $percentOktober = ($totalOktober*100)/$totalMonth;
        array_push($arrOktober, round($percentOktober,2).' %');
        $percentNovember = ($totalNovember*100)/$totalMonth;
        array_push($arrNovember, round($percentNovember,2).' %');
        $percentDesember = ($totalDesember*100)/$totalMonth;
        array_push($arrDesember, round($percentDesember,2).' %');

        array_push($arrTotal, $month[12]);
        array_push($arrPersen, $month[13]);
        $valPareto = [];
        foreach ($headerUnit as $key => $val) {
            $item = DB::table('noe_report')
            ->select('Id')
            ->whereYear('Date',$request->filter)
            ->where('IdLocation',$val->Id)
            ->where(function($query) use ($request) {
                if(session('adminvue')->IdDepartment==67) {
                    if($request->Department!=0)
                        $query->where('IdDepartment', $request->Department);
                } else {
                    $query->where('IdDepartment', session('adminvue')->IdDepartment);
                }
            })
            ->where('Actived',1)
            ->count();

            $totalUnit += $item;
            array_push($arrTotal, $item);
            $totalPersen = ($item*100)/$totalMonth;
            if($totalPersen > 100) $totalPersen = 100;
            array_push($arrPersen, round($totalPersen,2).' %');

            // pie chart unit
            array_push($valUnitLocation, $item);
            // end pie chart unit

            // pareto chart unit
            $arrPareto = [];
            $arrPareto['label'] = $val->Name;
            $arrPareto['value'] = strval($item);
            $arrPareto['color'] = $val->LocationColor;
            array_push($valPareto, $arrPareto);
            // end pareto chart unit
        }
        array_push($arrTotal, $totalUnit);

        // sort chart unit
        $valUnitLocationSort = [];
        $arrBefore = [];
        $arrAfter = [];
        $itemPercent = [];
        $countPercent = [];
        $rumus = [];
        $totalSort = [];
        array_push($totalSort, 'Total');
        array_push($totalSort, $totalUnit);
        foreach ($headerUnit as $key => $val) {
            if($val) {
                $arrBefore[$val->Name] = $this->AppWeb->unitLocation(0,$val->Id,$request->filter,$request->Department);
            }
        }
        $keyBefore = array_keys($arrBefore);
        $valueBefore = array_values($arrBefore);
        arsort($arrBefore);

        $n = 0;
        foreach($arrBefore as $key => $val) {
            $arrAfter[$key] = $val;
            if($totalUnit == 0) $itemPersen = 0;
            else $itemPersen = ($val/$totalUnit)*100;

            if($itemPersen>100) $itemPersen = 100;
            array_push($itemPercent, round($itemPersen,0).' %');
            if(count($countPercent) == 0) {
                array_push($countPercent, round($itemPersen,0).' %');
                array_push($rumus, round($itemPersen,2).' %');
            }
            else {
                $countPersen = (float)$rumus[$n-1]+floatval($itemPersen);
                if($countPersen>100) $countPersen = 100;
                array_push($countPercent, round($countPersen,0).' %');
                array_push($rumus, round($countPersen,2).' %');
            }
            $n++;
        }

        $keyAfter = array_keys($arrAfter);
        $valueAfter = array_values($arrAfter);
        for ($i=0; $i < count($arrBefore); $i++) {
            $arr = [];
            array_push($arr, $keyBefore[$i]);
            array_push($arr, $valueBefore[$i]);
            array_push($arr, $keyAfter[$i]);
            array_push($arr, $valueAfter[$i]);
            array_push($arr, $itemPercent[$i]);
            array_push($arr, $countPercent[$i]);
            array_push($valUnitLocationSort, $arr);
        }
        array_push($valUnitLocationSort, $totalSort);
        // end sort chart unit

        array_push($resultUnit, $arrJanuari);
        array_push($resultUnit, $arrFebruari);
        array_push($resultUnit, $arrMaret);
        array_push($resultUnit, $arrApril);
        array_push($resultUnit, $arrMei);
        array_push($resultUnit, $arrJuni);
        array_push($resultUnit, $arrJuli);
        array_push($resultUnit, $arrAgustus);
        array_push($resultUnit, $arrSeptember);
        array_push($resultUnit, $arrOktober);
        array_push($resultUnit, $arrNovember);
        array_push($resultUnit, $arrDesember);
        array_push($resultUnit, $arrTotal);
        array_push($resultUnit, $arrPersen);

        if($request->type == 'tabel') {
            $array = [
                'countHeaderUnit'=>count($headerUnit),
                'headerUnit'=>$headerUnit,
                'unitLocation'=>$resultUnit
            ];
        } else if($request->type == 'chart') {
            $array = [
                'valHeaderUnit'=>$valHeaderUnit,
                'valUnitColor'=>$valUnitColor,
                'valUnitLocation'=>$valUnitLocation
            ];
        } else if($request->type == 'sort') {
            $array = [
                'valUnitLocationSort'=>$valUnitLocationSort
            ];
        } else if($request->type == 'pareto') {
            $array = [
                'valPareto'=>json_encode($valPareto)
            ];
        } else {
            $array = [
                'countHeaderUnit'=>count($headerUnit),
                'headerUnit'=>$headerUnit,
                'unitLocation'=>$resultUnit,
                'valHeaderUnit'=>$valHeaderUnit,
                'valUnitColor'=>$valUnitColor,
                'valUnitLocation'=>$valUnitLocation,
                'valUnitLocationSort'=>$valUnitLocationSort,
                'valPareto'=>json_encode($valPareto)
            ];
        }
        return json_encode($array);
    }

    public function getStatusNOE(Request $request) {
        $resultStatusNOE = [];
        $arrJanuari = [];
        $arrFebruari = [];
        $arrMaret = [];
        $arrApril = [];
        $arrMei = [];
        $arrJuni = [];
        $arrJuli = [];
        $arrAgustus = [];
        $arrSeptember = [];
        $arrOktober = [];
        $arrNovember = [];
        $arrDesember = [];
        $arrTotal = [];
        $arrPersen = [];
        $closedJanuari = 0;
        $openJanuari = 0;
        $totalJanuari = 0;
        $closedFebruari = 0;
        $openFebruari = 0;
        $totalFebruari = 0;
        $closedMaret = 0;
        $openMaret = 0;
        $totalMaret = 0;
        $closedApril = 0;
        $openApril = 0;
        $totalApril = 0;
        $closedMei = 0;
        $openMei = 0;
        $totalMei = 0;
        $closedJuni = 0;
        $openJuni = 0;
        $totalJuni = 0;
        $closedJuli = 0;
        $openJuli = 0;
        $totalJuli = 0;
        $closedAgustus = 0;
        $openAgustus = 0;
        $totalAgustus = 0;
        $closedSeptember = 0;
        $openSeptember = 0;
        $totalSeptember = 0;
        $closedOktober = 0;
        $openOktober = 0;
        $totalOktober = 0;
        $closedNovember = 0;
        $openNovember = 0;
        $totalNovember = 0;
        $closedDesember = 0;
        $openDesember = 0;
        $totalDesember = 0;
        $month = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember','TOTAL','PERSEN (%)'];
        if($request->filter == "" || $request->filter == null) $request->filter = Carbon::now()->format('Y');
        if($request->value == 'noe') {
            $item = DB::table('noe_report')
            ->select('NOENumber','IsClosed')
            ->whereYear('Date',$request->filter)
            ->where(function($query) use ($request) {
                if(session('adminvue')->IdDepartment==67) {
                    if($request->Department!=0)
                        $query->where('IdDepartment', $request->Department);
                } else {
                    $query->where('IdDepartment', session('adminvue')->IdDepartment);
                }
            })
            ->where('Actived',1)
            ->get();

            foreach ($item as $key => $val) {
                if(strpos($val->NOENumber, '/I/')) {
                    if($val->IsClosed == 0) $openJanuari += 1;
                    if($val->IsClosed == 1) $closedJanuari += 1;
                }
                if(strpos($val->NOENumber, '/II/')) {
                    if($val->IsClosed == 0) $openFebruari += 1;
                    if($val->IsClosed == 1) $closedFebruari += 1;
                }
                if(strpos($val->NOENumber, '/III/')) {
                    if($val->IsClosed == 0) $openMaret += 1;
                    if($val->IsClosed == 1) $closedMaret += 1;
                }
                if(strpos($val->NOENumber, '/IV/')) {
                    if($val->IsClosed == 0) $openApril += 1;
                    if($val->IsClosed == 1) $closedApril += 1;
                }
                if(strpos($val->NOENumber, '/V/')) {
                    if($val->IsClosed == 0) $openMei += 1;
                    if($val->IsClosed == 1) $closedMei += 1;
                }
                if(strpos($val->NOENumber, '/VI/')) {
                    if($val->IsClosed == 0) $openJuni += 1;
                    if($val->IsClosed == 1) $closedJuni += 1;
                }
                if(strpos($val->NOENumber, '/VII/')) {
                    if($val->IsClosed == 0) $openJuli += 1;
                    if($val->IsClosed == 1) $closedJuli += 1;
                }
                if(strpos($val->NOENumber, '/VIII/')) {
                    if($val->IsClosed == 0) $openAgustus += 1;
                    if($val->IsClosed == 1) $closedAgustus += 1;
                }
                if(strpos($val->NOENumber, '/IX/')) {
                    if($val->IsClosed == 0) $openSeptember += 1;
                    if($val->IsClosed == 1) $closedSeptember += 1;
                }
                if(strpos($val->NOENumber, '/X/')) {
                    if($val->IsClosed == 0) $openOktober += 1;
                    if($val->IsClosed == 1) $closedOktober += 1;
                }
                if(strpos($val->NOENumber, '/XI/')) {
                    if($val->IsClosed == 0) $openNovember += 1;
                    if($val->IsClosed == 1) $closedNovember += 1;
                }
                if(strpos($val->NOENumber, '/XII/')) {
                    if($val->IsClosed == 0) $openDesember += 1;
                    if($val->IsClosed == 1) $closedDesember += 1;
                }
            }
        }

        if($request->value == 'nod') {
            $item = DB::table('nod_report')
            ->select('NODNumber','IsClosed')
            ->whereYear('Date',$request->filter)
            ->where(function($query) use ($request) {
                if(session('adminvue')->IdDepartment==67) {
                    if($request->Department!=0)
                        $query->where('IdDepartment', $request->Department);
                } else {
                    $query->where('IdDepartment', session('adminvue')->IdDepartment);
                }
            })
            ->where('Actived',1)
            ->get();

            foreach ($item as $key => $val) {
                if(strpos($val->NODNumber, '/I/')) {
                    if($val->IsClosed == 0) $openJanuari += 1;
                    if($val->IsClosed == 1) $closedJanuari += 1;
                }
                if(strpos($val->NODNumber, '/II/')) {
                    if($val->IsClosed == 0) $openFebruari += 1;
                    if($val->IsClosed == 1) $closedFebruari += 1;
                }
                if(strpos($val->NODNumber, '/III/')) {
                    if($val->IsClosed == 0) $openMaret += 1;
                    if($val->IsClosed == 1) $closedMaret += 1;
                }
                if(strpos($val->NODNumber, '/IV/')) {
                    if($val->IsClosed == 0) $openApril += 1;
                    if($val->IsClosed == 1) $closedApril += 1;
                }
                if(strpos($val->NODNumber, '/V/')) {
                    if($val->IsClosed == 0) $openMei += 1;
                    if($val->IsClosed == 1) $closedMei += 1;
                }
                if(strpos($val->NODNumber, '/VI/')) {
                    if($val->IsClosed == 0) $openJuni += 1;
                    if($val->IsClosed == 1) $closedJuni += 1;
                }
                if(strpos($val->NODNumber, '/VII/')) {
                    if($val->IsClosed == 0) $openJuli += 1;
                    if($val->IsClosed == 1) $closedJuli += 1;
                }
                if(strpos($val->NODNumber, '/VIII/')) {
                    if($val->IsClosed == 0) $openAgustus += 1;
                    if($val->IsClosed == 1) $closedAgustus += 1;
                }
                if(strpos($val->NODNumber, '/IX/')) {
                    if($val->IsClosed == 0) $openSeptember += 1;
                    if($val->IsClosed == 1) $closedSeptember += 1;
                }
                if(strpos($val->NODNumber, '/X/')) {
                    if($val->IsClosed == 0) $openOktober += 1;
                    if($val->IsClosed == 1) $closedOktober += 1;
                }
                if(strpos($val->NODNumber, '/XI/')) {
                    if($val->IsClosed == 0) $openNovember += 1;
                    if($val->IsClosed == 1) $closedNovember += 1;
                }
                if(strpos($val->NODNumber, '/XII/')) {
                    if($val->IsClosed == 0) $openDesember += 1;
                    if($val->IsClosed == 1) $closedDesember += 1;
                }
            }
        }

        if(count($item) > 0) {
            $totalJanuari = $openJanuari + $closedJanuari;
            array_push($arrJanuari, $month[0]);
            array_push($arrJanuari, $closedJanuari);
            array_push($arrJanuari, $openJanuari);
            array_push($arrJanuari, $totalJanuari);
            array_push($resultStatusNOE, $arrJanuari);

            $totalFebruari = $openFebruari + $closedFebruari;
            array_push($arrFebruari, $month[1]);
            array_push($arrFebruari, $closedFebruari);
            array_push($arrFebruari, $openFebruari);
            array_push($arrFebruari, $totalFebruari);
            array_push($resultStatusNOE, $arrFebruari);

            $totalMaret = $openMaret + $closedMaret;
            array_push($arrMaret, $month[2]);
            array_push($arrMaret, $closedMaret);
            array_push($arrMaret, $openMaret);
            array_push($arrMaret, $totalMaret);
            array_push($resultStatusNOE, $arrMaret);

            $totalApril = $openApril + $closedApril;
            array_push($arrApril, $month[3]);
            array_push($arrApril, $closedApril);
            array_push($arrApril, $openApril);
            array_push($arrApril, $totalApril);
            array_push($resultStatusNOE, $arrApril);

            $totalMei = $openMei + $closedMei;
            array_push($arrMei, $month[4]);
            array_push($arrMei, $closedMei);
            array_push($arrMei, $openMei);
            array_push($arrMei, $totalMei);
            array_push($resultStatusNOE, $arrMei);

            $totalJuni = $openJuni + $closedJuni;
            array_push($arrJuni, $month[5]);
            array_push($arrJuni, $closedJuni);
            array_push($arrJuni, $openJuni);
            array_push($arrJuni, $totalJuni);
            array_push($resultStatusNOE, $arrJuni);

            $totalJuli = $openJuli + $closedJuli;
            array_push($arrJuli, $month[6]);
            array_push($arrJuli, $closedJuli);
            array_push($arrJuli, $openJuli);
            array_push($arrJuli, $totalJuli);
            array_push($resultStatusNOE, $arrJuli);

            $totalAgustus = $openAgustus + $closedAgustus;
            array_push($arrAgustus, $month[7]);
            array_push($arrAgustus, $closedAgustus);
            array_push($arrAgustus, $openAgustus);
            array_push($arrAgustus, $totalAgustus);
            array_push($resultStatusNOE, $arrAgustus);

            $totalSeptember = $openSeptember + $closedSeptember;
            array_push($arrSeptember, $month[8]);
            array_push($arrSeptember, $closedSeptember);
            array_push($arrSeptember, $openSeptember);
            array_push($arrSeptember, $totalSeptember);
            array_push($resultStatusNOE, $arrSeptember);

            $totalOktober = $openOktober + $closedOktober;
            array_push($arrOktober, $month[9]);
            array_push($arrOktober, $closedOktober);
            array_push($arrOktober, $openOktober);
            array_push($arrOktober, $totalOktober);
            array_push($resultStatusNOE, $arrOktober);

            $totalNovember = $openNovember + $closedNovember;
            array_push($arrNovember, $month[10]);
            array_push($arrNovember, $closedNovember);
            array_push($arrNovember, $openNovember);
            array_push($arrNovember, $totalNovember);
            array_push($resultStatusNOE, $arrNovember);

            $totalDesember = $openDesember + $closedDesember;
            array_push($arrDesember, $month[11]);
            array_push($arrDesember, $closedDesember);
            array_push($arrDesember, $openDesember);
            array_push($arrDesember, $totalDesember);
            array_push($resultStatusNOE, $arrDesember);

            $totalClosed = $closedJanuari + $closedFebruari + $closedMaret + $closedApril + $closedMei + $closedJuni + $closedJuli + $closedAgustus + $closedSeptember + $closedOktober + $closedNovember + $closedDesember;
            $totalOpen = $openJanuari + $openFebruari + $openMaret + $openApril + $openMei + $openJuni + $openJuli + $openAgustus + $openSeptember + $openOktober + $openNovember + $openDesember;
            $totalAll = $totalClosed + $totalOpen;
            array_push($arrTotal, $month[12]);
            array_push($arrTotal, $totalClosed);
            array_push($arrTotal, $totalOpen);
            array_push($arrTotal, $totalAll);
            array_push($resultStatusNOE, $arrTotal);

            $closedPercent = ($totalClosed*100)/$totalAll;
            $openPercent = ($totalOpen*100)/$totalAll;
            array_push($arrPersen, $month[13]);
            array_push($arrPersen, round($closedPercent,2).' %');
            array_push($arrPersen, round($openPercent,2).' %');
            array_push($arrPersen, '');
            array_push($resultStatusNOE, $arrPersen);
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$resultStatusNOE,
        ));
    }

    public function getStatusTime(Request $request) {
        if($request->filter == "" || $request->filter == null) $request->filter = Carbon::now()->format('Y');
        if($request->value=='noe') {
            $itemTotal = DB::table('noe_report')
            ->select('StatusTimeDept','StatusTimeQA')
            ->where(function ($query) use ($request) {
                if($request->filter!='' || $request->filter!=null) {
                    $query->whereYear('Date', $request->filter);
                }

                if(session('adminvue')->IdDepartment==67) {
                    if($request->Department!=0)
                        $query->where('IdDepartment', $request->Department);
                } else {
                    $query->where('IdDepartment', session('adminvue')->IdDepartment);
                }
            })
            ->where('Actived',1)
            ->count();

            $month = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
            $result = [];
            $countDG = 0;
            $countDOT = 0;
            $countDD = 0;
            $countQG = 0;
            $countQOT = 0;
            $countQD = 0;

            foreach ($month as $key => $val) {
                $result[$key]['month'] = $val;

                $item = DB::table('noe_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeDept', null)
                ->where('Actived',1)
                ->count();
                $result[$key]['DeptGoing'] = $item;
                $countDG += $item;

                $item = DB::table('noe_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeDept', 1)
                ->where('Actived',1)
                ->count();
                $result[$key]['DeptOnTime'] = $item;
                $countDOT += $item;

                $item = DB::table('noe_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeDept', 2)
                ->where('Actived',1)
                ->count();
                $result[$key]['DeptDelay'] = $item;
                $countDD += $item;

                $item = DB::table('noe_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeQA', null)
                ->where('Actived',1)
                ->count();
                $result[$key]['QAGoing'] = $item;
                $countQG += $item;

                $item = DB::table('noe_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeQA', 1)
                ->where('Actived',1)
                ->count();
                $result[$key]['QAOnTime'] = $item;
                $countQOT += $item;

                $item = DB::table('noe_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeQA', 2)
                ->where('Actived',1)
                ->count();
                $result[$key]['QADelay'] = $item;
                $countQD += $item;
            }

            $percentDG = number_format(($itemTotal>0 ? $countDG / $itemTotal : 0) * 100, 2);
            $percentDOT = number_format(($itemTotal>0 ? $countDOT / $itemTotal : 0) * 100, 2);
            $percentDD = number_format(($itemTotal>0 ? $countDD / $itemTotal : 0) * 100, 2);
            $percentQG = number_format(($itemTotal>0 ? $countQG / $itemTotal : 0) * 100, 2);
            $percentQOT = number_format(($itemTotal>0 ? $countQOT / $itemTotal : 0) * 100, 2);
            $percentQD = number_format(($itemTotal>0 ? $countQD / $itemTotal : 0) * 100, 2);

        }

        if($request->value=='nod') {
            $itemTotal = DB::table('nod_report')
            ->select('Id')
            ->where(function ($query) use ($request) {
                if($request->filter!='' || $request->filter!=null) {
                    $query->whereYear('Date', $request->filter);
                }

                if(session('adminvue')->IdDepartment==67) {
                    if($request->Department!=0)
                        $query->where('IdDepartment', $request->Department);
                } else {
                    $query->where('IdDepartment', session('adminvue')->IdDepartment);
                }
            })
            ->where('Actived',1)
            ->count();

            $month = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
            $result = [];
            $countDG = 0;
            $countDOT = 0;
            $countDD = 0;
            $countQG = 0;
            $countQOT = 0;
            $countQD = 0;

            foreach ($month as $key => $val) {
                $result[$key]['month'] = $val;

                $item = DB::table('nod_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeDept', null)
                ->where('Actived',1)
                ->count();
                $result[$key]['DeptGoing'] = $item;
                $countDG += $item;

                $item = DB::table('nod_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeDept', 1)
                ->where('Actived',1)
                ->count();
                $result[$key]['DeptOnTime'] = $item;
                $countDOT += $item;

                $item = DB::table('nod_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeDept', 2)
                ->where('Actived',1)
                ->count();
                $result[$key]['DeptDelay'] = $item;
                $countDD += $item;

                $item = DB::table('nod_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeQA', null)
                ->where('Actived',1)
                ->count();
                $result[$key]['QAGoing'] = $item;
                $countQG += $item;

                $item = DB::table('nod_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeQA', 1)
                ->where('Actived',1)
                ->count();
                $result[$key]['QAOnTime'] = $item;
                $countQOT += $item;

                $item = DB::table('nod_report')
                ->select('Id')
                ->where(function ($query) use ($request) {
                    if($request->filter!='' || $request->filter!=null)
                        $query->whereYear('Date', $request->filter);

                    if(session('adminvue')->IdDepartment==67) {
                        if($request->Department!=0)
                            $query->where('IdDepartment', $request->Department);
                    } else {
                        $query->where('IdDepartment', session('adminvue')->IdDepartment);
                    }
                })
                ->whereMonth('Date', $key+1)
                ->where('StatusTimeQA', 2)
                ->where('Actived',1)
                ->count();
                $result[$key]['QADelay'] = $item;
                $countQD += $item;
            }

            $percentDG = number_format(($itemTotal>0 ? $countDG / $itemTotal : 0) * 100, 2);
            $percentDOT = number_format(($itemTotal>0 ? $countDOT / $itemTotal : 0) * 100, 2);
            $percentDD = number_format(($itemTotal>0 ? $countDD / $itemTotal : 0) * 100, 2);
            $percentQG = number_format(($itemTotal>0 ? $countQG / $itemTotal : 0) * 100, 2);
            $percentQOT = number_format(($itemTotal>0 ? $countQOT / $itemTotal : 0) * 100, 2);
            $percentQD = number_format(($itemTotal>0 ? $countQD / $itemTotal : 0) * 100, 2);

        }

        return json_encode(array(
            'status'=>true,
            'data'=>$result,
            'countDG' => $countDG,
            'countDOT' => $countDOT,
            'countDD' => $countDD,
            'countQG' => $countQG,
            'countQOT' => $countQOT,
            'countQD' => $countQD,
            'percentDG' => $percentDG,
            'percentDOT' => $percentDOT,
            'percentDD' => $percentDD,
            'percentQG' => $percentQG,
            'percentQOT' => $percentQOT,
            'percentQD' => $percentQD,
        ));
    }

    public function getDeviationLevel(Request $request) {
        if($request->filter == "" || $request->filter == null) $request->filter = Carbon::now()->format('Y');
        $headerDeviation = DB::table('deviation_level')
            ->select('Id','Level')
            ->where('Actived',1)
            ->get();

        $resultDeviation = [];
        $arrJanuari = [];
        $arrFebruari = [];
        $arrMaret = [];
        $arrApril = [];
        $arrMei = [];
        $arrJuni = [];
        $arrJuli = [];
        $arrAgustus = [];
        $arrSeptember = [];
        $arrOktober = [];
        $arrNovember = [];
        $arrDesember = [];
        $arrTotal = [];
        $totalJanuari = 0;
        $totalFebruari = 0;
        $totalMaret = 0;
        $totalApril = 0;
        $totalMei = 0;
        $totalJuni = 0;
        $totalJuli = 0;
        $totalAgustus = 0;
        $totalSeptember = 0;
        $totalOktober = 0;
        $totalNovember = 0;
        $totalDesember = 0;
        $totalDeviation = 0;
        $month = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember','TOTAL'];

        array_push($arrJanuari, $month[0]);
        foreach ($headerDeviation as $key => $val) {
            $valJanuari = $this->AppWeb->deviationLevel(1,$val->Level,$request->filter,$request->Department);
            $totalJanuari += $valJanuari;
            array_push($arrJanuari, $valJanuari);
        }
        array_push($arrJanuari, $totalJanuari);

        array_push($arrFebruari, $month[1]);
        foreach ($headerDeviation as $key => $val) {
            $valFebruari = $this->AppWeb->deviationLevel(2,$val->Level,$request->filter,$request->Department);
            $totalFebruari += $valFebruari;
            array_push($arrFebruari, $valFebruari);
        }
        array_push($arrFebruari, $totalFebruari);

        array_push($arrMaret, $month[2]);
        foreach ($headerDeviation as $key => $val) {
            $valMaret = $this->AppWeb->deviationLevel(3,$val->Level,$request->filter,$request->Department);
            $totalMaret += $valMaret;
            array_push($arrMaret, $valMaret);
        }
        array_push($arrMaret, $totalMaret);

        array_push($arrApril, $month[3]);
        foreach ($headerDeviation as $key => $val) {
            $valApril = $this->AppWeb->deviationLevel(4,$val->Level,$request->filter,$request->Department);
            $totalApril += $valApril;
            array_push($arrApril, $valApril);
        }
        array_push($arrApril, $totalApril);

        array_push($arrMei, $month[4]);
        foreach ($headerDeviation as $key => $val) {
            $valMei = $this->AppWeb->deviationLevel(5,$val->Level,$request->filter,$request->Department);
            $totalMei += $valMei;
            array_push($arrMei, $valMei);
        }
        array_push($arrMei, $totalMei);

        array_push($arrJuni, $month[5]);
        foreach ($headerDeviation as $key => $val) {
            $valJuni = $this->AppWeb->deviationLevel(6,$val->Level,$request->filter,$request->Department);
            $totalJuni += $valJuni;
            array_push($arrJuni, $valJuni);
        }
        array_push($arrJuni, $totalJuni);

        array_push($arrJuli, $month[6]);
        foreach ($headerDeviation as $key => $val) {
            $valJuli = $this->AppWeb->deviationLevel(7,$val->Level,$request->filter,$request->Department);
            $totalJuli += $valJuli;
            array_push($arrJuli, $valJuli);
        }
        array_push($arrJuli, $totalJuli);

        array_push($arrAgustus, $month[7]);
        foreach ($headerDeviation as $key => $val) {
            $valAgustus = $this->AppWeb->deviationLevel(8,$val->Level,$request->filter,$request->Department);
            $totalAgustus += $valAgustus;
            array_push($arrAgustus, $valAgustus);
        }
        array_push($arrAgustus, $totalAgustus);

        array_push($arrSeptember, $month[8]);
        foreach ($headerDeviation as $key => $val) {
            $valSeptember = $this->AppWeb->deviationLevel(9,$val->Level,$request->filter,$request->Department);
            $totalSeptember += $valSeptember;
            array_push($arrSeptember, $valSeptember);
        }
        array_push($arrSeptember, $totalSeptember);

        array_push($arrOktober, $month[9]);
        foreach ($headerDeviation as $key => $val) {
            $valOktober = $this->AppWeb->deviationLevel(10,$val->Level,$request->filter,$request->Department);
            $totalOktober += $valOktober;
            array_push($arrOktober, $valOktober);
        }
        array_push($arrOktober, $totalOktober);

        array_push($arrNovember, $month[10]);
        foreach ($headerDeviation as $key => $val) {
            $valNovember = $this->AppWeb->deviationLevel(11,$val->Level,$request->filter,$request->Department);
            $totalNovember += $valNovember;
            array_push($arrNovember, $valNovember);
        }
        array_push($arrNovember, $totalNovember);

        array_push($arrDesember, $month[11]);
        foreach ($headerDeviation as $key => $val) {
            $valDesember = $this->AppWeb->deviationLevel(12,$val->Level,$request->filter,$request->Department);
            $totalDesember += $valDesember;
            array_push($arrDesember, $valDesember);
        }
        array_push($arrDesember, $totalDesember);

        array_push($arrTotal, $month[12]);
        foreach ($headerDeviation as $key => $val) {
            $item = DB::table('noe_report')
            ->select('Id')
            ->whereYear('Date',$request->filter)
            ->where(function ($query) use ($request) {
                if(session('adminvue')->IdDepartment==67) {
                    if($request->Department!=0)
                        $query->where('IdDepartment', $request->Department);
                } else {
                    $query->where('IdDepartment', session('adminvue')->IdDepartment);
                }
            })
            ->where('Actived',1)
            ->get();

            // dd($item);

            if($item) {
                $itemDeviation = 0;
                foreach ($item as $k => $v) {
                    $itemVerif = DB::table('noe_verif_evaluation')
                    ->select('DeviationLevel')
                    ->where('IdNOEReport',$v->Id)
                    ->where('DeviationLevelQA',$val->Level)
                    ->where('Actived',1)
                    ->count();
                    $itemDeviation += $itemVerif;
                }
            }
            $totalDeviation += $itemDeviation;
            array_push($arrTotal, $itemDeviation);
        }
        array_push($arrTotal, $totalDeviation);

        array_push($resultDeviation, $arrJanuari);
        array_push($resultDeviation, $arrFebruari);
        array_push($resultDeviation, $arrMaret);
        array_push($resultDeviation, $arrApril);
        array_push($resultDeviation, $arrMei);
        array_push($resultDeviation, $arrJuni);
        array_push($resultDeviation, $arrJuli);
        array_push($resultDeviation, $arrAgustus);
        array_push($resultDeviation, $arrSeptember);
        array_push($resultDeviation, $arrOktober);
        array_push($resultDeviation, $arrNovember);
        array_push($resultDeviation, $arrDesember);
        array_push($resultDeviation, $arrTotal);

        return json_encode(array(
            'status'=>true,
            'countHeaderDeviation'=>count($headerDeviation),
            'headerDeviation'=>$headerDeviation,
            'deviationLevel'=>$resultDeviation
        ));
    }

    public function cekAccessDashboard() {
        $accessMenu = DB::table('user_access')
            ->select('Action')
            ->where('IdTypeUser',session('adminvue')->TypeUser)
            ->value('Action');

        $path = json_decode($accessMenu);
        for ($i=0; $i <count($path); $i++) {
            if($path[$i]->text === 'Statistik Dashboard') {
                $result = [];
                foreach ($path[$i]->children as $key => $val) {
                    if($val->selected) array_push($result, true);
                    else $status = array_push($result, false);
                }
                return $result;
            }
        }
    }

    public function getDataReport(Request $request) {
        $year = $request->input('year');
        $dept = $request->input('department');
        $getCurrentYear = 0;
        
        if($year === null) {
            $getCurrentYear = Carbon::now()->format('Y');
        } else {
            $getCurrentYear = $year['text'];
        }

        $dataNoe = [];

        $getTotalLaporanNoe = DB::table('noe_report as noe')
                      ->select('*')
                      ->get();

        $getIsOpenNoe = DB::table('noe_report as noe')
                    ->select('*')
                    ->where('noe.Status', 7)
                    ->where('noe.Actived', 1)
                    ->whereYear('noe.Date', $getCurrentYear)
                    ->where(function($getIsOpenNoe) use ($dept) {
                        if($dept == 0) {
                            $getIsOpenNoe->where('noe.IdDepartment','>', 0);
                        } else {
                            $getIsOpenNoe->where('noe.IdDepartment', $dept);
                        }
                    })
                    ->get();

        $getOngoingNoe = DB::table('noe_report as noe')
                    ->select('*')
                    ->whereBetween('noe.Status', [2, 6]) // saat dilaporkan unit head
                    ->where('noe.Actived', 1)
                    ->whereYear('noe.Date', $getCurrentYear)
                    ->where(function($getOngoingNoe) use ($dept) {
                        if($dept == 0) {
                            $getOngoingNoe->where('noe.IdDepartment','>', 0);
                        } else {
                            $getOngoingNoe->where('noe.IdDepartment', $dept);
                        }
                    })
                    ->get();

        $getIsClosedNoe = DB::table('noe_report as noe')
                    ->select('*')
                    ->where('noe.IsClosed', 1)
                    ->where('noe.Actived', 1)
                    ->whereYear('noe.Date', $getCurrentYear)
                    ->where(function($getIsClosedNoe) use ($dept) {
                        if($dept == 0) {
                            $getIsClosedNoe->where('noe.IdDepartment','>', 0);
                        } else {
                            $getIsClosedNoe->where('noe.IdDepartment', $dept);
                        }
                    })
                    ->get();
        
        $dataNoe['total_laporan'] = count($getIsOpenNoe) + count($getIsClosedNoe);
        $dataNoe['is_open_laporan'] = count($getIsOpenNoe);
        $dataNoe['is_ongoing_laporan'] = count($getOngoingNoe);
        $dataNoe['is_closed_laporan'] = count($getIsClosedNoe);

        $dataNod = [];

        $getTotalLaporanNod = DB::table('nod_report as nod')
                      ->select('*')
                      ->where('nod.Actived', 1)
                      ->get();

        $getIsOpenNod = DB::table('nod_report as nod')
                    ->select('*')
                    ->whereIn('nod.Status', [8, 11])
                    ->where('nod.IsCapaVerified', 0)
                    ->where('nod.Actived', 1)
                    ->whereYear('nod.Date', $getCurrentYear)
                    ->where(function($getIsOpenNod) use ($dept) {
                        if($dept == 0) {
                            $getIsOpenNod->where('nod.IdDepartment','>', 0);
                        } else {
                            $getIsOpenNod->where('nod.IdDepartment', $dept);
                        }
                    })
                    ->get();
        
        $getOngoingNod = DB::table('nod_report as nod')
                    ->select('*')
                    ->whereBetween('nod.Status', [2, 6])
                    ->where('nod.Actived', 1)
                    ->whereYear('nod.Date', $getCurrentYear)
                    ->where(function($getOngoingNod) use ($dept) {
                        if($dept == 0) {
                            $getOngoingNod->where('nod.IdDepartment','>', 0);
                        } else {
                            $getOngoingNod->where('nod.IdDepartment', $dept);
                        }
                    })
                    ->get();

        $getIsClosedNod = DB::table('verifikasi_capa_nod as vcn')
                    ->select('*')
                    ->join('nod_report as nod', 'nod.Id', '=', 'vcn.id_approved_nod')
                    ->where('vcn.is_approved', 1)
                    ->where('vcn.actived', 1)
                    ->whereYear('nod.Date', $getCurrentYear)
                    ->where(function($getIsClosedNod) use ($dept) {
                        if($dept == 0) {
                            $getIsClosedNod->where('nod.IdDepartment','>', 0);
                        } else {
                            $getIsClosedNod->where('nod.IdDepartment', $dept);
                        }
                    })
                    ->get();
        
        $dataNod['total_laporan_nod'] = count($getIsOpenNod) + count($getIsClosedNod);
        $dataNod['is_open_laporan_nod'] = count($getIsOpenNod);
        $dataNod['is_ongoing_laporan_nod'] = count($getOngoingNod);
        $dataNod['is_closed_laporan_nod'] = count($getIsClosedNod);
        
         return response()->json([
            'dataNoe' => $dataNoe,
            'dataNod' => $dataNod
         ]);
    }

    public function getLevelNoe(Request $request) {
        
        $year = $request->input('year');
        $dept = $request->input('department');
        $getCurrentYear = 0;
        
        if($year === null) {
            $getCurrentYear = Carbon::now()->format('Y');
        } else {
            $getCurrentYear = $year['text'];
        }
        
        $getLevelNoe = DB::table('noe_verif_evaluation as nve')
                    ->select('noe.NOENumberAcc','nve.DeviationLevelQA')
                    ->leftjoin('noe_report as noe', 'noe.Id', '=', 'nve.IdNOEReport')
                    ->whereNotNull('nve.DeviationLevelQA')
                    ->where('noe.Status', 9)
                    ->where('noe.Actived', 1)
                    ->whereYear('noe.Date', $getCurrentYear)
                    ->where(function($getLevelNoe) use ($dept) {
                        if($dept == 0) {
                            $getLevelNoe->where('noe.IdDepartment','>', 0);
                        } else {
                            $getLevelNoe->where('noe.IdDepartment', $dept);
                        }
                    })
                    ->get();
        
        $countDataNoe = (count($getLevelNoe) ? : 1);
        $minor = [];
        $major = [];
        $critical = [];
        $dataLabel = ['Minor', 'Major', 'Critical'];
        $levelColor = ['#6adffc', '#ffb554', '#bdbbb9'];
        $setDataValue = [];
        foreach($getLevelNoe as $key => $value) {
            if( $value->DeviationLevelQA === 'Minor' ) {
                array_push($minor, $value->DeviationLevelQA);
            } elseif ( $value->DeviationLevelQA === 'Major' ) {
                array_push($major, $value->DeviationLevelQA);
            } elseif ( $value->DeviationLevelQA === 'Critical' ) {
                array_push($major, $value->DeviationLevelQA);
            }
        }
        
        $setDataValue = [
            round(count($minor) / $countDataNoe * 100 , 2),
            round(count($major) / $countDataNoe * 100 , 2),
            round(count($critical) / $countDataNoe * 100, 2)
        ];
       
        $setRawData = [
            'minor' => count($minor),
            'major' => count($major),
            'critical' => count($critical)
        ];
        
        return response()->json([
            'dataLavel' => $dataLabel,
            'levelColor' => $levelColor,
            'setDataValue' => $setDataValue,
            'rawData' => $setRawData
        ]);

    }

    public function betsCategory(Request $request) {
        $year = $request->input('year');
        $dept = $request->input('department');
        $getCurrentYear = 0;
        
        if($year === null) {
            $getCurrentYear = Carbon::now()->format('Y');
        } else {
            $getCurrentYear = $year['text'];
        }
        
        $getBetsCategory = DB::table('noe_verif_evaluation as nve')
                        ->select('noe.NOENumberAcc', 'nve.IdDeviation')
                        ->leftjoin('noe_report as noe', 'noe.Id', '=', 'nve.IdNOEReport')
                        ->whereNotNull('nve.IdDeviation')
                        ->where('noe.Status', 9)
                        ->where('noe.Actived', 1)
                        ->whereYear('noe.Date', $getCurrentYear)
                        ->where(function($getBetsCategory) use ($dept) {
                            if($dept == 0) {
                                $getBetsCategory->where('noe.IdDepartment','>', 0);
                            } else {
                                $getBetsCategory->where('noe.IdDepartment', $dept);
                            }
                        })
                        ->get();

        $countDataBets = (count($getBetsCategory) ? : 1);
        $bets = [];
        $nonBets = [];
        $dataLabel = ['Bets', 'Non Bets'];
        $betsColor = ['#6adffc', '#ffb554'];
        $setDataValue = [];
        foreach($getBetsCategory as $key => $value) {
            if( $value->IdDeviation === 'Bets' ) {
                array_push($bets, $value->IdDeviation);
            } elseif ( $value->IdDeviation === 'Non Bets' ) {
                array_push($nonBets, $value->IdDeviation);
            }
        }

        $setDataValue = [
            round(count($bets) / $countDataBets * 100, 2),
            round(count($nonBets) / $countDataBets * 100, 2),
        ];

        $setRawData = [
            'bets' => count($bets),
            'nonBets' => count($nonBets)
        ];

        return response()->json([
            'databets' => $dataLabel,
            'betscolor' => $betsColor,
            'setDataValue' => $setDataValue,
            'rawData' => $setRawData 
        ]);
    }

    public function getStatusNoeNod(Request $request) {
        $dataOpen = [
            'January'   => [],
            'February'  => [],
            'March'     => [],
            'April'     => [],
            'May'       => [],
            'June'      => [],
            'July'      => [],
            'August'    => [],
            'September' => [],
            'October'   => [],
            'November'  => [],
            'December'  => [],
        ];

        $dataOngoing = [
            'January'   => [],
            'February'  => [],
            'March'     => [],
            'April'     => [],
            'May'       => [],
            'June'      => [],
            'July'      => [],
            'August'    => [],
            'September' => [],
            'October'   => [],
            'November'  => [],
            'December'  => [],
        ];

        $dataClosed = [
            'January'   => [],
            'February'  => [],
            'March'     => [],
            'April'     => [],
            'May'       => [],
            'June'      => [],
            'July'      => [],
            'August'    => [],
            'September' => [],
            'October'   => [],
            'November'  => [],
            'December'  => [],
        ];

        if($request->status === 'noe') {
            $year = $request->input('year');
            $dept = $request->input('department');
            $getCurrentYear = 0;
            
            if($year === null) {
                $getCurrentYear = Carbon::now()->format('Y');
            } else {
                $getCurrentYear = $year['text'];
            }

            $getTotalLaporanNoe = DB::table('noe_report as noe')
                          ->select('*')
                          ->get();
    
            $getIsOpenNoe = DB::table('noe_report as noe')
                        ->select(DB::raw('COUNT(*) as total'), DB::raw('MONTH(noe.Date) as month'))
                        ->where('noe.Status', 7)
                        ->whereBetween(DB::raw('MONTH(noe.Date)'), [1, 12])
                        ->where('noe.Actived', 1)
                        ->whereYear('noe.Date', $getCurrentYear)
                        ->where(function($getIsOpenNoe) use ($dept) {
                            if($dept == 0) {
                                $getIsOpenNoe->where('noe.IdDepartment','>', 0);
                            } else {
                                $getIsOpenNoe->where('noe.IdDepartment', $dept);
                            }
                        })
                        ->groupBy('month')
                        ->orderBy('month')
                        ->get();
    
            $getOngoingNoe = DB::table('noe_report as noe')
                        ->select(DB::raw('COUNT(*) as total'), DB::raw('MONTH(noe.Date) as month'))
                        ->where('noe.Status', 5)
                        ->whereBetween(DB::raw('MONTH(noe.Date)'), [1, 12])
                        ->where('noe.Actived', 1)
                        ->whereYear('noe.Date', $getCurrentYear)
                        ->where(function($getOngoingNoe) use ($dept) {
                            if($dept == 0) {
                                $getOngoingNoe->where('noe.IdDepartment','>', 0);
                            } else {
                                $getOngoingNoe->where('noe.IdDepartment', $dept);
                            }
                        })
                        ->groupBy('month')
                        ->orderBy('month')
                        ->get();
    
            $getIsClosedNoe = DB::table('noe_report as noe')
                        ->select(DB::raw('COUNT(*) as total'), DB::raw('MONTH(noe.Date) as month'))
                        ->where('noe.Actived', 1)
                        ->where('noe.Status', 9)
                        ->whereBetween(DB::raw('MONTH(noe.Date)'), [1, 12])
                        ->whereYear('noe.Date', $getCurrentYear)
                        ->where(function($getIsClosedNoe) use ($dept) {
                            if($dept == 0) {
                                $getIsClosedNoe->where('noe.IdDepartment','>', 0);
                            } else {
                                $getIsClosedNoe->where('noe.IdDepartment', $dept);
                            }
                        })
                        ->groupBy('month')
                        ->orderBy('month')
                        ->get();
                
                if(count($getIsOpenNoe) > 0) {
                    foreach($getIsOpenNoe as $keyOpen => $valOpen) {
                        $openConvertDigits = Carbon::createFromDate(null, $valOpen->month, null);
                        $openData = $openConvertDigits->format('F');

                        foreach($dataOpen as $keyOpenData => $valData) {
                            if( $keyOpenData === $openData ) {
                                $dataOpen[$keyOpenData] = $valOpen->total;
                            }
                        }
                    }
                }
            
            if(count($getOngoingNoe) > 0) {
                foreach($getOngoingNoe as $keyOngoing => $valOngoing) {
                    $ongoingConvertDigits = Carbon::createFromDate(null, $valOngoing->month, null);
                    $ongoingData = $ongoingConvertDigits->format('F');

                    foreach($dataOngoing as $keyDataOngoing => $valDataOngoing) {
                        if( $keyDataOngoing === $ongoingData ) {
                            $dataOngoing[$keyDataOngoing] = $valOngoing->total;
                        }
                    }
                }
            }

            
            if(count($getIsClosedNoe) > 0) {
                foreach($getIsClosedNoe as $keyClosed => $valClosed) {
                    $closedConvertDigits = Carbon::createFromDate(null, $valClosed->month, null);
                    $closedData = $closedConvertDigits->format('F');
                    
                    foreach($dataClosed as $keyDataClosed => $valDataClosed) {
                        if( $keyDataClosed === $closedData ) {
                            $dataClosed[$keyDataClosed] = $valClosed->total;
                        }
                    }
                }
            }
        
        } else if ($request->status === 'nod') {
            $year = $request->input('year');
            $dept = $request->input('department');
            $getCurrentYear = 0;
            
            if($year === null) {
                $getCurrentYear = Carbon::now()->format('Y');
            } else {
                $getCurrentYear = $year['text'];
            }

            $getTotalLaporanNod = DB::table('nod_report as nod')
                      ->select('*')
                      ->get();

            $getIsOpenNod = DB::table('nod_report as nod')
                        ->select(DB::raw('COUNT(*) as total'), DB::raw('MONTH(nod.Date) as month'))
                        ->whereIn('nod.Status', [8, 11])
                        ->where('nod.IsCapaVerified', 0)
                        ->whereBetween(DB::raw('MONTH(nod.Date)'), [1, 12])
                        ->where('nod.Actived', 1)
                        ->whereYear('nod.Date', $getCurrentYear)
                        ->where(function($getIsOpenNod) use ($dept) {
                            if($dept == 0) {
                                $getIsOpenNod->where('nod.IdDepartment','>', 0);
                            } else {
                                $getIsOpenNod->where('nod.IdDepartment', $dept);
                            }
                        })
                        ->groupBy('month')
                        ->orderBy('month')
                        ->get();
            
            $getOngoingNod = DB::table('nod_report as nod')
                        ->select(DB::raw('COUNT(*) as total'), DB::raw('MONTH(nod.Date) as month'))
                        ->whereBetween('nod.Status', [2, 6])
                        ->whereBetween(DB::raw('MONTH(nod.Date)'), [1, 12])
                        ->where('nod.Actived', 1)
                        ->whereYear('nod.Date', $getCurrentYear)
                        ->where(function($getOngoingNod) use ($dept) {
                            if($dept == 0) {
                                $getOngoingNod->where('nod.IdDepartment','>', 0);
                            } else {
                                $getOngoingNod->where('nod.IdDepartment', $dept);
                            }
                        })
                        ->groupBy('month')
                        ->orderBy('month')
                        ->get();

            $getIsClosedNod = DB::table('verifikasi_capa_nod as vcn')
                        ->select(DB::raw('COUNT(*) as total'), DB::raw('MONTH(vcn.created_at) as month'))
                        ->join('nod_report as nod', 'nod.Id', '=', 'vcn.id_approved_nod')
                        ->where('vcn.is_approved', 1)
                        ->where('vcn.actived', 1)
                        ->whereBetween(DB::raw('MONTH(vcn.created_at)'), [1, 12])
                        ->whereYear('nod.Date', $getCurrentYear)
                        ->where(function($getIsClosedNod) use ($dept) {
                            if($dept == 0) {
                                $getIsClosedNod->where('nod.IdDepartment','>', 0);
                            } else {
                                $getIsClosedNod->where('nod.IdDepartment', $dept);
                            }
                        })
                        ->groupBy('month')
                        ->orderBy('month')
                        ->get();
            
            if(count($getIsOpenNod) > 0) {
                    foreach($getIsOpenNod as $keyOpen => $valOpen) {
                        $openConvertDigits = Carbon::createFromDate(null, $valOpen->month, null);
                        $openData = $openConvertDigits->format('F');

                        foreach($dataOpen as $keyOpenData => $valData) {
                            if( $keyOpenData === $openData ) {
                                $dataOpen[$keyOpenData] = $valOpen->total;
                            }
                        }
                    }
                }
            
            if(count($getOngoingNod) > 0) {
                foreach($getOngoingNod as $keyOngoing => $valOngoing) {
                    $ongoingConvertDigits = Carbon::createFromDate(null, $valOngoing->month, null);
                    $ongoingData = $ongoingConvertDigits->format('F');

                    foreach($dataOngoing as $keyDataOngoing => $valDataOngoing) {
                        if( $keyDataOngoing === $ongoingData ) {
                            $dataOngoing[$keyDataOngoing] = $valOngoing->total;
                        }
                    }
                }
            }

            if(count($getIsClosedNod) > 0) {
                foreach($getIsClosedNod as $keyClosed => $valClosed) {
                    $closedConvertDigits = Carbon::parse(null, $valClosed->month, null);
                    $closedData = $closedConvertDigits->format('F');
        
                    foreach($dataClosed as $keyDataClosed => $valDataClosed) {
                        if( $keyDataClosed === $closedData ) {
                            $dataClosed[$keyDataClosed] = $valClosed->total;
                        }
                    }
                }
            }
        }

        return response()->json([
            'dataOngoing'   => $dataOngoing,
            'dataOpen'      => $dataOpen,
            'dataClosed'    => $dataClosed
        ]);
    }

    public function avarageData(Request $request) {
        $year = $request->input('year');
        $dept = $request->input('department');
        $getCurrentYear = 0;
            
        if($year === null) {
            $getCurrentYear = Carbon::now()->format('Y');
        } else {
            $getCurrentYear = $year['text'];
        }

        $countDataVerifNoe = DB::table('noe_report as noe')
                ->select('noe.NOENumber','noe.Date','noe.DatePublish', 'nve.DateDept as dateDeptPelapor')
                ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
                ->where('nve.TypeData', 0)
                ->where('noe.Actived', 1)
                ->whereYear('noe.Date', $getCurrentYear)
                ->where(function($countDataVerifNoe) use ($dept) {
                    if($dept == 0) {
                        $countDataVerifNoe->where('noe.IdDepartment','>', 0);
                    } else {
                        $countDataVerifNoe->where('noe.IdDepartment', $dept);
                    }
                })
                ->get();
        
        $countDataEvaluationNoe = DB::table('noe_report as noe')
                ->select('noe.NOENumber', 'nve.DateDept')
                ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
                ->where('noe.Actived', 1)
                ->whereYear('noe.Date', $getCurrentYear)
                ->where(function($countDataEvaluationNoe) use ($dept) {
                    if($dept == 0) {
                        $countDataEvaluationNoe->where('noe.IdDepartment','>', 0);
                    } else {
                        $countDataEvaluationNoe->where('noe.IdDepartment', $dept);
                    }
                })
                ->get();

        $countDataNod = DB::table('nod_report as nod')
                        ->select('nod.DateQA as dateQaDept','nod.dateQaSection as dateQaNod','nve.DateDept as dateQadhApproveNoe')
                        ->leftjoin('nod_relevant as nr','nr.IdNODReport','=','nod.Id')
                        ->leftjoin('noe_report as noe', 'noe.Id','=','nod.IdNOEReport')
                        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
                        ->where('nve.TypeData', 1)
                        ->whereNotNull('nod.dateQaSection')
                        ->where('nod.Actived', '>', 0)
                        ->whereYear('nod.Date', $getCurrentYear)
                        ->where(function($countDataNod) use ($dept) {
                            if($dept == 0) {
                                $countDataNod->where('nod.IdDepartment','>', 0);
                            } else {
                                $countDataNod->where('nod.IdDepartment', $dept);
                            }
                        })
                        ->get();

        $dataNOEtoQa = [];
        foreach ($countDataVerifNoe as $keyVerif => $valVerif) {
            $datePublish = Carbon::parse($valVerif->Date);
            $dateApprovedByDeptPelopor = Carbon::parse($valVerif->dateDeptPelapor);
            $diffInDays = $datePublish->diffInDaysFiltered(function ($date) {
                return $date->isWeekday();
            }, $dateApprovedByDeptPelopor);

            array_push($dataNOEtoQa, $diffInDays);        
        }

        $dataQashToQadh = [];
        $groupedData = [];
        foreach ($countDataEvaluationNoe as $keyEvaliation => $valEvaluation) {
            if (!isset($groupedData[$valEvaluation->NOENumber])) {
                $groupedData[$valEvaluation->NOENumber] = [
                    'NOENumber' => $valEvaluation->NOENumber,
                    'DateDept' => [],
                ];
            }
            $groupedData[$valEvaluation->NOENumber]['DateDept'][] = $valEvaluation->DateDept;    
        }
        
        foreach ($groupedData as $keyGrouped => $valGrouped) {
            
            $dateDeptPelapor = Carbon::parse($valGrouped['DateDept'][0]); 
            if(count($valGrouped['DateDept']) == 2) {
                $dateQadhApprove = Carbon::parse($valGrouped['DateDept'][1]); 
            } else {
                $dateQadhApprove = $dateDeptPelapor;
            }
            
            $diffInDays = $dateDeptPelapor->diffInDaysFiltered(function ($date) {
                return $date->isWeekday();
            }, $dateQadhApprove);

            array_push($dataQashToQadh, $diffInDays);    
        }
        
        $dateQadhNoeToQashNod = [];
        $dateQashNodToQadhNod = [];
        $filteringDataIfNull = [];
        foreach($countDataNod as $keyNod => $valNod) {
            
            $dateA = Carbon::parse($valNod->dateQadhApproveNoe);
            $dateB = Carbon::parse($valNod->dateQaNod);
            if(!empty($valNod->dateQaDept)){
                $dateC = Carbon::parse($valNod->dateQaDept);
            } else {
                $dateC = Carbon::parse($valNod->dateQaNod);
            }
            
                
            $diffInDays = $dateA->diffInDaysFiltered(function ($date) {
                return $date->isWeekday();
            }, $dateB);
            
            $diffInDays2 = $dateB->diffInDaysFiltered(function ($date) {        
                return $date->isWeekday();
            }, $dateC);
           
            array_push($dateQashNodToQadhNod ,$diffInDays2);
            array_push($dateQadhNoeToQashNod, $diffInDays); 

        }
        $countDataNoeToQa = 0;
        $countDataQashToQadh = 0;
        $countDataQadhNoeToQashNod = 0;
        $countDataQashNodToQadhNod = 0;

        $countDataNoeToQa = array_sum($dataNOEtoQa) / (count($countDataVerifNoe) ? : 1);
        $countDataQashToQadh = array_sum($dataQashToQadh) / (count($groupedData) ? : 1);
        
        if(count($countDataNod) >= 1) {
            $countDataQadhNoeToQashNod = array_sum($dateQadhNoeToQashNod) / (count($countDataNod) ? : 1);
            $countDataQashNodToQadhNod = array_sum($dateQashNodToQadhNod) / (count($countDataNod) ? : 1);
        }
       
        return response()->json([
            'noePublishToQash' => round($countDataNoeToQa),
            'noeQashToQadh' => round($countDataQashToQadh),
            'QadhNoeToQashNod' => round($countDataQadhNoeToQashNod),
            'QashNodToQadhNod' => round($countDataQashNodToQadhNod)
        ]);
    }

    public function getDataDelayOntime (Request $request) {
        $year = $request->input('year');
        $dept = $request->input('department');
        $getCurrentYear = 0;
            
        if($year === null) {
            $getCurrentYear = Carbon::now()->format('Y');
        } else {
            $getCurrentYear = $year['text'];
        }

        $setDataTimeDept = [];
        $setDataTimeQa = [];
        $setRawDataTimeDept = [];
        $setRawDataTimeQa = [];
        if($request->status === 'noe') {
            $getTotalLaporanNoePelapor = DB::table('noe_report as noe')
                                        ->select('*')
                                        ->whereNotNull('noe.StatusTimeDept')
                                        ->orWhereNotNull('noe.StatusTimeQA')
                                        ->whereYear('noe.Date', $getCurrentYear)
                                        ->where(function($getTotalLaporanNoePelapor) use ($dept) {
                                            if($dept == 0) {
                                                $getTotalLaporanNoePelapor->where('noe.IdDepartment','>', 0);
                                            } else {
                                                $getTotalLaporanNoePelapor->where('noe.IdDepartment', $dept);
                                            }
                                        })
                                        ->get();
            
            $countTotalStatusTimeQa = [];
            $countTotalStatusTimeDept = [];
            foreach ($getTotalLaporanNoePelapor as $key => $val) {
                if($val->StatusTimeQA !== null) { 
                    array_push($countTotalStatusTimeQa, count((array)$val->StatusTimeQA));
                }
                if($val->StatusTimeDept !== null) {
                    array_push($countTotalStatusTimeDept, count((array)$val->StatusTimeDept));
                } 
            }
            
            $getStatusTimeDeptData  = DB::table('noe_report as noe') 
                            ->select('noe.StatusTimeDept')
                            ->whereIN('noe.StatusTimeDept', [1,2])
                            ->where('noe.Actived', 1)
                            ->whereYear('noe.Date', $getCurrentYear)
                            ->where(function($getStatusTimeDeptData) use ($dept) {
                                if($dept == 0) {
                                    $getStatusTimeDeptData->where('noe.IdDepartment','>', 0);
                                } else {
                                    $getStatusTimeDeptData->where('noe.IdDepartment', $dept);
                                }
                            })
                            ->get();
    
            $getStatusTimeQaData = DB::table('noe_report as noe') 
                            ->select('noe.StatusTimeQA')
                            ->whereIN('noe.StatusTimeQA', [1,2])
                            ->where('noe.Actived', 1)
                            ->whereYear('noe.Date', $getCurrentYear)
                            ->where(function($getStatusTimeQaData) use ($dept) {
                                if($dept == 0) {
                                    $getStatusTimeQaData->where('noe.IdDepartment','>', 0);
                                } else {
                                    $getStatusTimeQaData->where('noe.IdDepartment', $dept);
                                }
                            })
                            ->get(); 
            
            $noeOntimeDept = [];
            $noeDelayDept = [];
            foreach($getStatusTimeDeptData as $keyTimeDept => $valTimeDept) {
                if($valTimeDept->StatusTimeDept == 'On Time') {
                    array_push($noeOntimeDept, count((array)$valTimeDept));
                } else {
                    array_push($noeDelayDept, count((array)$valTimeDept));
                }
            }
            
            $setDataTimeDept = [
                round(count($noeOntimeDept) / (count($countTotalStatusTimeDept) ?: 1) * 100, 2),
                round(count($noeDelayDept) / (count($countTotalStatusTimeDept) ?: 1) * 100, 2),
            ];
            
            $setRawDataTimeDept = [
                'onTime' => count($noeOntimeDept),
                'delay'  => count($noeDelayDept)
            ];
        
            $noeOntimeQa = [];
            $noeDelayQa = [];
            foreach($getStatusTimeQaData as $keyTimeQa => $valTimeQa) {
                if($valTimeQa->StatusTimeQA == 'On Time') {
                    array_push($noeOntimeQa, count((array)$valTimeQa));
                } else {
                    array_push($noeDelayQa, count((array)$valTimeQa));
                }
            }
    
            $setDataTimeQa = [
                round(count($noeOntimeQa) / (count($countTotalStatusTimeQa) ?: 1) * 100, 2),
                round(count($noeDelayQa) / (count($countTotalStatusTimeQa) ?: 1) * 100, 2),
            ];

            $setRawDataTimeQa = [
                'onTime' => count($noeOntimeQa),
                'delay'  => count($noeDelayQa)
            ];

        } else if ($request->status === 'nod') {

            $getTotalLaporanNodPelapor = DB::table('nod_report as nod')
                                        ->select('nod.StatusTimeDept','nod.StatusTimeQA')
                                        ->whereNotNull('nod.StatusTimeDept')
                                        ->orWhereNotNull('nod.StatusTimeQA')
                                        ->whereYear('nod.Date', $getCurrentYear)
                                        ->where(function($getTotalLaporanNodPelapor) use ($dept) {
                                            if($dept == 0) {
                                                $getTotalLaporanNodPelapor->where('nod.IdDepartment','>', 0);
                                            } else {
                                                $getTotalLaporanNodPelapor->where('nod.IdDepartment', $dept);
                                            }
                                        })
                                        ->get();

            $countTotalStatusTimeQa = [];
            $countTotalStatusTimeDept = [];
            foreach ($getTotalLaporanNodPelapor as $key => $val) {
                
                if($val->StatusTimeQA !== null) { 
                    array_push($countTotalStatusTimeQa, count((array)$val->StatusTimeQA));
                }
                if($val->StatusTimeDept !== null) {
                    array_push($countTotalStatusTimeDept, count((array)$val->StatusTimeDept));
                } 
            }
            
            $getStatusTimeDeptData  = DB::table('nod_report as nod') 
                            ->select('nod.StatusTimeDept')
                            ->whereIN('nod.StatusTimeDept', [1,2])
                            ->where('nod.Actived', 1)
                            ->whereYear('nod.Date', $getCurrentYear)
                            ->where(function($getStatusTimeDeptData) use ($dept) {
                                if($dept == 0) {
                                    $getStatusTimeDeptData->where('nod.IdDepartment','>', 0);
                                } else {
                                    $getStatusTimeDeptData->where('nod.IdDepartment', $dept);
                                }
                            })
                            ->get();
    
            $getStatusTimeQaData = DB::table('nod_report as nod') 
                            ->select('nod.StatusTimeQA')
                            ->whereIN('nod.StatusTimeQA', [1,2])
                            ->where('nod.Actived', 1)
                            ->whereYear('nod.Date', $getCurrentYear)
                            ->where(function($getStatusTimeQaData) use ($dept) {
                                if($dept == 0) {
                                    $getStatusTimeQaData->where('nod.IdDepartment','>', 0);
                                } else {
                                    $getStatusTimeQaData->where('nod.IdDepartment', $dept);
                                }
                            })
                            ->get();
            
            $nodOntimeDept = [];
            $nodDelayDept = [];
            foreach($getStatusTimeDeptData as $keyTimeDept => $valTimeDept) {
                if($valTimeDept->StatusTimeDept == 'On Time') {
                    array_push($nodOntimeDept, count((array)$valTimeDept));
                } else {
                    array_push($nodDelayDept, count((array)$valTimeDept));
                }
            }
            
            $nodOntimeQa = [];
            $nodDelayQa = [];
            foreach($getStatusTimeQaData as $keyTimeQa => $valTimeQa) {
                if($valTimeQa->StatusTimeQA == 'On Time') {
                    array_push($nodOntimeQa, count((array)$valTimeQa));
                } else {
                    array_push($nodDelayQa, count((array)$valTimeQa));
                }
            }
           
            $setDataTimeDept = [
                round(count($nodOntimeDept) / (count($countTotalStatusTimeDept) ?: 1) * 100, 2),
                round(count($nodDelayDept) / (count($countTotalStatusTimeDept) ?: 1) * 100, 2),
            ];
    
            $setDataTimeQa = [
                round(count($nodOntimeQa) / (count($countTotalStatusTimeQa) ?: 1 ) * 100, 2),
                round(count($nodDelayQa) / (count($countTotalStatusTimeQa) ?: 1 ) * 100, 2),
            ]; 

            $setRawDataTimeDept = [
                'onTime' => count($nodOntimeDept),
                'delay'  => count($nodDelayDept)
            ];

            $setRawDataTimeQa = [
                'onTime' => count($nodOntimeQa),
                'delay'  => count($nodDelayQa)
            ];
           
        }
        
        return response()->json([
            'setDataTimeDept' => $setDataTimeDept,
            'setDataTimeQA' => $setDataTimeQa,
            'setRawDataTimeDept' => $setRawDataTimeDept,
            'setRawDataTimeQa' => $setRawDataTimeQa
        ]);
        
    }
}
