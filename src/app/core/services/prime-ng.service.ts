import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PrimeNgService {

  constructor(private primengConfig: PrimeNGConfig) { }

  configInit(): void {
    this.primengConfig.ripple = true;
  }
}
