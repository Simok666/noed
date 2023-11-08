<template>
  <div>
    <div class="row">
      <h4 class="font-weight-bold py-3 mb-4">
        Dashboard
        <div class="text-muted text-tiny mt-1"><small class="font-weight-normal">{{date}}</small></div>
      </h4>
    </div>
    <div class="row" v-if="idDepartment == 67 && accessTable[0]">
      <div class="col-6">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="col-md-3">
              <div class="card-header-title-report">Total Laporan NOE</div>
              <div class="card-child-title">
                {{dataNoe.total_laporan}}
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-header-title-report">NOE Open</div>
              <div class="card-child-title">
                {{dataNoe.is_open_laporan}}
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-header-title-report">NOE Ongoing</div>
              <div class="card-child-title">
                {{dataNoe.is_ongoing_laporan}}
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-header-title-report">NOE Closed</div>
              <div class="card-child-title">
                {{dataNoe.is_closed_laporan}}
              </div>
            </div>
          </b-card-header>
        </b-card>
      </div>
      <div class="col-6">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="col-md-3">
              <div class="card-header-title-report">Total Laporan NOD</div>
              <div class="card-child-title">
                {{dataNod.total_laporan_nod}}
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-header-title-report">NOD Open</div>
              <div class="card-child-title">
                {{dataNod.is_open_laporan_nod}}
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-header-title-report">NOD Ongoing</div>
              <div class="card-child-title">
                {{dataNod.is_ongoing_laporan_nod}}
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-header-title-report">NOD Closed</div>
              <div class="card-child-title">
                {{dataNod.is_closed_laporan_nod}}
              </div>
            </div>
          </b-card-header>
        </b-card>
      </div>
    </div>

    <div class="row" v-if="accessTable[6]">
      <div class="col-md-12">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Pareto Chart by Unit</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="ParetoChartYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeUnitPareto" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getLocation('pareto')" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="py-4 px-3 mt-3" id="chart-container">
            <fusioncharts
              :type="type"
              :width="width"
              :height="height"
              :dataformat="dataFormat"
              :dataSource="dataSource"
              >
            </fusioncharts>
          </div>
        </b-card>
      </div>
    </div>

    <div class="row" v-if="idDepartment == 67 && accessTable[0]">
      <div class="col-4">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Level NOE</div>
          </b-card-header>
          <div class="mx-4 my-4">
            <doughnut-chart :chart-data="datacollection_level_noe"/>
          </div>
        </b-card>
      </div>
      <div class="col-4">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Kategori NOE</div>
          </b-card-header>
          <div class="mx-4 my-4">
            <doughnut-chart :chart-data="datacollection_bets_category"/>
          </div>
        </b-card>
      </div>
      <div class="col-4">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
              <div class="card-header-title">Perhitungan Hari Approval (AVG)</div>
          </b-card-header>
          <div class="mx-4 my-4">
              <bar-chart :chart-data="datacollection_perhitungan_hari"/>
          </div>
        </b-card>
      </div>
    </div>

    <div class="row" v-if="idDepartment == 67 && accessTable[0]">
      <div class="col-6">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">NOE Report Completeness</div>
          </b-card-header>
          <div class="mx-4 my-4">
            <doughnut-chart :chart-data="datacollection_level_noe"/>
          </div>
        </b-card>
      </div>
      <div class="col-6">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">NOE NOD status</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="noeNodStatus"
                :options="opsStatus"
                :allow-empty="true"
                placeholder="Pilih NOE/NOD"
                label="text"
                track-by="text"
                @input="onChangeStatus" />
              </b-col>
            </b-row>
          </b-card-header>
          <div class="mx-4 my-4">
            <bar-chart :chart-data="datacollection_noenod_status"/>
          </div>
        </b-card>
      </div>
    </div>

    <b-form-row v-if="idDepartment == 67 && accessTable[0]">
      <b-form-group class="col-md-4 float-right">
        <label class="form-label">Departemen</label>
        <multiselect
          v-model="Department"
          :options="opsDepartment"
          :allow-empty="false"
          placeholder="Pilih Department"
          label="Department"
          track-by="Department"
          @input="onChangeDept" />
      </b-form-group>

      <b-form-group class="col-md-2 float-right">
        <label class="form-label">Tahun</label>
        <multiselect
          v-model="allYear"
          :options="opsYear"
          :allow-empty="false"
          placeholder="Pilih Tahun"
          selectLabel=""
          deselectLabel=""
          label="text"
          track-by="text"
          @input="onChangeAllYear" />
      </b-form-group>
    </b-form-row>

    <div class="row" v-if="accessTable[0]">
      <div class="col-12">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Tabel Lokasi Kejadian</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="unitYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeUnit" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getLocation('tabel')" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="table-responsive">
            <table class="table table-striped table-bordered text-center th-text-middle b-t">
              <thead>
                <tr>
                  <th rowspan="2">Bulan</th>
                  <th :colspan="countHeaderUnit">Unit</th>
                  <th rowspan="2">Total</th>
                  <th rowspan="2">%</th>
                </tr>
                <tr>
                  <th v-for="item in headerUnit" :key="item.Name">{{item.Name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in unitLocation" :key="index">
                  <td v-for="value in countHeaderUnit+3">{{item[value-1]}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6" v-if="accessTable[1]">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Tabel Status NOE</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="NOEYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeNOE" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getStatusNOE()" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="table-responsive">
            <table class="table table-striped table-bordered text-center th-text-middle b-t">
              <thead>
                <tr>
                  <th rowspan="2">Bulan</th>
                  <th colspan="2">Status NOE</th>
                  <th rowspan="2">Total</th>
                </tr>
                <tr>
                  <th>Closed</th>
                  <th>Open</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in statusNOE" :key="index">
                  <td>{{item[0]}}</td>
                  <td>{{item[1]}}</td>
                  <td>{{item[2]}}</td>
                  <td>{{item[3]}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </div>

      <div class="col-md-6" v-if="accessTable[2]">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Tabel Status NOD</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="NODYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeNOD" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getStatusNOD()" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="table-responsive">
            <table class="table table-striped table-bordered text-center th-text-middle b-t">
              <thead>
                <tr>
                  <th rowspan="2">Bulan</th>
                  <th colspan="2">Status NOD</th>
                  <th rowspan="2">Total</th>
                </tr>
                <tr>
                  <th>Closed</th>
                  <th>Open</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in statusNOD" :key="index">
                  <td>{{item[0]}}</td>
                  <td>{{item[1]}}</td>
                  <td>{{item[2]}}</td>
                  <td>{{item[3]}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6" v-if="accessTable[7]">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Tabel Status Waktu NOE</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="TimeNOEYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeTimeNOE" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getStatusTimeNOE()" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="table-responsive">
            <table class="table table-striped table-bordered text-center th-text-middle b-t">
              <thead>
                <tr>
                  <th rowspan="2">Bulan</th>
                  <th colspan="3">Dept. Pelapor</th>
                  <th colspan="2">Dept. QA</th>
                </tr>
                <tr>
                  <th>On Going</th>
                  <th>On Time</th>
                  <th>Delay</th>
                  <!-- <th>On Going</th> -->
                  <th>On Time</th>
                  <th>Delay</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr>
                  <td>Janu</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>3</td>
                  <td>4</td>
                </tr> -->
                <tr v-for="(item, index) in statusTimeNOE" :key="index">
                  <td>{{item['month']}}</td>
                  <td>{{item['DeptGoing']}}</td>
                  <td>{{item['DeptOnTime']}}</td>
                  <td>{{item['DeptDelay']}}</td>
                  <!-- <td>{{item['QAGoing']}}</td> -->
                  <td>{{item['QAOnTime']}}</td>
                  <td>{{item['QADelay']}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>TOTAL</th>
                  <td>{{dataTimeNOE.countDG}}</td>
                  <td>{{dataTimeNOE.countDOT}}</td>
                  <td>{{dataTimeNOE.countDD}}</td>
                  <!-- <td>{{dataTimeNOE.countQG}}</td> -->
                  <td>{{dataTimeNOE.countQOT}}</td>
                  <td>{{dataTimeNOE.countQD}}</td>
                </tr>
                <tr>
                  <th>PERSEN (%)</th>
                  <td>{{dataTimeNOE.percentDG}} %</td>
                  <td>{{dataTimeNOE.percentDOT}} %</td>
                  <td>{{dataTimeNOE.percentDD}} %</td>
                  <!-- <td>{{dataTimeNOE.percentQG}} %</td> -->
                  <td>{{dataTimeNOE.percentQOT}} %</td>
                  <td>{{dataTimeNOE.percentQD}} %</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </b-card>
      </div>

      <div class="col-md-6" v-if="accessTable[8]">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Tabel Status Waktu NOD</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="TimeNODYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeTimeNOD" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getStatusTimeNOD()" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="table-responsive">
            <table class="table table-striped table-bordered text-center th-text-middle b-t">
              <thead>
                <tr>
                  <th rowspan="2">Bulan</th>
                  <th colspan="3">Dept. Pelapor</th>
                  <th colspan="2">Dept. QA</th>
                </tr>
                <tr>
                  <th>On Going</th>
                  <th>On Time</th>
                  <th>Delay</th>
                  <!-- <th>On Going</th> -->
                  <th>On Time</th>
                  <th>Delay</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr>
                  <td>Janu</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>3</td>
                  <td>4</td>
                </tr> -->
                <tr v-for="(item, index) in statusTimeNOD" :key="index">
                  <td>{{item['month']}}</td>
                  <td>{{item['DeptGoing']}}</td>
                  <td>{{item['DeptOnTime']}}</td>
                  <td>{{item['DeptDelay']}}</td>
                  <!-- <td>{{item['QAGoing']}}</td> -->
                  <td>{{item['QAOnTime']}}</td>
                  <td>{{item['QADelay']}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>TOTAL</th>
                  <td>{{dataTimeNOD.countDG}}</td>
                  <td>{{dataTimeNOD.countDOT}}</td>
                  <td>{{dataTimeNOD.countDD}}</td>
                  <!-- <td>{{dataTimeNOD.countQG}}</td> -->
                  <td>{{dataTimeNOD.countQOT}}</td>
                  <td>{{dataTimeNOD.countQD}}</td>
                </tr>
                <tr>
                  <th>PERSEN (%)</th>
                  <td>{{dataTimeNOD.percentDG}} %</td>
                  <td>{{dataTimeNOD.percentDOT}} %</td>
                  <td>{{dataTimeNOD.percentDD}} %</td>
                  <!-- <td>{{dataTimeNOD.percentQG}} %</td> -->
                  <td>{{dataTimeNOD.percentQOT}} %</td>
                  <td>{{dataTimeNOD.percentQD}} %</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </b-card>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12" v-if="accessTable[3]">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Tabel Level Deviasi</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="DeviationYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeDeviation" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getDeviationLevel()" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="table-responsive">
            <table class="table table-striped table-bordered text-center th-text-middle b-t">
              <thead>
                <tr>
                  <th rowspan="2">Bulan</th>
                  <th :colspan="countHeaderDeviation">Level</th>
                  <th rowspan="2">Total</th>
                </tr>
                <tr>
                  <th v-for="item in headerDeviation" :key="item.Level">{{item.Level}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in deviationLevel" :key="index">
                  <td v-for="value in countHeaderDeviation+2">{{item[value-1]}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" v-if="accessTable[4]">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Unit by Unit</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="UnitChartYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeUnitChart" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getLocation('chart')" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="py-4 px-3">
            <pie-chart :chart-data="datacollection_pie" :height="500" />
          </div>
        </b-card>
      </div>
    </div>

    <div class="row" v-if="accessTable[5]">
      <div class="col-12">
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6" class="with-elements">
            <div class="card-header-title">Tabel Unit Sort</div>
            <b-row class="card-header-elements ml-auto">
              <b-col cols="auto">
                <multiselect
                v-model="UnitSortYear"
                :options="opsYear"
                :allow-empty="true"
                placeholder="Pilih Tahun"
                label="text"
                track-by="text"
                @input="onChangeUnitSort" />
              </b-col>
              <b-col cols="auto">
                <b-btn @click="getLocation('sort')" variant="outline-primary" class="btn-md icon-btn md-btn-flat"><i class="ion ion-md-sync"></i></b-btn>
              </b-col>
            </b-row>
          </b-card-header>
          <div class="table-responsive">
            <table class="table table-striped table-bordered text-center th-text-middle b-t">
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Total</th>
                  <th>Sort Unit</th>
                  <th>Sort Total</th>
                  <th>Persentase (%)</th>
                  <th>Kumulatif (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in valUnitLocationSort" :key="index">
                  <td v-for="value in item">{{value}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import VueChartJs from 'vue-chartjs'
import PerfectScrollbar from '@/vendor/libs/perfect-scrollbar/PerfectScrollbar'
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import moment from 'moment'
import ChartJsLabels from 'chartjs-plugin-datalabels'
// import DoughnutChart from '@/components/Doughnut'

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme, Widgets, TimeSeries)

Vue.component('pie-chart', {
  extends: VueChartJs.Pie,
  mixins: [VueChartJs.mixins.reactiveProp],
  props: ['chartData'],
  data: function () {
    return {
      options: {
        plugins: {
          datalabels: {
            color: "white",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16
            }
          }
        },

        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})

Vue.component('doughnut-chart', {
  extends: VueChartJs.Doughnut,
  mixins: [VueChartJs.mixins.reactiveProp],
  props: ['chartData'],
  data: function () {
    return {
      options: {
        plugins: {
          datalabels: {
            color: "white",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16
            }
          }
        },

        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})

Vue.component('bar-chart', {
  extends: VueChartJs.Bar,
  mixins: [VueChartJs.mixins.reactiveProp],
  props: ['chartData'],
  data: function () {
    return {
      options: {
        plugins: {
          datalabels: {
            color: "white",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16
            }
          }
        },

        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})

export default {
  name: 'dashboard',
  metaInfo: {
    title: 'Dashboards'
  },
  components: {
    PerfectScrollbar,
    // DoughnutChart
  },
  data () {
    return {
      date: moment(new Date()).format('dddd, DD MMMM YYYY'),
      opsYear: [],
      opsStatus: [
        { value: 'noe', text: 'NOE' },
        { value: 'nod', text: 'NOD' }
      ],
      accessTable: [],
      allYear: null,
      unitYear: null,
      NOEYear: null,
      NODYear: null,
      noeNodStatus: null,
      TimeNOEYear: null,
      TimeNODYear: null,
      DeviationYear: null,
      UnitChartYear: null,
      UnitSortYear: null,
      ParetoChartYear: null,
      countHeaderUnit: 0,
      headerUnit: [],
      unitLocation: [],
      statusNOE: [],
      statusNOD: [],
      statusTimeNOE: [],
      dataTimeNOE: [],
      statusTimeNOD: [],
      dataTimeNOD: [],
      countHeaderDeviation: 0,
      headerDeviation: [],
      deviationLevel: [],
      idDepartment: 0,
      Department:{Id:0, Department:'ALL'},
      opsDepartment: [{Id:0, Department:'ALL'}],
      datacollection_pie: {},
      datacollection_level_noe: {},
      datacollection_bets_category: {},
      datacollection_noenod_status: {},
      datacollection_perhitungan_hari: {},
      valHeaderUnit: [],
      valUnitColor: [],
      valUnitLocation: [],
      valUnitLocationSort: [],
      "type": "pareto2d",
      "renderAt": "chart-container",
      "width": "100%",
      "height": "350",
      "dataFormat": "json",
      dataSource: {
        chart: {
          theme: "fusion",
          decimals: "1",
          drawcrossline: "1"
        },
        data: [
          {
            label: "Example 1",
            value: "40"
          },
          {
            label: "Example 2",
            value: "22"
          }
        ]
      },
      dataNoe: {
        total_laporan: 0,
        is_open_laporan: 0,
        is_ongoing_laporan: 0,
        is_closed_laporan: 0,
      },
      dataNod: {
        total_laporan_nod: 0,
        is_open_laporan_nod: 0,
        is_ongoing_laporan_nod: 0,
        is_closed_laporan_nod: 0,
      },
      dataLevel: [],
      levelColor: [],
      setDataValue:[],
      databets: [],
      betscolor: [],
      setDataBets: [],
      dataOpen: [],
      dataClosed: [],
      dataOngoing: []
    }
  },
  methods: {
    unitData () {
      this.datacollection_pie = {
        labels: this.valHeaderUnit,
        datasets: [{
          borderWidth: 1,
          borderColor: this.valUnitColor,
          backgroundColor: this.valUnitColor,
          data: this.valUnitLocation
        }]
      }
    },
    levelNoe (datalevel, levelColor, setDataValue) {
      this.datacollection_level_noe = {
        labels : datalevel,
        datasets : [{
          borderWidth: 1,
          borderColor:  levelColor,
          backgroundColor: levelColor,
          data: setDataValue
        }]
      }
    },
    statusNoeNod (dataOpen, dataOngoing, dataClosed) {
      this.datacollection_noenod_status = {
        labels : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets : [{
          type: 'bar',
          borderWidth: 1,
          label: 'Ongoing',
          borderColor:  '#6ded8f',
          backgroundColor: '#6ded8f',
          data: [
            dataOngoing.January, 
            dataOngoing.February, 
            dataOngoing.March, 
            dataOngoing.April,
            dataOngoing.May,
            dataOngoing.June,
            dataOngoing.July,
            dataOngoing.August,
            dataOngoing.September,
            dataOngoing.October,
            dataOngoing.November,
            dataOngoing.December
          ],
          stack: 'bar'
        },
        {
          type: 'bar',
          borderWidth: 1,
          label: 'Closed',
          borderColor:  '#ffb554',
          backgroundColor: '#ffb554',
          data: [
            dataClosed.January, 
            dataClosed.February, 
            dataClosed.March, 
            dataClosed.April,
            dataClosed.May,
            dataClosed.June,
            dataClosed.July,
            dataClosed.August,
            dataClosed.September,
            dataClosed.October,
            dataClosed.November,
            dataClosed.December
          ],
          stack: 'bar'
        },
        {
          type: 'bar',
          borderWidth: 1,
          label: 'Open',
          borderColor:  '#3e95cd',
          backgroundColor: '#3e95cd',
          data: [
            dataOpen.January, 
            dataOpen.February, 
            dataOpen.March, 
            dataOpen.April,
            dataOpen.May,
            dataOpen.June,
            dataOpen.July,
            dataOpen.August,
            dataOpen.September,
            dataOpen.October,
            dataOpen.November,
            dataOpen.December
          ],
          stack: 'bar'
        }]
      }
    },
    countingDaysApproval (dataA, dataB, dataC, dataD) {
      this.datacollection_perhitungan_hari = {
        labels : [
          'Tgl kejadian --> QA terima',
          'QA terima --> QA approve (NOE)',
          'QA Approve (NOE) --> QA terima (NOD)',
          'QA terima --> QA approve (NOD)',
        ],
        datasets : [{
          type: 'bar',
          borderWidth: 1,
          borderColor:  '#3e95cd',
          label : 'avarage',
          backgroundColor: '#3e95cd',
          data: [dataA, dataB, dataC, dataD],
          stack: 'bar',
        }]
      }
    },
    betCategory(databets, betscolor, setDataValue) {
      this.datacollection_bets_category = {
        labels: databets,
        datasets : [{
          borderWidth: 1,
          borderColor:  betscolor,
          backgroundColor: betscolor,
          data: setDataValue
        }]
      }
    },
    getLocation (type=null, filter='') {
      if(type=='tabel') {
        if(filter=='') filter = this.unitYear.value
      }
      if(type=='chart') {
        if(filter=='') filter = this.UnitChartYear.value
      }
      if(type=='sort') {
        if(filter=='') filter = this.UnitSortYear.value
      }
      if(type=='pareto') {
        if(filter=='') filter = this.ParetoChartYear.value
      }
      this.showLoading()
      axios.post('/AdminVue/dashboard-get-unit-location', {
        Department: this.Department.Id,
        type: type,
        filter: filter
      })
      .then( function (res) {
        if(type == 'tabel') {
          this.countHeaderUnit = res.data.countHeaderUnit
          this.headerUnit = res.data.headerUnit
          this.unitLocation = res.data.unitLocation
        } else if(type == 'chart') {
          this.valHeaderUnit = res.data.valHeaderUnit
          this.valUnitColor = res.data.valUnitColor
          this.valUnitLocation = res.data.valUnitLocation
          this.unitData()
        } else if(type == 'sort') {
          this.valUnitLocationSort = res.data.valUnitLocationSort
        } else if(type == 'pareto') {
          this.dataSource.data = JSON.parse(res.data.valPareto)
        } else {
          this.countHeaderUnit = res.data.countHeaderUnit
          this.headerUnit = res.data.headerUnit
          this.unitLocation = res.data.unitLocation
          this.valHeaderUnit = res.data.valHeaderUnit
          this.valUnitColor = res.data.valUnitColor
          this.valUnitLocation = res.data.valUnitLocation
          this.valUnitLocationSort = res.data.valUnitLocationSort
          this.dataSource.data = JSON.parse(res.data.valPareto)
          this.unitData()
        }
        this.hideLoading()
      }.bind(this))
      .catch( function (e) {
        this.hideLoading()
        console.log(e)
      }.bind(this))
    },

    getStatusNOE (filter='') {
      this.showLoading()
      axios.post('/AdminVue/dashboard-get-status-noe', {
        value: 'noe',
        filter: filter,
        Department: this.Department.Id
      })
      .then( function (res) {
        this.statusNOE = res.data.data
        this.hideLoading()
      }.bind(this))
      .catch( function (e) {
        this.hideLoading()
        console.log(e)
        this.statusNOE = []
      }.bind(this))
    },

    getStatusNOD (filter='') {
      this.showLoading()
      axios.post('/AdminVue/dashboard-get-status-noe', {
        value: 'nod',
        filter: filter,
        Department: this.Department.Id
      })
      .then( function (res) {
        this.statusNOD = res.data.data
        this.hideLoading()
      }.bind(this))
      .catch( function (e) {
        this.hideLoading()
        console.log(e)
        this.statusNOD = []
      }.bind(this))
    },

    getStatusTimeNOE () {
      var filter = ''
      if(this.TimeNOEYear) filter = this.TimeNOEYear.value
      this.showLoading()

      axios.post('/AdminVue/dashboard-get-status-time', {
        value: 'noe',
        filter: filter,
        Department: this.Department.Id
      })
      .then( function (res) {
        this.statusTimeNOE = res.data.data
        this.dataTimeNOE = res.data
        this.hideLoading()
      }.bind(this))
      .catch( function (e) {
        this.hideLoading()
        console.log(e)
        this.statusTimeNOE = []
        this.dataTimeNOE = []
      }.bind(this))
    },

    getStatusTimeNOD (filter='') {
      var filter = ''
      if(this.TimeNODYear) filter = this.TimeNODYear.value
      this.showLoading()

      axios.post('/AdminVue/dashboard-get-status-time', {
        value: 'nod',
        filter: filter,
        Department: this.Department.Id
      })
      .then( function (res) {
        this.statusTimeNOD = res.data.data
        this.dataTimeNOD = res.data
        this.hideLoading()
      }.bind(this))
      .catch( function (e) {
        this.hideLoading()
        console.log(e)
        this.statusTimeNOD = []
        this.dataTimeNOD = []
      }.bind(this))
    },

    getDeviationLevel (filter='') {
      if(filter=='') filter = this.DeviationYear.value
      this.showLoading()
      axios.post('/AdminVue/dashboard-get-deviation-level', {
        filter: filter,
        Department: this.Department.Id
      })
      .then( function (res) {
        this.countHeaderDeviation = res.data.countHeaderDeviation
        this.headerDeviation = res.data.headerDeviation
        this.deviationLevel = res.data.deviationLevel
        this.hideLoading()
      }.bind(this))
      .catch( function (e) {
        this.hideLoading()
        console.log(e)
        this.headerDeviation = []
        this.deviationLevel = []
      }.bind(this))
    },
    onChangeUnit(option) {
      if(option) this.getLocation('tabel', option.value)
    },
    onChangeNOE(option) {
      if(option) this.getStatusNOE(option.value)
    },
    onChangeNOD(option) {
      if(option) this.getStatusNOD(option.value)
    },
    onChangeTimeNOE(option) {
      if(option) this.getStatusTimeNOE()
    },
    onChangeTimeNOD(option) {
      if(option) this.getStatusTimeNOD()
    },
    onChangeDeviation(option) {
      if(option) this.getDeviationLevel(option.value)
    },
    onChangeUnitChart(option) {
      if(option) this.getLocation('chart', option.value)
    },
    onChangeUnitSort(option) {
      if(option) this.getLocation('sort', option.value)
    },
    onChangeUnitPareto(option) {
      if(option) this.getLocation('pareto', option.value)
    },
    onChangeStatus(option) {
      if(option) this.getStatusNoeNod(option.value)
    },
    generateYearDashboard() {
      axios.post('/AdminVue/dashboard-generate-year')
      .then( function (res) {
        this.opsYear = JSON.parse(res.data.data)
        this.accessTable = res.data.access
        this.opsDepartment = res.data.dtDept
        this.idDepartment = res.data.idDepartment

        var yearNow = moment(new Date()).format('YYYY')
        this.allYear = this.opsYear.find(val => val.value == yearNow )
        this.unitYear = this.opsYear.find(val => val.value == yearNow )
        this.NOEYear = this.opsYear.find(val => val.value == yearNow )
        this.NODYear = this.opsYear.find(val => val.value == yearNow )
        this.TimeNOEYear = this.opsYear.find(val => val.value == yearNow )
        this.TimeNODYear = this.opsYear.find(val => val.value == yearNow )
        this.DeviationYear = this.opsYear.find(val => val.value == yearNow )
        this.UnitChartYear = this.opsYear.find(val => val.value == yearNow )
        this.UnitSortYear = this.opsYear.find(val => val.value == yearNow )
        this.ParetoChartYear = this.opsYear.find(val => val.value == yearNow )

      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    onChangeDept () {
      var yearNow = moment(new Date()).format('YYYY')
      this.allYear = this.opsYear.find(val => val.value == yearNow )
      this.unitYear = this.opsYear.find(val => val.value == yearNow )
      this.NOEYear = this.opsYear.find(val => val.value == yearNow )
      this.NODYear = this.opsYear.find(val => val.value == yearNow )
      this.TimeNOEYear = this.opsYear.find(val => val.value == yearNow )
      this.TimeNODYear = this.opsYear.find(val => val.value == yearNow )
      this.DeviationYear = this.opsYear.find(val => val.value == yearNow )
      this.UnitChartYear = this.opsYear.find(val => val.value == yearNow )
      this.UnitSortYear = this.opsYear.find(val => val.value == yearNow )
      this.ParetoChartYear = this.opsYear.find(val => val.value == yearNow )

      this.getLocation(null, this.allYear.value)
      this.getStatusNOE(this.allYear.value)
      this.getStatusNOD(this.allYear.value)
      this.getStatusTimeNOE()
      this.getStatusTimeNOD(this.allYear.value)
      this.getDeviationLevel(this.allYear.value)
    },

    onChangeAllYear (option) {
      var yearNow = option.value
      this.unitYear = this.opsYear.find(val => val.value == yearNow )
      this.NOEYear = this.opsYear.find(val => val.value == yearNow )
      this.NODYear = this.opsYear.find(val => val.value == yearNow )
      this.TimeNOEYear = this.opsYear.find(val => val.value == yearNow )
      this.TimeNODYear = this.opsYear.find(val => val.value == yearNow )
      this.DeviationYear = this.opsYear.find(val => val.value == yearNow )
      this.UnitChartYear = this.opsYear.find(val => val.value == yearNow )
      this.UnitSortYear = this.opsYear.find(val => val.value == yearNow )
      this.ParetoChartYear = this.opsYear.find(val => val.value == yearNow )

      this.getLocation(null, this.allYear.value)
      this.getStatusNOE(this.allYear.value)
      this.getStatusNOD(this.allYear.value)
      this.getStatusTimeNOE()
      this.getStatusTimeNOD(this.allYear.value)
      this.getDeviationLevel(this.allYear.value)
    },

    getReportData () {
      axios.post('/AdminVue/dashboard-get-data-report')
      .then( function (res) {
        let response = res.data
        
        Vue.set(this.dataNoe, 'total_laporan', response.dataNoe.total_laporan)
        Vue.set(this.dataNoe, 'is_open_laporan', response.dataNoe.is_open_laporan)
        Vue.set(this.dataNoe, 'is_ongoing_laporan', response.dataNoe.is_ongoing_laporan)
        Vue.set(this.dataNoe, 'is_closed_laporan', response.dataNoe.is_closed_laporan)

        Vue.set(this.dataNod, 'total_laporan_nod', response.dataNod.total_laporan_nod)
        Vue.set(this.dataNod, 'is_open_laporan_nod', response.dataNod.is_open_laporan_nod)
        Vue.set(this.dataNod, 'is_ongoing_laporan_nod', response.dataNod.is_ongoing_laporan_nod)
        Vue.set(this.dataNod, 'is_closed_laporan_nod', response.dataNod.is_closed_laporan_nod)
        
      }.bind(this))
       .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    getLevelNoe () {
      axios.post('/AdminVue/dashboard-get-data-noe-level')
      .then( function (res) {
        let response = res.data
        this.dataLavel = response.dataLavel
        this.levelColor = response.levelColor
        this.setDataValue = response.setDataValue
        this.levelNoe(this.dataLavel, this.levelColor, this.setDataValue)
      }.bind(this))
       .catch( function (e) {
          console.log(e)
       }.bind(this))
      
    },

    getCategoryBets () {
      axios.post('/AdminVue/dashboard-get-data-bets-category')
      .then( function (res) {
        let response = res.data
        this.databets = response.databets
        this.betscolor = response.betscolor
        this.setDataBets = response.setDataValue
        this.betCategory(this.databets, this.betscolor, this.setDataBets)
      }.bind(this))
       .catch( function (e) {
          console.log(e)
       }.bind(this))
    },

    getStatusNoeNod (status = 'noe') {
      axios.post('/AdminVue/dashboard-get-status-noe-nod', {
        status : status
      })
      .then( function (res) {
        
        let response = res.data
        this.dataOpen = response.dataOpen
        this.dataOngoing = response.dataOngoing
        this.dataClosed = response.dataClosed
        
        this.statusNoeNod(this.dataOpen, this.dataOngoing, this.dataClosed)
      }.bind(this))
       .catch( function (e) {
          console.log(e)
       }.bind(this))
    },

    getAvarageData () {
      axios.post('/AdminVue/dashboard-get-avarage-data')
      .then( function (res) {
        let response = res.data
        this.countingDaysApproval(response.noePublishToQash, response.noeQashToQadh, response.QadhNoeToQashNod, response.QashNodToQadhNod)
      }.bind(this))
      .catch( function (e) {
        console.log(e) 
      }.bind(this))
    }

    
  },

  mounted () {
    this.generateYearDashboard()
    this.getLocation(null, this.allYear)
    this.getStatusNOE(this.allYear)
    this.getStatusNOD(this.allYear)
    this.getStatusTimeNOE()
    this.getStatusTimeNOD(this.allYear)
    this.getDeviationLevel(this.allYear)
    this.getLevelNoe()
    this.getCategoryBets()
    this.getStatusNoeNod()
    this.getAvarageData()
    this.getReportData()
    this.hideLoading()
  }
}
</script>
