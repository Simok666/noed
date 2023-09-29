{{-- Start Data NOD Report --}}
<table class="table table-bordered">
    <tbody>
        <tr>
            <th width="50%">NO. NOD</th>
            <td colspan="2">{{$itemReport->NODNumber}}</td>
        </tr>
        <tr>
            <th width="50%">URAIAN / KONDISI KETIDAKSESUAIAN</th>
            <td colspan="2">{{$itemReport->Event}}</td>
        </tr>
        <tr>
            <th width="50%">KONDISI SEHARUSNYA</th>
            <td colspan="2">{{$itemReport->ProperCondition}}</td>
        </tr>
        <tr>
            <th colspan="3" class="text-center">INVESTIGASI PENYEBAB</th>
        </tr>
        <tr>
            <th width="50%">MAN (Personel)</th>
            <td colspan="2">{{$itemReport->Man}}</td>
        </tr>
        <tr>
            <th width="50%">MACHINE (Mesin / Peralatan)</th>
            <td colspan="2">{{$itemReport->Machine}}</td>
        </tr>
        <tr>
            <th width="50%">METHOD (Metode / Prosedur)</th>
            <td colspan="2">{{$itemReport->Method}}</td>
        </tr>
        <tr>
            <th width="50%">MATERIAL (Produk / Bahan)</th>
            <td colspan="2">{{$itemReport->Material}}</td>
        </tr>
        <tr>
            <th width="50%">MILIEU (Lingkungan)</th>
            <td colspan="2">{{$itemReport->Milieu}}</td>
        </tr>

        <tr>
            <th colspan="3" width="50%">TINDAKAN PERBAIKAN (Corrective Action)</th>
        </tr>
        <tr>
            <th width="50%">DESKRIPSI</th>
            <th>PIC</th>
            <th>DUE DATE</th>
        </tr>
        @if($itemCA) @foreach($itemCA as $key=>$val)
            <tr>
                <td width="50%">{{$val->Description}}</td>
                <td>{{$val->PIC}}</td>
                <td>{{\Carbon\Carbon::parse($val->Date)->format('d.m.y')}}</td>
            </tr>
        @endforeach @endif

        <tr>
            <th colspan="3" width="50%">TINDAKAN PENCEGAHAN (Preventive Action)</th>
        </tr>
        <tr>
            <th width="50%">DESKRIPSI</th>
            <th>PIC</th>
            <th>DUE DATE</th>
        </tr>
        @if($itemPA) @foreach($itemPA as $key=>$val)
            <tr>
                <td width="50%">{{$val->Description}}</td>
                <td>{{$val->PIC}}</td>
                <td>{{\Carbon\Carbon::parse($val->Date)->format('d.m.y')}}</td>
            </tr>
        @endforeach @endif

        <tr>
            <th width="50%">DILAPORKAN OLEH</th>
            <td width="30%">{{$itemReport->UserEntry}}</td>
            <td width="20%">{{$itemReport->CreateAt}}</td>
        </tr>
        <tr>
            <th width="50%">DIPERIKSA OLEH (Dept. Head Pelapor)</th>
            <td width="30%">{{$itemReport->UserDept}}</td>
            <td width="20%">{{$itemReport->DateDept}}</td>
        </tr>
        @if($itemDeptTerkait)
            @foreach($itemDeptTerkait as $key=>$val)
            <tr>
                <th width="50%">DIPERIKSA OLEH (Dept. Head Terkait)</th>
                <td width="30%">{{$val->UserTerkait}}</td>
                <td width="20%">{{\DateTime::createFromFormat('Y-m-d H:i:s', $val->CreateAt)->format('d.m.y')}}</td>
            </tr>
            @endforeach
        @endif
        <tr>
            <th width="50%">DISETUJUI OLEH</th>
            <td width="30%">{{$itemReport->UserQA}}</td>
            <td width="20%">{{$itemReport->DateQA}}</td>
        </tr>
        @if($itemReport->Status === 'Disetujui Oleh QA Section Head' || $itemReport->Status === 'Disetujui oleh Dept Head Terkait' || $itemReport->Status == 'Disetujui oleh QA Dept.Head')
        <tr>
            <th colspan="3" width="50%">SISTEM LAIN YANG TERDAMPAK (BILA ADA)</th>
        </tr>
        <tr>
            <th width="50%">ANOTHER EFFECT</th>
            <td width="30%">
                <table class="table table-borderless">
                    <tr>
                        <td class="">
                            @if($setSelectedTrue)
                                <input type="checkbox" checked>
                            @else
                                <input type="checkbox">
                            @endif
                        </td>
                        <td>  
                            Ada 
                        </td>
                    </tr>
                </table>
            </td>
            <td width="30%">
                <table class="table table-borderless">
                    <tr>
                        <td>
                            @if($setSelectedFalse)
                                <input type="checkbox" checked>
                            @else
                                <input type="checkbox">
                            @endif
                        </td>
                        <td>  
                            Tidak Ada 
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        @foreach($dataAnotherEffect as $key => $val)
        @if($val !== false)
        <tr>
            <th width="50%"></th>
            <td width="30%">
                <div class="" >
                    <table>
                        <tr>
                            <td class="custom-table">
                                <input type="checkbox" checked>
                            </td>
                            <td>  
                                <span>{{$val['title_effect']}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td width="30%">
                <p> {{$val['text']}} </p>
            </td>
        </tr>
        @endif
        @endforeach
        @endif
    </tbody>
</table>
{{-- End Data NOD Report --}}

{{-- Start Data NOD Review --}}
@if($itemReview)
<table class="table table-bordered">
    <tbody>
        <tr>
            <th width="50%">SISTEM LAIN YANG TERDAMPAK (bila ada)</th>
            <td colspan="2">{{$itemReview->IsOSA}}</td>
        </tr>
        @if($itemReview->IsOSA == 'Ada' && $itemDetail)
        @foreach($itemDetail as $key=>$val)
        <tr>
            <th width="50%">SISTEM LAIN YANG TERDAMPAK</th>
            @php
            $result = json_decode($val->Assesment, true);
            @endphp
            @if($result)
            <td colspan="2">{{$result['RiskAssesment']}}</td>
            @endif
        </tr>
        <tr>
            <th width="50%">DESKRIPSI</th>
            <td colspan="2">{{$val->Description}}</td>
        </tr>
        @endforeach
        @endif
        <tr>
            <th width="50%">VERIFIKASI EFEKTIFITAS CAPA</th>
            <td colspan="2">{{$itemReview->VerifCAPA}}</td>
        </tr>
        @if($itemReview->VerifCAPA == "Perlu CAPA lain")
        <tr>
            <th width="50%">DESKRIPSI CAPA</th>
            <td colspan="2">{{$itemReview->DescriptionCAPA}}</td>
        </tr>
        @endif
        <tr>
            <th width="50%">DIVERIFIKASI OLEH</th>
            <td width="30%">{{$itemReview->UserCAPA}}</td>
            <td width="20%">{{$itemReview->DateCAPA}}</td>
        </tr>
    </tbody>
</table>
@endif
{{-- End Data NOD Review --}}