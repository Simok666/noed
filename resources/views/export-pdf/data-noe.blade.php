{{-- Start Data NOE Report --}}
<table class="table table-bordered">
    <tbody>
        <tr>
            <th width="50%">NO. NOE</th>
            <td colspan="2">{{$itemReport->NOENumberAcc}}</td>
        </tr>
        <tr>
            <th width="50%">JENIS KEJADIAN</th>
            <td colspan="2">{{$itemReport->IdTypeIncident}}</td>
        </tr>
        <tr>
            <th width="50%">LOKASI KEJADIAN</th>
            <td colspan="2">{{$itemReport->Location}}</td>
        </tr>
        <tr>
            <th width="50%">BAHAN / PRODUK TERKAIT</th>
            <td colspan="2">{{$itemReport->Product}}</td>
        </tr>
        <tr>
            <th width="50%">TGL. / WAKTU</th>
            <td colspan="2">{{$itemReport->Date}}</td>
        </tr>
        <tr>
            <th width="50%">NO. KONTROL / NO. BETS</th>
            <td colspan="2">{{$itemReport->BatchNo}}</td>
        </tr>
        <tr>
            <th width="50%">URAIAN KEJADIAN</th>
            <td colspan="2">{{$itemReport->Event}}</td>
        </tr>
        <tr>
            <th width="50%">TINDAKAN KOREKSI YANG DILAKUKAN</th>
            <td colspan="2">{{$itemReport->CorrectiveAction}}</td>
        </tr>
        <tr>
            <th width="50%">DILAPORKAN OLEH</th>
            <td width="30%">{{$itemReport->UserEntry}}</td>
            <td width="20%">{{$itemReport->CreateAt}}</td>
        </tr>
    </tbody>
</table>
{{-- End Data NOE Report --}}

{{-- Start Data NOE Verification --}}
<table class="table table-bordered">
    <tbody>
        <tr>
            <th width="50%">VERIFIKASI TINDAKAN</th>
            <td colspan="2">{{$itemReport->Verified}}</td>
        </tr>
        @if($itemReport->Verified == "Perlu tindakan koreksi lain")
        <tr>
            <th width="50%">KETERANGAN VERIFIKASI TINDAKAN</th>
            <td colspan="2">{{$itemReport->OtherCorrectAction}}</td>
        </tr>
        @endif
        <tr>
            <th width="50%">DEPARTEMEN TERKAIT</th>
            <td colspan="2">{{$itemReport->RelevantDept}}</td>
        </tr>
        @php
        $valSeverity = 0;
        $valProbability = 0;
        $valDetectability = 0;
        @endphp
        @if($itemReport->IdDevRiskAssesment)
        <tr>
            <th colspan="3" class="text-center">PENILAIAN RESIKO DEVIASI</th>
        </tr>
        @foreach($itemReport->IdDevRiskAssesment as $key=>$val)
        <tr>
            @if($val['AssesmentGroup'] == "SEVERITY")
            <th width="50%">SEVERITY (S)</th>
            <td width="25%">{{$val['Question']}}</td>
            <td width="25%">{{$val['RiskAssesment']['RiskAssesment']}}</td>
            @php
            if($valSeverity == 0) $valSeverity += $val['Value'];
            else $valSeverity *= $val['Value']
            @endphp
            @endif
        </tr>
        @endforeach
        @endif

        @if($itemReport->IdDevRiskAssesment2)
        @foreach($itemReport->IdDevRiskAssesment2 as $key=>$val)
        <tr>
            @if($val['RiskAssesment']['AssesmentGroup'] == "PROBABILITY")
            <th width="50%">PROBABILITY (P)</th>
            <td width="25%">{{$val['Question']}}</td>
            <td width="25%">{{$val['RiskAssesment']['RiskAssesment']}}</td>
            @php
            if($valProbability == 0) $valProbability += $val['Value'];
            else $valProbability *= $val['Value']
            @endphp
            @endif
        </tr>
        @endforeach
        @endif

        @if($itemReport->IdDevRiskAssesment3)
        @foreach($itemReport->IdDevRiskAssesment3 as $key=>$val)
        <tr>
            @if($val['RiskAssesment']['AssesmentGroup'] == "DETECTABILITY")
            <th width="50%">DETECTABILITY (D)</th>
            <td width="25%">{{$val['Question']}}</td>
            <td width="25%">{{$val['RiskAssesment']['RiskAssesment']}}</td>
            @php
            if($valDetectability == 0) $valDetectability += $val['Value'];
            else $valDetectability *= $val['Value']
            @endphp
            @endif
        </tr>
        @endforeach
        @endif

        <tr>
            @php
            $valResult = $valSeverity * $valProbability * $valDetectability;
            @endphp
            <th width="50%">RISK PRIORITY NUMBER (RPN)</th>
            <td colspan="2">{{$valSeverity}} x {{$valProbability}} x {{$valDetectability}} = {{$valResult}}</td>
        </tr>
        <tr>
            <th width="50%">LEVEL DEVIASI</th>
            <td colspan="2">{{$itemReport->DeviationLevel}}</td>
        </tr>
        <tr>
            <th width="50%">LEVEL DEVIASI OLEH QA</th>
            <td colspan="2">{{$itemReport->DeviationLevelQA}}</td>
        </tr>
        <tr>
            <th width="50%">PRODUK / BETS LAIN YANG TERDAMPAK</th>
            <td colspan="2">{{$itemReport->OtherProductAffect}}</td>
        </tr>
        @if($itemReport->OtherProductAffect == "Ada")
        <tr>
            <th width="50%">KETERANGAN PRODUK / BETS LAIN YANG TERDAMPAK</th>
            <td colspan="2">{{$itemReport->DescriptionOPA}}</td>
        </tr>
        @endif
        <tr>
            @if($itemReport->StatusVerif == "Rejected")
            <th width="50%">DITOLAK OLEH</th>
            @else
            <th width="50%">DITINJAU OLEH</th>
            @endif
            <td width="30%">{{$itemReport->UserEntryVerif}}</td>
            <td width="20%">{{$itemReport->DateVerif}}</td>
        </tr>
        @if($itemReport->StatusVerif == "Rejected")
        <tr>
            <th width="50%">DESKRIPSI DITOLAK</th>
            <td colspan="2">{{$itemReport->DescriptionRejectedVerif}}</td>
        </tr>
        @endif
        <tr>
            @if($itemReport->StatusDeptVerif == "Rejected")
            <th width="50%">DITOLAK OLEH</th>
            @else
            <th width="50%">DISETUJUI OLEH</th>
            @endif
            <td width="30%">{{$itemReport->UserDeptVerif}}</td>
            <td width="20%">{{$itemReport->DateDeptVerif}}</td>
        </tr>
        @if($itemReport->StatusDeptVerif == "Rejected")
        <tr>
            <th width="50%">DESKRIPSI DITOLAK</th>
            <td colspan="2">{{$itemReport->DescriptionRejectedDeptVerif}}</td>
        </tr>
        @endif
    </tbody>
</table>
{{-- End Data NOE Verification --}}

{{-- Start Data NOE Evaluation --}}
<table class="table table-bordered">
    <tbody>
        <tr>
            <th width="50%">EVALUASI TERHADAP KESESUAIAN PELAPORAN</th>
            <td colspan="2">{{$itemReport->DescriptionEvaluation}}</td>
        </tr>
        <tr>
            <th width="50%">KATEGORI NOE</th>
            <td width="50%" colspan="2">{{$itemReport->IdDeviation}}</td>
            <!-- <td width="25%">{{$itemReport->DeviationLevel}}</td> -->
        </tr>
        <tr>
            @if($itemReport->StatusEvaluation == "Rejected")
            <th width="50%">DITOLAK OLEH</th>
            @else
            <th width="50%">DITINJAU OLEH</th>
            @endif
            <td width="30%">{{$itemReport->UserEntryEvaluation}}</td>
            <td width="20%">{{$itemReport->DateEvaluation}}</td>
        </tr>
        @if($itemReport->StatusEvaluation == "Rejected")
        <tr>
            <th width="50%">DESKRIPSI DITOLAK</th>
            <td colspan="2">{{$itemReport->DescriptionRejectedEvaluation}}</td>
        </tr>
        @endif
        <tr>
            @if($itemReport->StatusDeptEvaluation == "Rejected")
            <th width="50%">DITOLAK OLEH</th>
            @else
            <th width="50%">DISETUJUI OLEH</th>
            @endif
            <td width="30%">{{$itemReport->UserDeptEvaluation}}</td>
            <td width="20%">{{$itemReport->DateDeptEvaluation}}</td>
        </tr>
        @if($itemReport->StatusDeptEvaluation == "Rejected")
        <tr>
            <th width="50%">DESKRIPSI DITOLAK</th>
            <td colspan="2">{{$itemReport->DescriptionRejectedDeptEvaluation}}</td>
        </tr>
        @endif
    </tbody>
</table>
{{-- End Data NOE Evaluation --}}