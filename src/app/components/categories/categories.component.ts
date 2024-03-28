import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _EcomdataService: EcomdataService, private _NgxSpinnerService: NgxSpinnerService, private _Router: Router) { }

  categories: any[] = [];
  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._EcomdataService.getCategories().subscribe({
      next: (response) => {

        this.categories = response.data
        this._NgxSpinnerService.hide()
        console.log(this.categories);
      },
      error: (error) => {
        this._NgxSpinnerService.hide()

        console.log(error);

      }
    })
  }

  sendAndNav(id: any): void {
    this._NgxSpinnerService.show()

    this._Router.navigate(['/spiecificcategory', id]);
  }
}
