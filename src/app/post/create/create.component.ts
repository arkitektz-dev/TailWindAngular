import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup  = new FormGroup({  
    name : new FormControl(''),
    price : new FormControl(''),
    description : new FormControl('')
  });
  postId:string = "";
  submitted = false;
  productDetail : any = "";
  heading : string = "Create";

  constructor(private _location: Location, 
    private http: HttpClient, 
    private router: Router, 
    private route:ActivatedRoute,
    private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      { 
        name : ['',Validators.required],
        price : ['',Validators.required],
        description : ['',Validators.required]
      }
    );

   this.postId = this.route.snapshot.params['postId']; 
   if(this.postId != undefined){
    this.getProduct(this.postId);
   }
  }

  getProduct(Id : string) {
    this.http
    .get(`https://61c446b3f1af4a0017d9947b.mockapi.io/product/${Id}`)
    .subscribe((res) => {
      
      this.productDetail = res;
      this.form.controls['name'].setValue(this.productDetail.name);
      this.form.controls['price'].setValue(this.productDetail.price);
      this.form.controls['description'].setValue(this.productDetail.description);
      this.heading = "Edit";
       
    });
  }

  get f(): { [key: string]: AbstractControl } {
     
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    let submittedRow =   this.form.value;
    if (this.form.invalid) {
      return;
    }

     
     
     
     if(this.postId == undefined){
      //Create

      this.http.post('https://61c446b3f1af4a0017d9947b.mockapi.io/product', submittedRow).subscribe(
        (response) => {
           if(response != null){
            this.router.navigate(['/post/index']);
           }
        },
        (error) => { 

        }
      )

     }else{
      //Edit

      let postObj = {
        name: submittedRow.name,
        price: submittedRow.price,
        description: submittedRow.description
      };
      
      this.http.put(`https://61c446b3f1af4a0017d9947b.mockapi.io/product/${this.postId}`, postObj).subscribe(
        (response) => {
           if(response != null){
            this.router.navigate(['/post/index']);
           }
        },
        (error) => { 
  
        }
      )

     }

    
  }

  onReset(): void {
    this.form.reset();
  }
 

}
