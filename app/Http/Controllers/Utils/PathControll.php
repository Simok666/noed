<?php

namespace App\Http\Controllers\Utils;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PathControll extends Controller
{
    public function pathFile($id){
        switch ($id) {
            case 1:
                return 'clouds/backend/files/documents/';
                break;
            case 2:
                return 'clouds/backend/files/images/';
                break;
            case 3:
                return 'clouds/backend/files/videos/';
                break;
            case 4:
                return 'clouds/backend/files/images/users/';
                break;
            case 5:
                return 'clouds/backend/files/noe-report/';
                break;
            case 6:
                return 'clouds/backend/files/nod-report/';
                break;
            case 7:
                return 'clouds/backend/files/nod-review/';
                break;
            case 8:
                return 'clouds/backend/files/correction-noe-report/';
                break;
            case 9:
                return 'clouds/backend/files/correction-noe-verification/';
                break;
            case 10:
                return 'clouds/backend/files/correction-noe-evaluation/';
                break;
            case 11:
                return 'clouds/backend/files/correction-nod-report/';
                break;
            case 12:
                return 'clouds/backend/files/correction-nod-review/';
                break;
            case 13:
                return 'clouds/backend/template/';
                break;
            default:
                return 'clouds/backend/files/documents/';
        }
    }

}
