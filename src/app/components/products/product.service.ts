import { catchError, map } from "rxjs/operators";
import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EMPTY, empty, Observable } from "rxjs";

/* Essa classe pode ser injetada em outras classes */
@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "http://localhost:5000/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });

    headers.set("Content-Type", "application/json");

    return this.http
      .post<Product>(this.baseUrl, product, { headers: headers })
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
    .pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id?: string): Observable<Product> {
    /* 
    Adionando parâmetros na URL
    return this.http.get<Product>(this.baseUrl, {
      params: new HttpParams().set('id', id)
    }) */

    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url)
    .pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product)
    .pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id?: string): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url)
    .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }
}
