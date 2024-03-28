import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { Category } from 'src/app/shared/service/product';

@Component({
  selector: 'app-spiecific-category',
  templateUrl: './spiecific-category.component.html',
  styleUrls: ['./spiecific-category.component.css']

})
export class SpiecificCategoryComponent implements OnInit {

  constructor(private _EcomdataService: EcomdataService, private _ActivatedRoute: ActivatedRoute, private _NgxSpinnerService: NgxSpinnerService) { }
  spiecificCategory: any;
  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let categoryId: any = params.get('id');
        console.log(categoryId);
        console.log(params);
        this._EcomdataService.getSpiecificCategory(categoryId).subscribe({
          next: (response) => {
            this.spiecificCategory = response.data
            this._NgxSpinnerService.hide()

          },
          error: (error) => {
            this._NgxSpinnerService.hide()

            console.log(error);

          }
        })
      }
    })
  }





}
