<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return redirect('/RoleAdmin/manage');
});

Route::get('RoleAdmin/{any}', 'ApplicationController')->where('any', '.*');

Route::get('register', 'Auth\AuthController@register');
Route::post('/AdminVue/login', 'Auth\AuthController@login');
// Route::get('/AdminVue/users', 'Auth\AuthController@getUser')->name('login');
Route::post('/AdminVue/logout', 'Auth\AuthController@logout');
Route::post('/AdminVue/forgot-password', 'Auth\AuthController@ForgotPassword');
Route::post('/AdminVue/reset-password', 'Auth\AuthController@ResetPassword');
Route::post('/AdminVue/verification-code', 'Auth\AuthController@VerificationCode');
Route::post('/AdminVue/pusher/user-auth','Auth\AuthController@pusherAuth');

Route::group(['middleware'=>['adminvue']], function () {
	Route::group(['prefix' => 'AdminVue'], function () {

	    Route::post('check-token', function(Request $request){
	    	$allowMenu = session('allow_menu');
			$url = $request->input('url');
			$accessAccepted = false;

			if(array_key_exists($url, $allowMenu)) {
				$accessAccepted = true;
			}
			else {
				$allowMenu[$url] = true;
				session()->put('allow_menu', $allowMenu);
				$accessAccepted = true;
			}

			if($accessAccepted){
	    		return response()->json(['status'=>200,'message'=>'Access Accepted']);
	    	}else{
	    		return response()->json(['status'=>406,'message'=>'Access Not Acceptable']);
	    	}
	    });

	    Route::get('restricted','Auth\AuthController@restrictedPage');
	    Route::post('auth-reaccess-menu','Auth\AuthController@reAccessMenu');
	    Route::post('auth-get-session','Auth\AuthController@getSession');

	    Route::get('dashboard','BackEnd\DashboardControll@index');
	    Route::post('dashboard-generate-year','BackEnd\DashboardControll@generateYear');
		Route::post('dashboard-get-unit-location','BackEnd\DashboardControll@getLocation');
		Route::post('dashboard-get-status-noe','BackEnd\DashboardControll@getStatusNOE');
		Route::post('dashboard-get-status-time','BackEnd\DashboardControll@getStatusTime');
		Route::post('dashboard-get-deviation-level','BackEnd\DashboardControll@getDeviationLevel');
		Route::post('dashboard-get-data-report','BackEnd\DashboardControll@getDataReport');
		Route::post('dashboard-get-data-noe-level','BackEnd\DashboardControll@getLevelNoe');		

		Route::get('data-division','BackEnd\DivisionControll@index');
		Route::post('division-show','BackEnd\DivisionControll@show');
		Route::post('division-insert','BackEnd\DivisionControll@store');
		Route::post('division-edit','BackEnd\DivisionControll@edit');
		Route::post('division-update','BackEnd\DivisionControll@update');
		Route::post('division-delete','BackEnd\DivisionControll@delete');

		Route::get('data-department','BackEnd\DepartmentControll@index');
		Route::post('department-get-division','BackEnd\DepartmentControll@getDivision');
		Route::post('department-show','BackEnd\DepartmentControll@show');
		Route::post('department-insert','BackEnd\DepartmentControll@store');
		Route::post('department-edit','BackEnd\DepartmentControll@edit');
		Route::post('department-update','BackEnd\DepartmentControll@update');
		Route::post('department-delete','BackEnd\DepartmentControll@delete');

		Route::get('data-position','BackEnd\PositionControll@index');
		Route::post('position-get-division','BackEnd\PositionControll@getDivision');
		Route::post('position-get-department','BackEnd\PositionControll@getDepartment');
		Route::post('position-getParent','BackEnd\PositionControll@getParent');
		Route::post('position-show','BackEnd\PositionControll@show');
		Route::post('position-insert','BackEnd\PositionControll@store');
		Route::post('position-edit','BackEnd\PositionControll@edit');
		Route::post('position-update','BackEnd\PositionControll@update');
		Route::post('position-delete','BackEnd\PositionControll@delete');

		Route::get('data-user-employee','BackEnd\UsersEmployeeControll@index');
		Route::get('user-checklist-employee','BackEnd\UsersEmployeeControll@getChecklistCount');
		Route::post('user-get-department','BackEnd\UsersEmployeeControll@getDepartment');
		Route::post('user-get-position','BackEnd\UsersEmployeeControll@getPosition');
		Route::post('user-get-type-user','BackEnd\UsersEmployeeControll@getTypeUser');
		Route::post('user-employee-show','BackEnd\UsersEmployeeControll@show');
		Route::post('user-employee-insert','BackEnd\UsersEmployeeControll@store');
		Route::post('user-employee-edit','BackEnd\UsersEmployeeControll@edit');
		Route::post('user-employee-update','BackEnd\UsersEmployeeControll@update');
		Route::post('user-employee-delete','BackEnd\UsersEmployeeControll@delete');

		Route::get('master-module','BackEnd\MasterModuleControll@index');
		Route::post('master-module-get-parent','BackEnd\MasterModuleControll@getParent');
		Route::post('master-module-show','BackEnd\MasterModuleControll@show');
		Route::post('master-module-insert','BackEnd\MasterModuleControll@store');
		Route::post('master-module-edit','BackEnd\MasterModuleControll@edit');
		Route::post('master-module-update','BackEnd\MasterModuleControll@update');
		Route::post('master-module-delete','BackEnd\MasterModuleControll@delete');

		Route::post('profile','BackEnd\ProfileControll@index');
		Route::post('profile-edit','BackEnd\ProfileControll@edit');
		Route::post('profile-update','BackEnd\ProfileControll@update');
		Route::post('profile-update','BackEnd\ProfileControll@update');
		Route::post('profile-get-lock-apps','BackEnd\ProfileControll@getLockApps');
		Route::post('profile-lock-apps','BackEnd\ProfileControll@lockApps');

		Route::get('user-access','BackEnd\UserAccessControll@index');
		Route::post('user-access-getJsonTree','BackEnd\UserAccessControll@getJsonTree');
		Route::post('user-access-show','BackEnd\UserAccessControll@show');
		Route::post('user-access-insert','BackEnd\UserAccessControll@store');
		Route::post('user-access-edit','BackEnd\UserAccessControll@edit');
		Route::post('user-access-update','BackEnd\UserAccessControll@update');
		Route::post('user-access-delete','BackEnd\UserAccessControll@delete');

		Route::get('data-history-data','BackEnd\HistoryTableControll@index');
		Route::post('history-data-show','BackEnd\HistoryTableControll@show');
		Route::get('export_excel', 'BackEnd\HistoryTableControll@export_excel');

		Route::get('data-deviation','BackEnd\DeviationControll@index');
		Route::post('deviation-show','BackEnd\DeviationControll@show');
		Route::post('deviation-insert','BackEnd\DeviationControll@store');
		Route::post('deviation-edit','BackEnd\DeviationControll@edit');
		Route::post('deviation-update','BackEnd\DeviationControll@update');
		Route::post('deviation-delete','BackEnd\DeviationControll@delete');

		Route::get('data-event-incident','BackEnd\EventIncidentControll@index');
		Route::post('event-incident-show','BackEnd\EventIncidentControll@show');
		Route::post('event-incident-insert','BackEnd\EventIncidentControll@store');
		Route::post('event-incident-edit','BackEnd\EventIncidentControll@edit');
		Route::post('event-incident-update','BackEnd\EventIncidentControll@update');
		Route::post('event-incident-delete','BackEnd\EventIncidentControll@delete');

		Route::get('data-deviation-risk','BackEnd\DeviationRiskControll@index');
		Route::post('deviation-risk-show','BackEnd\DeviationRiskControll@show');
		Route::post('deviation-risk-insert','BackEnd\DeviationRiskControll@store');
		Route::post('deviation-risk-edit','BackEnd\DeviationRiskControll@edit');
		Route::post('deviation-risk-update','BackEnd\DeviationRiskControll@update');
		Route::post('deviation-risk-delete','BackEnd\DeviationRiskControll@delete');

		Route::get('data-other-system','BackEnd\OtherSystemControll@index');
		Route::post('other-system-show','BackEnd\OtherSystemControll@show');
		Route::post('other-system-insert','BackEnd\OtherSystemControll@store');
		Route::post('other-system-edit','BackEnd\OtherSystemControll@edit');
		Route::post('other-system-update','BackEnd\OtherSystemControll@update');
		Route::post('other-system-delete','BackEnd\OtherSystemControll@delete');

		Route::get('data-deviation-level','BackEnd\DeviationLevelControll@index');
		Route::post('deviation-level-show','BackEnd\DeviationLevelControll@show');
		Route::post('deviation-level-insert','BackEnd\DeviationLevelControll@store');
		Route::post('deviation-level-edit','BackEnd\DeviationLevelControll@edit');
		Route::post('deviation-level-update','BackEnd\DeviationLevelControll@update');
		Route::post('deviation-level-delete','BackEnd\DeviationLevelControll@delete');

		Route::get('data-product','BackEnd\ProductControll@index');
		Route::post('product-show','BackEnd\ProductControll@show');
		Route::post('product-insert','BackEnd\ProductControll@store');
		Route::post('product-edit','BackEnd\ProductControll@edit');
		Route::post('product-update','BackEnd\ProductControll@update');
		Route::post('product-delete','BackEnd\ProductControll@delete');

		Route::get('data-unit-location','BackEnd\UnitLocationControll@index');
		Route::post('unit-location-show','BackEnd\UnitLocationControll@show');
		Route::post('unit-location-insert','BackEnd\UnitLocationControll@store');
		Route::post('unit-location-edit','BackEnd\UnitLocationControll@edit');
		Route::post('unit-location-update','BackEnd\UnitLocationControll@update');
		Route::post('unit-location-delete','BackEnd\UnitLocationControll@delete');

		Route::get('data-noe-report','BackEnd\NOEReportControll@index');
		Route::post('noe-report-get-number','BackEnd\NOEReportControll@generateNumber');
		Route::post('noe-report-get-product','BackEnd\NOEReportControll@getProduct');
		Route::post('noe-report-get-location','BackEnd\NOEReportControll@getLocation');
		Route::post('noe-report-get-incident','BackEnd\NOEReportControll@getIncident');
		Route::post('noe-report-get-publish','BackEnd\NOEReportControll@getPublish');
		Route::post('noe-report-publish','BackEnd\NOEReportControll@publish');
		Route::post('noe-report-insert','BackEnd\NOEReportControll@store');
		Route::post('noe-report-edit','BackEnd\NOEReportControll@edit');
		Route::post('noe-report-update','BackEnd\NOEReportControll@update');
		Route::post('noe-report-delete','BackEnd\NOEReportControll@delete');
		Route::post('noe-report-get-correction','BackEnd\NOEReportControll@getCorrection');
		Route::get('noe-report-get-real-correction/{Id}','BackEnd\NOEReportControll@getRealCorrection');
		
		Route::post('noe-report-get-location-bets','BackEnd\NOEReportControll@getLocationByNobets');
		Route::post('noe-report-answer','BackEnd\NOEReportControll@sendAnswer');
		Route::get('noe-report/{Id}/export','BackEnd\NOEReportControll@export')->name('export.noe-report-export');
		Route::post('noe-report-descriptionReject','BackEnd\NOEReportControll@descriptionReject');

		Route::get('data-noe-verification','BackEnd\NOEVerificationControll@index');
		Route::post('noe-verification/{Id}/detail','BackEnd\NOEVerificationControll@detail');
		Route::post('noe-verification-get-session','BackEnd\NOEVerificationControll@getSession');
		Route::post('noe-verification-iscaretaker','BackEnd\NOEVerificationControll@isCaretaker');
		Route::post('noe-verification-get-relevant-dept','BackEnd\NOEVerificationControll@getRelevantDept');
		Route::post('noe-verification-get-deviation-risk','BackEnd\NOEVerificationControll@getDeviationRisk');
		Route::post('noe-verification-get-deviation-level','BackEnd\NOEVerificationControll@getDeviationLevel');
		Route::post('noe-verification-publish-verify','BackEnd\NOEVerificationControll@publishVerify');
		Route::post('noe-verification-approve','BackEnd\NOEVerificationControll@approve');
		Route::post('noe-verification-reject','BackEnd\NOEVerificationControll@reject');
		Route::post('noe-verification-edit','BackEnd\NOEVerificationControll@edit');
		Route::post('noe-verification-update','BackEnd\NOEVerificationControll@update');
		Route::post('noe-verification-delete','BackEnd\NOEVerificationControll@delete');

		Route::get('data-noe-evaluation','BackEnd\NOEEvaluationControll@index');
		Route::post('noe-evaluation-get-session','BackEnd\NOEEvaluationControll@getSession');
		Route::post('noe-evaluation-iscaretaker','BackEnd\NOEEvaluationControll@isCaretaker');
		Route::post('noe-evaluation-get-deviation','BackEnd\NOEEvaluationControll@getDeviation');
		Route::post('noe-evaluation-publish-evaluation','BackEnd\NOEEvaluationControll@publishEvaluation');
		Route::post('noe-evaluation-approve','BackEnd\NOEEvaluationControll@approve');
		Route::post('noe-evaluation-reject','BackEnd\NOEEvaluationControll@reject');
		Route::post('noe-evaluation-edit','BackEnd\NOEEvaluationControll@edit');
		Route::post('noe-evaluation-update','BackEnd\NOEEvaluationControll@update');
		Route::post('noe-evaluation-delete','BackEnd\NOEEvaluationControll@delete');
		
		Route::post('data-nod-report','BackEnd\NODReportControll@index');
		Route::post('nod-report-get-session','BackEnd\NODReportControll@getSession');
		Route::post('nod-report/{Id}/detail','BackEnd\NODReportControll@detail');
		Route::post('nod-report-get-number','BackEnd\NODReportControll@generateNumber');
		Route::post('nod-report-get-noe-number','BackEnd\NODReportControll@getNOENumber');
		Route::post('nod-report-get-data-noe','BackEnd\NODReportControll@getDataNOE');
		Route::post('nod-report-get-data-pic','BackEnd\NODReportControll@getDataPIC');
		Route::post('nod-report-get-publisher','BackEnd\NODReportControll@getDataPublisher');
		Route::post('nod-report-publish','BackEnd\NODReportControll@publish');
		Route::post('nod-report-approve','BackEnd\NODReportControll@approve');
		Route::post('nod-report-reject','BackEnd\NODReportControll@reject');
		Route::post('nod-report-revision','BackEnd\NODReportControll@revision');
		Route::post('nod-report-insert','BackEnd\NODReportControll@store');
		Route::post('nod-report-edit','BackEnd\NODReportControll@edit');
		Route::post('nod-report-update','BackEnd\NODReportControll@update');
		Route::post('nod-report-delete','BackEnd\NODReportControll@delete');
		Route::post('question-nod-report-insert','BackEnd\NODReportControll@sendQuestion');
		Route::get('nod-report/{Id}/export','BackEnd\NODReportControll@export')->name('export.nod-report-export');

		Route::post('data-verifikasi-capa-nod','BackEnd\VerifCAPAReportControll@index');
		Route::post('nod-report-get-acc-number','BackEnd\VerifCAPAReportControll@getAccNumber');
		Route::post('nod-verifikasi-capa-get-data','BackEnd\VerifCAPAReportControll@getDataNOD');
		Route::post('nod-verifikasi-capa-insert-data','BackEnd\VerifCAPAReportControll@store');
		Route::post('nod-verifikasi-capa-edit-data','BackEnd\VerifCAPAReportControll@edit');
		Route::post('nod-verifikasi-capa-delete-data','BackEnd\VerifCAPAReportControll@delete');
		Route::post('nod-verifikasi-capa-update-data','BackEnd\VerifCAPAReportControll@update');
		Route::post('nod-verifikasi-capa-publish-data','BackEnd\VerifCAPAReportControll@publish');
		Route::post('nod-verifikasi-capa-approve-data','BackEnd\VerifCAPAReportControll@approve');
		Route::post('nod-verifikasi-capa-reject-data','BackEnd\VerifCAPAReportControll@reject');
		Route::post('nod-verifikasi-capa-description-reject-data','BackEnd\VerifCAPAReportControll@descriptionReject');
		Route::post('nod-verifikasi-capa-correction-data','BackEnd\VerifCAPAReportControll@correction');
	

		Route::get('nod-chat-rooms', 'BackEnd\ChatController@rooms');
		Route::post('nod-chat-teams', 'BackEnd\ChatController@teams');
		Route::get('nod-chat-rooms/{roomId}/messages', 'BackEnd\ChatController@messages');
		Route::any('nod-chat-rooms/{roomId}/message', 'BackEnd\ChatController@newMessage');

		Route::post('nod-report-approve','BackEnd\NODReportControll@approve');
		Route::post('auth-get-history-chat-data','BackEnd\NODReportControll@getHistoryChatData');
		

		Route::get('data-nod-review','BackEnd\NODReviewControll@index');
		Route::get('data-nod-notreview','BackEnd\NODReviewControll@indexNotReview');
		Route::post('nod-review-get-session','BackEnd\NODReviewControll@getSession');
		Route::post('nod-review-get-nod-number','BackEnd\NODReviewControll@getNODNumber');
		Route::post('nod-review-get-data-nod','BackEnd\NODReviewControll@getDataNOD');
		Route::post('nod-review-get-risk-assesment','BackEnd\NODReviewControll@getDevRiskAssesment');
		Route::post('nod-review-publish','BackEnd\NODReviewControll@publish');
		Route::post('nod-review-approve','BackEnd\NODReviewControll@approve');
		Route::post('nod-review-reject','BackEnd\NODReviewControll@reject');
		Route::post('nod-review-insert','BackEnd\NODReviewControll@store');
		Route::post('nod-review-edit','BackEnd\NODReviewControll@edit');
		Route::post('nod-review-update','BackEnd\NODReviewControll@update');
		Route::post('nod-review-delete','BackEnd\NODReviewControll@delete');

		Route::post('data-correction-noe-report','BackEnd\CorrectionNOEReportControll@index');
		Route::post('correction-noe-report/{Id}/detail','BackEnd\CorrectionNOEReportControll@detail');

		Route::post('data-correction-noe-verification','BackEnd\CorrectionNOEVerificationControll@index');
		Route::post('correction-noe-verification/{Id}/detail','BackEnd\CorrectionNOEVerificationControll@detail');
		Route::post('correction-noe-verification-create','BackEnd\CorrectionNOEVerificationControll@create');
		Route::post('correction-noe-verification-insert','BackEnd\CorrectionNOEVerificationControll@store');

		Route::post('data-correction-noe-evaluation','BackEnd\CorrectionNOEEvaluationControll@index');
		Route::post('correction-noe-evaluation/{Id}/detail','BackEnd\CorrectionNOEEvaluationControll@detail');
		Route::post('correction-noe-evaluation-create','BackEnd\CorrectionNOEEvaluationControll@create');
		Route::post('correction-noe-evaluation-insert','BackEnd\CorrectionNOEEvaluationControll@store');

		Route::post('data-correction-nod-report','BackEnd\CorrectionNODReportControll@index');
		Route::post('correction-nod-report/{Id}/detail','BackEnd\CorrectionNODReportControll@detail');
		Route::post('correction-nod-report-create','BackEnd\CorrectionNODReportControll@create');
		Route::post('correction-nod-report-insert','BackEnd\CorrectionNODReportControll@store');	
		

		Route::post('data-correction-nod-review','BackEnd\CorrectionNODReviewControll@index');
		Route::post('correction-nod-review/{Id}/detail','BackEnd\CorrectionNODReviewControll@detail');
		Route::post('correction-nod-review-create','BackEnd\CorrectionNODReviewControll@create');
		Route::post('correction-nod-review-insert','BackEnd\CorrectionNODReviewControll@store');

		Route::get('data-caretaker','BackEnd\CaretakerControll@index');
		Route::post('caretaker-get-emp','BackEnd\CaretakerControll@getEmp');
		Route::post('caretaker-get-dept','BackEnd\CaretakerControll@getDept');
		Route::post('caretaker-get-list-table','BackEnd\CaretakerControll@getListTable');
		Route::post('caretaker-not-active','BackEnd\CaretakerControll@setNotActive');
		Route::post('caretaker-insert','BackEnd\CaretakerControll@store');
		Route::post('caretaker-edit','BackEnd\CaretakerControll@edit');
		Route::post('caretaker-update','BackEnd\CaretakerControll@update');
		Route::post('caretaker-delete','BackEnd\CaretakerControll@delete');

		Route::get('data-setting-header','BackEnd\SettingHeaderControll@index');
		Route::post('setting-header-edit','BackEnd\SettingHeaderControll@edit');
		Route::post('setting-header-update','BackEnd\SettingHeaderControll@update');

		Route::get('data-day-off','BackEnd\DayOffControll@index');
		Route::get('data-day-off-table','BackEnd\DayOffControll@dataTableDayOff');
		Route::post('data-day-off-table-show','BackEnd\DayOffControll@show');
		Route::post('day-off-delete-data','BackEnd\DayOffControll@deleteLibur');
		Route::post('day-off-edit','BackEnd\DayOffControll@edit');
		Route::post('day-off-update','BackEnd\DayOffControll@update');
		Route::post('day-off/{Id}/detail','BackEnd\DayOffControll@detail');
		Route::post('day-off-insert','BackEnd\DayOffControll@store');
		Route::post('day-off-delete','BackEnd\DayOffControll@delete');

		Route::get('data-double-book','BackEnd\DoubleBookControll@index');
		Route::post('double-book-export','BackEnd\DoubleBookControll@export');

		Route::post('manual-book-update','BackEnd\DoubleBookControll@updateFile');

		Route::get('master-trouble-shoot','BackEnd\TroubleShootControll@index');
		Route::post('master-trouble-shoot-get-user','BackEnd\TroubleShootControll@getUser');
		Route::post('master-trouble-shoot-insert','BackEnd\TroubleShootControll@store');
		Route::post('master-trouble-shoot-edit','BackEnd\TroubleShootControll@edit');
		Route::post('master-trouble-shoot-delete','BackEnd\TroubleShootControll@delete');
		Route::post('master-trouble-shoot-update','BackEnd\TroubleShootControll@update');
		
		Route::get('master-chat-status','BackEnd\ChatStatusControll@index');
		Route::post('master-chat-status-insert','BackEnd\ChatStatusControll@store');
		Route::post('master-chat-status-delete','BackEnd\ChatStatusControll@delete');
		Route::post('data-chat-status-table-show','BackEnd\ChatStatusControll@show');
		Route::post('master-chat-status-update','BackEnd\ChatStatusControll@update');
		Route::post('master-chat-status-edit','BackEnd\ChatStatusControll@edit');

		// Route::post('master-module-get-parent','BackEnd\MasterModuleControll@getParent');
		// Route::post('master-module-show','BackEnd\MasterModuleControll@show');
		// Route::post('master-module-insert','BackEnd\MasterModuleControll@store');
		// Route::post('master-module-edit','BackEnd\MasterModuleControll@edit');
		// Route::post('master-module-update','BackEnd\MasterModuleControll@update');
		// Route::post('master-module-delete','BackEnd\MasterModuleControll@delete');
	});
});