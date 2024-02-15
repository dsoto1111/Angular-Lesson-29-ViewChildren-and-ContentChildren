import { Component, TemplateRef, ViewChild, AfterViewInit, ViewContainerRef, ViewChildren, QueryList } from '@angular/core';
import { PaneDirective } from './pane.directive';
import { NavbarComponent } from './navbar/navbar.component'; 

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
    offsetHeight!: string;

    buttonStyle = {display: 'block',
                   margin: 'auto',
                   width: '10%'};

    toggle: boolean = false;

    @ViewChild('cRef', {read: ViewContainerRef}) vcf!: ViewContainerRef;
    @ViewChild('tRef') tempRef!: TemplateRef<any>;

    @ViewChildren(PaneDirective) panes!: QueryList<PaneDirective>;
    @ViewChild(NavbarComponent) navbar!: NavbarComponent;

    ngAfterViewInit(): void {
        this.vcf.createEmbeddedView(this.tempRef);
        this.logPanes();

        this.panes.changes.subscribe(() => {
            this.logPanes();
        })

        this.navbar.panes.forEach((p) => {
            p.emitter.subscribe((value) => {
                console.log(value);
            })
        })
    }

    logPanes() {
        this.panes.forEach((p) => {
            console.log(p.id);
        })
    }
}
