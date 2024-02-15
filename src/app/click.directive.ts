import { Directive, HostListener } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Directive({
    selector: '[appClick]'
})
export class ClickDirective {

    constructor(private child: ChildComponent) { }

    @HostListener('click') click() {
        this.child.showIt = !this.child.showIt;
    }

}
