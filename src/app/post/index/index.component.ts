import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  productList:any = [];

  
  constructor(private http: HttpClient,private router: Router) { 

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http
    .get(`https://61c446b3f1af4a0017d9947b.mockapi.io/product`)
    .subscribe((res) => {
         this.productList = res;
         console.log(this.productList)
    });
  }

  deleteProduct(Id : string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.http
        .delete(`https://61c446b3f1af4a0017d9947b.mockapi.io/product/${Id}`)
        .subscribe((res) => {

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getAll();
    
    
        });

    
      }
    })
  }

  

}
