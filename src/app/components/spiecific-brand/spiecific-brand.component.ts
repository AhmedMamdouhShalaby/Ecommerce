import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-spiecific-brand',
  templateUrl: './spiecific-brand.component.html',
  styleUrls: ['./spiecific-brand.component.css']
})
export class SpiecificBrandComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService, private _ActivatedRoute: ActivatedRoute, private _NgxSpinnerService: NgxSpinnerService) { }

  spiecificBrand: any;

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let brandId: any = params.get('id')
        this._EcomdataService.getSpiecificBrand(brandId).subscribe({
          next: (response) => {
            console.log(response.data);

            this.spiecificBrand = response.data
            this._NgxSpinnerService.hide()

          },
          error: (error) => {
            console.log(error);
            this._NgxSpinnerService.hide()


          }
        })

      }
    })
  }

}
