import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { privateDecrypt } from 'crypto';
import { TokenService } from '../Services/token.service';
import { catchError, map,of } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {

  let token = localStorage.getItem("token") || "";
  const router = inject(Router);
  const tokenService = inject(TokenService);

  // if (router.url.includes("")) {
  //   token = "";
  //   router.navigateByUrl("/login");
  // }


  if (token !== "") {
    return tokenService.ValidateToken(token).pipe(
      map( data => {
        if (data.succes) {
          return true;
        }else{
          router.navigateByUrl("/login");
          return false;
        }
      }),

      catchError(error => {
        router.navigateByUrl("/login");
        return of(false);
      })
    )

  }else{
    return router.navigateByUrl("/login");
  }

};
