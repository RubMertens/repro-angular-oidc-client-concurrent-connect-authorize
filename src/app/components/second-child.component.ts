import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-child',
  template: `<div>second child</div>`,
})
export class SecondChildComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
