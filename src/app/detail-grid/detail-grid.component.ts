import { AfterViewInit, Component, Input } from '@angular/core';
import { Service, Task } from '../app.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
@Component({
  selector: 'app-detail-grid',
  templateUrl: './detail-grid.component.html',
  styleUrls: ['./detail-grid.component.css'],
  providers: [Service],
})
export class DetailGridComponent implements AfterViewInit {

  @Input() key!: number;
  detailChangesByKey: any  = {};
  tasksDataSource!: DataSource;
  changes: any;
  tasks: Task[];

  constructor(private service: Service) {
    this.tasks = service.getTasks();
    if(localStorage.getItem("changes")) this.changes = JSON.parse(localStorage.getItem("changes") || "");
  }

  ngAfterViewInit() {
    this.tasksDataSource = new DataSource({
      store: new ArrayStore({
        data: this.tasks,
        key: 'ID',
      }),
      filter: ['EmployeeID', '=', this.key],
    });
  }

  completedValue(rowData: any) {
    return rowData.Status == 'Completed';
  }

  onOptionChanged(e: any){
    if(e.fullName === 'editing.changes') {
      localStorage.setItem("changes", JSON.stringify(e.value))
    }
  }
}
