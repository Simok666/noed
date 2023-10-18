<?php
namespace App;

use App\Http\Controllers\BackEnd\HistoryControll;
use Carbon\Carbon;


class Helper {

    public function __construct()
    {
        $this->History = new HistoryControll();
    }
    function sendEmail($item, $noeAnswer, $request, $itemMail, $Status)
    {
        if($Status == 1 || $Status == 2)
        {
            if($Status == 2)
            {   
                if($item->Status == 'Disetujui oleh Dept Head')
                {
                    $data['Subject'] = 'Evaluasi NOE - No Draft Noe : ' . $item->NOENumber;
                }
                else
                {
                    $data['Subject'] = 'Verifikasi & Penilaian NOE - No Draft Noe : ' . $item->NOENumber;
                }
            }else
            {
                $data['Subject'] = 'Laporan NOE - Correction - No Draft Noe : ' . $item->NOENumber;
            }
            
            $data['Title'] = 'Data NOE COMMENT, Oleh : ' . session('adminvue')->Name . ' - ' . session('adminvue')->Position.' - '. session('adminvue')->Department;
    
            $dataMail['NOE Number'] = $item->NOENumber;
            $dataMail['Date NOE'] = $this->convertData($item->Date);
            $dataMail['Product'] = $item->Product;
            $dataMail['Unit Location'] = $item->Location;
            $dataMail['NO Batch'] = $item->BatchNo;
            $dataMail['Unit Location'] = $item->Location;
            $dataMail['Due Date'] = $this->convertData($item->due_date);
            
            if($Status == 2)
            {
                $dataMail['Status'] = 'Dilaporkan ke Unit Head';
            }
            else
            {
                $dataMail['Status'] = 'Unpublish';
            }
            if($noeAnswer != null)
            {
                $dataMail['Comment Answer'] = $noeAnswer;
            }
            if($request->has('Description'))
            {
                $dataMail['Comment'] = $request->input('Description');     
            }
            else
            {
                $dataMail['Comment'] = '-';
            }
            $dataObjectEmail['footer'] = '[ - COMMMENT Ini Dikeluarkan Dari Aplikasi Online NOENOD Secara Otomatis - ]';
            
            if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                $data['Employee'] = $val->Employee;
                $data['Email'] = $val->Email;
                
                $this->History->sendMail($data, $dataMail, $dataObjectEmail);
            } }
        }
        else
        {
            if($Status == 10)
            {
                if($item->Status == 'Disetujui oleh QA Sect.Head')
                {
                    $data['Subject'] = 'Evaluasi NOE - Rejected - No Draft Noe : ' . $item->NOENumberAcc;
                }
                else
                {
                    $data['Subject'] = 'Verifikasi & Penilaian NOE - Rejected - No Draft Noe : ' . $item->NOENumber;
                }
            }
            elseif ($Status == 7) 
            {
                $data['Subject'] = 'Evaluasi NOE - No Draft Noe : ' . $item->NOENumber;
            }
            elseif ($Status == 9)
            {
                $data['Subject'] = 'NOE Evaluation - APPROVED - No Draft Noe : ' . $item->NOENumberAcc;
            }
            else
            {
                $data['Subject'] = 'Verifikasi & Penilaian NOE - No Draft Noe : ' . $item->NOENumber;

            }

            if($Status == 10)
            {
                $data['Title'] = 'Data NOE PENOLAKAN, Oleh : ' . session('adminvue')->Name . ' - ' . session('adminvue')->Position.' - '. session('adminvue')->Department;
            }
            else
            {
                $data['Title'] = 'Data NOE APPROVAL, Oleh : ' . session('adminvue')->Name . ' - ' . session('adminvue')->Position.' - '. session('adminvue')->Department;

            }
            
            if($Status == 9 || $Status == 10)
            {
                $dataMail['NOE Number'] = $item->NOENumberAcc;
                $dataMail['Date NOE'] = $this->convertData($item->Date);
                $dataMail['Product'] = $item->Product;
                $dataMail['NO Batch'] = $item->BatchNo;
                $dataMail['Unit Location'] = $item->Location;
                $dataMail['Verified'] = $item->Verified;
                $dataMail['Other Corrective Action'] = $item->OtherCorrectAction;
                $dataMail['Other Product Affected'] = $item->OtherProductAffect;
                $dataMail['Description'] = $item->DescriptionOPA;
                $dataMail['Due Date'] = $this->convertData($item->due_date);
            }
            else
            {
                $dataMail['NOE Number'] = $item->NOENumber;
                $dataMail['Date NOE'] = $this->convertData($item->Date);
                $dataMail['Product'] = $item->Product;
                $dataMail['NO Batch'] = $item->BatchNo;
                $dataMail['Unit Location'] = $item->Location;
                $dataMail['Due Date'] = $this->convertData($item->due_date);
            }

            if($Status == 4)
            {
               $dataMail['Status'] = 'disetujui oleh Unit Head';
            }else if ($Status == 5)
            {
               $dataMail['Status'] = 'disetujui oleh Sect head';
               $dataMail['Verified'] = $item->Verified;
               $dataMail['Other Corrective Action'] = $item->OtherCorrectAction;
               $dataMail['Other Product Affected'] = $item->OtherProductAffect;
               $dataMail['Description'] = $item->DescriptionOPA;
               $dataMail['Due Date'] = $this->convertData($item->due_date);
            }
            else if ($Status == 6)
            {
               $dataMail['Status'] = 'disetujui oleh Dept head';
            } 
            else if ($Status == 7)
            {
               $dataMail['Status'] = 'disetujui oleh QA Sect. head';
            } 
            else if ($Status == 8)
            {
               $dataMail['Status'] = 'disetujui oleh QA APJ';
            }
            else if ($Status == 9)
            {
               $dataMail['Status'] = 'disetujui oleh QA Dept. head';
            }
            else if ($Status == 10)
            {
               $dataMail['Status'] = 'ditolak';
               $dataMail['Verified'] = $item->Verified;
               $dataMail['Other Corrective Action'] = $item->OtherCorrectAction;
               $dataMail['Other Product Affected'] = $item->OtherProductAffect;
               $dataMail['Description'] = $item->DescriptionOPA;
               $dataMail['Due Date'] = $this->convertData($item->due_date);
            }  
            if($noeAnswer != null)
            {
                $dataMail['Comment Answer'] = $noeAnswer;
            }
            if($request->has('Description')) {
                $dataMail['Correction'] = $request->input('Description');
            } else {
                $dataMail['Comment'] = '-';
            }
            // $dataMail['Correction'] = $request->input('Description');
            if($Status == 10)
            {
                $dataObjectEmail['footer'] = '[ - PENOLAKAN Ini Dikeluarkan Dari Aplikasi Online NOENOD Secara Otomatis - ]';
            }else 
            {
                $dataObjectEmail['footer'] = '[ - APPROVAL Ini Dikeluarkan Dari Aplikasi Online NOENOD Secara Otomatis - ]';
            }
            if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                $data['Employee'] = $val->Employee;
                $data['Email'] = $val->Email;
                
                $this->History->sendMail($data, $dataMail, $dataObjectEmail);
            } }
        }
    }

    function sendEmailNod($item, $itemMail)
    {
        $data['Subject'] = 'NOD Report - Published';
        $data['Title'] = 'Data NOD telah dilaporkan, Oleh :';

        $dataMail['Pelapor'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
        $dataMail['NOD Number'] = $item->NODNumber;
        $dataMail['Proper Condition'] = $item->ProperCondition;
        $dataMail['Man'] = $item->Man;
        $dataMail['Machine'] = $item->Machine;
        $dataMail['Method'] = $item->Method;
        $dataMail['Material'] = $item->Material;
        $dataMail['Milieu'] = $item->Milieu;
                    
        if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
            $data['Employee'] = $val->Employee;
            $data['Email'] = $val->Email;

            $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
        } }
    }

    function sendEmailVerifiCapa($item, $NODCA, $NODPA, $itemMail) {
        $data['Subject'] = 'Pengajuan efektivitas CAPA - Published';
        $data['Title'] = 'Berikut pengajuan efektivitas CAPA dengan rincian sebagai berikut';
        
        $dataMail['Pelapor'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
        $dataMail['NOD Number'] = $item->NODNumber;

        foreach($NODCA as $keyCa => $valCa) {      
            $dataMail['Dekskripsi Corrective Action (CA) ' . ($keyCa + 1)] = $valCa->CADescription;
        }
        foreach($NODPA as $keyPa => $valPa) {
            $dataMail['Dekskripsi Corrective Action (PA) ' . ($keyPa + 1)] = $valPa->PADescription;
        }

        if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
            $data['Employee'] = $val->Employee;
            $data['Email'] = $val->Email;
            
            $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
        } }
    }

    function sendEmailCareTaker($request, $itemMail, $getitemMailCC, $event)
    {
        if($event == 'insert')
        {
            $data['Employee'] = $itemMail->Employee;
            $data['Email'] = $itemMail->Email;
            $data['Subject'] = $request->input('Subject');
            $data['Title'] = 'Anda telah ditunjuk sebagai Caretaker, Oleh :';
    
            $dataMail['Penunjuk'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
            $dataMail['Tanggal Mulai'] = $request->input('DateStart');
            $dataMail['Tanggal Berakhir'] = $request->input('DateEnd');
            $dataMail['Pesan'] = $request->input('Content');
            
        }
        else
        {
            $data['Employee'] = $itemMail->Employee;
            $data['Email'] = $itemMail->Email;
            $data['Subject'] = 'Penunjukan Caretaker - Updated';
            $data['Title'] = 'Anda telah ditunjuk sebagai Caretaker, Oleh :';

            $dataMail['Penunjuk'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
            $dataMail['Tanggal Mulai'] = $request->input('DateStart');
            $dataMail['Tanggal Berakhir'] = $request->input('DateEnd');
            $dataMail['Pesan'] = $request->input('Content');
                    
        }
       
        $groupCC = [];
        if(count($getitemMailCC)>0) { foreach ($getitemMailCC as $key => $val) {
            $groupCC[$key] = $val->Email;
        } }
        
        $this->History->sendMailCareTaker($data, $dataMail, $dataObjectEmail = [], $groupCC);
        
    }
    
    function convertData($date) {
        $carbonDateTime = Carbon::parse($date)->format('d.m.y h:i A');
        return $carbonDateTime;
    } 
}


?>