import { NgxSpinnerModule } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService, private _NgxSpinnerService: NgxSpinnerService) { }

  allBrands: any;

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._EcomdataService.getAllBrands().subscribe({
      next: (response) => {
        console.log(response.data);
        this.allBrands = response.data
        this._NgxSpinnerService.hide()

      },
      error: (error) => {
        console.log(error);

      }
    })
  }

}
