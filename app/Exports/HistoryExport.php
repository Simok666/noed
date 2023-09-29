<?php

namespace App\Exports;
use DB;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;



class HistoryExport implements FromCollection, WithHeadings
{
    protected $data;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function __construct($data)
    {
        $this->data = $data;
    }

    public function collection()
    {




        return collect($this->data);
    }


    public function headings(): array
    {
        return [
        	'Id',
            'Nama Modul',
            'Draft Noe',
            'Noe/NOD',
            'Tanggal',
            'Waktu',
            'No Kontrol / No Batch',
            'Bahan / Produk Terkait',
            'Jenis Kejadian',
            'Lokasi Kejadian',
            'Status',
            'Dilaporkan Oleh',
            'User',
            'Created Date',
            'Modified Date',
                                                         
        ];
    }







}
