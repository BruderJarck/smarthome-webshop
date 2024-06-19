import { Component } from '@angular/core';
import { SensorService } from 'src/app/shared/sensor.service';
import { SensorModel } from '../../models';
import { SensorValueModel } from 'src/app/models';
import { AccountService } from 'src/app/shared/account.service';
@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.component.html',
  styleUrls: ['./sensor-data.component.scss'],
})
export class SensorDataComponent {
  panelOpenState: boolean = false
  sensors: SensorModel[] = []
  loading: boolean = true
  noSensors: boolean = false

  temp: number[] = []
  hum: number[] = []
  pres: number[] = []
  dt: number[] = []

  maxTemp: Number = 0
  maxHum: Number = 0
  maxPres: Number = 0

  constructor(
    private sensorService: SensorService,
    private accountService: AccountService
  ) {

    var username = localStorage.getItem('username') || ""
    this.accountService.getUserByUsername(username).subscribe(
      (user) => {
        this.sensorService.filterSensorsByUserId(String(user.id)).subscribe(
          (sesorResponse) => {
            console.log(sesorResponse)
            if (sesorResponse.length != 0) {
              for (let _sensor in sesorResponse) {

                this.sensorService.filterSensorsBySensorId(String(sesorResponse[_sensor].id)).subscribe(
                  (sensorValueResponse) => {
                    for (let sensorValue in sensorValueResponse) {
                      this.temp.push(sensorValueResponse[sensorValue].id)
                      this.hum.push(sensorValueResponse[sensorValue].hum)
                      this.pres.push(sensorValueResponse[sensorValue].pres)
                      this.dt.push(sensorValueResponse[sensorValue].dt)
                    }

                    var datamodel = {
                      labels: this.dt,
                      options: {
                        scales: {
                          y: {
                            stepSize: 100,

                            type: 'linear',
                          }
                        },
                      },
                      datasets: [
                        {
                          label: 'temp',
                          data: this.temp,
                          backgroundColor: '#FFA726',
                          borderColor: '#FFA726',
                          yAxisID: "y",
                          borderWidth: 3,
                          tension: 0.4,
                        },
                        {
                          label: 'hum',
                          data: this.hum,
                          backgroundColor: '#42A5F5',
                          borderColor: '#42A5F5',
                          yAxisID: "y1",
                          borderWidth: 3,
                          tension: 0.4,
                        },
                        {
                          label: 'pres',
                          data: this.pres,
                          borderColor: '#66BB6A',
                          backgroundColor: '#66BB6A',
                          yAxisID: "y2",
                          borderWidth: 3,
                          tension: 0.4,
                        },
                      ],
                    };
                    console.log(sesorResponse[_sensor]);

                    this.maxTemp = this.temp.sort((n1, n2) => n1 - n2).pop() || 0
                    this.maxHum = this.hum.sort((n1, n2) => n1 - n2).pop() || 0
                    this.maxPres = this.pres.sort((n1, n2) => n1 - n2).pop() || 0

                    var sensor: SensorModel = {
                      id: sesorResponse[_sensor].id,
                      name: sesorResponse[_sensor].name,
                      data: datamodel,
                      location: sesorResponse[_sensor].location,
                      ip_address: sesorResponse[_sensor].ip_address
                    };

                    this.sensors.push(sensor)

                    this.loading = false
                  }
                )
              }
            }
            else {
              this.noSensors = true
              this.loading = false
            }

          },
          err => console.log(err),
        )
      }
    )

  }
}
